import material from '../const/material';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(type, file) {
  const loader = new THREE.TextureLoader();
  loader.load(
    file,
    (tex) => {
      material.uniforms[type] = tex.toString();
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded text');
    },
    // Function called when download errors
    (xhr) => {
      console.log('An error happened');
    });
}
