// Example scene module for Particle System
// Copy this file and customize for each experiment
//
// File structure should be:
// /src/app/experiments/[projectName]/scenes/ParticleSystem.js
// /src/app/experiments/[projectName]/assets/models/
// /src/app/experiments/[projectName]/assets/textures/
// /src/app/experiments/[projectName]/assets/shaders/

import * as THREE from 'three';

function initScene(canvas) {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xfcf6f5);

  camera.position.z = 5;

  // Add your Three.js objects here
  // Example: Create a simple rotating cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x755139,
    metalness: 0.3,
    roughness: 0.4,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);

  // Animation loop
  let animationFrameId;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Update your scene here
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  // Return object with scene, camera, renderer, and animate function
  return {
    scene,
    camera,
    renderer,
    animate: () => {
      animate();
      return animationFrameId;
    },
  };
}

export default initScene;
