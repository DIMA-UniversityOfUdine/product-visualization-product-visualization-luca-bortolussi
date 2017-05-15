import renderer from '../threeComponent/renderer';
import render from '../function/render';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(file) {
  const texture = new THREE.TextureLoader().load(file, (texture) => {
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.anisotropy = renderer.getMaxAnisotropy();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.needsUpdate = true;
    render();
  },
  // Function called when download progresses
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // Function called when download errors
  (xhr) => {
    console.error('An error happened');
  })
  return texture;
}
