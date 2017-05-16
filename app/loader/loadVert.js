import material from '../const/material';

//  REQUIRE
const THREE = require('three');


//  VERTEX SHADERS LOADER
export default function loadVert() {
  const loader = new THREE.FileLoader();
  loader.load(
    'app/shaders/index.vert',
    (data) => {
      material.vs = data;
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded vert');
    },
    // Function called when download errors
    (xhr) => {
      console.error('An error happened');
    });
}
