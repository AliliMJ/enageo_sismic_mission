<script setup>
import { onMounted, ref } from 'vue';
import { center, points } from '@turf/turf';
import axios from 'axios';

import mapboxgl from 'mapbox-gl';
import MapProject from '../components/MapProject.vue';

const projects = (await axios.get('http://localhost:3000/projets/prod')).data;

const showPanel = ref(false);
const selectedProject = ref(null);

function showProjectDetails(project) {
  selectedProject.value = project;
  showPanel.value = true;
}

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxpbGltaiIsImEiOiJjbGhiMDBkZXIwMWs4M3JuNDdxMjNyMHhyIn0.q2o6eXdUQxZ8RHMsW5LKOA';

  const geojson = {
    type: 'FeatureCollection',
    features: projects
      .filter((p) => {
        return p.Terrain.Coordonnes?.length > 0;
      })
      .map((p) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: center(
              points(p.Terrain.Coordonnes.map((c) => [c.longitude, c.latitude]))
            ).geometry.coordinates,
          },
          properties: p,
        };
      }),
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

  const size = 100;

  // This implements `StyleImageInterface`
  // to draw a pulsing dot icon on the map.
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
      context.fill();

      // Draw the inner circle.
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // Continuously repaint the map, resulting
      // in the smooth animation of the dot.
      map.triggerRepaint();

      // Return `true` to let the map know that the image was updated.
      return true;
    },
  };

  map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    map.addSource('projets', { type: 'geojson', data: geojson });
    // Add a projet layer
    map.addLayer({
      id: 'projetLayer',
      type: 'symbol',
      source: 'projets',

      layout: {
        'icon-image': 'pulsing-dot',
        'text-field': ['get', 'codeMission'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.25],
        'text-anchor': 'top',
      },
    });

    map.on('click', 'projetLayer', (e) => {
      showProjectDetails(e.features[0].properties);
      map.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on('mouseenter', 'projetLayer', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'projetLayer', () => {
      map.getCanvas().style.cursor = '';
    });
  });
});

//mission
//project name
//wilaya
//budget
//vp
//vp restants
// description
//date début production
</script>

<template>
  <div style="height: 85vh; width: 100%" id="map">
    <MapProject v-if="selectedProject" :project="selectedProject" />
  </div>
</template>

<style scoped>
#map {
  position: relative;
}
#info .n-h2 {
  font-size: 1rem;
}
#info .n-h1 {
  font-size: 1.5rem;
  margin: 0;
}
#info .n-text {
  font-size: 0.875rem;
}
#desc {
  padding-bottom: 6px;
}
#info {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 25px;
  z-index: 1;
  width: 30%;
}

.marker {
  background-image: url('https://art.pixilart.com/42e019c236fe77a.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>
