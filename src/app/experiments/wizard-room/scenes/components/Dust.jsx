import { useRef, useMemo } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import dustVertexShader from '../../assets/shaders/dust/vertex.glsl';
import dustFragmentShader from '../../assets/shaders/dust/fragment.glsl';

const DustMaterial = shaderMaterial(
  { uTime: 0, uSize: 60.0, uPixelRatio: 2.0 },
  dustVertexShader,
  dustFragmentShader
);

extend({ DustMaterial });

export default function DustParticles() {
  const materialRef = useRef();
  const { viewport } = useThree();
  const dpr = Math.min(viewport.dpr || 2, 2); // Cap at 2 for performance

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  const count = 60;

  const [particlesPosition, particlesScale] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 2;
      let y = (Math.random() - 0.5) * 2;
      let z = (Math.random() - 0.5) * 2;

      positions.set([x, y, z], i * 3);
      scales[i] = Math.random();
    }

    return [positions, scales];
  }, [count]);

  return (
    <points position={[0, 2, 0]} scale={1.8}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={particlesScale.length}
          array={particlesScale}
          itemSize={1}
        />
      </bufferGeometry>
      <dustMaterial
        ref={materialRef}
        uPixelRatio={dpr}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
