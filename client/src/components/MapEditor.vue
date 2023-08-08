<script setup>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { area } from '@turf/turf';
import { onMounted, defineEmits } from 'vue';
import { NCard, NButton } from 'naive-ui';

const emit = defineEmits(['finish']);

const draw = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
    polygon: true,
    trash: true,
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: 'draw_polygon',
});
onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxpbGltaiIsImEiOiJjbGhiMDBkZXIwMWs4M3JuNDdxMjNyMHhyIn0.q2o6eXdUQxZ8RHMsW5LKOA';
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

  map.addControl(draw);

  map.on('draw.create', updateArea);
  map.on('draw.delete', updateArea);
  map.on('draw.update', updateArea);

  function updateArea(e) {
    const data = draw.getAll();

    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
      // Restrict the area to 2 decimal points.
      const rounded_area = Math.round(area(data) / 1000);
      answer.innerHTML = `<p><strong>${rounded_area}</strong> km carrés</p>`;
    } else {
      answer.innerHTML = '';
      if (e.type !== 'draw.delete')
        alert('Cliquez sur la carte pour dessiner un polygone.');
    }
  }
});
function onFinish() {
  const coordinates = draw.getAll().features[0]?.geometry?.coordinates[0] ?? [];
  if (coordinates.length > 0) {
    const firstCoordinate = coordinates[0];

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${firstCoordinate[0]},${firstCoordinate[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract the state information from the API response
        const features = data.features;
        if (features.length > 0) {
          const state = features[0].context.find((c) =>
            c.id.startsWith('region')
          );
          if (state) {
            emit('finish', { coordinates, wilaya: state.text });
          } else {
            emit('finish', { coordinates, wilaya: '' });
          }
        } else {
          emit('finish', { coordinates, wilaya: '' });
        }
      })
      .catch((error) => {
        emit('finish', { coordinates, wilaya: '' });
      });
  }
}
</script>

<template>
  <n-card
    style="width: 80%; height: 80vh"
    title="Préciser les coordonnées du terrain"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <div id="map"></div>
    <div class="calculation-box">
      <p>Cliquez sur la carte pour dessiner un polygone.</p>
      <div id="calculated-area"></div>
    </div>
    <template #footer>
      <NButton @click="onFinish" type="success">Terminer</NButton>
    </template>
  </n-card>
</template>

<style scoped>
#map {
  border-radius: 5px;
}
.calculation-box {
  height: 75px;
  width: 150px;
  position: absolute;
  top: 70px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding-top: 25px;
  padding-left: 25px;
  text-align: center;
  border-radius: 5px;
}

p {
  font-family: 'Open Sans';
  margin: 0;
  font-size: 13px;
}

#map {
  height: 100%;
}
</style>
