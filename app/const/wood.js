const THREE = require('three');

const wood = {
  vs: null,
  fs: null,
  uniforms: {
    specularMap: { type: 't', value: {} },
    diffuseMap: { type: 't', value: {} },
    roughnessMap: { type: 't', value: {} },
    pointLightPosition: { type: 'v3', value: new THREE.Vector3(3, 7, 15) },
    clight: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
    textureRepeat: { type: 'v2', value: new THREE.Vector2(1, 1) },
  },
};

export default wood;
