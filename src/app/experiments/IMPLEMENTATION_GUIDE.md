# 3D Experiments - Implementation Guide

## Overview

This guide explains how to add your 3D experiments to the portfolio. Each experiment is a separate route under `/experiments/[projectName]` with its own Three.js scene.

## File Structure

Each experiment should follow this structure:

```
/src/app/experiments/[projectName]/
├── page.jsx                    # Detail page (already created)
├── Scene.jsx                   # Canvas wrapper (already created)
├── experiment-detail.scss      # Styling (already created)
├── scenes/
│   └── ExperimentName.js       # Three.js scene logic (you create this)
└── assets/
    ├── models/                 # GLTF, OBJ files
    │   └── model.glb
    ├── textures/               # PNG, JPG, WebP images
    │   └── texture.png
    └── shaders/                # GLSL shader files
        ├── vertex.glsl
        └── fragment.glsl
```

## Step-by-Step Implementation

### 1. Update Experiments Data

First, add your experiment to `/src/app/data/experiments.js`:

```javascript
{
  id: 'my-particle-system',                    // URL slug
  title: 'My Particle System',
  description: 'Short preview description',
  fullDescription: 'Longer description for detail page',
  thumbnail: '/experiments/my-particle-system-thumb.png',
  tags: ['Three.js', 'GLSL', 'React'],
  link: null,                                   // External URL (optional)
  sceneModule: 'MyParticleSystem',             // Matches scene file name
}
```

**Important:** The `sceneModule` field must match your scene file name (without `.js` extension).

### 2. Create Scene Module

Create a scene file at `/src/app/experiments/[projectName]/scenes/MyParticleSystem.js`:

```javascript
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
  renderer.setClearColor(0xfcf6f5); // Use portfolio color

  camera.position.z = 5;

  // === Add your Three.js objects here ===
  // Example: Create geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x755139, // Portfolio toffee color
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);

  // === Animation loop ===
  let animationFrameId;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Update your scene here
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  // Return object with required properties
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
```

### 3. Load Assets (Models, Textures, Shaders)

#### Loading GLTF Models:

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('./assets/models/model.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

#### Loading Textures:

```javascript
import { TextureLoader } from 'three';

const textureLoader = new TextureLoader();
const texture = textureLoader.load('./assets/textures/texture.png');
const material = new THREE.MeshStandardMaterial({ map: texture });
```

#### Loading Shaders:

```javascript
// Create vertex.glsl and fragment.glsl in assets/shaders/
const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});
```

### 4. Portfolio Color Variables

Use these colors for consistency:

```javascript
// Main colors (from globals.css)
0xf3e9d9; // sweet-corn (background)
0x755139; // toffee
0xa37b73; // burnished-brown
0xfcf6f5; // white (canvas background)
0x343148; // eclipse (text)
```

### 5. Responsive Canvas

The canvas automatically handles:

- ✅ Fullscreen rendering (100vw × 100vh)
- ✅ Window resize listener
- ✅ Device pixel ratio
- ✅ Camera aspect ratio updates

Just make sure your scene module returns the required properties.

## Troubleshooting

### Module Import Fails

- Check `sceneModule` in data matches your scene file name exactly
- File path must be: `/src/app/experiments/[projectName]/scenes/SceneName.js`

### Canvas Doesn't Render

- Ensure `renderer.render(scene, camera)` is called in animation loop
- Check browser console for errors
- Verify Three.js is installed: `npm list three`

### Assets Don't Load

- Use relative paths: `./assets/models/model.glb`
- Ensure files exist in the assets folder
- Check Network tab in DevTools for 404 errors

### Performance Issues

- Dispose of unused geometries/materials: `geometry.dispose()`, `material.dispose()`
- Limit draw calls (use instancing for many objects)
- Optimize textures (compress to WebP, use mipmap levels)

## Example Scenes

Check `/src/app/experiments/[projectName]/scenes/EXAMPLE_ParticleSystem.js` for a basic template.

## Next Steps

1. ✅ Create experiment entry in `experiments.js`
2. ✅ Create scene module at `scenes/SceneName.js`
3. ✅ (Optional) Add assets to `assets/` folders
4. ✅ Test at `/experiments/[projectName]`
5. ✅ Add thumbnail image to `/public/experiments/`

## Questions?

Refer to:

- [Three.js Docs](https://threejs.org/docs/)
- [GLTFLoader Examples](https://threejs.org/examples/?q=gltf)
- Scene.jsx for canvas setup logic
- Detail page styling in `experiment-detail.scss`
