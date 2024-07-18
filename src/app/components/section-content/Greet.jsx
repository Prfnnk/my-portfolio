import React from 'react';
import Sparkle from '@/app/components/svg/Sparkle';

const Greet = () => {
  return (
    <h1 className={'section__title'}>
      <Sparkle />
      <span className="section__title-span section__title-span--top">
        Maria Abdurakhmanova
      </span>
      <span className={' section__title-main'}>Portfolio</span>
      <span className="section__title-span section__title-span--bottom">
        frontend developer
      </span>
    </h1>
  );
};

export default Greet;
