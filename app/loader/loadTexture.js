import material from '../const/material';
import { manager } from '../index';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(type, file) {
  const loader = new THREE.TextureLoader(manager);
  loader.load(
    file,
    (texture) => {
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.needsUpdate = true;
      material.uniforms[type].value = texture;
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
