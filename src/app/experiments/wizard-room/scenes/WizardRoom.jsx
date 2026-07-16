'use client';
import {
  useGLTF,
  useTexture,
  Center,
  shaderMaterial,
  OrbitControls,
} from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Components
import DustParticles from './components/Dust.jsx';

// Model and textures
import wizardRoomModel from '../assets/model/wizard-room-full.glb';
import roomTexture from '../assets/model/baked-big-things.jpg';
import shelvesTexture from '../assets/model/baked-shelves.jpg';
import booksTexture from '../assets/model/baked-bookshelf.jpg';
import tableTexture from '../assets/model/baked-table-things-2k.jpg';

// Shaders
import crystalBallVertexShader from '../assets/shaders/crystalBall/vertex.glsl';
import crystalBallFragmentShader from '../assets/shaders/crystalBall/fragment.glsl';

import moonlightVertexShader from '../assets/shaders/moonlight/vertex.glsl';
import moonlightFragmentShader from '../assets/shaders/moonlight/fragment.glsl';

import perlinNoise from '../assets/shaders/utils/perlinNoise.glsl';

const CrystalBallMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#e1bef4'),
    uColorEnd: new THREE.Color('#a155ca'),
  },
  crystalBallVertexShader,
  perlinNoise + crystalBallFragmentShader
);
const MoonlightMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  moonlightVertexShader,
  perlinNoise + moonlightFragmentShader
);

extend({ CrystalBallMaterial, MoonlightMaterial });

const ROOM_ELEMENTS = [
  { id: 'room', nodeName: 'AllRoom', textureKey: 'room' },
  { id: 'shelves', nodeName: 'ShelvesThings', textureKey: 'shelves' },
  { id: 'books', nodeName: 'BookshelfThings', textureKey: 'books' },
  { id: 'table', nodeName: 'TableThings', textureKey: 'table' },
];

export default function WizardRoom() {
  const { nodes } = useGLTF(wizardRoomModel);
  const candleLightArr = Object.values(nodes).filter((node) =>
    node.name.includes('CandleLight')
  );
  // Refs
  const crystalBallMaterial = useRef();
  const moonlightMaterial = useRef();

  console.log(nodes, 'nodes');

  // Load textures
  const textures = useTexture({
    room: roomTexture.src,
    shelves: shelvesTexture.src,
    books: booksTexture.src,
    table: tableTexture.src,
  });

  // flipY correction for all
  useMemo(() => {
    Object.values(textures).forEach((texture) => {
      texture.flipY = false;
    });
  }, [textures]);

  // Animation
  useFrame((state, delta) => {
    if (crystalBallMaterial.current) {
      crystalBallMaterial.current.uTime += delta;
    }
    if (moonlightMaterial.current) {
      moonlightMaterial.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <>
      <color args={['#140226']} attach="background" />
      <OrbitControls
        makeDefault
        target={[0.0, -0.73, 0.23]}
        minPolarAngle={0.6}
        maxPolarAngle={1.65}
        minAzimuthAngle={-0.8}
        maxAzimuthAngle={0.7}
        minDistance={3.5}
        maxDistance={10}
        onEnd={(e) => {
          const { position } = e.target.object;
          const { target } = e.target;
          console.log(
            `Camera settings -> position: [${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}], target: [${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(2)}]\n` +
              `Polar angle: ${e.target.getPolarAngle().toFixed(2)} rad, Azimuthal angle: ${e.target.getAzimuthalAngle().toFixed(2)} rad`
          );
        }}
      />

      <Center>
        <group rotation-y={-Math.PI * 0.25} scale={1.1}>
          {/* Room elements */}
          {ROOM_ELEMENTS.map(({ id, nodeName, textureKey }) => {
            const targetNode = nodes[nodeName];

            if (!targetNode) return null;

            return (
              <mesh
                key={id}
                geometry={targetNode.geometry}
                position={targetNode.position}
                rotation={targetNode.rotation}
              >
                <meshBasicMaterial map={textures[textureKey]} />
              </mesh>
            );
          })}

          {/* Emissive elements */}
          {candleLightArr.map((candleNode, index) => (
            <mesh
              key={`candle-${index}`}
              geometry={candleNode.geometry}
              position={candleNode.position}
              rotation={candleNode.rotation}
            >
              <meshBasicMaterial color="#FF8A3BFF" />
            </mesh>
          ))}
          {nodes.CrystalBall && (
            // Recreated the sphere for the right uv coordinates
            <mesh
              position={[
                nodes.CrystalBall.position.x,
                nodes.CrystalBall.position.y + 0.19,
                nodes.CrystalBall.position.z,
              ]}
              rotation={nodes.CrystalBall.rotation}
              scale={0.17}
            >
              <sphereGeometry args={[1, 64, 64]} />
              <crystalBallMaterial ref={crystalBallMaterial} />
            </mesh>
          )}

          {/* Moonlight from the window */}
          <mesh position={[-1, 1.3, -0.4]} rotation={[0, 0, 0.9]}>
            <cylinderGeometry args={[0.4, 0.7, 4.0, 32, 1, true]} />
            {/* <meshBasicMaterial /> */}

            <moonlightMaterial
              ref={moonlightMaterial}
              transparent={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Dust */}
          <DustParticles />
        </group>
      </Center>
    </>
  );
}
