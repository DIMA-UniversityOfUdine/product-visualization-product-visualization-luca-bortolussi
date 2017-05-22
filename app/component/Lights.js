const THREE = require('three');

class Lights {
  constructor(r, w, h, x, y, z) {
    this.lightMesh = new THREE.Mesh(new THREE.SphereGeometry(r, w, h),
    new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
    this.position(x, y, z);
  }
  position(x, y, z) {
    this.lightMesh.position.set(x, y, z);
  }
}

export default Lights;
