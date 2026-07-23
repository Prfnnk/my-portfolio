'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransitionStore } from '@/app/store/useTransitionStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './transition.scss';

export default function TransitionOverlay() {
  const { isActive, label, endTransition } = useTransitionStore();
  const pathname = usePathname();

  // When pathname changes, if overlay is active, trigger exit animation
  // We purposely exclude isActive from dependencies to avoid immediate unmount.
  useEffect(() => {
    if (isActive) {
      endTransition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const irisVariants = {
    initial: {
      scale: 0,
    },
    enter: {
      scale: 1,
      transition: { duration: 0.5, delay: 0.1, ease: [0.65, 0, 0.35, 1] },
    },
    exit: {
      scale: 0,
      transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 40 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="transition-overlay">
          <div className="iris-wrap">
            <motion.div
              className="iris"
              variants={irisVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            ></motion.div>
          </div>
          <motion.div
            className="transition-overlay__content"
            variants={textVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <h2 className="transition-overlay__label">{label}</h2>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
