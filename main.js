import * as THREE from 'three';
// import * as Addons from 'three/addons/';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// console.log(Addons);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color( 0xa0a0a0 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );



const fbxLoader = new FBXLoader()
fbxLoader.load(
    'mechanical-shark/source/woodshark.fbx',
    (object) => {
        object.traverse(function (child) {
            if (child.isMesh) {
                // child.material = material
                if (child.material) {
                    child.material.transparent = false
                }
            }
        })
        object.scale.set(.01, .01, .01)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

camera.position.z = 20;


function animate() {


	renderer.render( scene, camera );

}