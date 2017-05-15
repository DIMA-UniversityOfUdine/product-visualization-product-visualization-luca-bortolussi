// REQUIRE
const THREE = require('three');

//   FRAGMENT SHADER LOADER
export default function loadFrag() {
  let fs;
  const FsLoader = new THREE.FileLoader();
  FsLoader.load(
    './app/shaders/index.vert',
    (data) => {
      fs = data;
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Function called when download errors
    (xhr) => {
      console.error('An error happened');
    });
  return fs;
}
