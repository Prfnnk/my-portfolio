import React, { useEffect, useRef } from 'react';

const Scene = ({ experiment }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dynamic import of the scene module
    const loadScene = async () => {
      try {
        // Scene modules should be organized by experiment
        // Example: scenes/ParticleSystem.js, scenes/ProceduralLandscape.js, etc.
        const sceneModule = await import(`./scenes/${experiment.sceneModule}`);
        const { default: initScene } = sceneModule;

        if (initScene && typeof initScene === 'function') {
          const { scene, camera, renderer, animate } = initScene(
            canvasRef.current
          );

          sceneRef.current = scene;
          rendererRef.current = renderer;

          // Handle window resize
          const handleResize = () => {
            if (!rendererRef.current) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
          };

          window.addEventListener('resize', handleResize);

          // Start animation loop
          const animationId = animate();

          return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            // Cleanup Three.js resources
            if (renderer) {
              renderer.dispose();
              renderer.forceContextLoss();
            }
          };
        }
      } catch (error) {
        console.error(
          `Failed to load scene module: ${experiment.sceneModule}`,
          error
        );
      }
    };

    const cleanup = loadScene();

    return () => {
      cleanup?.then((fn) => fn?.());
    };
  }, [experiment.sceneModule]);

  return <canvas ref={canvasRef} className="experiment-scene-canvas" />;
};

export default Scene;
