import gardenBedSrc from '@/app/assets/images/experiments/preview/garden-bed.png';
import lumosSceneSrc from '@/app/assets/images/experiments/preview/lumos-scene.png';

export const experiments = [
  {
    id: 'garden-bed',
    title: 'Veggie Garden',
    description: 'Interactive 3D gardening simulation with plants',
    fullDescription:
      'Plant, water and harvest vegetables in an interactive 3D garden. Select a seed type, click on garden cells to sow seeds, watch them grow, then harvest them into your basket.',
    thumbnail: gardenBedSrc,
    tags: ['R3F', 'Interactive', 'Animation'],
    link: null,
    sceneModule: 'GardenBed',
  },
  {
    id: 'lumos-scene',
    title: 'Lumos Scene',
    description: 'Interactive 3D dark room with wand and lighting',
    fullDescription:
      'Explore a dark wizard-themed room with FPS pointer controls. Toggle Lumos and Nox to cast light from your wand tip, with smooth bloom and glow effects.',
    thumbnail: lumosSceneSrc,
    tags: ['R3F', 'Interactive', 'Atmosphere', 'Post-processing'],
    link: null,
    sceneModule: 'LumosScene',
  },
];
