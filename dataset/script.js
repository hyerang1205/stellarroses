////bababab
//save to file
// x, y, lat, long, city, country, state

latLngToVector3 = (latLng, radius) => {
    const phi = Math.PI * (0.5 - latLng.lat / 180);
    const theta = Math.PI * (latLng.lng / 180);
    const spherical = THREE.Spherical(radius || latLng.radius || 1, phi, theta);
    return new THREE.Vector3().setFromSpherical(spherical);
};

function geocodeLatLng(lat, lng) {
    return fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAu_e9Vo1w62NzrVMLZvCr5m-Rl1ncItCU`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
function elevation(lat, lng) {
    return fetch(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=AIzaSyAu_e9Vo1w62NzrVMLZvCr5m-Rl1ncItCU
        `
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
let getGeoCode = async (lat, lng, comment) => {
    let dataset = await geocodeLatLng(lat, lng);
    return dataset;
};
let getElevation = async (lat, lng) => {
    let dataset = await elevation(lat, lng);
    console.log("????" + dataset["results"][0]["elevation"]);
    return dataset;
};
//should be empty
getGeoCode(-26, -133);
getGeoCode(58, 69);

// uh i represents lat, j represents lng, didnt want to mess up the naming
let getPointObject = async (i, j) => {
    i = 49.246292;
    j = -123.116226;
    let rs = await getGeoCode(i, j, "vancouver");
    console.log("hi" + rs["status"]);
    if (rs["status"] == "OK") {
        let elevation = await getElevation(i, j);

        console.log("hi again");
        console.log("hmm" + elevation["results"]["elevation"]);
        console.log(elevation);
        let jsonOBJ = {};
        let locationString = rs["plus_code"]["compound_code"];
        let locationArr = locationString.split(",");
        jsonOBJ["country"] = locationArr.pop();
        jsonOBJ["state"] = locationArr.pop();
        jsonOBJ["city"] = locationArr.pop();
        jsonOBJ["lat"] = i;
        jsonOBJ["lng"] = j;
        let coord = latLngToVector3({ lat: i, lng: j });

        jsonOBJ["x"] = coord.x;
        jsonOBJ["y"] = coord.y;
        jsonOBJ["z"] = coord.z;
        jsonOBJ["elevation"] = elevation["results"][elevation];
        jsonOBJ["elevatione"] = 2;

        console.log(JSON.stringify(jsonOBJ));
        return jsonOBJ;
    }
    return null;
};

///
let vancPoint = getPointObject();
document.getElementById("hannahatessushi").textContent += JSON.stringify(vancPoint) + ",";

///
// createObject = (lat, lng, country,)
// {
//     "lat": lat,

// }
//save file
