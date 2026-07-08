'use client';
import { Canvas } from '@react-three/fiber';
import './assets/css/portal.scss';
import Portal from './scenes/Portal.jsx';

export default function PortalPage() {
  return (
    <div className="portal-page">
      <Canvas
        flat
        camera={{ position: [1, 2, 6], fov: 45, near: 0.1, far: 200 }}
      >
        {/* <ambientLight intensity={3} /> */}
        <Portal />
        {/* <axesHelper args={[5]} /> */}
      </Canvas>
    </div>
  );
}
