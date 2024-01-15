import * as THREE from 'three';
import {EffectComposer, OrbitControls, OutputPass, RenderPass, UnrealBloomPass} from "three/addons";

import { Sun } from './sun.js';
import { Planet } from './planet.js';
import { Skybox} from "./skybox.js";
import {Clock} from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

const skybox = new Skybox(scene);

const sun = new Sun(scene);

var planets = [];
planets.push(new Planet(scene, 6, 200, './assets/mercury-texture.webp', Math.random()*360, 7));
planets.push(new Planet(scene, 5, 300, './assets/venus-texture.webp', Math.random()*360, 3.4));
planets.push(new Planet(scene, 5.2, 400, './assets/earth-texture.webp', Math.random()*360, 0));
planets.push(new Planet(scene, 2.8, 500, './assets/mars-texture.webp', Math.random()*360, 1.85));
planets.push(new Planet(scene, 30, 700, './assets/jupiter-texture.webp', Math.random()*360, 1.3));
planets.push(new Planet(scene, 25, 1000, './assets/saturn-texture.webp', Math.random()*360, 2.5));
planets.push(new Planet(scene, 10.5, 1300, './assets/uranus-texture.webp', Math.random()*360, 0.8));
planets.push(new Planet(scene, 10.1, 1600, './assets/neptune-texture.webp', Math.random()*360, 17.2));

planets[2].addMoon("assets/moon-texture.webp",20,1.7,10);
planets[3].addMoon("assets/mars-moon-P.png",15,1,-1);//phobos
planets[3].addMoon("assets/mars-moon-D.png",25,0.7,3); //deimos

const clock = new Clock();

var speedFactor = 5000;
var target = sun;

// post processing
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4, .5, 0.1);

const outputPass = new OutputPass();

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);
var vec3 = new THREE.Vector3();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    const dt = clock.getDelta();

    update(dt);
    draw();
}
gameLoop();

function update(dt) {

    vec3.subVectors(camera.position, target.mesh.position);

    sun.update(dt);

    planets.forEach((planet) => {
        planet.update(dt, speedFactor);
    });

    // controls.target.copy(target.mesh.position);
    controls.object.position.copy(target.mesh.position).add(vec3);//.add(new THREE.Vector3(0, 50, 0));

    controls.target.copy(target.mesh.position);
    controls.update();
}

function draw() {
    // renderer.render(scene, camera);
    composer.render();
}

// GUI
const gui = document.querySelector('.gui');

const guiToggle = gui.querySelector('#toggle');
guiToggle.addEventListener('click', function() {
    gui.querySelector('.options').classList.toggle('show');
});

const guiSetSpeeds = gui.querySelectorAll('.set-speed');
guiSetSpeeds.forEach((guiSetSpeed) => {
    guiSetSpeed.addEventListener('click', function() {
        guiSetSpeeds.forEach((guiSetSpeedItem) => { guiSetSpeedItem.classList.remove('active') });
        this.classList.add('active');
        speedFactor = 5000 * (guiSetSpeed.dataset.speed/100);
    })
});

const guiGoTos = gui.querySelectorAll('.go-to');

guiGoTos.forEach((guiGoTo) => {
    guiGoTo.addEventListener('click', function() {
        controls.reset();

        if (guiGoTo.dataset.object === 'sun') {
            target = sun;
        } else {
            target = planets[guiGoTo.dataset.object];
        }

        camera.position.x = target.mesh.position.x;
        camera.position.y = target.mesh.position.y;
        camera.position.z = target.mesh.position.z + 100;
    });
})
