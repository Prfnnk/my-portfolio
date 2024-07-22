import { useState, useEffect } from 'react';

// Custom hook to get the device type base on screen width. Return true if the device width is less than 768px.
export const useGetDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isMobile;
};
