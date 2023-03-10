// Create map object with a center and zoom level
let map = L.map("mapid").setView([30, 30], 2);

// pulled formulas for Module 14

// Add console.log to check to see if our code is working.
console.log("working");

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
let marker = L.marker([34.0522, -118.2437]).addTo(map);
L.circleMarker([34.0522, -118.2437], {
    color: 'black',
    fillColor: '#ffffa1',
    fillOpacity: 0.5,
    radius: 300
}).addTo(map);

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

// adding geojson data
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// grabbing geojson data
L.geoJSON(sanFranAirport, {
    
    //using oneachfeature
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup();
    }
    // // turn each feutre into a marker
    // pointToLayer: function(feature, latlng) {
    //     console.log(feature);
    //     return L.marker(latlng)
    //     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
    // }
}).addTo(map);
