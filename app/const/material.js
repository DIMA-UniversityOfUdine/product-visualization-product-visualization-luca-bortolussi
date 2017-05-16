const THREE = require('three');

const material = {
  vs: null,
  fs: null,
  uniforms: {
    specularMap: { type: 't', value: null },
    diffuseMap: { type: 't', value: null },
    roughnessMap: { type: 't', value: null },
    pointLightPosition: { type: 'v3', value: new THREE.Vector3(7, 7, 7) },
    clight: { type: 'v3', value: new THREE.Vector3(0.5, 0.2, 0.5) },
    textureRepeat: { type: 'v2', value: new THREE.Vector2(1, 1) },
  },
};

export default material;
