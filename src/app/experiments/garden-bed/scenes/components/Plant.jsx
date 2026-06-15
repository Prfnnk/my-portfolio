export default function Plant({ type, color }) {
  const renderPlant = (type) => {
    switch (type) {
      case 'carrot':
        return (
          <group position={[0, -0.7, 0]}>
            {/* Carrot Body (Orange Cone) */}
            <mesh position={[0, 0, 0]} rotation-x={-Math.PI} castShadow>
              <coneGeometry args={[0.4, 2, 16]} />
              <meshToonMaterial color="#ff6600" />
            </mesh>

            {/* Carrot Top / Leaves (Green Cylinders) */}
            <mesh
              castShadow
              position={[0.3, 1.3, 0]}
              rotation={[0, 0, -0.5]}
              scale={[2, 5, 1]}
            >
              <sphereGeometry args={[0.08, 1, 8]} />
              <meshToonMaterial color="#228B22" />
            </mesh>
            <mesh
              castShadow
              position={[-0.3, 1.22, 0]}
              rotation={[0, 0, 0.5]}
              scale={[2, 5, 1]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#008000" />
            </mesh>
            <mesh
              castShadow
              position={[0, 1.2, -0.2]}
              rotation={[-0.5, 0, 0]}
              scale={[2, 5, 1]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#2e8b57" />
            </mesh>
            <mesh
              castShadow
              position={[0, 1.2, 0.2]}
              rotation={[0.2, 0, -0.7]}
              scale={[2, 3, 1]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#2e8b57" />
            </mesh>
          </group>
        );
      case 'radish':
        return (
          <group position={[0, -0.1, 0]}>
            {/* Radish Body */}
            <mesh position={[0, 0, 0]} scale={[0.8, 0.9, 0.8]} castShadow>
              <sphereGeometry args={[0.5, 32, 16]} />
              <meshToonMaterial color="#cf2f85" />
            </mesh>
            <mesh castShadow position={[0, -0.5, 0]} rotation-x={-Math.PI}>
              <coneGeometry args={[0.1, 0.5, 16]} />
              <meshToonMaterial color="pink" />
            </mesh>

            {/* Radish Top / Leaves (Green Cylinders) */}
            <mesh
              castShadow
              position={[-0.2, 0.8, 0]}
              rotation={[0, 0, 0.5]}
              scale={[0.7, 2.5, 0.7]}
            >
              <coneGeometry args={[0.08, 0.5, 8]} />
              <meshToonMaterial color="#228B22" />
            </mesh>
            <mesh
              castShadow
              position={[-0.45, 1.22, 0]}
              rotation={[0, 0, 0.5]}
              scale={[2, 5, 0.5]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#008000" />
            </mesh>
            <mesh
              castShadow
              position={[0, 0.7, 0]}
              rotation={[-0.2, 0, 0]}
              scale={[0.7, 2, 0.7]}
            >
              <coneGeometry args={[0.08, 0.5, 8]} />
              <meshToonMaterial color="#2e8b57" />
            </mesh>
            <mesh
              castShadow
              position={[0, 1.2, -0.1]}
              rotation={[-0.2, 0, 0]}
              scale={[2, 5, 0.5]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#2e8b57" />
            </mesh>
          </group>
        );
      case 'beet':
        return (
          <group position={[0, 0, 0]}>
            {/* Beet Body */}
            <mesh position={[0, 0, 0]} scale={[1.1, 0.8, 1.1]} castShadow>
              <sphereGeometry args={[0.5, 32, 16]} />
              <meshToonMaterial color="#990359" />
            </mesh>
            <mesh
              castShadow
              position={[0, -0.48, 0]}
              rotation-x={-Math.PI}
              scale={[0.8, 0.4, 0.8]}
            >
              <coneGeometry args={[0.1, 0.5, 16]} />
              <meshToonMaterial color="#990359" />
            </mesh>

            {/* Beet Top / Leaves (Green Cylinders) */}
            <mesh
              castShadow
              position={[-0.2, 0.8, 0]}
              rotation={[0, 0, 0.5]}
              scale={[0.7, 2.5, 0.7]}
            >
              <coneGeometry args={[0.08, 0.5, 8]} />
              <meshToonMaterial color="#76094a" />
            </mesh>
            <mesh
              castShadow
              position={[-0.4, 1.1, 0]}
              rotation={[0, 0, 0.5]}
              scale={[3, 7, 0.1]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#008000" />
            </mesh>
            <mesh
              castShadow
              position={[0, 0.7, 0]}
              rotation={[-0.2, 0, 0]}
              scale={[0.7, 2, 0.7]}
            >
              <coneGeometry args={[0.08, 0.5, 8]} />
              <meshToonMaterial color="#76094a" />
            </mesh>
            <mesh
              castShadow
              position={[0, 1.2, -0.1]}
              rotation={[-0.2, 0, 0]}
              scale={[3, 7, 0.1]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color="#2e8b57" />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };
  return <>{renderPlant(type)}</>;
}
