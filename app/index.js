let THREE = require('three');
window.THREE = THREE;
require('./loader/FBXLoader.js');
require('./lib/OrbitControls.js')

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 'white' );
document.body.appendChild( renderer.domElement );

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( "./app/textures/wood_mahogany_Diffuse.png" , function ( texture ) {

      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.anisotropy = renderer.getMaxAnisotropy();
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.needsUpdate = true;
      render();
    },
    // Function called when download progresses
    function ( xhr ) {
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },

    // Function called when download errors
    function ( xhr ) {
      console.error( 'An error happened' );
      console.log(xhr);
    }
   )
    return texture;
}

loadTexture()

/*---------SHADERS LOADER-------------*/
var vs, fs;
var loader = new THREE.FileLoader();
loader.load(
  'app/shaders/index.vert', function ( data ) {
    vs = data;
  },
  // Function called when download progresses
  function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },

  // Function called when download errors
  function ( xhr ) {
    console.error( 'An error happened' );
  }
);

loader.load(
  './app/shaders/index.vert', function ( data ) {
    fs = data;
  },
  // Function called when download progresses
  function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },

  // Function called when download errors
  function ( xhr ) {
    console.error( 'An error happened' );
  }
);

/*----------OBJ LOADER---------*/
var loader = new THREE.FBXLoader();
loader.load( './app/obj/plane.fbx', function( object ) {
  object.traverse( function ( child ) {
    console.log( child.name);
    // child.material = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
    child.material = new THREE.MeshBasicMaterial({color:'#f3cf85'});
  });

  scene.add( object );
  console.log(object);
});

camera.position.z = 20;

var controls;
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

var render = function () {
  requestAnimationFrame( render );

  renderer.render(scene, camera);
};

render();
