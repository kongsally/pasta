import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats-js";
import dat from "dat.gui";
import { PastaGeometry, pastaNames } from "./index.js";
import pastaMatcapTextureUrl from "../media/pasta_matcap.jpeg";

const config = {
  pastaScale: 5,
  turntableSpeed: 2
};

const boxCenter = new THREE.Vector3();
const boxSize = new THREE.Vector3();

function createNormalizedPastaGeometry(name) {
  const geometry = PastaGeometry(name);
  geometry.deleteAttribute("normal");
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  if (geometry.boundingBox) {
    geometry.boundingBox.getCenter(boxCenter);
    geometry.boundingBox.getSize(boxSize);
    const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z) || 1;

    geometry.translate(-boxCenter.x, -boxCenter.y, -boxCenter.z);
    geometry.scale(config.pastaScale / maxDimension, config.pastaScale / maxDimension, config.pastaScale / maxDimension);
  }

  return geometry;
}

function main() {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const stats = new Stats();
  stats.setMode(1);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);

  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    viewport.width / viewport.height,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load(pastaMatcapTextureUrl);
  matcapTexture.colorSpace = THREE.SRGBColorSpace;

  const meshMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
    side: THREE.DoubleSide
  });

  const geometryByName = new Map();
  const pastaBlocks = [];
  const gridSpacing = config.pastaScale * 1.5;
  
  const createBlock = (x, y, z, pastaName) => {
    const mesh = new THREE.Mesh(geometryByName.get(pastaName), meshMaterial);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 4; // Tilt upward at 45 degrees
    
    mesh.userData = {
      pastaName,
      spinAngle: 0
    };
    scene.add(mesh);
    pastaBlocks.push(mesh);
  };
  
  const rebuildScene = () => {
    // Rebuild geometries
    geometryByName.clear();
    for (const pastaName of pastaNames) {
      geometryByName.set(pastaName, createNormalizedPastaGeometry(pastaName));
    }
    
    // Rebuild pasta blocks
    pastaBlocks.forEach(block => scene.remove(block));
    pastaBlocks.length = 0;
    
    for (let i = 0; i < pastaNames.length; i++) {
      const x = i * gridSpacing;
      const shape = pastaNames[i];
      createBlock(x, 0, 0, shape);
    }
  };
  
  rebuildScene();

  const arrayMiddleX = (pastaNames.length - 1) * gridSpacing / 2;
  camera.position.set(arrayMiddleX, 0, 35);
  camera.lookAt(arrayMiddleX, 0, 0);
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(arrayMiddleX, 0, 0);
  controls.autoRotate = false;
  controls.update();

  renderer.setSize(viewport.width, viewport.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x252525, 1.0);

  // Setup dat.gui
  const gui = new dat.GUI();
  gui.add(config, 'pastaScale', 0.5, 10, 0.1).name('Pasta Scale').onChange(() => {
    rebuildScene();
  });
  gui.add(config, 'turntableSpeed', 0, 5, 0.1).name('Turntable Speed');

  const clock = new THREE.Clock();

  function tick() {
    const delta = clock.getDelta();

    stats.begin();

    // Update pasta blocks - spin like turntable around Y-axis
    pastaBlocks.forEach((block) => {
      block.userData.spinAngle += config.turntableSpeed * delta;
      block.rotation.x = Math.PI / 2; // Keep upward tilt
      block.rotation.z = block.userData.spinAngle;
    });

    controls.update();

    renderer.render(scene, camera);

    stats.end();

    window.requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    viewport.width = window.innerWidth;
    viewport.height = window.innerHeight;

    camera.aspect = viewport.width / viewport.height;
    camera.updateProjectionMatrix();

    renderer.setSize(viewport.width, viewport.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.requestAnimationFrame(tick);
}

main();
