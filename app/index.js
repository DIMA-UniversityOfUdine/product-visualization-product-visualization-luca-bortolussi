const THREE = require('three')
require('./lib/FBXLoader.js')

import uniforms from './uniforms'

import scene from './threeComponent/scene'
import camera from './threeComponent/camera'
import renderer from './threeComponent/renderer'
import controls from './threeComponent/controls'
import lightMesh from './threeComponent/lightMesh'

import render from './function/render'


/*---------SHADERS LOADER-------------*/
var loader = new THREE.FileLoader();
loader.load(
  'app/shaders/index.vert',
  function(data) {
    let vs = data;
    render();
    return vs;
  },
  // Function called when download progresses
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // Function called when download errors
  function(xhr) {
    console.error('An error happened');
  }
);

loader.load(
  './app/shaders/index.vert',
  function(data) {
    let fs = data;
    render();
    return fs;
  },
  // Function called when download progresses
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  // Function called when download errors
  function(xhr) {
    console.error('An error happened');
  }
);

/*----------OBJ LOADER---------*/
var loader = new THREE.FBXLoader();
loader.load('./app/obj/plane.fbx', function(object) {
  object.traverse(function(child) {
    console.log(child.name);
    child.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs
    });
    // child.material = new THREE.MeshBasicMaterial({
    //   color: '#f3cf85'
    // });
  });
  console.log(object);
  render();
});

function init() {
  scene.add(camera)
  scene.add(object)
  scene.add(lightMesh)

  document.body.appendChild(renderer.domElement);

  uniforms.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
  render();
}

// function update() {
//   requestAnimationFrame( update );
//   stats.update();
// }
