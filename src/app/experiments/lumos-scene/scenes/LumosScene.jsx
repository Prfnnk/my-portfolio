'use client';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from '@react-three/postprocessing';
import Room from './components/Room';
import Desk from './components/Desk';
import Wand from './components/Wand';
// import Candle from './components/Candle';
// import DustParticles from './components/DustParticles';

export default function LumosScene() {
  const target = new THREE.Vector3();
  const [rotateX, setRotateX] = useState(0);

  const ambientRef = useRef();
  const tipRef = useRef();
  const pointLightRef = useRef();
  const wandGroupRef = useRef();

  // Reusable vectors for wand positioning
  const fwd = useRef(new THREE.Vector3());
  const rgt = useRef(new THREE.Vector3());
  const upv = useRef(new THREE.Vector3());
  const wandPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    // state.pointer contains normalized mouse coords (-1 to +1)
    // We adjust the X and Y coordinates with an offset (e.g., 2) to control the range of motion
    target.x = state.pointer.x * 2;
    // target.y = state.pointer.y * 2;
    target.z = 0;

    // Smoothly interpolate the camera's lookAt target
    state.camera.lookAt(target);

    // Position wand to follow pointer in world space
    if (wandGroupRef.current) {
      const x = state.pointer.x; // range
      const y = state.pointer.y; // Y от указателя
      setRotateX(x);
      const clampedY = Math.max(y, 0.2); // не ниже стола (1.0)
      wandGroupRef.current.position.x = x;
      console.log(x);

      // Get camera-aligned axes
      // fwd.current.set(0, 0, -1).applyQuaternion(state.camera.quaternion);
      // rgt.current.set(1, 0, 0).applyQuaternion(state.camera.quaternion);
      // upv.current.set(0, 1, 0).applyQuaternion(state.camera.quaternion);
      // // Map pointer (-1..1) to world offsets relative to camera view
      // const px = state.pointer.x * 1.8;
      // const py = state.pointer.y * 1.2 - 0.4;
      // // Position wand: 3 units in front of camera + pointer offset
      // wandPos.current
      //   .copy(state.camera.position)
      //   .addScaledVector(fwd.current, 1)
      //   .addScaledVector(rgt.current, px)
      //   .addScaledVector(upv.current, py);
      // wandGroupRef.current.position.copy(wandPos.current);
      // wandGroupRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <>
      <OrbitControls />
      <Room />
      <Desk />

      {/* Wand + PointLight — follows pointer */}
      <group ref={wandGroupRef}>
        <Wand tipRef={tipRef} rotation={[-1, 0, -rotateX]} />
        {/* <pointLight
          ref={pointLightRef}
          position={[0, 2, 0]}
          intensity={isLumosActive ? 100 : 10}
          distance={10}
          decay={2}
          color="#ffdd44"
          shadow-mapSize={[256, 256]}
        /> */}
      </group>
    </>
  );
}
