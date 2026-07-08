'use client';
import {
  useGLTF,
  OrbitControls,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import portalModel from '../assets/model/portal.glb';
import baked from '../assets/model/baked.jpg';
import portalVertexShader from '../assets/shaders/portal/vertex.glsl';
import portalFragmentShader from '../assets/shaders/portal/fragment.glsl';
import perlinNoise from '../assets/shaders/utils/perlinNoise.glsl';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#c775c7'),
    uColorEnd: new THREE.Color('#cfb3ea'),
  },
  portalVertexShader,
  perlinNoise + portalFragmentShader
);

extend({ PortalMaterial });

export default function Portal() {
  const { nodes } = useGLTF(portalModel);
  const bakedTexture = useTexture(baked.src);
  const portalMaterial = useRef();

  useFrame((state, delta) => {
    if (portalMaterial.current) {
      portalMaterial.current.uTime += delta;
    }
  });

  bakedTexture.flipY = false;

  return (
    <>
      <color args={['#170628']} attach="background" />
      <OrbitControls />

      <Center>
        <group rotation-y={Math.PI * 0.4}>
          {/* Main scene */}
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>

          {/* Emissive */}
          <mesh
            geometry={nodes.PoleLightLeft.geometry}
            position={nodes.PoleLightLeft.position}
            rotation={nodes.PoleLightLeft.rotation}
          >
            <meshBasicMaterial color="#FF5F3DFF" />
          </mesh>
          <mesh
            geometry={nodes.PoleLightRight.geometry}
            position={nodes.PoleLightRight.position}
            rotation={nodes.PoleLightRight.rotation}
          >
            <meshBasicMaterial color="#FF5F3DFF" />
          </mesh>

          <mesh
            geometry={nodes.PortalLight.geometry}
            position={nodes.PortalLight.position}
            rotation={nodes.PortalLight.rotation}
          >
            <portalMaterial ref={portalMaterial} />
          </mesh>
        </group>

        {/* Fireflies */}
        <Sparkles
          size={6}
          scale={[3, 2, 3]}
          position-y={1}
          speed={0.3}
          count={30}
        />
      </Center>
    </>
  );
}
