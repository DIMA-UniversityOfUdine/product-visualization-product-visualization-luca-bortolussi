import renderer from '../threeComponent/renderer';

const THREE = require('three');

// LOAD TEXTURE
export default function loadTexture(file) {
  let texture;
  const loader = new THREE.TextureLoader();
  loader.load(
    file,
    (tex) => {
      texture = tex;
      console.log(texture);;
    },
    // Function called when download progresses
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded text');
    },
    // Function called when download errors
    (xhr) => {
      console.log( 'An error happened' );
    });
  return (texture);
}
