// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light,
    Dark: dark
};

// Create map object w center, zoom and default layer.
let map = L.map("mapid", {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
});

// Pass map layers into layers controls and add to map
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON url.
let airportData = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/majorAirports.json";
let torontoData = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/Main/static/torontoRoutes.json";

// Style object 
let myStyle = {
    color: "#ffffa1",
    weight: 2,
}

// grabbing GeoJSON data and adding pop up
d3.json(torontoData).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " 
            + feature.properties.dst + "</h3>"); 
        }
    }).addTo(map);
});
    // Creating a GeoJson layer with the retrieved data.






    // event that lets you knwo when user activates/deactivates a layer.
    map.on('overlayadd', onOverlayAdd);

    function onOverlayAdd(e){
        //do whatever
    }

 // There is a "baselayerchange' event defined here http://leafletjs.com/reference.html#control-layers Just bind it to the map object and you are good to go.

map.on('baselayerchange', function(e) {
  console.log(e);
});