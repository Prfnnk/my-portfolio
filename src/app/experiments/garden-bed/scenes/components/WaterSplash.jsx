import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

export default function WaterSplash({ position, onComplete }) {
  const groupRef = useRef();
  const particlesRef = useRef([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Create water particles
    const particleCount = 15;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      // Random direction with upward bias
      const angle =
        (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
      const velocity = {
        x: Math.cos(angle) * (2 + Math.random() * 2),
        y: 3 + Math.random() * 2, // Upward velocity
        z: Math.sin(angle) * (2 + Math.random() * 2),
      };

      const particle = {
        position: { x: position[0], y: position[1], z: position[2] },
        velocity,
        life: 1, // 0 to 1, where 1 is fully alive
        maxLife: 1,
        mesh: null,
      };

      particles.push(particle);
    }

    particlesRef.current = particles;

    // Create mesh for each particle
    if (groupRef.current) {
      particles.forEach((particle) => {
        const geometry = new THREE.SphereGeometry(0.08, 8, 8);
        const material = new THREE.MeshToonMaterial({
          color: '#4da6ff', // Blue water color
          opacity: 1,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          particle.position.x,
          particle.position.y,
          particle.position.z
        );
        mesh.castShadow = true;
        groupRef.current.add(mesh);
        particle.mesh = mesh;
      });
    }
  }, [position]);

  useFrame((state, delta) => {
    if (!isActive) return;

    let allDead = true;

    particlesRef.current.forEach((particle) => {
      if (particle.life > 0) {
        allDead = false;

        // Apply physics
        particle.velocity.y -= 9.8 * delta; // Gravity
        particle.position.x += particle.velocity.x * delta;
        particle.position.y += particle.velocity.y * delta;
        particle.position.z += particle.velocity.z * delta;

        // Stop at ground level
        if (particle.position.y < 0.02) {
          particle.position.y = 0.02;
          particle.velocity.y = 0;
          particle.velocity.x *= 0.7; // Friction
          particle.velocity.z *= 0.7;
        }

        // Decrease life
        particle.life -= delta * 1.5; // Fade out over time

        // Update mesh
        if (particle.mesh) {
          particle.mesh.position.set(
            particle.position.x,
            particle.position.y,
            particle.position.z
          );
          particle.mesh.material.opacity = particle.life;
          particle.mesh.scale.set(
            1 - (1 - particle.life) * 0.5,
            1 - (1 - particle.life) * 0.5,
            1 - (1 - particle.life) * 0.5
          );
        }
      }
    });

    // Clean up when all particles are dead
    if (allDead) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
  });

  return <group ref={groupRef} />;
}
