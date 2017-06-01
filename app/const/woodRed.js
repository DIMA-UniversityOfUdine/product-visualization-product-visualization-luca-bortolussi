const THREE = require('three');

const woodRed = {
  vs: null,
  fs: null,
  uniforms: {
    specularMap: { type: 't', value: {} },
    diffuseMap: { type: 't', value: {} },
    roughnessMap: { type: 't', value: {} },
    normalMap: { type: 't', value: {} },
    normalScale: { type: 'v2', value: new THREE.Vector2(1, 1) },
    textureRepeat: { type: 'v2', value: new THREE.Vector2(3, 3) },
    ambientLight: { type: 'f' },
    frontLight: { type: 'v3', value: new THREE.Vector3() },
    fillLight: { type: 'v3', value: new THREE.Vector3() },
    backLight: { type: 'v3', value: new THREE.Vector3() },
    clight_frontLight: { type: 'v3', value: new THREE.Vector3() },
    clight_fillLight: { type: 'v3', value: new THREE.Vector3() },
    clight_backLight: { type: 'v3', value: new THREE.Vector3() },
  },
};

export default woodRed;
