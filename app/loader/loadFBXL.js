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
    // for (let i = 0; i < object.children.length; i++) {
    //   if (object.children[i].geometry) {
    //     let geometry = object.children[i].geometry;
    //     geometry.center();
    //     let mesh = new THREE.Mesh(geometry, shaderMaterial);
    //     scene.add(mesh);
    //   }
    // }


    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.ShaderMaterial({
          uniforms: material.uniforms,
          vertexShader: material.vs,
          fragmentShader: material.fs,
        });
      }
    });
    scene.add(object);


  });
}
