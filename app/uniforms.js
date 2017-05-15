const THREE = require('three')
import map from './map';

var uniforms = {
  specularMap: { type: "t", value: map.specular},
  diffuseMap:	{ type: "t", value: map.diffusive},
  roughnessMap:	{ type: "t", value: map.roughness},
  pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
  clight:	{ type: "v3", value: new THREE.Vector3() },
  textureRepeat: { type: "v2", value: new THREE.Vector2(1,1) }
};

export default uniforms;
