'use client';
import { RoundedBox, Text } from '@react-three/drei';

export default function Book({ position, rotation, scale, color }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Book cover */}
      <RoundedBox args={[0.5, 0.08, 0.35]} radius={0.02}>
        <meshStandardMaterial color={color} roughness={0.6} />
      </RoundedBox>

      {/* Spine */}
      {/* <mesh position={[-0.25, 0, 0]} rotation-y={-0.1}>
        <boxGeometry args={[0.02, 0.09, 0.36]} />
        <meshStandardMaterial color="#5c0000" roughness={0.7} />
      </mesh> */}

      {/* Title text on cover */}
      {/* <Text
        position={[0.02, 0.05, 0.18]}
        fontSize={0.05}
        color="#ffd700"
        fontWeight="bold"
      >
        Lumos
      </Text> */}

      {/* Pages (side edge) */}
      {/* <mesh position={[0.08, 0, 0]} rotation-y={0.3}>
        <boxGeometry args={[0.35, 0.06, 0.32]} />
        <meshStandardMaterial color="#f5f0e0" roughness={0.9} />
      </mesh> */}
    </group>
  );
}
