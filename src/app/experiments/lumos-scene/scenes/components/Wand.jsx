'use client';
import { useLumosStore } from '../../store/useLumosStore';

export default function Wand({ tipRef, rotation }) {
  const { isLumosActive } = useLumosStore();
  return (
    <group position={[0, 0.4, 3.6]} rotation={rotation}>
      {/* Wand handle */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.045, 1.1]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.7} />
      </mesh>

      {/* Wand tip glow sphere */}
      <mesh ref={tipRef} position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color="#ffdd44"
          emissive="#ffdd44"
          emissiveIntensity={0}
        />
      </mesh>
      <pointLight
        position={[0, 2, 0]}
        intensity={isLumosActive ? 80 : 5}
        distance={15}
        decay={1.3}
        color="#ffdd44"
        shadow-mapSize={[256, 256]}
      />
    </group>
  );
}
