'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { experiments } from '@/app/data/experiments';
import './garden-bed-page.scss';
import GardenBed from './scenes/GardenBed.jsx';

import harvestBasket from '../../assets/images/experiments/garden-bed/basket.png';
import carrot from '../../assets/images/experiments/garden-bed/carrot.png';
import radish from '../../assets/images/experiments/garden-bed/radish.png';
import beet from '../../assets/images/experiments/garden-bed/beet.png';
import can from '../../assets/images/experiments/garden-bed/can.png';
import harvest from '../../assets/images/experiments/garden-bed/harvest.png';

export default function GardenBedPage() {
  const plantOptions = [
    {
      id: 'carrot',
      name: 'Carrot',
      color: 'orange',
      image: carrot,
    },
    {
      id: 'radish',
      name: 'Radish',
      color: 'red',
      image: radish,
    },
    {
      id: 'beet',
      name: 'Beet',
      color: 'purple',
      image: beet,
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
      <Canvas shadows camera={{ position: [0, 6.5, 8], fov: 75 }}>
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
      <div className="interface garden-bed-page__title frame-outer">
        <div className="garden-bed-page__title-wrap frame-inner">
          <h1>Garden Bed</h1>
          <p>Welcome to the Garden Bed!</p>
        </div>
      </div>

      <div className="garden-bed-page__counter frame-outer">
        <Image
          className="garden-bed-page__counter-img"
          src={harvestBasket}
          alt="Harvest Basket"
        />
        <div className="garden-bed-page__counter-wrap frame-inner">
          <p className="garden-bed-page__counter-title">
            Harvested:{' '}
            {Object.values(harvestedCounts).reduce((a, b) => a + b, 0)}
          </p>
          <div className="garden-bed-page__counter-detailed">
            {plantOptions.map((plant) => (
              <p className="garden-bed-page__plant" key={plant.id}>
                <Image
                  className="garden-bed-page__plant-img"
                  src={plant.image}
                  alt={plant.name}
                />
                <span className="garden-bed-page__plant-count">
                  {harvestedCounts[plant.id]}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* <p>Current Action: {action}</p>
      <p>Selected Plant: {selectedPlant.name}</p> */}

      <div className="garden-bed-page__info frame-outer">
        <div className="garden-bed-page__picker">
          {plantOptions.map((plant) => (
            <div
              className={`garden-bed-page__picker-wrap ${selectedPlant.id === plant.id && action === 'plant' ? 'active' : ''}`}
              key={plant.id}
            >
              <button
                className="garden-bed-page__picker-button"
                onClick={() => setAction('plant') || setSelectedPlant(plant)}
              >
                <span className="garden-bed-page__picker-inner">
                  <Image
                    className="garden-bed-page__picker-img"
                    src={plant.image}
                    alt={plant.name}
                  />
                  {plant.name}
                </span>
              </button>
            </div>
          ))}
          <div
            className={`garden-bed-page__picker-wrap ${action === 'water' ? 'active' : ''}`}
          >
            <button
              className="garden-bed-page__picker-button"
              onClick={() => {
                setAction('water');
              }}
            >
              <span className="garden-bed-page__picker-inner">
                <Image
                  className="garden-bed-page__picker-img garden-bed-page__picker-img--can"
                  src={can}
                  alt="Water can"
                />
                Water
              </span>
            </button>
          </div>
          <div
            className={`garden-bed-page__picker-wrap ${action === 'harvest' ? 'active' : ''}`}
          >
            <button
              className="garden-bed-page__picker-button"
              onClick={() => {
                setAction('harvest');
              }}
            >
              <span className="garden-bed-page__picker-inner">
                <Image
                  className="garden-bed-page__picker-img garden-bed-page__picker-img--harvest"
                  src={harvest}
                  alt="Harvest"
                />
                Harvest
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
