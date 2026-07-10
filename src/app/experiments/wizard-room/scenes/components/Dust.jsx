import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GlobalDustMaterial = shaderMaterial(
  { uTime: 0, uSize: 5.0 },
  // ВЕРТЕКСНЫЙ ШЕЙДЕР
  `
  uniform float uTime;
  uniform float uSize;
  
  attribute float aSpeed;
  attribute float aScale;

  void main() {
  vec3 mPos = position;
  
  mPos.y -= uTime * aSpeed * 0.05;
  mPos.x += sin(uTime * aSpeed * 0.5 + mPos.y) * 0.2;
  mPos.z += cos(uTime * aSpeed * 0.5 + mPos.x) * 0.2;
  
  mPos.y = mod(mPos.y, 6.0);

  vec4 modelPosition = modelMatrix * vec4(mPos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  // ТЕПЕРЬ ЭТО ЧЕСТНЫЕ ПИКСЕЛИ. 
  // uSize будет отвечать за размер в пикселях экрана!
  gl_PointSize = uSize * aScale; 
}
  `,
  // ФРАГМЕНТНЫЙ ШЕЙДЕР
  `
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if(dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist);

    // Слегка уменьшим общую яркость (0.15), так как пыли теперь много, 
    // чтобы она не перебивала фокус с шара
    gl_FragColor = vec4(0.9, 0.95, 1.0, alpha * 0.15);
  }
  `
);

extend({ GlobalDustMaterial });

export default function DustParticles({ count = 30 }) {
  // Увеличили базовое число частиц
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  const [positions, speeds, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const scl = new Float32Array(count);

    // Размеры воображаемой коробки комнаты
    const roomWidth = 2;
    const roomHeight = 2;
    const roomDepth = 2;

    for (let i = 0; i < count; i++) {
      // Распределяем по всему объему комнаты
      pos[i * 3 + 0] = (Math.random() - 0.5) * roomWidth; // X: от -7 до 7
      pos[i * 3 + 1] = Math.random() * roomHeight; // Y: от 0 до 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * roomDepth; // Z: от -7 до 7

      spd[i] = 0.1 + Math.random() * 0.4; // Делаем падение еще более меланхоличным
      scl[i] = 0.2 + Math.random() * 0.8;
    }

    return [pos, spd, scl];
  }, [count]);

  return (
    // УБРАЛИ position и rotation! Теперь система координат совпадает с центром сцены
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>

      {/* <meshBasicMaterial color={'white'} depthWrite={false} /> */}

      <globalDustMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
