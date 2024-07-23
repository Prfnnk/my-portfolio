import React from 'react';

const Greet = () => {
  return (
    <h1 className={'section__title'}>
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
