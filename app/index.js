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

const portfolioThumb = document.getElementsByClassName('portfolio-thumb');

const scene = new THREE.Scene();
const camera0 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera1 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);

const renderer0 = new THREE.WebGLRenderer();
const renderer1 = new THREE.WebGLRenderer();
const renderer2 = new THREE.WebGLRenderer();
const renderer3 = new THREE.WebGLRenderer();

const controls0 = new THREE.OrbitControls(camera0, renderer0.domElement);
const controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
const controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
const controls3 = new THREE.OrbitControls(camera3, renderer2.domElement);

//  CAMERA
camera0.position.z = 20;
camera1.position.z = 20;
camera2.position.z = 20;
camera3.position.z = 20;
// RENDERER
renderer0.setSize(300, 300);
renderer0.setClearColor('#A8E6CF');
renderer1.setSize(300, 300);
renderer1.setClearColor('#DCEDC1');
renderer2.setSize(300, 300);
renderer2.setClearColor('#FFD3B6');
renderer3.setSize(300, 300);
renderer3.setClearColor('#FFAAA5');
// CONTROLS0
controls0.enableDamping = true;
controls0.dampingFactor = 0.25;
controls0.rotateSpeed = 0.35;
// CONTROLS1
controls1.enableDamping = true;
controls1.dampingFactor = 0.25;
controls1.rotateSpeed = 0.35;
// CONTROLS2
controls2.enableDamping = true;
controls2.dampingFactor = 0.25;
controls2.rotateSpeed = 0.35;
// CONTROLS3
controls3.enableDamping = true;
controls3.dampingFactor = 0.25;
controls3.rotateSpeed = 0.35;
// LIGHT
const lightMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }));
lightMesh.position.set(7.0, 7.0, 7.0);
scene.add(lightMesh);


portfolioThumb[0].appendChild(renderer0.domElement);
portfolioThumb[1].appendChild(renderer1.domElement);
portfolioThumb[2].appendChild(renderer2.domElement);
portfolioThumb[3].appendChild(renderer3.domElement);

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
  console.log(material.diffuseMap);
  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: material.uniforms,
    vertexShader: material.vs,
    fragmentShader: material.fs,
  });
  loadFBXL();
  // const geometry = new THREE.SphereBufferGeometry(2, 32, 32);
  // const mesh = new THREE.Mesh(geometry, shaderMaterial);
  // scene.add(mesh);
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
  renderer0.render(scene, camera0);
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
  renderer3.render(scene, camera3);
}

render();

export { render, manager, shaderMaterial, scene };
