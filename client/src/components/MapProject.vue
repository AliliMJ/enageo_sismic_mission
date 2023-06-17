<script setup>
import {
  NCard,
  NH1,
  NButton,
  NTag,
  NH2,
  NStatistic,
  NCol,
  NRow,
  NText,
  NEllipsis,
} from 'naive-ui';
import axios from 'axios';
const props = defineProps({
  project: Object,
});

const production = (
  await axios.get(
    'http://localhost:3000/rapports/productionByProject/' +
      props.project.idProjet
  )
).data;

const timePassed = () => {
  if (production.length > 0) {
    new Date();
    const firstProdDay = new Date(
      production[0].annee,
      production[0].mois,
      production[0].jour
    );
    const now = new Date();
    console.log(production[0].jour, production[0].mois, production[0].annee);
    return Math.floor((now - firstProdDay) / (1000 * 3600 * 24));
  }

  return 0;
};
const { totalVp, totalGain } = production.reduce(
  (acc, current) => {
    return {
      totalVp: acc.totalVp + current.vp,
      totalGain: acc.totalGain + current.gain,
    };
  },
  { totalVp: 0, totalGain: 0 }
);
const pourcentage = Math.round((totalVp / props.project.objVP) * 100);
</script>
<template>
  <n-card id="info" v-if="props.project">
    <template #header>
      <n-h1>{{ props.project.nom }}</n-h1>
    </template>
    <template #action>
      <n-button> Fermer </n-button>
    </template>

    <template #header-extra>
      <n-tag type="info">{{ props.project.codeMission }}</n-tag>
    </template>
    <n-h2>Description</n-h2>
    <n-ellipsis :line-clamp="2">
      <n-text>{{ props.project.description }}</n-text>
    </n-ellipsis>

    <n-h2>Statistiques</n-h2>

    <n-row>
      <n-col :span="12">
        <n-statistic label="Production">
          {{ pourcentage }}

          <template #suffix> % </template></n-statistic
        >
      </n-col>
      <n-col :span="12">
        <n-statistic label="Budget">
          {{ Math.round(props.project.budget / 1000) }}k
          <template #suffix>
            <n-text strong depth="3">Dinars</n-text>
          </template>
        </n-statistic>
      </n-col>
    </n-row>
    <n-row>
      <n-statistic label="Temps passé">
        {{ timePassed() }}

        <template #suffix>
          <n-text strong depth="3">Jours</n-text>
        </template>
      </n-statistic>
    </n-row>
  </n-card>
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
