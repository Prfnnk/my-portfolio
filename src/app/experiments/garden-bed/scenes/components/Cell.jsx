import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import Plant from './Plant.jsx';

export default function Cell({
  row,
  col,
  selectedPlant,
  action,
  setHarvestedCounts,
}) {
  const positionX = col * 2 - 2;
  const positionZ = row * 2 - 2;
  const circleRef = useRef();
  const seedRef = useRef();
  // const plantRef = useRef();

  const [hovered, set] = useState();
  useCursor(hovered);

  const [cellData, setCellData] = useState({
    state: 'empty', // 'empty', 'planted', 'growing', 'ready'
    plantType: null, // e.g., 'carrot', 'radish', 'beet'
    seedColor: 'green', // default seed color
  });

  useFrame((state, delta) => {
    if (cellData.state === 'planted') {
      // seedRef.current.position.y += delta;
    }
    if (cellData.state === 'growing') {
      // After animation

      setCellData((prev) => ({ ...prev, state: 'ready' }));
    }
  });

  const handleClick = () => {
    if (action === 'plant' && cellData.state === 'empty') {
      setCellData({
        state: 'planted',
        plantType: selectedPlant.id,
        seedColor: selectedPlant.color,
      });
      console.log(`Planted a ${selectedPlant.name} at (${row}, ${col})`);
    } else if (action === 'water' && cellData.state === 'planted') {
      setCellData((prev) => ({ ...prev, state: 'growing' }));
      console.log(`Watered the plant at (${row}, ${col})`);
    } else if (action === 'harvest' && cellData.state === 'ready') {
      setCellData((prev) => ({ ...prev, state: 'empty' }));
      setHarvestedCounts((prev) => ({
        ...prev,
        [cellData.plantType]: prev[cellData.plantType] + 1,
      }));
      console.log(
        `Harvested the plant ${cellData.plantType} at (${row}, ${col})`
      );
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
        <mesh ref={seedRef} position={[0, 0.02, 0]} scale={0.1} castShadow>
          <sphereGeometry args={[]} />
          <meshToonMaterial color={cellData.seedColor} />
        </mesh>
      )}

      {/* Plant */}
      {(cellData.state === 'growing' || cellData.state === 'ready') && (
        <Plant type={cellData.plantType} color={cellData.seedColor} />
      )}
    </group>
  );
}
