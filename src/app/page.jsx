'use client';
import React, { useState } from 'react';
import Section from './components/section/Section';
import Nav from './components/nav/Nav';

import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';

export default function Home() {
  const sectionsArr = [
    'greet',
    'about',
    'skills',
    'projects',
    'hobbies',
    'contact',
  ];

  const [sectionScrollY, setSectionScrollY] = useState({});

  // Intersaction Observer
  const [entryId, setEntryId] = useState('');
  const cbRef = useIntersectionObserver({ threshold: 0.5 }, (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setEntryId(entry.target.id);
      }
    });
  });

  return (
    <main className="main">
      <Nav
        navArr={sectionsArr}
        entryId={entryId}
        sectionScrollY={sectionScrollY}
      />
      {sectionsArr.map((title) => (
        <Section
          refProp={cbRef}
          key={title}
          title={title}
          setSectionScrollY={setSectionScrollY}
          sectionScrollY={sectionScrollY}
        />
      ))}
    </main>
  );
}
