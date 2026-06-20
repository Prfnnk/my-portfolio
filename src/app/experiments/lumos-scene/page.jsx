'use client';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import './lumos-scene-page.scss';
import LumosScene from './scenes/LumosScene';
import LumosUI from './scenes/components/LumosUI';
import Lights from './scenes/components/Lights';
import { Perf } from 'r3f-perf';
import { useLumosStore } from './store/useLumosStore';

export default function LumosScenePage() {
  const canvasRef = useRef();
  const { toggleLumos } = useLumosStore();

  return (
    <div className="lumos-scene-page">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 1, 4.4], fov: 90 }}
        onClick={() => toggleLumos()}
      >
        <Lights />
        <LumosScene />

        <axesHelper args={[10]} />
        <Perf />
      </Canvas>
      <div className="lumos-scene-page__prompt">
        Click anywhere to toggle light with Lumos / Nox and explore the desk
      </div>
      {/* <LumosUI /> */}
    </div>
  );
}
