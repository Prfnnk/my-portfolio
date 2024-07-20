import React, { useState } from 'react';
import Character from '../character/Character';
import { useGetDevice } from '@/app/hooks/useGetDevice';

import { hobbies } from '@/app/data/hobbies.js';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Hobbies = ({ sectionRef, offsetTop }) => {
  const isMobile = useGetDevice();
  const [hoveredItem, setHoveredItem] = useState('');
  const renderSBubbles = () => {
    if (isMobile) {
      return (
        <Swiper
          modules={[A11y]}
          spaceBetween={0}
          slidesPerView={1.6}
          centeredSlides={true}
          speed={800}
        >
          {hobbies.map((hobby) => (
            <SwiperSlide key={hobby.title} className="hobbies__slide">
              {({ isActive }) => {
                if (isActive) {
                  setHoveredItem(hobby.title.toLocaleLowerCase());
                }
                return (
                  <div
                    className={`hobbies__item hobbies__item--${hobby.title.toLowerCase()}`}
                  >
                    <div className="hobbies__inner">
                      <strong className="hobbies__item-title">
                        {hobby.title}
                      </strong>
                      <p className="hobbies__item-description">
                        {hobby.description}
                      </p>
                    </div>
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return hobbies.map((hobby, index) => (
        <div
          key={index}
          className={`hobbies__item hobbies__item--${hobby.title.toLowerCase()}`}
          onMouseOver={() => setHoveredItem(hobby.title.toLocaleLowerCase())}
          onMouseOut={() => setHoveredItem('')}
        >
          <div className="hobbies__inner">
            <strong className="hobbies__item-title">{hobby.title}</strong>
            <p className="hobbies__item-description">{hobby.description}</p>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="hobbies">
      <h1 className="section__subtitle">Hobbies</h1>
      <div className="hobbies__wrap">{renderSBubbles()}</div>
      <div className="hobbies__svg">
        <Character
          sectionRef={sectionRef}
          offsetTop={offsetTop}
          hoveredItem={hoveredItem}
        />
      </div>
    </div>
  );
};

export default Hobbies;
