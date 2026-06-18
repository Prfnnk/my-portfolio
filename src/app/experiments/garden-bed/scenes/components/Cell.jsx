import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { useRef, useState } from 'react';
import Plant from './Plant.jsx';
import WaterSplash from './WaterSplash.jsx';
import HarvestFlight from './HarvestFlight.jsx';
import { useInterface } from '../../store/useInterface.js';

export default function Cell({ row, col }) {
  const positionX = col * 2 - 2;
  const positionZ = row * 2 - 2;
  const seedRef = useRef();
  const plantRef = useRef();
  const { selectedPlant, action, basketPosition, incrementHarvest } =
    useInterface();

  const [hovered, set] = useState();
  useCursor(hovered);

  const [waterSplashes, setWaterSplashes] = useState([]);
  const [activeFlight, setActiveFlight] = useState(null);

  const [cellData, setCellData] = useState({
    state: 'empty', // 'empty', 'planted', 'growing', 'ready'
    plantType: null, // e.g., 'carrot', 'radish', 'beet'
    seedColor: 'green', // default seed color
  });

  useFrame((state, delta) => {
    if (cellData.state === 'planted' && seedRef.current) {
      // Accelerates as it falls
      seedRef.current.position.y -= 5 * delta * 1.5;

      // Stop in the hole
      if (seedRef.current.position.y < 0.02) {
        seedRef.current.position.y = 0.02;
      }
    }
    if (cellData.state === 'growing') {
      const wobble = Math.sin(Date.now() * 0.01) * 0.02;
      plantRef.current.scale.x += 0.005;
      plantRef.current.scale.y += 0.005 + wobble;
      plantRef.current.scale.z += 0.005;

      if (plantRef.current.scale.x >= 1) {
        plantRef.current.scale.set(1, 1, 1);
        setCellData((prev) => ({ ...prev, state: 'ready' }));
      }
    }
  });

  const handleClick = (event) => {
    if (action === 'plant' && cellData.state === 'empty') {
      setCellData({
        state: 'planted',
        plantType: selectedPlant.id,
        seedColor: selectedPlant.color,
      });
    } else if (action === 'water' && cellData.state === 'planted') {
      // Create water splash at click position (convert world to local coords)
      const splashId = Date.now();
      const clickPos = event.point;
      setWaterSplashes((prev) => [
        ...prev,
        {
          id: splashId,
          position: [
            clickPos.x - positionX,
            clickPos.y + 0.14, // Offset by the group's Y position
            clickPos.z - positionZ,
          ],
        },
      ]);

      setCellData((prev) => ({ ...prev, state: 'growing' }));
    } else if (action === 'harvest' && cellData.state === 'ready') {
      incrementHarvest(cellData.plantType);

      // Trigger flying animation
      setActiveFlight(cellData.plantType);
      // Reset the cell
      setCellData({ state: 'empty', plantType: null, seedColor: 'green' });
    }
  };

  return (
    <group position={[positionX, -0.14, positionZ]}>
      <mesh
        position={[0, 0.01, 0]}
        scale={0.4}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <circleGeometry />
        <meshToonMaterial color="#3c311d" />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        scale={2}
        rotation-x={-Math.PI / 2}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={handleClick}
        receiveShadow
      >
        <planeGeometry />
        <meshToonMaterial
          color={
            cellData.state === 'growing' || cellData.state === 'ready'
              ? '#69542f'
              : '#ca945b'
          }
        />
      </mesh>

      {/* Seed */}
      {cellData.state === 'planted' && (
        <mesh ref={seedRef} position={[0, 2, 0]} scale={0.1} castShadow>
          <sphereGeometry />
          <meshToonMaterial color={cellData.seedColor} />
        </mesh>
      )}

      {/* Plant */}
      {(cellData.state === 'growing' || cellData.state === 'ready') && (
        <Plant type={cellData.plantType} plantRef={plantRef} />
      )}

      {activeFlight && (
        <HarvestFlight
          type={activeFlight}
          startWorldPos={[0, 0, 0]}
          onComplete={() => setActiveFlight(null)}
          plantRef={plantRef}
          basketPosition={basketPosition}
        />
      )}

      {/* Water Splashes */}
      {waterSplashes.map((splash) => (
        <WaterSplash
          key={splash.id}
          position={splash.position}
          onComplete={() => {
            setWaterSplashes((prev) => prev.filter((s) => s.id !== splash.id));
          }}
        />
      ))}
    </group>
  );
}
