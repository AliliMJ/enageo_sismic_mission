<script setup>
import STable from '../common/STable.vue';

import { NH1 } from 'naive-ui';

const props = defineProps({
  rapports: Array,
});

const cols = [
  { title: 'Id', key: 'idRapport' },
  { title: 'Titre', key: 'titre' },
  {
    title: 'Date création',
    key: 'date',
    render(row) {
      return new Date(row.date).toLocaleDateString();
    },
  },
  {
    title: 'Projet',
    key: 'Projet.nom',
  },
];
</script>

<template>
  <NH1>Rapports</NH1>
  <STable :data="rapports" :columns="cols" />
</template>
