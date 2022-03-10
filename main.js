//jshint esversion:8
import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
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

const scene = new THREE.Scene();

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  // wireframe: true, display it in wireframe
});
const torus = new THREE.Mesh(geometry, material);

//create a light at specific position
const pointLight = new THREE.PointLight(0xffff);
pointLight.position.set(5, 5, 5);
//give light on entire screen
const abimentLight = new THREE.AmbientLight(0xffff);
scene.add(pointLight, abimentLight);
//adding wireframe of light and provide grid for position
const lighthelper = new THREE.PointLightHelper(pointLight);
const gridhelper = new THREE.GridHelper(200, 55);
scene.add(lighthelper, gridhelper);
//allow mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(torus);

//adding background
const spacetexture = new THREE.TextureLoader().load("mirrors.png");
scene.background = spacetexture;

const ngq = new THREE.TextureLoader().load("NGQ.jpg");

const ballgq= new THREE.Mesh(
  new RoundedBoxGeometry(10,10,10,10,6),
  new THREE.MeshBasicMaterial({map: ngq})
);

scene.add(ballgq);

//render the animations

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.006;
  torus.rotation.z -= 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
