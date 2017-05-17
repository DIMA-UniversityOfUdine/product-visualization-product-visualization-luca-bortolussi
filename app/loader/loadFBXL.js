//  IMPORT
import { shaderMaterial, scene } from '../index';
import material from '../const/material';
// REQUIRE
const THREE = require('three');

window.THREE = THREE;
require('../lib/FBXLoader.js');

//  FBXL LOADER
export default function loadFBXL() {
  const loader = new THREE.FBXLoader();
  loader.load('./app/obj/plane.fbx', (object) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.ShaderMaterial({
          vertexShader: material.vs,
          fragmentShader: material.fs,
          uniforms: material.uniforms,
        });
      }
    });
    scene.add(object);


  });
}
