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

        this.count = 200000;

        if (this.debug){
            this.debugFolder = this.debug.addFolder({title: "particles"})
        }

        if (this.debug){
            this.debugFolder.addInput(this, 'count', {min: 1000, max: 1000000, step: 1})
            .on('change', () => {
                this.setGeometry()
                this.mesh.geometry = this.geometry
            })
            
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

        this.color = {};
        this.color.hex = "#ffffff";
        this.color.instance = new THREE.Color(this.color.hex);

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            depthTest: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: {value : 0},
                uTimeModifier: {value: 0.00001},
                uTexture: {value: this.resources.items.particleTexture},
                uSize: {value: 5.},
                uColor: {value:  this.color.instance}
            }
        })

        if (this.debug){
            this.debugFolder.addInput(
                this.material.uniforms.uSize,
                'value',
                {min: 0, max: 200, step: 1}
            )
            this.debugFolder.addInput(
                this.material.uniforms.uTimeModifier,
                'value',
                {min: 0, max: 0.2, step: 0.00001}
            )
            this.debugFolder.addInput(
                this.color,
                'hex',
                {view: 'color', label:"color"}
            )
            .on('change', () => {
                this.color.instance.set(this.color.hex)
            })
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