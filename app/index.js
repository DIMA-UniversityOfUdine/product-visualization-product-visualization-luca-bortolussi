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

import material from './const/material';

const THREE = require('three');

loadVert();
loadFrag();
// loadFBXL(vs, fs)


THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

THREE.DefaultLoadingManager.onLoad = function ( ) {
  console.log( 'Loading Complete!');
};

THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  console.log(material.vs);
  console.log(material.fs);
};

THREE.DefaultLoadingManager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};


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
