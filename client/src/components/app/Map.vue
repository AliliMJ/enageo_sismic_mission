<script setup>
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxpbGltaiIsImEiOiJjbGhiMDBkZXIwMWs4M3JuNDdxMjNyMHhyIn0.q2o6eXdUQxZ8RHMsW5LKOA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/alilimj/clhb0hkej012701pgeseia8sn', // style URL
    center: [6.137343, 45.137451], // starting position
    zoom: 5, // starting zoom
    maxBounds: [
      [-8.668735, 19.05737], // Southwest coordinates of Algeria
      [11.979383, 37.35001], // Northeast coordinates of Algeria
    ],
  });

  map.on('load', () => {
    map.addSource('maine', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: { name: 'Null Island' },
        geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [
            [
              [6.458, 31.768],
              [6.618, 31.923],
              [6.904, 31.711],
              [6.458, 31.768],
            ],
          ],
        },
      },
    });
    map.addLayer({
      id: 'maine',
      type: 'fill',
      source: 'maine', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5,
      },
    });
    map.addLayer({
      id: 'outline',
      type: 'line',
      source: 'maine',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3,
      },
    });
  });
});
</script>

<template>
  <div style="height: 85vh; width: 100%" id="map"></div>
</template>
