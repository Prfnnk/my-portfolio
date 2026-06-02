'use client';
import React from 'react';
import { experiments } from '@/app/data/experiments';
import ExperimentsGrid from '@/app/components/experimentGrid/ExperimentsGrid';
import './experiments.scss';

export default function ExperimentsPage() {
  return (
    <main className="experiments-page">
      <div className="experiments-page__header">
        <h1 className="experiments-page__title">3D Experiments</h1>
        <p className="experiments-page__subtitle">
          Explore my collection of interactive 3D visualizations and experiments
        </p>
      </div>
      <div className="experiments-page__content">
        <ExperimentsGrid experiments={experiments} />
      </div>
    </main>
  );
}
