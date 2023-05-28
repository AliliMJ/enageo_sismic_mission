<script setup>
import STable from '../common/STable.vue';

const props = defineProps({
  rapports: Array,
});
console.log(props.rapports);
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
  <STable :data="props.rapports" :columns="cols" />
</template>
