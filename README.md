# Mapping_Earthquakes

## Purpose
The goal of this project is to visually show the differences between magnitudes of earthquakes all over world for the last seven days.  Using Javascript, d3 and Leaflet, we plotted GeoJson earthquake data from USGS using various map layers with an interactive control panel.

By mapping all the earthquakes within the last 7 days, 

## Process

I built tile layers for 3 different maps, choosing Mapbox Outdoors for our third map. This layer highlights the topography, which is what I named the map in the control. Such a view is useful when trying to visualize the environment of the earthquakes.

![closeUp]()

With the <b>Earthquakes</b> map, which displays all the earthquakes over the last 7 day, already finished through the module, I built two other GeoJSON map layers, Tectonic Plates and Major Earthquakes, by retrieving the data from USGS using d3.json. Within the function for each layer, I built a function to set the style of the map, which in turn required functions to define the color, shape, and size of the markers or lines. This meant I needed to use if statements to return specific colors as well as set the radius of the markers, both based on magnitude.

```
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

  //Style info from earthquakedata
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  //getcolor function with only 3 colors
  function getColor(magnitude) {
    if (magnitude >= 6) {
      return "#800000";
    }
    if (magnitude >= 5) {
      return "#ea2c2c";
    }
    if (magnitude < 5) {
      return "#ea822c";
    }
  }

  //get radius with same parameters
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
```

For the <b>Major Earthquakes</b> layer, which maps only earthquakes greater than 4.5, the color was changed to only three colors to reflect the magnitude ranges. For the 4-5 and 5-6 ranges, I kept the same colors as those ranges in the Earthquakes map. Since there is no > 6 on the other map, I made it a deep maroon so that  earthquakes > 6 stand out. A popup containing the magnitude and location of each earthquake was also created and bound to the markers.


```
 //geoJSON layer for major earthquakes
  L.geoJson(data, {
    // turn each feature to a circleMarker
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // style with stylinfo function
    style: styleInfo,
    //Create popup with magnitude and location
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(majorEarthquakes);
  majorEarthquakes.addTo(map);
});
```

![popup]()

<b>The Tectonic Plates</b> map is much simpler, defining the lines of the plates. It visualizes the relationship of earthquakes to tectonic plates. To style this map, all I needed to define was the line color and thickness before adding the layer to the map.

```
// 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
    L.geoJson(data, {
      style: function(feature) {
        return {
          color: "#ea2c2c",
          weight: 2
        }
      }
    }).addTo(tectonicPlates);
    tectonicPlates.addTo(map);
  });
```

![Tectonic] (https://github.com/ChallahBack83/Mapping_Earthquakes/blob/main/Earthquake_Challenge/images/mapSatellite.png)


## In Conclusion

The final result is an interactive map where the user can use different layers to visualize how many earthquakes occur in a week's time, how big they are, and where they occur in relationship to cities, to the tectonic plates, and to the topography of the Earth. In future builds, I would also add the time to the earthquake popups as well as make the markers slightly more distinct in size. 

