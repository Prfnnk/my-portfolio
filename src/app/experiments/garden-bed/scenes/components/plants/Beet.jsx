const Beet = () => {
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
};
export default Beet;
