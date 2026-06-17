const Radish = () => {
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
};
export default Radish;
