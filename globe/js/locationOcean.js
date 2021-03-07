document.getElementById("water").addEventListener("click", () => {
    onWater(49.22320113539962, -123.53219207316987);
});

document.addEventListener(
    "wheel",
    function (e) {
        e.preventDefault();
        doStuff(e);
    },
    { passive: false }
);

document.getElementById("where").addEventListener("click", () => {
    geocodeLatLng(40.714224, -73.961452);
});

function onWater(lat, lng) {
    fetch(`https://api.onwater.io/api/v1/results/${lat},${lng}?access_token=Mz4yZsaQizXfoL-xc56s`)
        .then((response) => response.json())
        .then((data) => {
            return { water: data.water };
        });
}

function geocodeLatLng(lat, lng) {
    fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAu_e9Vo1w62NzrVMLZvCr5m-Rl1ncItCU`
    )
        .then((response) => response.json())
        .then((data) => {
            let country = data.results[0].address_components[6].long_name
                ? data.results[0].address_components[6].long_name
                : "N/A";
            let state = data.results[0].address_components[5].long_name
                ? data.results[0].address_components[5].long_name
                : "N/A";
            let city = data.results[0].address_components[4].long_name
                ? data.results[0].address_components[4].long_name
                : "N/A";
            return { country: country, state: state, city: city };
        });
}
