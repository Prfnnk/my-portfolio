'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { experiments } from '@/app/data/experiments';
import './garden-bed-page.scss';
import GardenBed from './scenes/GardenBed.jsx';

export default function GardenBedPage() {
  const plantOptions = [
    {
      id: 'carrot',
      name: 'Carrot',
      color: 'orange',
    },
    {
      id: 'radish',
      name: 'Radish',
      color: 'red',
    },
    {
      id: 'beet',
      name: 'Beet',
      color: 'purple',
    },
  ];
  const [action, setAction] = useState('plant'); // 'plant', 'water', 'harvest'
  const [selectedPlant, setSelectedPlant] = useState(plantOptions[0]);
  const [harvestedCounts, setHarvestedCounts] = useState({
    carrot: 0,
    radish: 0,
    beet: 0,
  });

  return (
    <div className="garden-bed-page">
      <Canvas shadows camera={{ position: [0, 6.5, 6.5], fov: 75 }}>
        <directionalLight position={[10, 10, 5]} intensity={3.5} />
        {/* <ambientLight intensity={2.5} /> */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <GardenBed
          selectedPlant={selectedPlant}
          action={action}
          setHarvestedCounts={setHarvestedCounts}
        />
        <axesHelper args={[5]} />
      </Canvas>
      <div className="interface garden-bed-page__title">
        <div className="garden-bed-page__title-wrap">
          <h1>Garden Bed</h1>
          <p>Welcome to the Garden Bed!</p>
        </div>
      </div>

      <div className="garden-bed-page__counter">
        <div className="garden-bed-page__counter-wrap">
          <p className="garden-bed-page__counter-title">
            Harvested:{' '}
            {Object.values(harvestedCounts).reduce((a, b) => a + b, 0)}
          </p>
          <div className="garden-bed-page__counter-detailed">
            {plantOptions.map((plant) => (
              <p key={plant.id}>
                {plant.name}: {harvestedCounts[plant.id]}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* <p>Current Action: {action}</p>
      <p>Selected Plant: {selectedPlant.name}</p> */}

      <div className="garden-bed-page__info">
        <div className="garden-bed-page__picker">
          {plantOptions.map((plant) => (
            <button
              className="garden-bed-page__picker-button"
              key={plant.id}
              onClick={() => setAction('plant') || setSelectedPlant(plant)}
            >
              {plant.name}
            </button>
          ))}
          <button
            className="garden-bed-page__picker-button"
            onClick={() => {
              setAction('water');
            }}
          >
            Water
          </button>
          <button
            className="garden-bed-page__picker-button"
            onClick={() => {
              setAction('harvest');
            }}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
}
