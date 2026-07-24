'use client';
import { motion } from 'framer-motion';

const Greet = ({ isInitialLoaded = true }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.h1
      className={'section__title'}
      variants={containerVariants}
      initial="hidden"
      animate={isInitialLoaded ? 'visible' : 'hidden'}
    >
      <motion.span
        className="section__title-span section__title-span--top"
        variants={itemVariants}
      >
        Maria Abdurakhmanova
      </motion.span>
      <motion.span className={' section__title-main'} variants={itemVariants}>
        Portfolio
      </motion.span>
      <motion.span
        className="section__title-span section__title-span--bottom"
        variants={itemVariants}
      >
        frontend developer
      </motion.span>
    </motion.h1>
  );
};

export default Greet;
