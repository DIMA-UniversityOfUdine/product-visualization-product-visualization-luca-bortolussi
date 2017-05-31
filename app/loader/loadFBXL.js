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
  loader.load('./app/obj/plane_def2.fbx', (object) => {
    object.traverse((child) => {
      console.log(child.name);
      switch (child.name) {
        case 'Object002': // VETRO
          child.material = metalMaterial;
          break;
        case 'Box333':  //ELICA
          child.material = metalMaterial;
          break;
        case 'Cylinder182': // RUOTA SINISTRA
          child.material = metalMaterial;
          break;
        case 'Cylinder183': // RUOTA ANTERIORE
          child.material = metalMaterial;
          break;
        case 'Cylinder184':// RUOTA DESTRA
          child.material = metalMaterial;
          break;
        case 'Object001': // PARTI COLORATE
          child.material = lambertMaterial;
          break;
        case 'Box327': // CORPO PRINCIPALE
          child.material = woodMaterial;
          break;
        default:
          return false;
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    scene.add(object);
  });
}
