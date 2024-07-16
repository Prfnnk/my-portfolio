import React, {useState, useEffect} from 'react';

const useMousePosition = (elementRef) => {
  const [
    mousePosition,
    setMousePosition
  ] = useState({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    const currentElementRef = elementRef.current;
    currentElementRef.addEventListener('mousemove', updateMousePosition);
    return () => {
      currentElementRef.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mousePosition, elementRef]);
  return mousePosition;
};
export default useMousePosition;