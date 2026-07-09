import gardenBedSrc from '@/app/assets/images/experiments/preview/garden-bed.png';
import wizardRoomSrc from '@/app/assets/images/experiments/preview/wizard-room.jpg';
import portalSrc from '@/app/assets/images/experiments/preview/portal.png';

export const experiments = [
  {
    id: 'garden-bed',
    title: 'Veggie Garden',
    description: 'My first 3D mini scene. Interactive gardening simulation.',
    thumbnail: gardenBedSrc,
    tags: ['R3F', 'Interactive', 'Animation'],
    link: null,
    sceneModule: 'GardenBed',
    published: true,
  },
  {
    id: 'portal',
    title: 'Portal',
    description:
      'A tutorial by Bruno Simon on his Three.js Journey course. My own Blender model, UV map and shader.',
    thumbnail: portalSrc,
    tags: ['R3F', 'Blender', 'Shaders'],
    link: null,
    sceneModule: 'Portal',
    published: true,
  },
  {
    id: 'wizard-room',
    title: 'Wizard Room',
    description:
      'First steps with creating my own Blender model, unwrapping and baking. Custom shaders.',
    thumbnail: wizardRoomSrc,
    tags: ['R3F', 'Blender', 'Shaders'],
    link: null,
    sceneModule: 'WizardRoom',
    published: true,
  },
];
