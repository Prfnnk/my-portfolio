'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { experiments } from '@/app/data/experiments';
import './garden-bed-page.scss';

const PLANTS = {
  radish: { label: 'Radish', emoji: '🌶️' },
  carrot: { label: 'Carrot', emoji: '🥕' },
  beet: { label: 'Beet', emoji: '🫐' },
};

export default function GardenBedPage() {
  const experiment = experiments.find((exp) => exp.id === 'garden-bed');
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [selected, setSelected] = useState('radish');
  const [counts, setCounts] = useState({ radish: 0, carrot: 0, beet: 0 });
  const basketRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dynamically import the scene
    const loadScene = async () => {
      try {
        const sceneModule = await import('./scenes/GardenBed');
        const initScene = sceneModule.default;

        const sceneInstance = initScene(canvasRef.current, {
          onHarvest: (type) => {
            setCounts((c) => ({ ...c, [type]: c[type] + 1 }));
          },
        });

        sceneRef.current = sceneInstance;

        // Update basket position
        const updateBasketPos = () => {
          if (basketRef.current && sceneInstance.setBasketPosition) {
            const rect = basketRef.current.getBoundingClientRect();
            sceneInstance.setBasketPosition(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            );
          }
        };

        updateBasketPos();
        window.addEventListener('resize', updateBasketPos);
        const interval = setInterval(updateBasketPos, 500);

        return () => {
          clearInterval(interval);
          window.removeEventListener('resize', updateBasketPos);
          if (sceneInstance.dispose) sceneInstance.dispose();
        };
      } catch (error) {
        console.error('Failed to load GardenBed scene:', error);
      }
    };

    const cleanup = loadScene();

    return () => {
      cleanup?.then((fn) => fn?.());
    };
  }, []);

  // Update selected plant in scene
  useEffect(() => {
    if (sceneRef.current?.setSelectedPlant) {
      sceneRef.current.setSelectedPlant(selected);
    }
  }, [selected]);

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

  const total = counts.radish + counts.carrot + counts.beet;
  const plantKeys = ['radish', 'carrot', 'beet'];

  return (
    <div className="garden-bed-page">
      {/* Canvas */}
      <canvas ref={canvasRef} className="garden-bed-page__canvas" />

      {/* Title */}
      <div className="garden-bed-page__title">
        <h1>Veggie Garden</h1>
        <p>Pick a seed • Click a hole to sow • Wait 5s • Click to harvest</p>
      </div>

      {/* Seed picker */}
      <div className="garden-bed-page__seed-picker">
        {plantKeys.map((k) => {
          const cfg = PLANTS[k];
          const active = selected === k;
          return (
            <button
              key={k}
              onClick={() => setSelected(k)}
              className={`garden-bed-page__seed-btn ${active ? 'garden-bed-page__seed-btn--active' : ''}`}
            >
              <span className="garden-bed-page__seed-emoji">{cfg.emoji}</span>
              <span className="garden-bed-page__seed-label">{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Basket / counter */}
      <div ref={basketRef} className="garden-bed-page__basket">
        <div className="garden-bed-page__basket-icon">🧺</div>
        <div className="garden-bed-page__basket-content">
          <div className="garden-bed-page__basket-label">Harvested</div>
          <div className="garden-bed-page__basket-total">{total}</div>
          <div className="garden-bed-page__basket-items">
            {plantKeys.map((k) => (
              <div key={k} className="garden-bed-page__basket-item">
                <span>{PLANTS[k].emoji}</span>
                <span>{counts[k]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back button */}
      <Link href="/experiments" className="garden-bed-page__back-link">
        ← Back
      </Link>
    </div>
  );
}
