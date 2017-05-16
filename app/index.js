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

camera.position.z = 20;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('white');

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

const lightMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);
scene.add(lightMesh);

document.body.appendChild(renderer.domElement);

loadVert();
loadFrag();
loadTexture('specularMap', 'app/textures/wood_mahogany_Specular.png');
loadTexture('diffuseMap', 'app/textures/wood_mahogany_Diffuse.png');
loadTexture('roughnessMap', 'app/textures/wood_mahogany_Roughness.png');
loadFBXL();

// LOADIN GAMANGER
THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`Started loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
};
THREE.DefaultLoadingManager.onLoad = () => {
  console.log('Loading Complete!');
};
THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files`);
  console.log(material.uniforms.specularMap);
  console.log(material.uniforms.diffuseMap);
  console.log(material.uniforms.roughnessMap);
  console.log(scene);
};
THREE.DefaultLoadingManager.onError = (url) => {
  console.log(`There was an error loading  ${url}`);
};


export default function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

export { scene };
