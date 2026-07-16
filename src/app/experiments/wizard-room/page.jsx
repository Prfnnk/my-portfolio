'use client';
import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import './assets/css/wizard-room.scss';
import WizardRoom from './scenes/WizardRoom.jsx';

export default function WizardRoomPage() {
  const [showGuide, setShowGuide] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-hide guide after 8 seconds if no interaction
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setHasInteracted(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  // Completely unmount after fade transition completes
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => {
        setShowGuide(false);
      }, 500); // matches CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleToggleGuide = () => {
    if (showGuide && !hasInteracted) {
      setHasInteracted(true);
    } else {
      setShowGuide(true);
      setHasInteracted(false);
    }
  };

  return (
    <div className="wizard-room-page">
      <Canvas
        flat
        camera={{ position: [0.03, -0.14, 3.68], fov: 45, near: 0.1, far: 200 }}
      >
        <WizardRoom onInteraction={handleInteraction} />
      </Canvas>

      {/* Controls Guide Overlay */}
      {showGuide && (
        <div className={`controls-guide ${hasInteracted ? 'fade-out' : 'fade-in'}`}>
          <button
            className="close-button"
            onClick={() => setHasInteracted(true)}
            aria-label="Close guide"
          >
            &times;
          </button>

          <div className="guide-title">Camera Controls</div>

          <div className="guide-items">
            {/* Rotate */}
            <div className="guide-item">
              <div className="icon-wrapper">
                <svg
                  className="control-icon rotate-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 2C7.58 2 4 5.58 4 10v4c0 4.42 3.58 8 8 8s8-3.58 8-8v-4c0-4.42-3.58-8-8-8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 2v8M4 10h8" />
                  <path
                    className="swipe-arrow"
                    d="M19 8c1.5 1.5 1.5 3.5 0 5M5 8C3.5 8 3.5 10 5 13"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="item-label">Rotate</div>
              <div className="item-sub">LMB / 1 finger</div>
            </div>

            {/* Zoom */}
            <div className="guide-item">
              <div className="icon-wrapper">
                <svg
                  className="control-icon zoom-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 2C7.58 2 4 5.58 4 10v4c0 4.42 3.58 8 8 8s8-3.58 8-8v-4c0-4.42-3.58-8-8-8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    className="scroll-wheel"
                    x="11"
                    y="5"
                    width="2"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                  <path
                    className="zoom-waves"
                    d="M12 12v3M12 18v1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="item-label">Zoom</div>
              <div className="item-sub">Scroll / Pinch</div>
            </div>

            {/* Pan */}
            <div className="guide-item">
              <div className="icon-wrapper">
                <svg
                  className="control-icon pan-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="6" width="7" height="5" rx="1" strokeWidth="1.5" />
                  <text
                    x="3.2"
                    y="9.8"
                    fontSize="3.2"
                    fontWeight="900"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fill="currentColor"
                    stroke="none"
                  >
                    SHIFT
                  </text>
                  <path d="M10 8.5h1" strokeLinecap="round" strokeWidth="1.5" />
                  <path
                    d="M15 5c-1.2 0-2 .8-2 2v2.5c0 1.2.8 2 2 2s2-.8 2-2V7c0-1.2-.8-2-2-2z"
                    strokeWidth="1.5"
                  />
                  <path d="M15 5v3" strokeWidth="1.5" />
                  <path
                    className="pan-arrows"
                    d="M6 16h10M11 12v8M8 14.5l-2 1.5 2 1.5M14 14.5l2 1.5-2 1.5M9.5 13.5l1.5-1.5M12.5 18.5l-1.5 1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="item-label">Pan</div>
              <div className="item-sub">Shift + LMB / 2 fingers</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating help button to toggle guide */}
      <button
        className={`help-toggle-btn ${(!showGuide || hasInteracted) ? 'visible' : ''}`}
        onClick={handleToggleGuide}
        aria-label="Show camera controls"
        title="Camera controls help"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>
    </div>
  );
}
