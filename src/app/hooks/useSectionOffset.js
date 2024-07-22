import { useState } from 'react';

// Custom hook to get the section offset
export const useSectionOffset = () => {
  const [sectionOffset, setSectionOffset] = useState(0);

  return {
    sectionOffset,
    setSectionOffset,
  };
};
