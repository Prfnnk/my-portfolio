// Выносим в отдельный файл: HarvestFlight.jsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Plant from './Plant.jsx';

export default function HarvestFlight({
  type,
  startWorldPos,
  basketPosition,
  onComplete,
  plantRef,
}) {
  const { camera, size } = useThree();
  const flightRef = useRef();
  const targetPos = useRef(new THREE.Vector3());
  const progress = useRef(0);

  useEffect(() => {
    plantRef.current.scale.set(1, 1, 1); // Reset scale at the start
  }, [plantRef]);

  useFrame((state, delta) => {
    if (!flightRef.current) return;

    if (progress.current === 0) {
      const centerX = basketPosition.left + basketPosition.width / 2;
      const centerY = basketPosition.top + basketPosition.height / 2;

      const ndcX = (centerX / size.width) * 2 - 1;
      const ndcY = -(centerY / size.height) * 2 + 1;

      targetPos.current.set(ndcX, ndcY, 0.5).unproject(camera);
      const dir = targetPos.current.clone().sub(camera.position).normalize();
      targetPos.current.copy(camera.position).add(dir.multiplyScalar(4));

      // 2d to 3d coordinates
      flightRef.current.parent.worldToLocal(targetPos.current);
    }

    progress.current += delta;

    flightRef.current.rotation.x += delta * 8;
    flightRef.current.rotation.y += delta * 12;
    flightRef.current.position.lerp(targetPos.current, delta * 5);
    flightRef.current.scale.lerp(
      new THREE.Vector3(0.02, 0.02, 0.02),
      delta * 5
    );

    if (
      flightRef.current.position.distanceTo(targetPos.current) < 0.2 ||
      progress.current > 1.5
    ) {
      onComplete();
    }
  });

  return (
    <group ref={flightRef} position={startWorldPos}>
      <Plant type={type} plantRef={plantRef} />
    </group>
  );
}
