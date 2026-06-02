// Sample 3D experiment data structure
// Replace with your actual experiments

export const experiments = [
  {
    id: 'garden-bed',
    title: 'Veggie Garden',
    description: 'Interactive 3D gardening simulation with plants',
    fullDescription:
      'Plant and harvest vegetables in an interactive 3D garden. Select a seed type, click on garden cells to sow seeds, watch them grow over 5 seconds, then harvest them into your basket. Three different plant types with unique shapes and animations.',
    thumbnail: '/experiments/garden-bed-thumb.png',
    tags: ['Three.js', 'Interactive', 'Animation'],
    link: null,
    sceneModule: 'GardenBed',
  },
  {
    id: 'particle-system',
    title: 'Particle System',
    description: 'Interactive particle system with physics simulation',
    fullDescription:
      'An interactive 3D particle system with physics-based simulation. Features custom forces, collision detection, and real-time performance optimization.',
    thumbnail: '/experiments/particle-system-thumb.png',
    tags: ['Three.js', 'GLSL', 'React'],
    link: null, // external link if applicable
    sceneModule: 'ParticleSystem',
  },
  {
    id: 'procedural-landscape',
    title: 'Procedural Landscape',
    description: 'Infinite terrain generated with noise functions',
    fullDescription:
      'Procedurally generated landscape using Perlin noise. Includes terrain deformation, dynamic LOD, and atmospheric effects for immersive exploration.',
    thumbnail: '/experiments/landscape-thumb.png',
    tags: ['Three.js', 'Noise', 'Shaders'],
    link: null,
    sceneModule: 'ProceduralLandscape',
  },
  {
    id: 'shader-art',
    title: 'Shader Art',
    description: 'Creative shader visualizations and effects',
    fullDescription:
      'Experimental fragment shader art combining mathematical functions with creative color palettes. Interactive controls for real-time manipulation.',
    thumbnail: '/experiments/shader-art-thumb.png',
    tags: ['GLSL', 'Three.js', 'Shaders'],
    link: null,
    sceneModule: 'ShaderArt',
  },
  {
    id: 'morphing-mesh',
    title: 'Morphing Mesh',
    description: 'Smooth mesh deformation with animation',
    fullDescription:
      'Demonstrates smooth morphing between different 3D geometries using vertex shaders and interpolation techniques.',
    thumbnail: '/experiments/morphing-thumb.png',
    tags: ['Three.js', 'Animation', 'Geometry'],
    link: null,
    sceneModule: 'MorphingMesh',
  },
];
