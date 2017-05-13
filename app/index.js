// var THREE = require('three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var loader = new THREE.STLLoader();
/*--------------------------TREE-----------------------------*/
loader.load( './app/obj/tree.stl', function ( geometry ) {
  // var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
  let material = new THREE.MeshBasicMaterial( { color: "green" } );
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 0,0, 0 );
  // mesh.rotation.set( 0, - Math.PI / 2, 0 );
  // mesh.scale.set( 0.5, 0.5, 0.5 );
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  scene.add( mesh );
} );
/*--------------------------TRUNK-----------------------------*/
loader.load( './app/obj/trunk.stl', function ( geometry ) {
  // var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
  let material = new THREE.MeshBasicMaterial( { color: 'brown' } );
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 2, 0, 0 );
  // mesh.rotation.set( 0, - Math.PI / 2, 0 );
  mesh.scale.set( 0.2, 0.2, 0.2 );
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  scene.add( mesh );
} );
/*--------------------------BASE-----------------------------*/
loader.load( './app/obj/base.stl', function ( geometry ) {
  // var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
  let material = new THREE.MeshBasicMaterial( { color: "yellow" } );
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( -4,0, 0 );
  // mesh.rotation.set( 0, - Math.PI / 2, 0 );
  mesh.scale.set( 0.1, 0.1, 0.1 );
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  scene.add( mesh );
} );
/*--------------------------FRUIT-----------------------------*/
loader.load( './app/obj/fruit.stl', function ( geometry ) {
  // var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
  let material = new THREE.MeshBasicMaterial( { color: "red" } );
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( -4,0, 0 );
  // mesh.rotation.set( 0, - Math.PI / 2, 0 );
  mesh.scale.set( .5, .5, .5 );
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  scene.add( mesh );
} );

camera.position.z = 20;

var render = function () {
  requestAnimationFrame( render );

  // geometry.rotation.x += 0.1;
  // geometry.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();
