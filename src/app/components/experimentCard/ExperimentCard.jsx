import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './experimentCard.scss';

const ExperimentCard = ({ experiment }) => {
  const displayedTags = experiment.tags.slice(0, 3);
  const hiddenTagCount = Math.max(0, experiment.tags.length - 3);

  return (
    <Link href={`/experiments/${experiment.id}`}>
      <div className="experiment-card">
        <div className="experiment-card__image">
          <Image
            src={experiment.thumbnail}
            alt={experiment.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
            className="experiment-card__image-img"
          />
        </div>
        <div className="experiment-card__content">
          <h3 className="experiment-card__title">{experiment.title}</h3>
          <p className="experiment-card__description">
            {experiment.description}
          </p>
          <div className="experiment-card__tags">
            {displayedTags.map((tag) => (
              <span key={tag} className="experiment-card__tag">
                {tag}
              </span>
            ))}
            {hiddenTagCount > 0 && (
              <span className="experiment-card__tag experiment-card__tag--more">
                +{hiddenTagCount}
              </span>
            )}
          </div>
        </div>
        {experiment.link && (
          <div
            className="experiment-card__link-icon"
            aria-label="External link"
          >
            →
          </div>
        )}
      </div>
    </Link>
  );
};

export default ExperimentCard;
