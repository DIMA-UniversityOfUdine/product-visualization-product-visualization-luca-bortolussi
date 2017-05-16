import uniforms from './uniforms';

import scene from './threeComponent/scene';
import camera from './threeComponent/camera';
import renderer from './threeComponent/renderer';
import LightMesh from './threeComponent/lightMesh';
import controls from './threeComponent/controls'

import render from './function/render';

import loadFBXL from './loader/loadFBXL';
import loadFrag from './loader/loadFrag';
import loadVert from './loader/loadVert';
import loadTexture from './loader/loadTexture';

const THREE = require('three');

let vs = loadVert();
let fs = loadFrag();
if (vs!=null & fs!=null) {
  loadFBXL(vs, fs)
}

/*  ---------SHADERS LOADER-------------  */
function init() {
  const lightMesh = LightMesh();
  scene.add(lightMesh);


  // uniforms.pointLightPosition.value = new THREE.Vector3(
  //   lightMesh.position.x,
  //   lightMesh.position.y,
  //   lightMesh.position.z
  // );

  document.body.appendChild(renderer.domElement);

  // render();
}

init();

// function update() {
//   requestAnimationFrame( update );
//   stats.update();
// }
