//  REQUIRE
const THREE = require('three');

//  LIGHT
export default function () {
  const lightMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    }));
  lightMesh.position.set(7.0, 7.0, 7.0);
  return (lightMesh);
}
