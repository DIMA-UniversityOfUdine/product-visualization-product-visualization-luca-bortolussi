const THREE = require('three')
import renderer from '../threeComponent/renderer'
import render from '../function/render'

// LOAD TEXTURE
export default function loadTexture(file) {
  var texture = new THREE.TextureLoader().load(file, function(texture) {
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.anisotropy = renderer.getMaxAnisotropy();
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.needsUpdate = true;
      render();
    },
    // Function called when download progresses
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // Function called when download errors
    function(xhr) {
      console.error('An error happened');
    }
  )
  return texture;
}
