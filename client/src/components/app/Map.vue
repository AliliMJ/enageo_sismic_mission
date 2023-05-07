<script setup>
import {
  MapboxMap,
  MapboxMarker,
  MapboxLayer,
} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<template>
  <MapboxMap
    style="height: 85vh; width: 100%"
    access-token="pk.eyJ1IjoiYWxpbGltaiIsImEiOiJjbGhiMDBkZXIwMWs4M3JuNDdxMjNyMHhyIn0.q2o6eXdUQxZ8RHMsW5LKOA"
    mapStyle="mapbox://styles/mapbox/light-v11"
  >
    <MapboxLayer />
  </MapboxMap>
</template>
