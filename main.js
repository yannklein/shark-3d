import * as THREE from 'three';
// import * as Addons from 'three/addons/';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// console.log(Addons);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000,
);

scene.background = new THREE.Color(0x22aaff);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight( 0xFFFFFF, 3 );
scene.add( light );

const fbxLoader = new FBXLoader();
const texture = new THREE.TextureLoader().load( 'mechanical-shark/textures/wood_beech_chocolate_brown_v4_alt2_Diffuse.jpg' );
texture.colorSpace = THREE.SRGBColorSpace;

fbxLoader.load(
  'mechanical-shark/source/woodshark.fbx',
  (object) => {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsupdate = true;
        child.material.map.minFilter = THREE.NearestFilter;
        console.log(texture);
        // render(); // only if there is no render loop
        console.log(child.geometry.attributes.uv);

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    // object.scale.set(0.01, 0.01, 0.01);
    object.rotation.x += Math.PI / 8;
    object.rotation.y += Math.PI / 8;
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.log(error);
  },
);

camera.position.z = 1500;

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.render(scene, camera);
}
