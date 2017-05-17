const THREE = require('three');

const metal  = {
  vs: null,
  fs: null,
  uniforms: {
    cspec: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
    roughness: { type: 'f', value: 0.5 },
    pointLightPosition: { type: 'v3', value: new THREE.Vector3(3, 7, 15) },
    clight: { type: 'v3', value: new THREE.Vector3(0.5, 0.5, 0.5) },
  },
};

export default metal;
