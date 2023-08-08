<script setup>
import { useRoute } from 'vue-router';
import TableEmploye from '../components/TableEmploye.vue';
import { NH1, NCard, NButton, NSpace } from 'naive-ui';
import axios from 'axios';
import AddToEquipe from '../components/AddToEquipe.vue';
import { onMounted } from 'vue';

const route = useRoute();

const idEquipe = Number(route.params.idEquipe);

const equipe = ref([]);
onMounted(async () => {
  equipe.value = (
    await axios.get('http://localhost:3000/equipes/' + idEquipe)
  ).data;
});

async function affecter(employe) {
  const e = (
    await axios.post('http://localhost:3000/equipes/affecter', {
      idEquipe,
      idEmploye: employe.id,
    })
  ).data;

  equipe.value.Membres.push(employe);
}
// const employes = (
//   await axios.get('http://localhost:3000/employes/employeByEquipe/' + idEquipe)
// ).data;
</script>
<template>
  <n-h1>{{ `Equipe ${equipe?.activite?.nomAct}` }}</n-h1>

  <n-card title="liste des employés">
    <n-space vertical>
      <n-space justify="end">
        <AddToEquipe :equipe="equipe" @confirm="affecter" />
      </n-space>
      <TableEmploye :employes="equipe.Membres" />
    </n-space>
  </n-card>
</template>
