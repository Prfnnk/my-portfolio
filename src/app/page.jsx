'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Section from './components/section/Section';
import Nav from './components/nav/Nav';

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

  const useIntersectionObserver = (options, cb) => {
    const observer = useRef(null);

    return useCallback(
      (node) => {
        if (!node) {
          if (observer.current) {
            observer.current.disconnect();
          }
          return;
        }

        observer.current = new window.IntersectionObserver(cb, options);
        observer.current.observe(node);
      },
      [cb, options]
    );
  };

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
      {sectionsArr.map((title, index) => (
        <Section
          refProp={cbRef}
          key={index}
          title={title}
          setSectionScrollY={setSectionScrollY}
          sectionScrollY={sectionScrollY}
        />
      ))}
    </main>
  );
}
