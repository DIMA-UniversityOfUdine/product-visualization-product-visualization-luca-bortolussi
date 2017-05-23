const THREE = require('three');

const lambert = {
  vs: null,
  fs: null,
  uniforms: {
    cspec: { type: 'v3', value: new THREE.Vector3(0.4, 0.4, 0.4) },
    cdiff: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
    roughness: { type: 'f', value: 1 },
    frontLight: { type: 'v3', value: new THREE.Vector3() },
    fillLight: { type: 'v3', value: new THREE.Vector3() },
    backLight: { type: 'v3', value: new THREE.Vector3() },
    clight: { type: 'v3', value: new THREE.Vector3() },
  },
};

export default lambert;
