import wood from '../const/wood';
import metal from '../const/metal';
import lambert from '../const/lambert';
import { manager } from '../index';

// REQUIRE
const THREE = require('three');

//   FRAGMENT SHADER LOADER
export default function loadFrag(file) {
  const loader = new THREE.FileLoader(manager, file);
  loader.load(
    `./app/shaders/${file}.frag`,
    (data) => {
      switch (file) {
        case 'woodShader':
          wood.fs = data.toString();
          break;
        case 'metalShader':
          metal.fs = data.toString();
          break;
        case 'lambertShader':
          lambert.fs = data.toString();
          break;
        default:
          return (null);
      }
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
