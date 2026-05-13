import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(1.5,0.5,0.75);

const loader = new GLTFLoader();

let mixer;
loader.load( 'scene.glb', function ( glb ) {
    //glb.scene.scale.set(1.5,1.5,1.5);
	scene.add( glb.scene );
    mixer = new THREE.AnimationMixer(glb.scene);
	const clips = glb.animations;
	// const clip = THREE.AnimationClip.findByName(clips, 'left1Action');
	// const action = mixer.clipAction(clip);
	// action.play();
	clips.forEach(function(clip) {
		const action = mixer.clipAction(clip);
	    action.play();
	});
}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(0.5,0.5,0.75);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( window.innerWidth/2, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = true;
controls.enableDamping = true;


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame( animate );
	if(mixer)
     mixer.update(clock.getDelta());
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
