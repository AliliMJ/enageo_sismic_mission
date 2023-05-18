<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import RapportTable from 'components/tables/RapportTable.vue';
import { NButton } from 'naive-ui';

const router = useRouter();
const route = useRoute();
const idProjet = route.params.idProjet;

const projet = (await axios.get(`http://localhost:3000/projets/${idProjet}`))
  .data;

function redirectReportCreation() {
  router.push('/projet/' + idProjet + '/creerRapport');
}
</script>

<template>
  <n-button @click="redirectReportCreation" type="success"
    >Créer un rapport</n-button
  >
  <RapportTable :rapports="projet.Rapports" />
</template>
