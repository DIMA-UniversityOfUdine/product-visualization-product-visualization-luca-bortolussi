/*  global window document requestAnimationFrame :true  */
/*  eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import loadFrag from './loader/loadFrag';
import loadVert from './loader/loadVert';
import loadTexture from './loader/loadTexture';
import loadFBXL from './loader/loadFBXL';
import wood from './const/wood';
import metal from './const/metal';
import lambert from './const/lambert';

const THREE = require('three');

window.THREE = THREE;
require('./lib/OrbitControls');

const portfolioThumb = document.getElementsByClassName('portfolio-thumb');

const scene = new THREE.Scene();

const camera0 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera1 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera4 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const camera5 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);

const renderer0 = new THREE.WebGLRenderer();
const renderer1 = new THREE.WebGLRenderer();
const renderer2 = new THREE.WebGLRenderer();
const renderer3 = new THREE.WebGLRenderer();
const renderer4 = new THREE.WebGLRenderer();
const renderer5 = new THREE.WebGLRenderer();

const controls0 = new THREE.OrbitControls(camera0, renderer0.domElement);
const controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
const controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
const controls3 = new THREE.OrbitControls(camera3, renderer3.domElement);
const controls4 = new THREE.OrbitControls(camera4, renderer4.domElement);
const controls5 = new THREE.OrbitControls(camera5, renderer5.domElement);

function rand() {
  const number = Math.floor((Math.random() * 30) - 15);
  return (number);
}

//  CAMERA
camera0.position.set(rand(), rand(), 20);
camera0.lookAt(new THREE.Vector3(0, 0, 0));
camera1.position.set(rand(), rand(), 20);
camera1.lookAt(new THREE.Vector3(0, 0, 0));
camera2.position.set(rand(), rand(), 20);
camera2.lookAt(new THREE.Vector3(0, 0, 0));
camera3.position.set(rand(), rand(), 20);
camera3.lookAt(new THREE.Vector3(0, 0, 0));
camera4.position.set(rand(), rand(), 20);
camera4.lookAt(new THREE.Vector3(0, 0, 0));
camera5.position.set(rand(), rand(), 20);
camera5.lookAt(new THREE.Vector3(0, 0, 0));
// RENDERER
renderer0.setSize(300, 300);
renderer0.setClearColor('#FAFBD4');
renderer1.setSize(300, 300);
renderer1.setClearColor('#DCEDC1');
renderer2.setSize(300, 300);
renderer2.setClearColor('#FFD3B6');
renderer3.setSize(300, 300);
renderer3.setClearColor('#FFAAA5');
renderer4.setSize(300, 300);
renderer4.setClearColor('#A8E6CF');
renderer5.setSize(300, 300);
renderer5.setClearColor('#9896F1');
// CONTROLS0
controls0.enableDamping = true;
controls0.dampingFactor = 0.25;
controls0.rotateSpeed = 0.35;
controls1.enableDamping = true;
controls1.dampingFactor = 0.25;
controls1.rotateSpeed = 0.35;
controls2.enableDamping = true;
controls2.dampingFactor = 0.25;
controls2.rotateSpeed = 0.35;
controls3.enableDamping = true;
controls3.dampingFactor = 0.25;
controls3.rotateSpeed = 0.35;
controls4.enableDamping = true;
controls4.dampingFactor = 0.25;
controls4.rotateSpeed = 0.35;
controls5.enableDamping = true;
controls5.dampingFactor = 0.25;
controls5.rotateSpeed = 0.35;

// FRONT LIGHT
const frontLight = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }));
frontLight.position.set(3, 7, 15);
scene.add(frontLight);
// FILL LIGHT
const fillLight = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }));
fillLight.position.set(-11, 3, 1);
scene.add(fillLight);
// BACK LIGHT
const backLight = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }));
backLight.position.set(0, 8, -15);
scene.add(backLight);

portfolioThumb[0].appendChild(renderer0.domElement);
portfolioThumb[1].appendChild(renderer1.domElement);
portfolioThumb[2].appendChild(renderer2.domElement);
portfolioThumb[3].appendChild(renderer3.domElement);
portfolioThumb[4].appendChild(renderer4.domElement);
portfolioThumb[5].appendChild(renderer5.domElement);

//  MATERIAL
let woodMaterial;
let metalMaterial;
let lambertMaterial;

// COMPONENT
let elica;

let allLoaded= false;

// DEFAULT LOADING MANAGAER
THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
THREE.DefaultLoadingManager.onLoad = () => {
  console.log('Loading Complete!');
  scene.traverse((child) => {
    if (child.name === 'Box333') {elica = child; console.log(elica);}
  });
  allLoaded = true;
};
THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
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
  woodMaterial = new THREE.ShaderMaterial({
    uniforms: wood.uniforms,
    vertexShader: wood.vs,
    fragmentShader: wood.fs,
  });
  metalMaterial = new THREE.ShaderMaterial({
    uniforms: metal.uniforms,
    vertexShader: metal.vs,
    fragmentShader: metal.fs,
  });
  lambertMaterial = new THREE.ShaderMaterial({
    uniforms: lambert.uniforms,
    vertexShader: lambert.vs,
    fragmentShader: lambert.fs,
  });
  loadFBXL();
};
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
manager.onError = (url) => {
  console.log(`There was an error loading  ${url}`);
};

// LOADER
loadVert();
loadFrag('woodShader');
loadFrag('metalShader');
loadFrag('lambertShader');
loadTexture('specularMap', 'app/textures/wood_mahogany_Specular.png');
loadTexture('diffuseMap', 'app/textures/wood_mahogany_Diffuse.png');
loadTexture('roughnessMap', 'app/textures/wood_mahogany_Roughness.png');

function update() {
  elica.rotation.x += 0.1;
}

function render() {
  ( allLoaded )? update() : null;
  requestAnimationFrame(render);
  renderer0.render(scene, camera0);
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
  renderer3.render(scene, camera3);
  renderer4.render(scene, camera4);
  renderer5.render(scene, camera5);
}

render();

export {
  render,
  manager,
  woodMaterial,
  metalMaterial,
  lambertMaterial,
  scene };
