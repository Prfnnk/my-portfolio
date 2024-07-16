import React from 'react';
import Character from '../character/Character';
import useMousePosition from '../../hooks/useMousePosition';
import { useGetDevice } from '@/app/hooks/useGetDevice';

import { hobbies } from '@/app/data/hobbies.js';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Hobbies = ({sectionRef, offsetTop}) => {
  const mousePosition = useMousePosition(sectionRef);
  const isMobile = useGetDevice();
  const renderSBubbles = () => {
    if (isMobile) {
    return <Swiper
    modules={[A11y]}
    spaceBetween={0}
    slidesPerView={1}
    speed={800}
    autoplay={{ delay: 2000 }}
  >
    {hobbies.map((hobby, index) => (
      <SwiperSlide key={index} className='hobbies__slide'>
        <div className={`hobbies__item hobbies__item--${hobby.title.toLowerCase()}`}>
          <div className="hobbies__inner">
            <p>{hobby.title}</p>
            <p>{hobby.description}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
    } else {
      return hobbies.map((hobby, index) => (
        <div key={index} className={`hobbies__item hobbies__item--${hobby.title.toLowerCase()}`}>
          <div className="hobbies__inner">
            <p>{hobby.title}</p>
            <p>{hobby.description}</p>
          </div>
        </div>
      ));
    }
  }

  return (
    <div className='hobbies'>
      <h1 className='section__subtitle'>Hobbies</h1>
      <div className="hobbies__wrap">
        {renderSBubbles()}
      </div>
      <div className="hobbies__svg">
          <Character mousePosition={JSON.stringify(mousePosition)} offsetTop={offsetTop} />
        </div>
    </div>
  );
};

export default Hobbies;
