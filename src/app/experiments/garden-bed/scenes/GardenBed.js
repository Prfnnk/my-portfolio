import * as THREE from 'three';

const GRID = 3;
const CELL_SIZE = 1.4;
const GROW_MS = 5000;
const SEED_FALL_MS = 600;

const PLANTS = {
  radish: {
    label: 'Radish',
    emoji: '🌶️',
    rootColor: 0xe83b5a,
    tipColor: 0xf2f2f2,
    leafColor: 0x3aa84a,
    seedColor: 0xc9a36b,
    shape: 'sphere',
  },
  carrot: {
    label: 'Carrot',
    emoji: '🥕',
    rootColor: 0xf08a2a,
    tipColor: 0xd96f17,
    leafColor: 0x2f8f3a,
    seedColor: 0x8a6a3a,
    shape: 'cone',
  },
  beet: {
    label: 'Beet',
    emoji: '🫐',
    rootColor: 0x8a1c5a,
    tipColor: 0x4a0f30,
    leafColor: 0x6abf3b,
    seedColor: 0x5a3a22,
    shape: 'flatSphere',
  },
};

function initScene(canvas, options = {}) {
  const { onHarvest = () => {} } = options;

  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 6.5, 6.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(5, 8, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x6ab04c })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.15;
  ground.receiveShadow = true;
  scene.add(ground);

  // Bed frame
  const bedSize = GRID * CELL_SIZE + 0.4;
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x6b4226 });
  const frameH = 0.2;
  const frameT = 0.15;
  const makeFrame = (w, d, x, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, frameH, d), frameMat);
    m.position.set(x, frameH / 2 - 0.05, z);
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
  };
  makeFrame(bedSize, frameT, 0, bedSize / 2);
  makeFrame(bedSize, frameT, 0, -bedSize / 2);
  makeFrame(frameT, bedSize, bedSize / 2, 0);
  makeFrame(frameT, bedSize, -bedSize / 2, 0);

  const soil = new THREE.Mesh(
    new THREE.BoxGeometry(bedSize - frameT, 0.15, bedSize - frameT),
    new THREE.MeshStandardMaterial({ color: 0x5d3a1a })
  );
  soil.position.y = -0.05;
  soil.receiveShadow = true;
  scene.add(soil);

  // Cells
  const cells = [];
  const cellMeshes = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const x = (c - 1) * CELL_SIZE;
      const z = (r - 1) * CELL_SIZE;
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      scene.add(group);

      const hole = new THREE.Mesh(
        new THREE.CircleGeometry(0.32, 24),
        new THREE.MeshStandardMaterial({ color: 0x2b1808 })
      );
      hole.rotation.x = -Math.PI / 2;
      hole.position.y = 0.03;
      hole.receiveShadow = true;
      group.add(hole);

      const click = new THREE.Mesh(
        new THREE.PlaneGeometry(CELL_SIZE * 0.95, CELL_SIZE * 0.95),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      click.rotation.x = -Math.PI / 2;
      click.position.y = 0.04;
      click.userData.cellIndex = cells.length;
      group.add(click);
      cellMeshes.push(click);

      cells.push({
        state: 'empty',
        group,
        plant: null,
        seed: null,
        plantedAt: 0,
        seedStart: 0,
        plantType: null,
        row: r,
        col: c,
      });
    }
  }

  // Plant builders
  const createPlant = (type) => {
    const cfg = PLANTS[type];
    const g = new THREE.Group();
    const rootMat = new THREE.MeshStandardMaterial({ color: cfg.rootColor });
    const tipMat = new THREE.MeshStandardMaterial({ color: cfg.tipColor });
    const leafMat = new THREE.MeshStandardMaterial({
      color: cfg.leafColor,
      side: THREE.DoubleSide,
    });

    let root;
    if (cfg.shape === 'cone') {
      root = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.7, 16), rootMat);
      root.position.y = 0.1;
      root.rotation.x = Math.PI;
    } else if (cfg.shape === 'flatSphere') {
      root = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), rootMat);
      root.scale.set(1.1, 0.85, 1.1);
      root.position.y = 0.16;
    } else {
      root = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), rootMat);
      root.scale.y = 1.3;
      root.position.y = 0.18;
    }
    root.castShadow = true;
    g.add(root);

    if (cfg.shape !== 'cone') {
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.18, 12),
        tipMat
      );
      tip.position.y = -0.02;
      tip.rotation.x = Math.PI;
      g.add(tip);
    }

    const leafCount = cfg.shape === 'cone' ? 6 : 5;
    const leafY = cfg.shape === 'cone' ? 0.45 : 0.5;
    for (let i = 0; i < leafCount; i++) {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 10, 10),
        leafMat
      );
      leaf.scale.set(0.5, cfg.shape === 'cone' ? 2.0 : 1.6, 0.2);
      const a = (i / leafCount) * Math.PI * 2;
      leaf.position.set(Math.cos(a) * 0.08, leafY, Math.sin(a) * 0.08);
      leaf.rotation.z = -Math.cos(a) * 0.4;
      leaf.rotation.x = Math.sin(a) * 0.4;
      leaf.castShadow = true;
      g.add(leaf);
    }
    return g;
  };

  const createSprout = (type) => {
    const cfg = PLANTS[type];
    const g = new THREE.Group();
    const leafMat = new THREE.MeshStandardMaterial({
      color: cfg.leafColor,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 3; i++) {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        leafMat
      );
      leaf.scale.set(0.4, 1.2, 0.15);
      const a = (i / 3) * Math.PI * 2;
      leaf.position.set(Math.cos(a) * 0.04, 0.15, Math.sin(a) * 0.04);
      leaf.rotation.z = -Math.cos(a) * 0.3;
      leaf.castShadow = true;
      g.add(leaf);
    }
    return g;
  };

  const createSeed = (type) => {
    const cfg = PLANTS[type];
    const seed = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 10, 10),
      new THREE.MeshStandardMaterial({ color: cfg.seedColor })
    );
    seed.scale.set(1, 0.7, 1);
    seed.castShadow = true;
    return seed;
  };

  // Raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const flying = [];
  let selectedPlant = 'radish';
  let basketPos = new THREE.Vector3();

  const screenToWorld = (sx, sy) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((sx - rect.left) / rect.width) * 2 - 1,
      -((sy - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
    const out = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, out);
    return out;
  };

  const onClick = (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(cellMeshes, false);
    if (!hits.length) return;
    const idx = hits[0].object.userData.cellIndex;
    const cell = cells[idx];

    if (cell.state === 'empty') {
      const type = selectedPlant;
      const seed = createSeed(type);
      seed.position.set(0, 1.6, 0);
      cell.group.add(seed);
      cell.seed = seed;
      cell.plantType = type;
      cell.state = 'seeding';
      cell.seedStart = performance.now();
    } else if (cell.state === 'ready' && cell.plant && cell.plantType) {
      cell.state = 'harvesting';
      const plant = cell.plant;
      const type = cell.plantType;
      cell.plant = null;
      const worldPos = new THREE.Vector3();
      plant.getWorldPosition(worldPos);
      cell.group.remove(plant);
      plant.position.copy(worldPos);
      scene.add(plant);
      flying.push({
        mesh: plant,
        start: worldPos.clone(),
        startTime: performance.now(),
        cellIndex: idx,
        plantType: type,
      });
    }
  };
  renderer.domElement.addEventListener('click', onClick);

  const onMove = (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(cellMeshes, false);
    let pointer = false;
    if (hits.length) {
      const idx = hits[0].object.userData.cellIndex;
      const s = cells[idx].state;
      if (s === 'empty' || s === 'ready') pointer = true;
    }
    renderer.domElement.style.cursor = pointer ? 'pointer' : 'default';
  };
  renderer.domElement.addEventListener('mousemove', onMove);

  const onResize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  let raf = 0;
  const animate = () => {
    const now = performance.now();

    for (const cell of cells) {
      // Seed falling
      if (cell.state === 'seeding' && cell.seed) {
        const t = Math.min(1, (now - cell.seedStart) / SEED_FALL_MS);
        const ease = t * t;
        const startY = 1.6;
        const endY = 0.04;
        cell.seed.position.y = startY + (endY - startY) * ease;
        cell.seed.rotation.x += 0.2;
        cell.seed.rotation.z += 0.15;
        if (t >= 1) {
          cell.group.remove(cell.seed);
          cell.seed = null;
          const type = cell.plantType;
          const plant = createSprout(type);
          plant.position.y = -0.3;
          plant.scale.setScalar(0.01);
          cell.group.add(plant);
          cell.plant = plant;
          cell.state = 'growing';
          cell.plantedAt = now;
        }
      }

      if (cell.state === 'growing' && cell.plant && cell.plantType) {
        const t = Math.min(1, (now - cell.plantedAt) / GROW_MS);
        if (t < 0.4) {
          const p = t / 0.4;
          cell.plant.scale.setScalar(0.2 + p * 0.8);
          cell.plant.position.y = -0.2 + p * 0.2;
        } else {
          if (!cell.plant.userData.isFull) {
            cell.group.remove(cell.plant);
            const r = createPlant(cell.plantType);
            r.userData.isFull = true;
            cell.group.add(r);
            cell.plant = r;
            cell.plant.position.y = -0.3;
            cell.plant.scale.setScalar(0.6);
          }
          const p = (t - 0.4) / 0.6;
          cell.plant.scale.setScalar(0.6 + p * 0.4);
          cell.plant.position.y = -0.3 + p * 0.3;
        }
        if (t >= 1) cell.state = 'ready';
      }

      if (cell.state === 'ready' && cell.plant) {
        cell.plant.position.y = 0 + Math.sin(now * 0.003) * 0.03;
      }
    }

    const target = basketPos.clone();
    for (let i = flying.length - 1; i >= 0; i--) {
      const f = flying[i];
      const elapsed = now - f.startTime;
      const dur = 900;
      const t = Math.min(1, elapsed / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      f.mesh.position.lerpVectors(f.start, target, ease);
      f.mesh.position.y += Math.sin(t * Math.PI) * 1.8;
      f.mesh.rotation.y += 0.2;
      f.mesh.rotation.x += 0.1;
      const s = 1 - t * 0.7;
      f.mesh.scale.setScalar(s);
      if (t >= 1) {
        scene.remove(f.mesh);
        flying.splice(i, 1);
        const type = f.plantType;
        cells[f.cellIndex].state = 'empty';
        cells[f.cellIndex].plantType = null;
        onHarvest(type);
      }
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  animate();

  // Return public API
  return {
    scene,
    camera,
    renderer,
    animate: () => raf,
    setSelectedPlant: (plant) => {
      selectedPlant = plant;
    },
    setBasketPosition: (x, y) => {
      basketPos = screenToWorld(x, y);
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('mousemove', onMove);
      renderer.dispose();
    },
  };
}

export default initScene;
