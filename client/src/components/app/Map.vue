<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxpbGltaiIsImEiOiJja2t2bGU3ZmQxOGxnMnBwbDRzcW5vZ2d1In0.xxhq9fjQcLmxmbV45xLU6g';

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [6.094, 31.7],
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [5.579, 23.646],
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California',
        },
      },
    ],
  };

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/alilimj/clhw3641v021y01r05bmz06s8',
    center: [4.442, 28.044],
    zoom: 3,
    maxBounds: [
      [-4.781, 15.711], // Southwest coordinates of Algeria
      [15.44, 39.982], // Northeast coordinates of Algeria
    ],
  });

  // add markers to map
  for (const feature of geojson.features) {
    // create a HTML element for each feature

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);
  }
});
</script>

<template>
  <div style="height: 85vh; width: 100%" id="map"></div>
</template>
