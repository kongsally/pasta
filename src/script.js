import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import FusilliAlFerretto from "./pastaShape/fusilliAlFerretto.js";
import FusilliLunghiBucati from "./pastaShape/fusilliLunghiBucati.js";
import PenneRigate from "./pastaShape/penneRigate.js";
import Taglierini from "./pastaShape/taglierini.js";
import Strozzapreti from "./pastaShape/strozzapreti.js";
import Rombi from "./pastaShape/rombi.js";
import GiglioOndulato from "./pastaShape/giglioOndulato.js";
import Gemelli from "./pastaShape/gemelli.js";
import Radiatori from "./pastaShape/radiatori.js";
import RavioliQuadrati from "./pastaShape/ravioliQuadrati.js";
import pointVertexShader from "./shaders/point/vertex.glsl";
import pointFragmentShader from "./shaders/point/fragment.glsl";

let pastas = [];

function addPastaMesh(pasta_geom, scene) {

  let phong = new THREE.MeshPhongMaterial({ color: 0xdddd55,
                                            side: THREE.DoubleSide });
  let mesh = new THREE.Mesh(pasta_geom, phong);
  scene.add(mesh);

  let edge_geom = new THREE.EdgesGeometry(pasta_geom);
  let wire_mtl = new THREE.LineBasicMaterial({ color: 0xdddd55, linewidth: 2 });
  let wireframe = new THREE.LineSegments(edge_geom, wire_mtl);
  //scene.add(wireframe);

  let point_mtl = new THREE.ShaderMaterial({
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader
  });
  let pasta_points = new THREE.Points(pasta_geom, point_mtl);
  scene.add(pasta_points);
}

function main() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  const gui = new dat.GUI();
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  camera.position.x = 0;
  camera.position.y = -4;
  camera.position.z = 2.0;
  scene.add(camera);

  const skyColor = 0xFFFFB1;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const light = new THREE.HemisphereLight(skyColor, groundColor, 0.7);
  scene.add(light);
  const ambLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( ambLight );

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 0.4, 1);

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xeeeeee, 1.0);

  let penne_geom = PenneRigate();
  pastas.push(penne_geom);
  penne_geom.scale(0.03, 0.03, 0.03);
  penne_geom.translate(-0.7, 0, 0.5);
  addPastaMesh(penne_geom, scene);

  let taglierini_geom = Taglierini();
  pastas.push(taglierini_geom);
  taglierini_geom.translate(1.0, 0, 0);
  addPastaMesh(taglierini_geom, scene);

  let strozzapreti_geom = Strozzapreti();
  pastas.push(strozzapreti_geom);
  strozzapreti_geom.scale(0.1, 0.1, 0.1);
  addPastaMesh(strozzapreti_geom, scene);

  let rombi_geom = Rombi();
  rombi_geom.scale(0.3, 0.3, 0.3);
  rombi_geom.translate(1.0, 0, 0.4);
  pastas.push(rombi_geom);
  addPastaMesh(rombi_geom, scene);

  let giglioO_geom = GiglioOndulato();
  giglioO_geom.scale(0.5, 0.5, 0.5);
  giglioO_geom.translate(0.5, 0, 1.2);
  pastas.push(giglioO_geom);
  addPastaMesh(giglioO_geom, scene);

  let fusilliAF_geom = FusilliAlFerretto();
  fusilliAF_geom.scale(0.01, 0.01, 0.01);
  fusilliAF_geom.translate(-0.4, 0, 0.7);
  pastas.push(fusilliAF_geom);
  addPastaMesh(fusilliAF_geom, scene);

  let fusilliLB_geom = FusilliLunghiBucati();
  fusilliLB_geom.scale(0.1, 0.1, 0.1);
  fusilliLB_geom.translate(-1.0, 0.4, 0.2);
  pastas.push(fusilliLB_geom);
  addPastaMesh(fusilliLB_geom, scene);

  let gemelli_geom = Gemelli();
  gemelli_geom.scale(0.01, 0.01, 0.01);
  gemelli_geom.translate(1.0, 0.0, 0.7);
  pastas.push(gemelli_geom);
  addPastaMesh(gemelli_geom, scene);

  let radiatori_geom = Radiatori();
  radiatori_geom.scale(0.05, 0.05, 0.05);
  radiatori_geom.translate(-1.5, 0.0, 0.0);
  addPastaMesh(radiatori_geom, scene);

  let ravioliQ_geom = RavioliQuadrati();
  ravioliQ_geom.scale(0.015, 0.015, 0.015);
  ravioliQ_geom.translate(-2.1, 0.0, 1.5);
  addPastaMesh(ravioliQ_geom, scene);

  const clock = new THREE.Clock();
  function tick(time) {
    time *= 0.001;
    // Update controls
    controls.update();
    // Render

    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("click", () => {
    console.log(camera.position);
    console.log(controls.target);
  });

  window.requestAnimationFrame(tick);
}

main();
