<script setup>
import { NH1, NEmpty } from 'naive-ui';
import axios from 'axios';
import { useAuth } from '../../stores/authentication.js';
import StatProjet from '../../components/StatProjet.vue';

const auth = useAuth();

const projet = (
  await axios.get(
    `http://localhost:3000/projets/prodByMission/${auth.employe?.codeMission}`
  )
).data;
</script>

<template>
  <n-h1> Le projet en production </n-h1>
  <stat-projet v-if="projet" :projet="projet" />
  <n-empty v-else description="Aucun projet en production"> </n-empty>
  <!-- <n-card id="prod">
    <template #header>
      <n-h1>{{ projet.nom }}</n-h1>
    </template>
    <template #header-extra>
      <n-tag type="info" size="small">{{ projet.codeMission }}</n-tag>
    </template>
    <n-h2>Description</n-h2>
    <n-text>{{ projet.description }}</n-text>

    <template #footer>
      <n-button type="info">Consulter</n-button>
    </template>
  </n-card> -->
</template>

<style scoped>
#prod .n-h2 {
  font-size: 1rem;
}
#prod .n-h1 {
  font-size: 1.5rem;
  margin: 0;
}
#prod .n-text {
  font-size: 0.875rem;
}
</style>
