const THREE = require('three');

// const material = {
//   vs: null,
//   fs: null,
//   uniforms: {
//     specularMap: { type: 't', value: null },
//     diffuseMap: { type: 't', value: null },
//     roughnessMap: { type: 't', value: null },
//     pointLightPosition: { type: 'v3', value: new THREE.Vector3(7, 7, 7) },
//     clight: { type: 'v3', value: new THREE.Vector3(1, 1, 1) },
//     textureRepeat: { type: 'v2', value: new THREE.Vector2(1, 1) },
//   },
// };

const material = {
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

export default material;
