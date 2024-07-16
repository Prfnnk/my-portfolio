import React from 'react';
import Image from 'next/image';
import { skills } from '@/app/data/skills';

const Skills = () => {
  const renderIcon = (skill) => {
    if (typeof skill.icon === 'string') {
      return <i className={`devicon-${skill.icon} skills__item-icon`}></i>;
    }
    return (
      <div className="skills__item-image">
        <Image src={skill.icon} alt={skill.title} />
      </div>
    );
  };
  return (
    <div className="skills">
      <h2 className="section__subtitle">Skills & Tools</h2>
      <div className="skills__wrap">
        {skills.map((skill) => (
          <div className="skills__item" key={skill.title}>
            {renderIcon(skill)}
            <p className="skills__item-name">{skill.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
