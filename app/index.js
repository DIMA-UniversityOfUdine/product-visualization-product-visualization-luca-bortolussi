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
import control from './component/control';

const THREE = require('three');

const portfolioThumb = document.getElementsByClassName('portfolio-thumb');

// RANDOM FUNCTION
function rand_ver() {
  const number = Math.floor((Math.random() * 25) - 5);
  return (number);
}
function rand_or() {
  const number = Math.floor((Math.random() * 30) - 15);
  return (number);
}

// SCENE
const scene = new THREE.Scene();

//  CAMERA
const camera0 = new Camera(rand_or(), rand_ver(), 20);
const camera1 = new Camera(rand_or(), rand_ver(), 20);
const camera2 = new Camera(rand_or(), rand_ver(), 20);
const camera3 = new Camera(rand_or(), rand_ver(), 20);
const camera4 = new Camera(rand_or(), rand_ver(), 20);
const camera5 = new Camera(rand_or(), rand_ver(), 20);

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
const frontLight = new THREE.Light(0xff0000, 7);
frontLight.position.set(3, 4, 15);
wood.uniforms.frontLight.value = frontLight.position;
metal.uniforms.frontLight.value = frontLight.position;
lambert.uniforms.frontLight.value = frontLight.position;

const fillLight = new THREE.Light(0xff0000, 4);
fillLight.position.set(-15, 2, 3);
wood.uniforms.fillLight.value = fillLight.position;
metal.uniforms.fillLight.value = fillLight.position;
lambert.uniforms.fillLight.value = fillLight.position;

const backLight = new THREE.Light(0xff0000, 10);
backLight.position.set(0, 8, -15);
wood.uniforms.backLight.value = backLight.position;
metal.uniforms.backLight.value = backLight.position;
lambert.uniforms.backLight.value = backLight.position;

// CLIGHT
const clight_frontLight = new THREE.Vector3(1, 1, 1);
wood.uniforms.clight_frontLight.value = clight_frontLight;
metal.uniforms.clight_frontLight.value = clight_frontLight;
lambert.uniforms.clight_frontLight.value = clight_frontLight;

const clight_fillLight = new THREE.Vector3(0.3, 0.3, 0.3);
wood.uniforms.clight_fillLight.value = clight_fillLight;
metal.uniforms.clight_fillLight.value = clight_fillLight;
lambert.uniforms.clight_fillLight.value = clight_fillLight;

const clight_backLight = new THREE.Vector3(0.6, 0.6, 0.6);
wood.uniforms.clight_backLight.value = clight_backLight;
metal.uniforms.clight_backLight.value = clight_backLight;
lambert.uniforms.clight_backLight.value = clight_backLight;

// APPENDCHILD
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
let planetransport;

let allLoaded = false;

// DEFAULT LOADING MANAGAER
THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
THREE.DefaultLoadingManager.onLoad = () => {
  console.log('Loading Complete!');
  scene.traverse((child) => {
    if (child.name === 'planetransport') { planetransport = child; }
    if (child.name === 'Object002') { console.log(child.geometry.parameters); }
  });

  console.log(planetransport.children[2].geometry);
  planetransport.children[2].geometry.translate(0, 0, -0.4);
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
loadTexture('wood', 'specularMap', 'app/textures/wood_mahogany_Specular.png');
loadTexture('wood', 'diffuseMap', 'app/textures/wood_mahogany_Diffuse.png');
loadTexture('wood', 'roughnessMap', 'app/textures/wood_mahogany_roughness.png');
loadTexture('wood', 'normalMap', 'app/textures/wood_mahogany_Normal.png');

loadTexture('metal', 'specularMap', 'app/textures/metal_aluminium_directional_Specular.png');
// loadTexture('metal', 'diffuseMap', 'app/textures/metal_steel_brushed_Diffuse.png');
loadTexture('metal', 'roughnessMap', 'app/textures/metal_aluminium_directional_Roughness.png');

// UPDATE
function update() {
  planetransport.children[2].rotation.x += 0.1;
}

// RENDER
function render() {
  (allLoaded) ? update() : null;
  renderer0.renderer.render(scene, camera0.camera);
  renderer1.renderer.render(scene, camera1.camera);
  renderer2.renderer.render(scene, camera2.camera);
  renderer3.renderer.render(scene, camera3.camera);
  renderer4.renderer.render(scene, camera4.camera);
  renderer5.renderer.render(scene, camera5.camera);
  // fps limitati per non surriscaldare il portatile in fase di produzione
  setTimeout(() => {
    requestAnimationFrame(render);
  }, 1000 / 30);
}

render();

export {
  render,
  manager,
  woodMaterial,
  frontLight,
  fillLight,
  backLight,
  metalMaterial,
  lambertMaterial,
  scene };
