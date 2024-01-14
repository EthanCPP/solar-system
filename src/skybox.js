import * as THREE from 'three';

export class Skybox {
    constructor(scene) {
        const ft = new THREE.TextureLoader().load("assets/skybox-front.jpg");
        const ftMat = new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide });

        const bk = new THREE.TextureLoader().load("assets/skybox-back.jpg");
        const bkMat = new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide });

        const up = new THREE.TextureLoader().load("assets/skybox-top.jpg");
        const upMat = new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide });

        const dn = new THREE.TextureLoader().load("assets/skybox-bottom.jpg");
        const dnMat = new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide });

        const lf = new THREE.TextureLoader().load("assets/skybox-left.jpg");
        const lfMat = new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide });

        const rt = new THREE.TextureLoader().load("assets/skybox-right.jpg");
        const rtMat = new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide });

        const matArr = [ftMat, bkMat, upMat, dnMat, lfMat, rtMat];

        const geometry = new THREE.BoxGeometry(1000000, 1000000, 1000000);

        this.mesh = new THREE.Mesh(geometry, matArr);
        scene.add(this.mesh);
    }
}