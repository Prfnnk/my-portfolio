import React from 'react';
import ExperimentCard from '../experimentCard/ExperimentCard';
import './experimentGrid.scss';

const ExperimentsGrid = ({ experiments }) => {
  return (
    <div className="experiment-grid">
      {experiments.map((experiment) => (
        <div key={experiment.id} className="experiment-grid__item">
          <ExperimentCard experiment={experiment} />
        </div>
      ))}
    </div>
  );
};

export default ExperimentsGrid;
