import * as THREE from 'three';
import { OrbitControls } from "three/addons";

import { Sun } from './sun.js';
import { Planet } from './planet.js';
import { Skybox} from "./skybox.js";
import {Clock} from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const skybox = new Skybox(scene);

const sun = new Sun(scene);

var planets = [];
planets.push(new Planet(scene, 3, 200, './assets/mercury-texture.webp', 0, 7));
planets.push(new Planet(scene, 2.5, 300, './assets/venus-texture.webp', 0, 3.4));
planets.push(new Planet(scene, 2.7, 400, './assets/earth-texture.webp', 0, 0));
planets.push(new Planet(scene, 1.4, 500, './assets/mars-texture.webp', 0, 1.85));
planets.push(new Planet(scene, 30, 700, './assets/jupiter-texture.webp', 0, 1.3));
planets.push(new Planet(scene, 25, 1000, './assets/saturn-texture.webp', 0, 2.5));
planets.push(new Planet(scene, 10.5, 1300, './assets/uranus-texture.webp', 0, 0.8));
planets.push(new Planet(scene, 10.1, 1600, './assets/neptune-texture.webp', 0, 17.2));

const clock = new Clock();

var speedFactor = 5000;

function gameLoop() {
    requestAnimationFrame(gameLoop);

    const dt = clock.getDelta();

    update(dt);
    draw();
}
gameLoop();

function update(dt) {
    controls.update();

    sun.update(dt);

    planets.forEach((planet) => {
        planet.update(dt, speedFactor);
    });
}

function draw() {
    renderer.render(scene, camera);
}