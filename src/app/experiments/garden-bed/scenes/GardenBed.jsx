import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Cell from './components/Cell.jsx';

export default function GardenBed({
  selectedPlant,
  action,
  setHarvestedCounts,
  basketPosition,
}) {
  const cubeRef = useRef();
  const groupRef = useRef();

  // useFrame((state, delta) => {
  //   cubeRef.current.rotation.y += delta;
  //   // groupRef.current.rotation.y += delta;
  // });

  return (
    <>
      <OrbitControls />
      {/* <directionalLight position={[10, 10, 5]} intensity={4.5} />
      <ambientLight intensity={1.5} /> */}

      {/* Bed Frame and soil */}
      <group ref={groupRef}>
        <mesh position={[-3, 0, -3]} scale={[0.7, 2, 0.7]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#a16740" />
        </mesh>
        <mesh position={[-3, -0.5, 0]} scale={[0.2, 1, 8]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#5e3930" />
        </mesh>
        <mesh position={[-3, 0, 3]} scale={[0.7, 2, 0.7]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#a16740" />
        </mesh>
        <mesh position={[0, -0.5, 3]} scale={[8, 1, 0.2]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#5e3930" />
        </mesh>

        <mesh position={[3, 0, 3]} scale={[0.7, 2, 0.7]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#a16740" />
        </mesh>
        <mesh position={[3, -0.5, 0]} scale={[0.2, 1, 8]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#5e3930" />
        </mesh>
        <mesh position={[3, 0, -3]} scale={[0.7, 2, 0.7]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#a16740" />
        </mesh>
        <mesh position={[0, -0.5, -3]} scale={[8, 1, 0.2]} castShadow>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#5e3930" />
        </mesh>

        {/* Soil */}
        <mesh position={[0, -0.5, 0]} scale={[6, 0.7, 6]}>
          <boxGeometry args={[]} />
          <meshToonMaterial color="#ca945b" />
        </mesh>

        {/* Cells */}
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <Cell
              key={`${row}-${col}`}
              row={row}
              col={col}
              selectedPlant={selectedPlant}
              action={action}
              setHarvestedCounts={setHarvestedCounts}
              basketPosition={basketPosition}
            />
          ))
        )}
      </group>

      {/* Ground Plane */}
      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={30} receiveShadow>
        <planeGeometry args={[]} />
        <meshToonMaterial color="#a2c15b" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
