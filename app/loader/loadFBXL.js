//  IMPORT
import uniforms from '../uniforms';
import scene from '../threeComponent/scene';
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
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
      });
    });
    scene.add(object);
  });
}
