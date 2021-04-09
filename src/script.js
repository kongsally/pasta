import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import PenneRigate from './pastaShape/penneRigate.js'
import pointVertexShader from './shaders/point/vertex.glsl'
import pointFragmentShader from './shaders/point/fragment.glsl'

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

  camera.position.x = 5
  camera.position.y = 25
  camera.position.z = 4
  scene.add(camera)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  let material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader
  })

  let penne_geom = PenneRigate()
  let points = new THREE.Points(penne_geom, material)
  scene.add(points)

  let phong = new THREE.MeshBasicMaterial({ color: 0xaaaa00})
  let mesh = new THREE.Mesh(penne_geom, phong)
   // scene.add(mesh);

  var geo = new THREE.EdgesGeometry(penne_geom) // or WireframeGeometry( geometry )
  var mat = new THREE.LineBasicMaterial({ color: 0xbbbb00, linewidth: 2 })
  var wireframe = new THREE.LineSegments(geo, mat)
  scene.add(wireframe)

  const clock = new THREE.Clock()
  function tick () {
    const elapsedTime = clock.getElapsedTime()
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

  tick()
}

main()
