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

function addGlobe() {
    let materials = new THREE.PointsMaterial({
        color: 0x000000,
        size: 2,
        opacity: 1,
    });
    // let geometry = new THREE.Geometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/

    // for (let i = -90; i < 0; i += 2) {
    //     for (let j = -180; j < 0; j += 2) {
    //         let coord = llarToWorld(i, j, 0);

    //         geometry.vertices.push(new THREE.Vector3(coord.x, coord.y, coord.z));
    //     }
    // }
    // tgeometry.computeVertexNormals();
    // scene.add(pointCloud);
    geometry = new THREE.Geometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/

    particleCount = 100; /* Leagues under the sea */

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j <= 10; j++) {
            let coord = llarToWorld(i, j, 0);

            var vertex = new THREE.Vector3();
            vertex.x = coord.X;
            vertex.y = coord.Y;
            vertex.z = coord.Z;

            geometry.vertices.push(vertex);
        }
    }

    /*	We can't stop here, this is bat country!	*/

    parameters = [
        [[1, 1, 0.5], 5],
        [[0.95, 1, 0.5], 4],
        [[0.9, 1, 0.5], 3],
        [[0.85, 1, 0.5], 2],
        [[0.8, 1, 0.5], 1],
    ];
    parameterCount = parameters.length;

    /*	I told you to take those motion sickness pills.
Clean that vommit up, we're going again!	*/

    for (i = 0; i < parameterCount; i++) {
        color = parameters[i][0];
        size = 0.5;

        materials[i] = new THREE.PointCloudMaterial({
            size: size,
        });

        particles = new THREE.PointCloud(geometry, materials[i]);

        scene.add(particles);
    }
}
addGlobe();

//
//longitute lattitude to coordinates in space

function llarToWorld(lat, lon, alt) {
    //# see: http://www.mathworks.de/help/toolbox/aeroblks/llatoecefposition.html
    let f = 0;
    let ls = Math.atan((1 - f) ** 2 * Math.tan(lat));
    x = rad * Math.cos(ls) * Math.cos(lon) + alt * Math.cos(lat) * Math.cos(lon);
    y = rad * Math.cos(ls) * Math.sin(lon) + alt * Math.cos(lat) * Math.sin(lon);
    z = rad * Math.sin(ls) + alt * Math.sin(lat);

    return { X: x, Y: y, Z: z };
}
