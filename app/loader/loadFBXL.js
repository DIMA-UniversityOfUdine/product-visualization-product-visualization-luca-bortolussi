//  IMPORT
import { woodMaterial, metalMaterial, lambertMaterial, scene } from '../index';
import wood from '../const/wood';
// REQUIRE
const THREE = require('three');

window.THREE = THREE;
require('../lib/FBXLoader.js');

//  FBXL LOADER
export default function loadFBXL() {
  const loader = new THREE.FBXLoader();
  loader.load('./app/obj/plane.fbx', (object) => {
    object.traverse((child) => {
      console.log(child.name);
      switch (child.name) {
        case 'Object002':
          child.material = metalMaterial;
          break;
        case 'Box333':
          child.material = metalMaterial;
          break;
        case 'Cylinder182':
          child.material = metalMaterial;
          break;
        case 'Cylinder183':
          child.material = metalMaterial;
          break;
        case 'Cylinder184':
          child.material = metalMaterial;
          break;
        case 'Object001':
          child.material = lambertMaterial;
          break;
        default:
          child.material = woodMaterial;
      }
    });
    scene.add(object);
  });
}
