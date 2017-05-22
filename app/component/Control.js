const THREE = require('three');

window.THREE = THREE;
require('../lib/OrbitControls');

class Control {
  constructor(camera, renderer) {
    this.controls = new THREE.OrbitControls(camera, renderer);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.rotateSpeed = 0.35;
  }
}

export default Control;
