import React, { useState } from 'react';
import Character from '@/app/components/character/Character';
import HobbyItem from '@/app/components/hobbyItem/HobbyItem';
import { useGetDevice } from '@/app/hooks/useGetDevice';

import { hobbies } from '@/app/data/hobbies.js';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';

const Hobbies = ({ sectionRef, offsetTop }) => {
  const isMobile = useGetDevice();
  const [hoveredItem, setHoveredItem] = useState('');
  const renderSBubbles = () => {
    if (isMobile) {
      return (
        <Swiper
          modules={[A11y]}
          spaceBetween={28}
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
                return <HobbyItem hobby={hobby} />;
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return hobbies.map((hobby) => (
        <div
          className="hobby__wrap"
          key={hobby.title}
          onMouseOver={() => setHoveredItem(hobby.title.toLocaleLowerCase())}
          onMouseOut={() => setHoveredItem('')}
        >
          <HobbyItem hobby={hobby} />
        </div>
      ));
    }
  };

  return (
    <div className="hobbies">
      <h1 className="section__subtitle">Hobbies</h1>
      <div className="hobbies__wrap">{renderSBubbles()}</div>
      <div className="hobbies__svg">
        <div className={`hobbies__emoji ${hoveredItem}`}>
          {hobbies.map((hobby) =>
            hobby.emoji.map((emoji, index) => (
              <span
                key={hobby.title + index}
                className={`hobbies__emoji-item ${hoveredItem === hobby.title.toLocaleLowerCase() ? 'hobbies__emoji-item--active' : ''}`}
              >
                {emoji}
              </span>
            ))
          )}
        </div>
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
