import React, {useEffect, useRef} from 'react';
import './section.scss';

const Section = ({ title, refProp, setSectionScrollY, sectionScrollY  }) => {
  const componentName = title.charAt(0).toUpperCase() + title.slice(1);
  const Component = require(`../section-content/${componentName}`).default;
  const sectionRef = useRef(null);

  

  useEffect(() => {
    const obj = sectionScrollY[title] = sectionRef.current.getBoundingClientRect().y;
    setSectionScrollY(obj);
  }, []);

  return (
    <section ref={refProp} className={`section section--${title}`} id={title}>
      <div className='section__wrap' ref={sectionRef}>
        <Component sectionRef={sectionRef} offsetTop={sectionRef.current?.getBoundingClientRect()?.y}/>
      </div>
    </section>
  );
};

export default Section;
