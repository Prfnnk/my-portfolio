'use client';
import { useState } from 'react';
import Section from './components/section/Section';
import Nav from './components/nav/Nav';
import InitialLoader from './components/loader/InitialLoader';

import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';

export default function Home() {
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  const sectionsArr = [
    'greet',
    'about',
    'skills',
    'projects',
    'hobbies',
    'contact',
  ];

  const [sectionScrollY, setSectionScrollY] = useState({});

  // Intersection Observer
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
      <InitialLoader onComplete={() => setIsInitialLoaded(true)} />
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
          isInitialLoaded={isInitialLoaded}
        />
      ))}
    </main>
  );
}
