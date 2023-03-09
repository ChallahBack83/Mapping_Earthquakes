// Add console.log to check to see if our code is working.
console.log("working");

// Create map object with a center and zoom level
let map = L.map("mapid").setView([37.6214, -122.3790], 5);

// Creat line variable from points
let line = [
    [37.6214, -122.3790],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781],
    [38.7499, -90.3748]
];
// Create a polyline using line coordinates and make line red
const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    scale: 2,
};

L.polyline(line, {
    color: "blue",
    strokeOpacity: 0.5,
    icons: [
        {icon: lineSymbol,
        offset: "0",
        repeat: "20px"}
    ]
}).addTo(map);

// Add a marker to map for Los Angeles, CA
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// L.circleMarker([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: '#ffffa1',
//     fillOpacity: 0.5,
//     radius: 300
// }).addTo(map);

//Get data from cities.js
let cityData = cities;

// loop through the cities array and create one marker for each city.
cities.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: "orange",
        lineWeight: 4,
        fillColor: "orange",
        fillOpacity: 0.4
    })
    .bindPopup("<h2>" + city.city +", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);