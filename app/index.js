import tree from './model/Tree';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 'white' );
document.body.appendChild( renderer.domElement );

/*----------OBJ LOADER---------*/
var loader = new THREE.FBXLoader();
loader.load( './app/obj/plane.fbx', function( object ) {
  object.traverse( function ( child ) {
    console.log( child.name);
    child.material = new THREE.MeshBasicMaterial( { color: 'green' } );
    child.material = new THREE.MeshBasicMaterial( { color: 'red' } );
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
