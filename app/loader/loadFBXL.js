//  IMPORT
import { scene } from '../index';
import material from '../const/material';
// REQUIRE
const THREE = require('three');

window.THREE = THREE;
require('../lib/FBXLoader.js');

//  FBXL LOADER
export default function loadFBXL() {
  const ObjLoader = new THREE.FBXLoader();
  ObjLoader.load('./app/obj/plane.fbx', (object) => {
    object.traverse((child) => {
      console.log(child.name);
      child.material = new THREE.ShaderMaterial({
        uniforms: material.uniforms,
        vertexShader: material.vs,
        fragmentShader: material.fs,
      });
    });
    scene.add(object);
  });
}
