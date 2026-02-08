'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import DevIcon from '@/app/components/devIcon/DevIcon';
import Image from 'next/image';
import { useGetDevice } from '@/app/hooks/useGetDevice';

import { projects } from '@/app/data/projects.js';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

const Projects = () => {
  const mobileProjectsArr = projects.flat();
  const isMobile = useGetDevice();
  const [openPopover, setOpenPopover] = useState(null);
  const popoverRef = useRef(null);

  const handleGeoClick = useCallback((e, projectTitle) => {
    e.preventDefault();
    setOpenPopover((prev) => (prev === projectTitle ? null : projectTitle));
  }, []);

  useEffect(() => {
    if (!openPopover) return;

    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpenPopover(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openPopover]);

  const renderPopover = (project) => {
    if (openPopover !== project.title) return null;

    return (
      <div
        className="projects__popover"
        ref={popoverRef}
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={project.archiveLink}
          target="_blank"
          className="projects__popover-link"
        >
          Open archived version
        </a>
        <a
          href={project.link}
          target="_blank"
          className="projects__popover-link projects__popover-link--vpn"
        >
          Open original (VPN needed)
        </a>
      </div>
    );
  };

  const renderSlides = () => {
    if (isMobile) {
      return mobileProjectsArr.map((project, index) => (
        <SwiperSlide key={index} className="projects__slide">
          <a
            target="_blank"
            href={project.geoRestricted ? project.archiveLink : project.link}
            className={`projects__item${project.geoRestricted ? ' projects__item--geo-restricted' : ''}`}
            key={project.title}
            {...(project.geoRestricted && {
              onClick: (e) => handleGeoClick(e, project.title),
            })}
          >
            {project.geoRestricted && (
              <span className="projects__geo-badge">Archived version</span>
            )}
            <div className="projects__item-content">
              <h3 className="projects__title">{project.title}</h3>
              <div className="projects__title-stack">
                {project.stack.map((stack) => (
                  <span key={stack.name}>
                    <DevIcon icon={stack.icon} iconName={stack.name} />
                  </span>
                ))}
              </div>
            </div>
            {project.geoRestricted && renderPopover(project)}
            <Image
              className="projects__item-img"
              src={project.img}
              alt={project.title}
            />
          </a>
        </SwiperSlide>
      ));
    } else {
      return projects.map((slide, index) => (
        <SwiperSlide key={index} className="projects__slide">
          {slide.map((project) => (
            <a
              target="_blank"
              href={project.geoRestricted ? project.archiveLink : project.link}
              className={`projects__item${project.geoRestricted ? ' projects__item--geo-restricted' : ''}`}
              key={project.title}
              {...(project.geoRestricted && {
                onClick: (e) => handleGeoClick(e, project.title),
              })}
            >
              {project.geoRestricted && (
                <span className="projects__geo-badge">Archived version</span>
              )}
              {project.geoRestricted && renderPopover(project)}
              <div className="projects__item-content">
                <h3 className="projects__title">
                  <span className="projects__title-text">{project.title}</span>
                  <span className="projects__title-stack">
                    {project.stack.map((stack) => (
                      <span key={stack.name}>
                        <DevIcon icon={stack.icon} iconName={stack.name} />
                      </span>
                    ))}
                  </span>
                </h3>
              </div>
              <Image
                className="projects__item-img"
                src={project.img}
                alt={project.title}
              />
            </a>
          ))}
        </SwiperSlide>
      ));
    }
  };
  return (
    <div className="projects">
      <h2 className="section__subtitle">Projects I&nbsp;am proud&nbsp;of</h2>
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
      <p className="projects__note">
        Some of my previous interactive work from 2020–2022 was developed for
        the Russian market. Due to regional server restrictions, these may
        require a&nbsp;VPN (set to Belarus or Russia) to load. You can avoid
        that by opening the archived version.
      </p>
    </div>
  );
};

export default Projects;
