const Carrot = () => {
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
};
export default Carrot;
