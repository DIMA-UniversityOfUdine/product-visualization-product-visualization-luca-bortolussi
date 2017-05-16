// REQUIRE
const THREE = require('three');

//   FRAGMENT SHADER LOADER
export default function loadFrag() {
  let fs;
  const loader = new THREE.FileLoader();
  loader.load(
    './app/shaders/index.vert',
    (data) => {
      fs = data;
      console.log(fs);
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded frag');
    },
    // Function called when download errors
    (xhr) => {
      console.error('An error happened');
    });
  return fs;
}
