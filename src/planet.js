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

        this.light = new THREE.PointLight(0xFFFFFF, 13, 100);
        this.light.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
        scene.add(this.light);
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
    }
}