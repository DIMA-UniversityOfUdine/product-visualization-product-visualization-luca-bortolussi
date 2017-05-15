//  IMPORT
import uniforms from '../uniforms';
import loadFrag from '../loader/loadFrag';
import loadVert from '../loader/loadVert';
import scene from '../threeComponent/scene';
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
        uniforms: uniforms,
        vertexShader: loadFrag(),
        fragmentShader: loadVert(),
      });
    });
    scene.add(object);
  });
}
