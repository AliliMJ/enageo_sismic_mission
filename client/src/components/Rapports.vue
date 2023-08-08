<script setup>
import STable from './STable.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  rapports: Array,
  idProject: String,
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
];

function handleClick(row) {
  router.push(`/projet/${props.idProject}/rapport/${row.idRapport}`);
}
</script>

<template>
  <STable @onRowClicked="handleClick" :data="props.rapports" :columns="cols" />
</template>
