import * as THREE from 'three';
import Experience from './Experience';
import vertexShader from './shaders/vignette/vertex.glsl'
import fragmentShader from './shaders/vignette/fragment.glsl';

export default class Vignette {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        if (this.debug){
            this.debugFolder = this.debug.addFolder({
                title: 'vignette',
            })
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()


    }

    setGeometry(){
        this.geometry = new THREE.PlaneBufferGeometry(2, 2);
    }

    setMaterial(){
        this.color = {};
        this.color.hex = "#130819";
        this.color.instance = new THREE.Color(this.color.hex);

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            uniforms: {
                uColor: {value: this.color.instance},
                uMultiplier: {value: 1.0},
                uOffset: {value: 0.0},
            }
        })

        if (this.debug){
            this.debugFolder.addInput(
                this.color,
                'hex',
                {view: 'color', label:"color"}
            )
            .on('change', () => {
                this.color.instance.set(this.color.hex)
            })
            this.debugFolder.addInput(
                this.material.uniforms.uMultiplier,
                'value',
                {min: 0.0, max: 1.0, step: 0.01, label: "multiptlier"}
            )
            this.debugFolder.addInput(
                this.material.uniforms.uOffset,
                'value',
                {min: 0.0, max: 1.0, step: 0.01, label: "offset"}
            )
        }
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }
}