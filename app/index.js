const THREE = require('three')
window.THREE = THREE;
require('./lib/FBXLoader.js')
require('./lib/OrbitControls.js')

import uniforms from './uniforms'
import loadTexture from './loader/loadTexture'

import scene from './threeComponent/scene'
import camera from './threeComponent/camera'
import renderer from './threeComponent/renderer'

import render from './function/render'


document.body.appendChild(renderer.domElement);


/*---------SHADERS LOADER-------------*/
var loader = new THREE.FileLoader();
loader.load(
  'app/shaders/index.vert',
  function(data) {
    let vs = data;
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
    // child.material = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
    child.material = new THREE.MeshBasicMaterial({
      color: '#f3cf85'
    });
  });
  scene.add(object);
  console.log(object);
});

camera.position.z = 20;

var controls;
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;
