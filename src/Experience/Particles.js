import * as THREE from 'three';
import Experience from "./Experience";

import vertex from './shaders/particles/vertex.glsl';
import fragment from './shaders/particles/fragment.glsl';

export default class Particles{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.time = this.experience.time;
        this.resources = this.experience.resources

        this.count = 1000;

        if (this.debug){
            this.debugFolder = this.debug.addFolder({title: "particles"})
        }

        this.setGeometry();
        this.setMaterial();
        this.setPoints();
        
    }

    setGeometry(){
        this.geometry = new THREE.BufferGeometry();

        const positionArray = new Float32Array(this.count * 3)
        const progressArray = new Float32Array(this.count);
        const sizeArray = new Float32Array(this.count);
        const alphaArray = new Float32Array(this.count);

        for(let i = 0; i < this.count; i++){
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 20;
            positionArray[i * 3 + 1] = 0;
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

            progressArray[i] = Math.random();
            sizeArray[i] = Math.random();
            alphaArray[i] = Math.random();
        }

        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3));
        this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressArray, 1));
        this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1));
        this.geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1));
    }
    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            depthTest: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: {value : 0},
                uTexture: {value: this.resources.items.particleTexture},
                uSize: {value: 50.}
            }
        })

        if (this.debug){
            this.debugFolder.addInput(
                this.material.uniforms.uSize,
                'value',
                {min: 0, max: 200, step: 1}
            )
        }
    }
    setPoints(){
        this.mesh = new THREE.Points(this.geometry, this.material);
        this.mesh.position.y = -5;
        this.scene.add(this.mesh);
    }
    update(){
        this.material.uniforms.uTime.value = this.time.elapsed;
    }
}