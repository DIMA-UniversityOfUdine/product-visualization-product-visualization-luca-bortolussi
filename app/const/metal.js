const THREE = require('three');

const metal = {
  vs: null,
  fs: null,
  uniforms: {
    specularMap: { type: 't', value: {} },
    diffuseMap: { type: 't', value: {} },
    roughnessMap: { type: 't', value: {} },
    textureRepeat: { type: 'v2', value: new THREE.Vector2(1, 1) },
    // cspec: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
    // roughness: { type: 'f', value: 0.5 },
    frontLight: { type: 'v3', value: new THREE.Vector3() },
    fillLight: { type: 'v3', value: new THREE.Vector3() },
    backLight: { type: 'v3', value: new THREE.Vector3() },
    clight_frontLight: { type: 'v3', value: new THREE.Vector3() },
    clight_fillLight: { type: 'v3', value: new THREE.Vector3() },
    clight_backLight: { type: 'v3', value: new THREE.Vector3() },
  },
};

export default metal;
