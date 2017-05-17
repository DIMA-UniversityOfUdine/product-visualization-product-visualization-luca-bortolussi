const THREE = require('three');

const lambert = {
  vs: null,
  fs: null,
  uniforms: {
    cspec: { type: 'v3', value: new THREE.Vector3(0.4, 0.4, 0.4) },
    cdiff: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
    roughness: { type: 'f', value: 1 },
    pointLightPosition: { type: 'v3', value: new THREE.Vector3(3, 7, 15) },
    clight: { type: 'v3', value: new THREE.Vector3(1, 0, 0) },
  },
};

export default lambert;
