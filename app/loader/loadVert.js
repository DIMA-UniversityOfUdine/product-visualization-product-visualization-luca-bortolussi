//  REQUIRE
const THREE = require('three');

//  VERTEX SHADERS LOADER
export default function loadVert() {
  let vs;
  const VsLoader = new THREE.FileLoader();
  VsLoader.load(
    'app/shaders/index.vert',
    (data) => {
      vs = data;
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded vert');
    },
    // Function called when download errors
    (xhr) => {
      console.error('An error happened');
    });
  return (vs)
}
