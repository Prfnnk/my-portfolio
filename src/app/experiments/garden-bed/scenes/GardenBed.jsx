import { useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Cell from './components/Cell.jsx';

// Garden bed frame elements config
const FRAME_ELEMENTS = [
  { pos: [-3, 0, -3], size: [0.7, 2, 0.7], shadow: true, color: '#a16740' },
  { pos: [-3, -0.5, 0], size: [0.2, 1, 8], shadow: true, color: '#5e3930' },
  { pos: [-3, 0, 3], size: [0.7, 2, 0.7], shadow: true, color: '#a16740' },
  { pos: [0, -0.5, 3], size: [8, 1, 0.2], shadow: true, color: '#5e3930' },
  { pos: [3, 0, 3], size: [0.7, 2, 0.7], shadow: true, color: '#a16740' },
  { pos: [3, -0.5, 0], size: [0.2, 1, 8], shadow: true, color: '#5e3930' },
  { pos: [3, 0, -3], size: [0.7, 2, 0.7], shadow: true, color: '#a16740' },
  { pos: [0, -0.5, -3], size: [8, 1, 0.2], shadow: true, color: '#5e3930' },
];

export default function GardenBed({
  selectedPlant,
  action,
  setHarvestedCounts,
  basketPosition,
}) {
  return (
    <>
      {/* <OrbitControls /> */}

      {/* Bed Frame and soil */}
      <group>
        {FRAME_ELEMENTS.map((el, idx) => (
          <mesh
            key={idx}
            position={el.pos}
            scale={el.size}
            castShadow={el.shadow}
          >
            <boxGeometry />
            <meshToonMaterial color={el.color} />
          </mesh>
        ))}

        {/* Soil */}
        <mesh position={[0, -0.5, 0]} scale={[6, 0.7, 6]}>
          <boxGeometry />
          <meshToonMaterial color="#ca945b" />
        </mesh>

        {/* Cells */}
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <Cell
              key={`${row}-${col}`}
              row={row}
              col={col}
              selectedPlant={selectedPlant}
              action={action}
              setHarvestedCounts={setHarvestedCounts}
              basketPosition={basketPosition}
            />
          ))
        )}
      </group>

      {/* Ground Plane */}
      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={40} receiveShadow>
        <planeGeometry />
        <meshToonMaterial color="#a2c15b" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
