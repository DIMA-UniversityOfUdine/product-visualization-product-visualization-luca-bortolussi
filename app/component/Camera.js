const THREE = require('three');

class Camera {
  constructor(x, y, z) {
    this.camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    this.position(x, y, z);
    this.look();
  }
  position(x, y, z) {
    this.camera.position.set(x, y, z);
  }
  look() {
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
}

export default Camera;
