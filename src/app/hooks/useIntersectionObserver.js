import { useCallback, useRef } from 'react';

// Custom hook for Intersection Observer
export const useIntersectionObserver = (options, cb) => {
  const observer = useRef(null);

  return useCallback(
    (node) => {
      if (!node) {
        if (observer.current) {
          observer.current.disconnect();
        }
        return;
      }

      observer.current = new window.IntersectionObserver(cb, options);
      observer.current.observe(node);
    },
    [cb, options]
  );
};
