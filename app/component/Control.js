/*  global window :true  */
const THREE = require('three');

window.THREE = THREE;
require('../lib/OrbitControls');

export default function control(camera, renderer) {
  const controls = new THREE.OrbitControls(camera, renderer);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.rotateSpeed = 0.35;
}
