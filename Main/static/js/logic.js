// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer to hold both maps
let baseMaps = {
    Streets: streets,
    Dark: dark
};

// Create map object w center, zoom and default layer.
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [streets]
});

// Pass map layers into layers controls and add to map
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON url.
let airportData = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/majorAirports.json";


// grabbing GeoJSON data and adding pop up
d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>"); 
        }
    }).addTo(map);
});
    // Creating a GeoJson layer with the retrieved data.


