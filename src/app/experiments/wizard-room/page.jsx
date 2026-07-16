'use client';
import { Canvas } from '@react-three/fiber';
import './assets/css/wizard-room.scss';
import WizardRoom from './scenes/WizardRoom.jsx';

export default function WizardRoomPage() {
  return (
    <div className="wizard-room-page">
      <Canvas
        flat
        camera={{ position: [0.11, 2.9, 10.1], fov: 45, near: 0.1, far: 200 }}
      >
        <WizardRoom />
        {/* <axesHelper args={[5]} /> */}
      </Canvas>
    </div>
  );
}
