const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

// ----------------------
// Create Particles
// ----------------------
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.6,
  color: 0x00f7ff
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particlesMesh);

// ----------------------
// Mouse Movement Effect
// ----------------------

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// Smooth animation values
let targetX = 0;
let targetY = 0;

// ----------------------
// Animation Loop
// ----------------------

function animate() {
  requestAnimationFrame(animate);

  // Smooth follow effect
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  // Rotate particles slightly
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.001;

  // Move camera based on mouse
  camera.position.x = targetX * 10;
  camera.position.y = -targetY * 10;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

// ----------------------
// Responsive
// ----------------------

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});