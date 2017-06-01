import wood from '../const/wood';
import woodRed from '../const/woodRed';
import metal from '../const/metal';
import { manager } from '../index';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(material, type, file) {
  const loader = new THREE.TextureLoader(manager);
  loader.load(
    file,
    (texture) => {
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.needsUpdate = true;
      switch (material) {
        case 'wood':
          wood.uniforms[type].value = texture;
          break;
        case 'woodRed':
          woodRed.uniforms[type].value = texture;
          break;
        case 'metal':
          metal.uniforms[type].value = texture;
          break;
        default:
          return false;
      }
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
