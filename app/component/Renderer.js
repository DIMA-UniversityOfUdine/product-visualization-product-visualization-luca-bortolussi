const THREE = require('three');

class Renderer {
  constructor(h, w, hex) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.size(h, w);
    this.color(hex);
  }
  size(w, h) {
    this.renderer.setSize(w, h);
  }
  color(hex) {
    this.renderer.setClearColor(hex);
  }
}

export default Renderer;
