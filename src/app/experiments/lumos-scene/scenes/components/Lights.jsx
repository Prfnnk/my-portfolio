import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Lights() {
  const dirLightRef = useRef();

  useFrame((state) => {
    // dirLightRef.current.position.x = Math.sin(state.clock.getElapsedTime()) * 5;
  });

  return (
    <>
      <ambientLight intensity={1} />
      {/* <directionalLight
        ref={dirLightRef}
        position={[5, 10, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      /> */}
      {/* <pointLight position={[0, 0, 0]} intensity={4} color="#fff" /> */}
    </>
  );
}
