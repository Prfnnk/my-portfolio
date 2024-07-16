import React, { useEffect, useState, useRef } from "react";
import { useSectionOffset } from "@/app/hooks/useSectionOffset";
import './character.scss';

const Character = ({mousePosition, offsetTop}) => {
    const [screenSize, setScreenSize] = useState({screenWidth: 0, screenHeight: 0});
    const [center, setCenter] = useState({x: 0, y: 0});
    const centerRef = useRef(null);
    const {sectionOffset} = useSectionOffset();
    
    useEffect(() => {
        // Get the screen size
        setScreenSize({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });
    }, []);

    useEffect(() => {
        // Get the center of the screen
        setCenter({
            x: centerRef.current.getBoundingClientRect().x,
            y: offsetTop
        });
    }, [offsetTop]);

    const {x, y} = JSON.parse(mousePosition);
    const style = {
        transformX: ((x - center.x) / screenSize.screenWidth).toFixed(2),
        // transformY: ((y - (center.y - screenSize.screenHeight * 4))/screenSize.screenHeight).toFixed(2),
        transformY: ((y - center.y) / screenSize.screenHeight).toFixed(2),
    };

    return (
        <div className='character'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.47 95.75">
                <defs>
                    <style>
                        {`
                    .cls-1 {
                        fill: #995342;
                    }

                    .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6 {
                        stroke-width: 0px;
                    }

                    .cls-2 {
                        fill: #c37c56;
                    }

                    .cls-7 {
                        stroke: #995342;
                        stroke-width: .48px;
                    }

                    .cls-7, .cls-8 {
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                    }

                    .cls-3, .cls-9 {
                        fill: #f9c2ab;
                    }

                    .cls-4 {
                        fill: #39779c;
                    }

                    .cls-10, .cls-6 {
                        fill: #fff;
                    }

                    .cls-5 {
                        fill: #de5a62;
                    }

                    .cls-11 {
                        clip-path: url(#clippath-1);
                    }

                    .cls-12 {
                        clip-path: url(#clippath-2);
                    }

                    .cls-8 {
                        stroke: #000;
                        stroke-width: .38px;
                    }
                        `}
                    </style>
                    <clipPath id="clippath-1">
                    <path className="cls-6" d="M37.21,35.24s-1.26-3.2-4.34-3.35c-3.08-.15-4.92,2.3-4.92,2.3,0,0,.78,2.72,4.52,2.9,3.74.18,4.74-1.85,4.74-1.85Z"/>
                    </clipPath>
                    <clipPath id="clippath-2">
                    <path className="cls-6" d="M45.17,35.24s1.26-3.2,4.34-3.35c3.08-.15,4.92,2.3,4.92,2.3,0,0-.78,2.72-4.52,2.9s-4.74-1.85-4.74-1.85Z"/>
                    </clipPath>
                </defs>
                <g id="OBJECTS">
                    <g id="Main">
                    <g>
                        <path className="cls-2" d="M48.23,7.61s7.67-3.35,14.11,2.71c6.44,6.06,1.9,10.11,7.58,13.11,5.69,3,1.53,11.31,8.17,15.09s2.26,13.1-4.57,14.43c0,0-3.28,8.64-10.47,7.81,0,0-6.65,7.39-19.61,2.7l-4.77-1.96L48.23,7.61Z"/>
                        <path className="cls-2" d="M22.98,10.16s-8.62,1.11-10.29,8.77c-1.67,7.66-1.06,5.85-5.8,9.74-4.73,3.9,1.25,8.31-2.51,12.21-1.92,1.99-2.82,3.62-3.01,5.5-.32,3.3,1.96,6.25,5.16,7.16,2.18.62,3.96,2.68,5.26,5.49,2.57,5.57,11.77,3.15,11.77,3.15,0,0,8.69,5.06,14.01,1.3s-2.7-55.55-2.7-55.55l-11.9,2.23Z"/>
                        <path className="cls-2" d="M49.98,8.03S46.69,0,34.87,0s-15.49,12.32-15.49,12.32l17.21,9.96,13.39-14.25Z"/>
                        <g>
                        <path className="cls-3" d="M25.48,36.57c1.18,2.63,1.07,6.86-1.42,7.8-2.49.94-5.47-2.45-6.64-5.07s-.46-4.91,2.03-5.85,4.85.49,6.02,3.12Z"/>
                        <path className="cls-7" d="M19.38,36.61s3.05-.81,4.19,3.33"/>
                        </g>
                        <g>
                        <path className="cls-3" d="M57.13,36.57c-1.18,2.63-1.07,6.86,1.42,7.8,2.49.94,5.47-2.45,6.64-5.07,1.18-2.63.46-4.91-2.03-5.85s-4.85.49-6.02,3.12Z"/>
                        <path className="cls-7" d="M63.23,36.61s-3.05-.81-4.19,3.33"/>
                        </g>
                        <ellipse className="cls-2" cx="41.27" cy="26.45" rx="21.01" ry="20.16"/>
                        <g>
                        <polygon className="cls-3" points="35.22 51 32.58 76.15 48.23 76.15 45.52 50.74 35.22 51"/>
                        <polygon className="cls-1" points="34.87 55.44 47.03 64.86 45.7 52.21 34.87 55.44"/>
                        </g>
                        <path className="cls-9" d="M41.27,8.65h0c-9.71,0-18.28,7.51-18.28,16.77l.56,11.12s.2,15.76,15.16,20.56c1.66.53,3.47.53,5.13,0,14.96-4.8,15.16-20.56,15.16-20.56l.56-11.12c0-9.26-8.57-16.77-18.28-16.77Z"/>
                        <g>
                        <path className="cls-5" d="M37.58,45.45s.18,2.32,3.34,2.32,3.34-2.32,3.34-2.32h-6.68Z"/>
                        <polyline className="cls-7 nose" ref={centerRef} points="40.22 39.02 40.22 41.6 42.12 41.62"/>
                        <g>
                            <g>
                            <path className="cls-10" d="M37.21,35.24s-1.26-3.2-4.34-3.35c-3.08-.15-4.92,2.3-4.92,2.3,0,0,.78,2.72,4.52,2.9,3.74.18,4.74-1.85,4.74-1.85Z"/>
                            <g className="cls-11">
                                <path className="cls-4 eye"style={{transform: `translate(${style.transformX}px, ${style.transformY}px)`}} d="M29.49,34.37c-.08,1.69,1.23,3.13,2.92,3.22,1.69.08,3.13-1.23,3.22-2.92.08-1.69-1.23-3.13-2.92-3.22-1.69-.08-3.13,1.23-3.22,2.92Z"/>
                            </g>
                            </g>
                            <path className="cls-8" d="M37.21,35.24s-1.16-3.32-4.34-3.35-4.92,2.3-4.92,2.3"/>
                        </g>
                        <g>
                            <g>
                            <path className="cls-10" d="M45.17,35.24s1.26-3.2,4.34-3.35c3.08-.15,4.92,2.3,4.92,2.3,0,0-.78,2.72-4.52,2.9s-4.74-1.85-4.74-1.85Z"/>
                            <g className="cls-12">
                                <path className="cls-4 eye" style={{transform: `translate(${style.transformX}px, ${style.transformY}px)`}} d="M52.89,34.37c.08,1.69-1.23,3.13-2.92,3.22-1.69.08-3.13-1.23-3.22-2.92-.08-1.69,1.23-3.13,2.92-3.22,1.69-.08,3.13,1.23,3.22,2.92Z"/>
                            </g>
                            </g>
                            <path className="cls-8" d="M45.17,35.24s1.16-3.32,4.34-3.35c3.18-.03,4.92,2.3,4.92,2.3"/>
                        </g>
                        <path className="cls-1" d="M31.52,24.34s-3.11.4-4.61,1.34c-.93.58-.9,1.65.22,2.02,1.03.34,3.24.12,4.56-.03,3.22-.37,5.36-1.56,5.15-2.56-.27-1.28-3.62-1.07-5.31-.77Z"/>
                        <path className="cls-1" d="M50.37,24.34s3.11.4,4.61,1.34c.93.58.9,1.65-.22,2.02-1.03.34-3.24.12-4.56-.03-3.22-.37-5.36-1.56-5.15-2.56.27-1.28,3.62-1.07,5.31-.77Z"/>
                        <path className="cls-5" d="M44.26,45.45s-3.04-1.69-6.68,0c0,0,3.66,1.56,6.68,0Z"/>
                        <path className="cls-7" d="M36.81,45.16s3.69,2.14,8.1,0"/>
                        </g>
                        <path className="cls-2" d="M49.98,8.03s-.79,8.79-9.95,10.18c-9.34,1.42-7.32,7.32-18.66,5.91,0,0-4.1-6.42,1.98-13.05,4.02-4.39,11.89-8.05,17.52-7.43,1.9.21,6.39,3.8,9.12,4.39Z"/>
                        <path className="cls-2" d="M48.89,9.12s-4.05,5.86,13.38,17.33c0,0,2.84-4.04.96-7.73-1.89-3.69-14.34-9.6-14.34-9.6Z"/>
                    </g>
                    <g>
                        <path className="cls-6" d="M82.88,92.84c-1-4.86-4.35-8.64-8.63-10.39-.27-.16-.55-.31-.85-.41l-33.17-12.09-30.23,12.23c-.48.16-.94.35-1.4.57l-.05.02s-.04.02-.06.03c-3.92,1.87-6.95,5.47-7.89,10.04l-.6,2.91h83.47l-.6-2.91Z"/>
                        <path className="cls-3" d="M18.31,78.81l21.92-8.87,23.47,8.56s-1.38,10.63-22.77,10.63-22.62-10.32-22.62-10.32Z"/>
                    </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Character;