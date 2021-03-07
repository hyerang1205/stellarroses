document.getElementById("water").addEventListener("click", () => {
    onWater(49.22320113539962, -123.53219207316987)
});

document.getElementById("where").addEventListener("click", () => {
    geocodeLatLng(40.714224,-73.961452)
});

function onWater(lat, lng) {
    fetch(`https://api.onwater.io/api/v1/results/${lat},${lng}?access_token=${process.env.water_API}`)
    .then(response => response.json())
    .then(data => {return data.water});
}

function geocodeLatLng(lat, lng) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.google_Maps_API}`)
    .then(response => response.json())
    .then(result => {
        let country = "N/A" || result[0].address_components[6].long_name
        let state = "N/A" || result[0].address_components[5].long_name
        let city = "N/A" || result[0].address_components[4].long_name
        console.log(country, state, city)
    });
}