/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2x5bXZsIiwiYSI6ImNsZ25waG9vdzBkdXEzZHFrbTk0d3c3dHcifQ.O06rYEJ2LpCmefYkZgNuwg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/klymvl/clgnqwbju00dw01qqhdq1hfp6', // style URL
  scrollZoom: false,
  // center: [-118.1134, 34.11174], // starting position [lng, lat]
  // zoom: 10, // starting zoom
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';
  //add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //add popup
  new mapboxgl.Popup({
    offset: 40,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //extends map bounds to include curr location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 180,
    bottom: 180,
    left: 20,
    right: 20,
  },
});
