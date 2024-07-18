import React from 'react';
import { skills } from '@/app/data/skills';
import DevIcon from '@/app/components/devIcon/DevIcon';

const Skills = () => {
  return (
    <div className="skills">
      <h2 className="section__subtitle">Skills & Tools</h2>
      <div className="skills__wrap">
        {skills.map((skill) => (
          <div className="skills__item" key={skill.title}>
            <DevIcon icon={skill.icon} iconName={skill.title} />
            <p className="skills__item-name">{skill.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
