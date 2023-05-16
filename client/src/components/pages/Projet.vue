<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import RapportTable from 'components/tables/RapportTable.vue';
const route = useRoute();
const idProjet = route.params.idProjet;

const projet = (await axios.get(`http://localhost:3000/projets/${idProjet}`))
  .data;
console.log(projet);
</script>

<template>
  <RapportTable :rapports="projet.Rapports" />
</template>
