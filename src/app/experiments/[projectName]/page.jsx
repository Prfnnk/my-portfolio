'use client';
import React from 'react';
import Link from 'next/link';
import { experiments } from '@/app/data/experiments';
import Scene from './Scene';
import './experiment-detail.scss';

export default function ExperimentDetailPage({ params }) {
  const experiment = experiments.find((exp) => exp.id === params.projectName);

  if (!experiment) {
    return (
      <div className="experiment-detail__error">
        <h1>Experiment not found</h1>
        <Link href="/experiments" className="experiment-detail__back-link">
          ← Back to Experiments
        </Link>
      </div>
    );
  }

  return (
    <div className="experiment-detail">
      <Scene experiment={experiment} />
      <div className="experiment-detail__content">
        <Link href="/experiments" className="experiment-detail__back-link">
          ← Back to Experiments
        </Link>
        <h1 className="experiment-detail__title">{experiment.title}</h1>
        <p className="experiment-detail__description">
          {experiment.fullDescription}
        </p>
        <div className="experiment-detail__tags">
          {experiment.tags.map((tag) => (
            <span key={tag} className="experiment-detail__tag">
              {tag}
            </span>
          ))}
        </div>
        {experiment.link && (
          <a
            href={experiment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="experiment-detail__external-link"
          >
            Visit Project →
          </a>
        )}
      </div>
    </div>
  );
}
