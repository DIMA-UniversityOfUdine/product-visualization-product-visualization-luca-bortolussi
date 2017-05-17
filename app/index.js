/*  global window document requestAnimationFrame :true  */
/*  eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import loadFrag from './loader/loadFrag';
import loadVert from './loader/loadVert';
import loadTexture from './loader/loadTexture';
import loadFBXL from './loader/loadFBXL';
import material from './const/material';

const THREE = require('three');

window.THREE = THREE;
require('./lib/OrbitControls');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//  CAMERA
camera.position.z = 20;
// RENDERER
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('white');
// CONTROLS
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;
// LIGHT
const lightMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }));
lightMesh.position.set(7.0, 7.0, 7.0);
scene.add(lightMesh);

document.body.appendChild(renderer.domElement);

let shaderMaterial = '';

// DEFAULT LOADING MANAGAER
THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
THREE.DefaultLoadingManager.onLoad = () => {
  console.log('Loading Complete!');
};
THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
  // console.log(material.uniforms.specularMap);
  // console.log(material.uniforms.diffuseMap);
  // console.log(material.uniforms.roughnessMap);
  // console.log(scene);
};
THREE.DefaultLoadingManager.onError = (url) => {
  console.log(`There was an error loading  ${url}`);
};

// LOADING MANAGAER
const manager = new THREE.LoadingManager();
manager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
manager.onLoad = () => {
  console.log('finito il MANAGAER');
  console.log(material);
  console.log(material.diffuseMap);
  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: material.uniforms,
    vertexShader: material.vs,
    fragmentShader: material.fs,
  });
  // loadFBXL();
  var geometry = new THREE.SphereBufferGeometry(2, 32, 32);
  var mesh = new THREE.Mesh(geometry, shaderMaterial);
  scene.add(mesh);
};
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
manager.onError = (url) => {
  console.log(`There was an error loading  ${url}`);
};

// LOADER
loadVert();
loadFrag();
loadTexture('specularMap', 'app/textures/wood_mahogany_Specular.png');
loadTexture('diffuseMap', 'app/textures/wood_mahogany_Diffuse.png');
loadTexture('roughnessMap', 'app/textures/wood_mahogany_Roughness.png');

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

export { render, manager, shaderMaterial, scene };
