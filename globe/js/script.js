var scene, camera, renderer, controls, projector, geometry, dope;
var humanTurn = 1;
var rad = 100;

var mouse = new THREE.Vector2(),
    INTERSECTED;

function addAxis() {
    //use utitilitit
    var axis = new THREE.AxisHelper(1000.25);
    scene.add(axis);
}
init();
animationLoop();
latLngToVector3 = (latLng, radius) => {
    const phi = Math.PI * (0.5 - latLng.lat / 180);
    const theta = Math.PI * (latLng.lng / 180);
    const spherical = THREE.Spherical(radius || latLng.radius || 1, phi, theta);
    return new THREE.Vector3().setFromSpherical(spherical);
};
//addAxis();
//window resizeBy
function init() {
    //renders the whole scene to make it viewable
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    //setting the pixel size for the render
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //appending the render  to the container
    document.body.appendChild(renderer.domElement);
    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 230;
    //trackball controllers
    //allows camera movement using mouse!!!
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener("change", render);
    controls.rotateSpeed = 2.0;
    //how far you can zoom out
    controls.maxDistance = 240;
    //how far you zoom in
    controls.minDistance = 0;
    //controls the slipperiness after moving controllers
    controls.dynamicDampingFactor = 0.2;
    controls.staticMoving = false;
    controls.noPan = true;
    controls.noZoom = false;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.2;
    controls.target.set(0, 0, -4);
    //set the scene!
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    var light = new THREE.HemisphereLight(0x111111, 0x444444, 1);
    scene.add(light);
    fogHex = 0x000000; /* As black as your heart.	*/

    fogDensity = 0.0007; /* So not terribly dense?	*/
    scene.fog = new THREE.FogExp2(fogHex, fogDensity);
    // Add listener for window resize.
    window.addEventListener("resize", onWindowResize, false);
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    render();
    controls.update();
}
//to prevent the scene from constantly rendering over and over again
function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}
function addGlobeSphere() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}
function addGlobe() {
    let materials = new THREE.PointsMaterial({
        color: 0x000000,
        size: 2,
        opacity: 1,
    });

    geometry = new THREE.Geometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
    let size = 0.5;
    particleCount = 100; /* Leagues under the sea */
    materials = new THREE.PointCloudMaterial({
        size: size,
        color: 0xff0000,
    });
    for (let i = -90; i < 90; i++) {
        for (let j = -180; j <= 180; j++) {
            let coord = latLngToVector3({ lat: i, lng: j });

            var vertex = new THREE.Vector3();
            vertex.x = coord.x * 100.0;
            vertex.y = coord.y * 100.0;
            vertex.z = coord.z * 100.0;
            console.log("112" + coord.x * 100.0);
            geometry.vertices.push(vertex);
        }
    }
    particles = new THREE.PointCloud(geometry, materials);
    scene.add(particles);
}
addGlobeSphere();
addGlobe();

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        console.log("\t00000lat " + i + "\tlong" + j + "\t");
        let vector = latLngToVector3({ lat: i, lng: j });
        console.log("x:" + vector.x + "y:" + vector.y + "   \tz:" + vector.z);
    }
}
