import { useState } from 'react';
export const useSectionOffset = () => {
  const [sectionOffset, setSectionOffset] = useState(0);

  return {
    sectionOffset,
    setSectionOffset,
  };
};
