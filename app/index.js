import uniforms from './uniforms';

import scene from './threeComponent/scene';
import camera from './threeComponent/camera';
import renderer from './threeComponent/renderer';
import LightMesh from './threeComponent/lightMesh';
import controls from './threeComponent/controls'

import render from './function/render';

import loadFBXL from './loader/loadFBXL';

const THREE = require('three');

/*  ---------SHADERS LOADER-------------  */
function init() {
  const object = loadFBXL();
  const lightMesh = LightMesh();
  scene.add(lightMesh);
  scene.add(camera)

  uniforms.pointLightPosition.value = new THREE.Vector3(
    lightMesh.position.x,
    lightMesh.position.y,
    lightMesh.position.z
  );

  document.body.appendChild(renderer.domElement);

  // render();
}

init();

// function update() {
//   requestAnimationFrame( update );
//   stats.update();
// }
