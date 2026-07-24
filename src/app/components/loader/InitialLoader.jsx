'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './initialLoader.scss';

export default function InitialLoader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'expanding' | 'done'

  useEffect(() => {
    // Short timer so initial pulse is visible and feels smooth before expanding
    const timer = setTimeout(() => {
      setPhase('expanding');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const irisVariants = {
    loading: {
      scale: [0.05, 0.1, 0.05],
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    expanding: {
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const overlayVariants = {
    loading: { opacity: 1 },
    expanding: {
      opacity: [1, 1, 0],
      transition: {
        duration: 0.9,
        times: [0, 0.6, 1],
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="initial-loader"
          variants={overlayVariants}
          animate={phase}
          onAnimationComplete={(definition) => {
            if (definition === 'expanding') {
              setPhase('done');
              if (onComplete) onComplete();
            }
          }}
        >
          <div className="iris-wrap">
            <motion.div
              className="iris"
              variants={irisVariants}
              animate={phase}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
