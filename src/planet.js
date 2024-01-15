import * as THREE from 'three';
import {texture} from "three/nodes";

export class Planet {
    constructor(scene, planetSize, orbitalRadius, texturePath = '', orbitalPeriod = 0, orbitalInclination = 0) {
        const geometry = new THREE.SphereGeometry(planetSize);

        var material;

        if (texturePath) {
            const texture = new THREE.TextureLoader().load(texturePath);
            material = new THREE.MeshPhongMaterial({map: texture});
        } else {
            material = new THREE.MeshPhongMaterial({color: 0xFCB82F});
        }

        this.planetSize = planetSize;
        this.orbitalRadius = orbitalRadius;
        this.orbitalPeriod = orbitalPeriod;
        this.orbitalInclination = orbitalInclination * 2;
        this.orbitalSpeed = (1 / this.orbitalRadius);

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = this.orbitalRadius;
        scene.add(this.mesh);

        this.moons = [];

        this.scene = scene;
    }

    update(dt, speedFactor) {
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;

        this.orbitalPeriod += this.orbitalSpeed * speedFactor * dt;

        if (this.orbitalPeriod >= 360) {
            this.orbitalPeriod = 0;
        }

        this.mesh.position.x = (Math.sin(this.orbitalPeriod * Math.PI/180) * this.orbitalRadius);
        this.mesh.position.z = (Math.cos(this.orbitalPeriod * Math.PI/180) * this.orbitalRadius);
        this.mesh.position.y = (Math.sin(this.orbitalPeriod * Math.PI/180) * this.orbitalInclination);

        this.moons.forEach((moon)=> {
            moon.mesh.position.x = (Math.sin(moon.orbitalPeriod * Math.PI/180) * moon.distance) + this.mesh.position.x;
            moon.mesh.position.z = (Math.cos(moon.orbitalPeriod * Math.PI/180) * moon.distance) + this.mesh.position.z;
            moon.mesh.position.y = (Math.sin(moon.orbitalPeriod * Math.PI/180) * moon.inclination) + this.mesh.position.y;

            moon.orbitalPeriod += (1 / moon.distance) * dt * speedFactor;

            if (moon.orbitalPeriod >= 360) {
                moon.orbitalPeriod = 0;
            }
        })
    }

    addMoon(texturePath, distance, moonSize, inclination = 0){
        const geometry = new THREE.SphereGeometry(moonSize);
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshPhongMaterial({map: texture});
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = this.mesh.position.x;
        mesh.position.z = this.mesh.position.z;
        mesh.position.y = this.mesh.position.y;

        this.moons.push({
            mesh,
            distance,
            orbitalPeriod: 0,
            inclination
        });

        this.scene.add(mesh)
    }
}