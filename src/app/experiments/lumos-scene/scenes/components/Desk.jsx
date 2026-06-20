'use client';
import Potion from './Potion';
import Book from './Book';

const LEG_POSITIONS = [
  [-1.3, 0, -0.6],
  [1.3, 0, -0.6],
  [-1.3, 0, 0.6],
  [1.3, 0, 0.6],
];

const BOOKS_PILE_SMALL = [
  {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    color: '#f2ac53',
  },
  {
    position: [0, 0.1, 0],
    scale: [1, 1.5, 1],
    rotation: [0, 0.3, 0],
    color: '#ea7c28',
  },
  {
    position: [0, 0.21, 0],
    scale: [1, 1.2, 1],
    rotation: [0, -0.1, 0],
    color: '#c81e20',
  },
  {
    position: [0, 0.29, 0],
    scale: [1, 0.8, 1],
    rotation: [0, 0.2, 0],
    color: '#8561d8',
  },
];
const BOOKS_PILE_BIG = [
  {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    color: '#f2ac53',
  },
  {
    position: [0, 0.1, 0],
    scale: [1, 1.5, 1],
    rotation: [0, 0.3, 0],
    color: '#ea7c28',
  },
  {
    position: [0, 0.21, 0],
    scale: [1, 1.2, 1],
    rotation: [0, -0.1, 0],
    color: '#c81e20',
  },
  {
    position: [0, 0.29, 0],
    scale: [1, 0.8, 1],
    rotation: [0, 0.2, 0],
    color: '#8561d8',
  },
  {
    position: [0, 0.36, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    color: '#f2ac53',
  },
  {
    position: [0, 0.46, 0],
    scale: [1, 1.5, 1],
    rotation: [0, 0.3, 0],
    color: '#ea7c28',
  },
  {
    position: [0, 0.57, 0],
    scale: [1, 1.2, 1],
    rotation: [0, -0.1, 0],
    color: '#c81e20',
  },
  {
    position: [0, 0.65, 0],
    scale: [1, 0.8, 1],
    rotation: [0, 0.2, 0],
    color: '#8561d8',
  },
];

export default function Desk() {
  return (
    <group position={[0, 0, 3]}>
      {/* Desk surface */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3, 0.12, 1.5]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.85} />
      </mesh>

      {/* Desk items */}
      <group>
        <Potion
          position={[-0.95, 0.12, -0.3]}
          scale={0.4}
          rotation={[0.1, 0, 0.15]}
          liquidColor="#1641c5"
        />
        <Potion
          position={[-1.2, 0.18, -0.2]}
          scale={0.8}
          rotation={[-0.2, 0, -0.3]}
          liquidColor="#1a9471"
        />
        <Potion position={[-1.1, 0.2, -0.5]} rotation={[-0.1, 0, 0.1]} />
      </group>

      <group position={[1.1, 0.1, 0.1]}>
        {BOOKS_PILE_SMALL.map((book, i) => (
          <Book
            key={i}
            position={book.position}
            scale={book.scale}
            rotation={book.rotation}
            color={book.color}
          />
        ))}
      </group>

      <group position={[1.1, 0.1, -0.4]} rotation-y={-0.6}>
        {BOOKS_PILE_BIG.map((book, i) => (
          <Book
            key={i}
            position={book.position}
            scale={book.scale}
            rotation={book.rotation}
            color={book.color}
          />
        ))}
      </group>

      {/* Table legs */}
      {LEG_POSITIONS.map((pos, i) => (
        <mesh key={i} position={[pos[0], -0.5, pos[2]]} castShadow>
          <cylinderGeometry args={[0.05, 0.065, 0.88]} />
          <meshStandardMaterial color="#3d2415" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
