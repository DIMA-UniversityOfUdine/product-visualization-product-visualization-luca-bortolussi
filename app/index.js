/*  global document requestAnimationFrame :true  */
/*  eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import loadFrag from './loader/loadFrag';
import loadVert from './loader/loadVert';
import loadTexture from './loader/loadTexture';
import loadFBXL from './loader/loadFBXL';
import wood from './const/wood';
import metal from './const/metal';
import lambert from './const/lambert';
import Renderer from './component/Renderer';
import Camera from './component/Camera';
import Lights from './component/Lights';
import control from './component/control';

const THREE = require('three');

const portfolioThumb = document.getElementsByClassName('portfolio-thumb');

// RANDOM FUNCTION
function rand() {
  const number = Math.floor((Math.random() * 30) - 15);
  return (number);
}

// SCENE
const scene = new THREE.Scene();

//  CAMERA
const camera0 = new Camera(rand(), rand(), 20);
const camera1 = new Camera(rand(), rand(), 20);
const camera2 = new Camera(rand(), rand(), 20);
const camera3 = new Camera(rand(), rand(), 20);
const camera4 = new Camera(rand(), rand(), 20);
const camera5 = new Camera(rand(), rand(), 20);

// RENDERER
const renderer0 = new Renderer(300, 300, '#FAFBD4');
const renderer1 = new Renderer(300, 300, '#DCEDC1');
const renderer2 = new Renderer(300, 300, '#FFD3B6');
const renderer3 = new Renderer(300, 300, '#FFAAA5');
const renderer4 = new Renderer(300, 300, '#A8E6CF');
const renderer5 = new Renderer(300, 300, '#9896F1');

// CONTROLS
control(camera0.camera, renderer0.renderer.domElement);
control(camera1.camera, renderer1.renderer.domElement);
control(camera2.camera, renderer2.renderer.domElement);
control(camera3.camera, renderer3.renderer.domElement);
control(camera4.camera, renderer4.renderer.domElement);
control(camera5.camera, renderer5.renderer.domElement);

// LIGHTS
const frontLight = new Lights(1, 10, 10, 3, 7, 15);
scene.add(frontLight.lightMesh);
const fillLight = new Lights(1, 10, 10, -11, 3, 1);
scene.add(fillLight.lightMesh);
const backLight = new Lights(1, 10, 10, 0, 8, -15);
scene.add(backLight.lightMesh);

portfolioThumb[0].appendChild(renderer0.renderer.domElement);
portfolioThumb[1].appendChild(renderer1.renderer.domElement);
portfolioThumb[2].appendChild(renderer2.renderer.domElement);
portfolioThumb[3].appendChild(renderer3.renderer.domElement);
portfolioThumb[4].appendChild(renderer4.renderer.domElement);
portfolioThumb[5].appendChild(renderer5.renderer.domElement);

//  MATERIAL
let woodMaterial;
let metalMaterial;
let lambertMaterial;

// COMPONENT
let elica;

let allLoaded = false;

// DEFAULT LOADING MANAGAER
THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
THREE.DefaultLoadingManager.onLoad = () => {
  console.log('Loading Complete!');
  scene.traverse((child) => {
    if (child.name === 'Box333') { elica = child; console.log(elica); }
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
  (allLoaded) ? update() : null;
  requestAnimationFrame(render);
  renderer0.renderer.render(scene, camera0.camera);
  renderer1.renderer.render(scene, camera1.camera);
  renderer2.renderer.render(scene, camera2.camera);
  renderer3.renderer.render(scene, camera3.camera);
  renderer4.renderer.render(scene, camera4.camera);
  renderer5.renderer.render(scene, camera5.camera);
}

render();

export {
  render,
  manager,
  woodMaterial,
  metalMaterial,
  lambertMaterial,
  scene };
