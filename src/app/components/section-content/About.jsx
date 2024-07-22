import React from 'react';
import Image from 'next/image';
import meOriginal from '@/app/assets/images/me_original.jpeg';

const About = () => {
  return (
    <div className="about">
      <h2 className="about__title section__subtitle">About</h2>
      <div className="about__wrap">
        <div className="about__image">
          <Image src={meOriginal} alt="Photo of Maria" />
          <div className="about__image-decor" aria-hidden></div>
        </div>
        <div className="about__description">
          <p>Hello and welcome to my portfolio!</p>
          <p>
            My name is <strong>Maria</strong>, I&lsquo;m a frontend developer
            with <strong>over four years</strong> of experience.
          </p>
          <p>
            Originally from Moscow, I&nbsp;now call the vibrant city of&nbsp;
            <strong>Utrecht</strong> in&nbsp;the <strong>Netherlands</strong>{' '}
            my&nbsp;home.
          </p>
          <p>
            I specialize in creating engaging user experiences with HTML, CSS,
            and JavaScript, and have a deep love for{' '}
            <strong>CSS animations.</strong>
          </p>
          <p>
            Currently, I&lsquo;m exploring 3D world with tools like{' '}
            <strong>Blender, Three.js and React Fiber</strong> to bring
            immersive experiences to the web.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
