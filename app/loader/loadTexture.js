import material from '../const/material';
import { manager } from '../index';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(type, file) {
  const loader = new THREE.TextureLoader(manager);
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
