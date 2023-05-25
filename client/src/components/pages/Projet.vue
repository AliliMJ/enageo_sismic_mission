<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import RapportTable from '../tables/RapportTable.vue';
import { NButton, NSpace, NStep, NSteps } from 'naive-ui';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const idProjet = route.params.idProjet;

const projet = (await axios.get(`http://localhost:3000/projets/${idProjet}`))
  .data;

function redirectReportCreation() {
  router.push('/projet/' + idProjet + '/creerRapport');
}
const current = ref(1);

function next() {
  if (current.value === null) current.value = 1;
  else if (current.value > 1) {
    current.value = 4;
  } else {
    current.value++;
  }
}
</script>

<template>
  <NSpace vertical>
    <div>
      <h1>Etat du projet</h1>
      <n-space vertical class="status">
        <n-steps :current="current" status="process">
          <n-step title="Planification" description="22 janvier 2023" />
          <n-step title="Production" />
          <n-step title="Terminé" />
        </n-steps>
        <NButton v-if="current < 4" ghost type="success" @click="next"
          >Suivant</NButton
        >
      </n-space>
    </div>

    <RapportTable :rapports="projet.Rapports" />
    <n-button @click="redirectReportCreation" type="success"
      >Créer un rapport</n-button
    >
  </NSpace>
</template>

<style scoped>
.status {
  padding-left: 1px;
}
</style>
