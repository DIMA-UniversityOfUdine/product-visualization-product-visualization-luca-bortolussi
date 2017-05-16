//  IMPORT
import scene from '../threeComponent/scene';
import material from '../const/material';
// REQUIRE
const THREE = require('three');

window.THREE = THREE;
require('../lib/FBXLoader.js');

//  FBXL LOADER
export default function loadFBXL(vs, fs) {
  const ObjLoader = new THREE.FBXLoader();
  let objz;
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
