const THREE = require('three');

const secondMaterial = {
  vs: null,
  fs: null,
  uniforms: {
    cspec: { type: 'v3', value: new THREE.Vector3(0.4, 0.4, 0.3) },
    cdiff: { type: 'v3', value: new THREE.Vector3(0.7, 0.0, 0.0) },
    roughness: { type: 'f', value: 0.5 },
    pointLightPosition: { type: 'v3', value: new THREE.Vector3(7.0, 7.0, 7.0) },
    clight: { type: 'v3', value: new THREE.Vector3(0.5, 0.5, 0.5) },
  },
};

export default secondMaterial;
