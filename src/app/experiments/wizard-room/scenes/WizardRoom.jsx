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
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import wizardRoomModel from '../assets/model/wizard-room-full.glb';
import roomTexture from '../assets/model/baked-big-things.jpg';
import shelvesTexture from '../assets/model/baked-shelves.jpg';
import booksTexture from '../assets/model/baked-bookshelf.jpg';
import tableTexture from '../assets/model/baked-table-things-2k.jpg';

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

  return (
    <>
      <color args={['#170628']} attach="background" />
      <OrbitControls />

      <Center>
        <group>
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
            <mesh
              geometry={nodes.CrystalBall.geometry}
              position={nodes.CrystalBall.position}
              rotation={nodes.CrystalBall.rotation}
            >
              <meshBasicMaterial color="#8838BAFF" />
            </mesh>
          )}
        </group>
      </Center>
    </>
  );
}
