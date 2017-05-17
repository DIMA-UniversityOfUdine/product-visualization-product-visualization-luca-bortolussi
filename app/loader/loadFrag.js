import material from '../const/material';

// REQUIRE
const THREE = require('three');

//   FRAGMENT SHADER LOADER
export default function loadFrag() {
  const loader = new THREE.FileLoader();
  loader.load(
    './app/shaders/second.frag',
    (data) => {
      material.fs = data.toString();
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded frag');
    },
    // Function called when download errors
    (xhr) => {
      console.error('An error happened');
    });
}
