import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import Plant from './Plant.jsx';
import WaterSplash from './WaterSplash.jsx';

export default function Cell({
  row,
  col,
  selectedPlant,
  action,
  setHarvestedCounts,
  basketPosition,
}) {
  const positionX = col * 2 - 2;
  const positionZ = row * 2 - 2;
  const circleRef = useRef();
  const seedRef = useRef();
  const plantRef = useRef();

  const [hovered, set] = useState();
  useCursor(hovered);

  const [waterSplashes, setWaterSplashes] = useState([]);
  const [isHarvested, setIsHarvested] = useState(false);

  const [cellData, setCellData] = useState({
    state: 'empty', // 'empty', 'planted', 'growing', 'ready'
    plantType: null, // e.g., 'carrot', 'radish', 'beet'
    seedColor: 'green', // default seed color
  });

  useFrame((state, delta) => {
    // const a = clock.elapsedTime;
    if (cellData.state === 'planted' && seedRef.current) {
      // Accelerates as it falls
      seedRef.current.position.y -= 5 * delta * 1.5;

      // Stop in the hole
      if (seedRef.current.position.y < 0.02) {
        seedRef.current.position.y = 0.02;
      }
    }
    if (cellData.state === 'growing') {
      const wobble = Math.sin(Date.now() * 0.01) * 0.02;
      plantRef.current.scale.x += 0.005;
      plantRef.current.scale.y += 0.005 + wobble;
      plantRef.current.scale.z += 0.005;

      if (plantRef.current.scale.x >= 1) {
        plantRef.current.scale.set(1, 1, 1);
        setCellData((prev) => ({ ...prev, state: 'ready' }));
      }
    }

    if (isHarvested && plantRef.current && basketPosition) {
      // After animation
      setCellData((prev) => ({ ...prev, state: 'empty' }));
      setIsHarvested(false);
      // Rotate the plant
      // plantRef.current.rotation.x += delta * 3;
      // plantRef.current.rotation.y += delta * 2;
      // plantRef.current.rotation.z += delta * 1.5;

      // // Convert basketPosition to local coordinates relative to this cell
      // const targetPos = new THREE.Vector3(
      //   basketPosition[0] - positionX,
      //   basketPosition[1] + 0.14,
      //   basketPosition[2] - positionZ
      // );

      // // Move towards basket position
      // plantRef.current.position.lerp(targetPos, delta * 0.8);

      // // Stop animation when close enough
      // const distance = plantRef.current.position.distanceTo(targetPos);
      // if (distance < 0.2) {
      //   setIsHarvested(false);
      //   setCellData((prev) => ({ ...prev, state: 'empty' }));
      // }
    }

    // if (cellData.state === 'ready' && action === 'harvest') {}
  });

  const handleClick = (event) => {
    if (action === 'plant' && cellData.state === 'empty') {
      setCellData({
        state: 'planted',
        plantType: selectedPlant.id,
        seedColor: selectedPlant.color,
      });
    } else if (action === 'water' && cellData.state === 'planted') {
      // Create water splash at click position (convert world to local coords)
      const splashId = Date.now();
      const clickPos = event.point;
      setWaterSplashes((prev) => [
        ...prev,
        {
          id: splashId,
          position: [
            clickPos.x - positionX,
            clickPos.y + 0.14, // Offset by the group's Y position
            clickPos.z - positionZ,
          ],
        },
      ]);

      setCellData((prev) => ({ ...prev, state: 'growing' }));
    } else if (action === 'harvest' && cellData.state === 'ready') {
      // setCellData((prev) => ({ ...prev, state: 'empty' }));
      setHarvestedCounts((prev) => ({
        ...prev,
        [cellData.plantType]: prev[cellData.plantType] + 1,
      }));
      setIsHarvested(true);
    }
  };

  return (
    <group position={[positionX, -0.14, positionZ]}>
      <mesh
        position={[0, 0.01, 0]}
        scale={0.4}
        rotation-x={-Math.PI / 2}
        ref={circleRef}
        receiveShadow
      >
        <circleGeometry args={[]} />
        <meshToonMaterial color="#3c311d" />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        scale={2}
        rotation-x={-Math.PI / 2}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={handleClick}
        receiveShadow
      >
        <planeGeometry args={[]} />
        <meshToonMaterial
          color={
            cellData.state === 'growing' || cellData.state === 'ready'
              ? '#69542f'
              : '#ca945b'
          }
        />
      </mesh>

      {/* Seed */}
      {cellData.state === 'planted' && (
        <mesh ref={seedRef} position={[0, 2, 0]} scale={0.1} castShadow>
          <sphereGeometry args={[]} />
          <meshToonMaterial color={cellData.seedColor} />
        </mesh>
      )}

      {/* Plant */}
      {(cellData.state === 'growing' || cellData.state === 'ready') && (
        <Plant type={cellData.plantType} plantRef={plantRef} />
      )}

      {/* Water Splashes */}
      {waterSplashes.map((splash) => (
        <WaterSplash
          key={splash.id}
          position={splash.position}
          onComplete={() => {
            setWaterSplashes((prev) => prev.filter((s) => s.id !== splash.id));
          }}
        />
      ))}
    </group>
  );
}
