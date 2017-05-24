const THREE = require('three');

const wood = {
  vs: null,
  fs: null,
  uniforms: {
    specularMap: { type: 't', value: {} },
    diffuseMap: { type: 't', value: {} },
    roughnessMap: { type: 't', value: {} },
    normalMap: { type: 't', value: {} },
    normalScale: { type: 'v2', value: new THREE.Vector2(1, 1) },
    textureRepeat: { type: 'v2', value: new THREE.Vector2(1, 1) },
    frontLight: { type: 'v3', value: new THREE.Vector3() },
    fillLight: { type: 'v3', value: new THREE.Vector3() },
    backLight: { type: 'v3', value: new THREE.Vector3() },
    clight: { type: 'v3', value: new THREE.Vector3() },
  },
};

export default wood;
