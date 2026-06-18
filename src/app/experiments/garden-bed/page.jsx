'use client';
import { Canvas } from '@react-three/fiber';
import './garden-bed-page.scss';
import GardenBed from './scenes/GardenBed.jsx';
import Interface from './scenes/components/Interface.jsx';

export default function GardenBedPage() {
  return (
    <div className="garden-bed-page">
      <Canvas shadows camera={{ position: [0, 13, 10], fov: 45 }}>
        <ambientLight intensity={3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={25}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0001}
        />
        <GardenBed />
        {/* <axesHelper args={[5]} /> */}
      </Canvas>
      {/* interface */}
      <Interface />
    </div>
  );
}
