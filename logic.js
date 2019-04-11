// Below three creaated empty map
// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// Create the map object with options

var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 3,
});

lightmap.addTo(map)


//called the link 

var link ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grabbing our GeoJSON data..
d3.json(link, function(data) {



  console.log(data)

  function mapStyle(feature){
    return {color: "white", // line color
    fillColor: changecolor(feature.properties.mag), // inside color
    fillOpacity: 0.5, // how transparent
    weight: 1.5, 
    radius: changesize(feature.properties.mag)

    }; // weight is how thick the border is (in p

  }

  function changecolor(magnitude){
    switch (true) {
   case magnitude > 5:
     return "red";
   case magnitude > 4:
     return "blue";
   case magnitude > 3:
     return "green";
   case magnitude > 2:
     return "purple";
   case magnitude > 1:
     return "yellow";
   default:
     return "pink";
   };
 }

function changesize(magnitude){
  if (magnitude===0){
    return 1
  } 
  return magnitude*5
}


//this is what is holding it together as geojason. This will know where the marker goes on the map.
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Passing in our style object
    pointToLayer: function(feature, latlng) {
     return L.circleMarker(latlng);
   },
    style: mapStyle
  }).addTo(map);






//below here to create legend 


var legend = L.control({
   position: "bottomright"
 });
 // Then add all the details for the legend
 legend.onAdd = function() {
   var div = L.DomUtil.create("div", "info legend");
   var grades = [0, 1, 2, 3, 4, 5];
   var colors = [
     "pink",
     "yellow",
     "purple",
     "green",
     "blue",
     "red"
   ];

   

    for (var i = 0; i < grades.length; i++) {
     div.innerHTML +=
       "<i style='background: " + colors[i] + "'></i> " +
       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
   }
   return div;
 };

legend.addTo(map);

});

// // Create a baseMaps object to hold the lightmap layer
// var baseMaps = {
//   "Light Map": lightmap
// };

// // Create an overlayMaps object to hold the bikeStations layer
// var overlayMaps = {
//   "Bike Stations": bikeStations
// };


// // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);




