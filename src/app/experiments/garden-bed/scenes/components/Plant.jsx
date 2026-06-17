import Carrot from './plants/Carrot.jsx';
import Radish from './plants/Radish.jsx';
import Beet from './plants/Beet.jsx';

export default function Plant({ type, plantRef }) {
  const VEGGIE_COMPONENTS = {
    carrot: Carrot,
    radish: Radish,
    beet: Beet,
  };

  const Component = VEGGIE_COMPONENTS[type];

  if (!Component) return null;

  return (
    <group scale={0.25} ref={plantRef}>
      <Component />
    </group>
  );
}
