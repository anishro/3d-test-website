//jshint esversion:8
import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//Setting camera perspective

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(30);
camera.position.setX(-3);

const scene = new THREE.Scene();

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({
//   color: 0xff6347,
//   // wireframe: true, display it in wireframe
// });
// const torus = new THREE.Mesh(geometry, material);

//create a light at specific position
const pointLight = new THREE.PointLight(0xffff);
pointLight.position.set(5, 5, 5);
//give light on entire screen
const abimentLight = new THREE.AmbientLight(0xffff);
scene.add(pointLight, abimentLight);
//adding wireframe of light and provide grid for position
// const lighthelper = new THREE.PointLightHelper(pointLight);
// const gridhelper = new THREE.GridHelper(200, 55);
// scene.add(lighthelper, gridhelper);
//allow mouse controls
// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(torus);

//adding background
const spacetexture = new THREE.TextureLoader().load("Earthstars.jpg");
scene.background = spacetexture;

const ngq = new THREE.TextureLoader().load("NGQ.jpg");

// const loader = new GLTFLoader();

// loader.load(
//   "western_bar.glb",
//   function (gltf) {
//     scene.add(gltf.scene);
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const ballgq = new THREE.Mesh(
  new RoundedBoxGeometry(6, 6, 6, 4, 1),
  new THREE.MeshBasicMaterial({ map: ngq })
);

scene.add(ballgq);
ballgq.position.z = 30;
ballgq.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // ballgq.rotation.x += 0.05;
  // ballgq.rotation.y += 0.075;
  // ballgq.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

//render the animations

function animate() {
  requestAnimationFrame(animate);
  ballgq.rotation.x += 0.01;
  ballgq.rotation.y += 0.006;
  ballgq.rotation.z -= 0.01;
  // controls.update();
  renderer.render(scene, camera);
}
animate();
