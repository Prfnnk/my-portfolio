'use client';
import * as THREE from 'three';

export default function Room() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[14, 8, 14]} />
      <meshStandardMaterial
        color="#1a1a2e"
        side={THREE.BackSide}
        roughness={0.9}
      />
    </mesh>
  );
}
