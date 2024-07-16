'use client';
import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import { useGetDevice } from '@/app/hooks/useGetDevice';

import { projects } from '@/app/data/projects.js';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Projects = () => {
  const mobileProjectsArr = projects.flat();
  const isMobile = useGetDevice();

  const renderSlides = () => {
    if(isMobile) {
      return mobileProjectsArr.map((project, index) => (
        <SwiperSlide key={index} className='projects__slide'>
          <a target='_blank' href={project.link} className="projects__item" key={project.title}>
              <div className="projects__item-content">
                <h3>{project.title}</h3>
              </div>
              <Image className='projects__item-img' src={project.img} alt={project.title} />
            </a>
        </SwiperSlide>
      ))
    } else {
      return projects.map((slide, index) => (
        <SwiperSlide key={index} className='projects__slide'>
          {slide.map((project) => (
            <a target='_blank' href={project.link} className="projects__item" key={project.title}>
              <div className="projects__item-content">
                <h3>{project.title}</h3>
              </div>
              <Image className='projects__item-img' src={project.img} alt={project.title} />
            </a>
          ))}
        </SwiperSlide>
      ))
    }
}
  return (
    <div className='projects'>
      <h2 className='section__subtitle'>Projects I&nbsp;am proud&nbsp;of</h2>
      <div className="projects__wrap">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          speed={800}
        >
          {renderSlides()}
        </Swiper>
        
      </div>
    </div>
  );
};

export default Projects;
