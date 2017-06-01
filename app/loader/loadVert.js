import wood from '../const/wood';
import woodRed from '../const/woodRed';
import metal from '../const/metal';
import lambert from '../const/lambert';
import { manager } from '../index';

//  REQUIRE
const THREE = require('three');


//  VERTEX SHADERS LOADER
export default function loadVert() {
  const loader = new THREE.FileLoader(manager);
  loader.load(
    'app/shaders/index.vert',
    (data) => {
      wood.vs = data;
      woodRed.vs = data;
      metal.vs = data;
      lambert.vs = data;
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
