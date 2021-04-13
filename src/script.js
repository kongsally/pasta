import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import PenneRigate from './pastaShape/penneRigate.js'
import Taglierini from './pastaShape/taglierini.js'
import Strozzapreti from './pastaShape/strozzapreti.js'
import Rombi from './pastaShape/rombi.js'
import pointVertexShader from './shaders/point/vertex.glsl'
import pointFragmentShader from './shaders/point/fragment.glsl'

let pastas = [];

function addPastaMesh(pasta_geom, scene) {
  let phong = new THREE.MeshBasicMaterial({ color: 0xcccc55});
  let mesh = new THREE.Mesh(pasta_geom, phong);
  scene.add(mesh);

  let edge_geom = new THREE.EdgesGeometry(pasta_geom);
  let wire_mtl = new THREE.LineBasicMaterial({ color: 0xdddd55, linewidth: 2 });
  let wireframe = new THREE.LineSegments(edge_geom, wire_mtl);
  scene.add(wireframe);

  let point_mtl = new THREE.ShaderMaterial({
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader
  });
  let pasta_points = new THREE.Points(pasta_geom, point_mtl);
  scene.add(pasta_points);
}

function main () {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const gui = new dat.GUI()
  const canvas = document.querySelector('canvas.webgl')
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })

  camera.position.x = 0
  camera.position.y = -1.8
  camera.position.z = 0.5
  scene.add(camera)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0xeeeeee, 1.0)

  let penne_geom = PenneRigate()
  pastas.push(penne_geom)
  penne_geom.scale(0.03, 0.03, 0.03)
  penne_geom.translate(-0.7, 0, 0.5)
  addPastaMesh(penne_geom, scene)

  let taglierini_geom = Taglierini()
  pastas.push(taglierini_geom)
  taglierini_geom.translate(1.0, 0, 0)
  addPastaMesh(taglierini_geom, scene)

  let strozzapreti_geom = Strozzapreti()
  pastas.push(strozzapreti_geom)
  strozzapreti_geom.scale(0.1, 0.1, 0.1)
  addPastaMesh(strozzapreti_geom, scene)

  let rombi_geom = Rombi()
  rombi_geom.scale(0.3, 0.3, 0.3)
  rombi_geom.translate(0.5, 0, 0.5)
  pastas.push(rombi_geom)
  addPastaMesh(rombi_geom, scene)

  const clock = new THREE.Clock()
  function tick (time) {
    time *= 0.001;
      // Update controls
    controls.update()
      // Render

    renderer.render(scene, camera)
      // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  window.addEventListener('resize', () => {
      // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

      // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

      // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  window.addEventListener('click', () => {
    console.log(camera.position)
  })

  window.requestAnimationFrame(tick)
}

main()
