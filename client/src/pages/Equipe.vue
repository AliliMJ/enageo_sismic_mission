<script setup>
import { useRoute } from 'vue-router';
import TableEmploye from '../components/TableEmploye.vue';
import { NH1, NCard, NButton, NSpace } from 'naive-ui';
import axios from 'axios';

const route = useRoute();

const idEquipe = route.params.idEquipe;

const equipe = (await axios.get('http://localhost:3000/equipes/' + idEquipe))
  .data;
// const employes = (
//   await axios.get('http://localhost:3000/employes/employeByEquipe/' + idEquipe)
// ).data;
</script>
<template>
  <n-h1>{{ `Equipe ${equipe.activite.nomAct}` }}</n-h1>

  <n-card title="liste des employés">
    <TableEmploye :employes="equipe.Membres" />
  </n-card>
</template>
