import * as THREE from 'three';

export class Sun {
    constructor(scene) {
        const geometry = new THREE.SphereGeometry(60);

        const texture = new THREE.TextureLoader().load('assets/sun.jpg');
        const material = new THREE.MeshBasicMaterial({map: texture});

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        this.light = new THREE.PointLight(0xFFFFFF, 500000, 10000000);
        this.light.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
        scene.add(this.light);
    }

    update(dt) {
        this.mesh.rotation.x += 0.01 * dt;
        this.mesh.rotation.y += 0.1 * dt;
    }
}