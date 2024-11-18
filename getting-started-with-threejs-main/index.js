import * as THREE from "three";
//three.js needs three things a renderer, scene, and a camera
import {OrbitControls} from "jsm/controls/OrbitControls.js"
//renderer
const w = window.innerWidth; // Fixed capitalization of 'Window' to 'window'
const h = window.innerHeight; // Fixed capitalization of 'Window' to 'window'
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

//canvas element
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//scene
const scene = new THREE.Scene();

//interactions
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


//geomentry and materials 
const geo = new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color:0xffffff,
    flatShading : true
});

const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

//wireframe geomentry
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe : true
});
const wireMesh =  new THREE.Mesh(geo , wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

//lights
const hemiLight = new THREE.HemisphereLight(0x0099ff , 0xaa5500);
scene.add(hemiLight);

//animate 
function animate(t = 0) { 
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();


