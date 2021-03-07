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
    controls.maxDistance = 110;
    //how far you zoom in
    controls.minDistance = 110;
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
    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

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
//STELLLAA right HERE!!! this is the code and you need to check the material!! inside addGlobeSphere!!
//please make the material make the globe look shiny and like the one on github.com when you are not logged in
function addGlobeSphere() {
    let length = 200;
    const geometry = new THREE.SphereGeometry(50, length, length);
    const material = new THREE.MeshPhongMaterial({
        color: 0x360ccc, // red (can also use a CSS color string here)
        flatShading: true,
        shininess: 2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // var geometry1 = new THREE.SphereGeometry(50, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    // this is the gradient that you were talking about stella <<<<<<<<<<<<<<<<<<<<<<<<<<
    //  var material1 = new THREE.MeshNormalMaterial();
    // var cube1 = new THREE.Mesh(geometry1, material1);
    // scene.add(cube1);
}
function addGlobe() {
    let globescale = 50;
    geometry = new THREE.Geometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
    let size = globescale * 0.005;
    let upperLimit = 90;
    particleCount = 100; /* Leagues under the sea */
    materials = new THREE.PointCloudMaterial({
        size: size,
        color: 0x000000,
    });
    for (let i = -90; i < upperLimit; i++) {
        for (let j = -180; j <= upperLimit * 2; j++) {
            let coord = latLngToVector3({ lat: i, lng: j });

            var vertex = new THREE.Vector3();
            vertex.x = coord.x * globescale;
            vertex.y = coord.y * globescale;
            vertex.z = coord.z * globescale;
            // console.log("112" + coord.x * 100.0);
            geometry.vertices.push(vertex);
        }
    }
    particles = new THREE.PointCloud(geometry, materials);
    scene.add(particles);
}
addGlobeSphere();
addGlobe();

// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         console.log("\t00000lat " + i + "\tlong" + j + "\t");
//         let vector = latLngToVector3({ lat: i, lng: j });
//         console.log("x:" + vector.x + "y:" + vector.y + "   \tz:" + vector.z);
//     }
// }

let onWaterr = async (lat, lng) => {
    let water = await fetch(
        `https://api.onwater.io/api/v1/results/${lat},${lng}?access_token=Mz4yZsaQizXfoL-xc56s`
    );

    return water;
};
async function getWaterr(lat, lng) {
    try {
        const response = await fetch(
            "https://api.onwater.io/api/v1/results/" +
                lat +
                "," +
                lng +
                "?access_token=Mz4yZsaQizXfoL-xc56s"
        );
        console.log({ water: response.water });
        return { water: response.water };
    } catch (err) {
        console.log("fetch failed", err);
    }
}
let hi = async (lat, lng) => {
    let hanna = await onWater(10, 10);
    console.log(hanna.water + "hates sushi");
};

hi();
