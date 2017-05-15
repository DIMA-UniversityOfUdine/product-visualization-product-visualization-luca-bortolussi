import camera from './camera';
import renderer from './renderer';

const THREE = require('three');

window.THREE = THREE;
require('../lib/OrbitControls.js');

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

export default controls;
