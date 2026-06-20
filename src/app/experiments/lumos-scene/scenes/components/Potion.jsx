'use client';
import {
  MeshWobbleMaterial,
  MeshTransmissionMaterial,
} from '@react-three/drei';

export default function Potion({
  position,
  liquidColor = '#8f34ac',
  scale = 1,
  rotation,
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Potion vial */}
      <mesh castShadow scale={0.15}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial
          transparent={true}
          opacity={0.4}
          color="#22cc88"
          metalness={0}
          roughness={0}
          envMapIntensity={0.5}
        />
        {/* <MeshWobbleMaterial
          color="#22cc88"
          emissive="#22cc88"
          emissiveIntensity={0.1}
          transparent
          opacity={0.65}
          factor={0.25}
          speed={2}
          roughness={0.3}
        /> */}
      </mesh>
      <mesh castShadow scale={0.02} position={[0, 0.19, 0]}>
        <cylinderGeometry args={[2, 2, 5, 16]} />
        <meshStandardMaterial
          transparent={true}
          opacity={0.4}
          color="#22cc88"
          metalness={0}
          roughness={0}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Liquid */}
      <mesh castShadow position-y={-0.025} scale={[0.142, 0.11, 0.142]}>
        <sphereGeometry args={[1, 16, 8]} />
        <meshStandardMaterial color={liquidColor} opacity={0.25} />
      </mesh>

      {/* Stopper */}
      <mesh position={[0, 0.25, 0]} scale={0.7}>
        <cylinderGeometry args={[0.06, 0.03, 0.05]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.9} />
      </mesh>
    </group>
  );
}
