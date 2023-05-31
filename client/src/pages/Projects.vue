<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';

import { NH1, NSpace, NButton, NIcon, NSelect, NCard } from 'naive-ui';
import { Add } from '@vicons/ionicons5';

import { h, ref } from 'vue';
import EtatProjet from '../components/EtatProjet.vue';

import { useAuth } from '../stores/authentication.js';
import { useRouter } from 'vue-router';
import { Role } from '../utils/enums';

const auth = useAuth();
const router = useRouter();

const projects = (
  await axios.get(
    'http://localhost:3000/projets/projetByMission/' +
      auth?.employe?.codeMission
  )
).data;

const cols = [
  { title: 'Id', key: 'idProjet' },
  { title: 'Nom', key: 'nom' },
  {
    title: 'état',
    key: 'Etats',
    render(row) {
      return h(EtatProjet, { projectStates: row.Etats, annule: row.annule });
    },
    filterMultiple: false,
    filterOptions: [
      {
        label: 'Production',
        value: 'EN_PRODUCTION',
      },
      {
        label: 'Planification',
        value: 'PLANIFICATION',
      },
      {
        label: 'Terminé',
        value: 'TERMINE',
      },
    ],
    filter(value, row) {
      return row.Etats[row.Etats.length - 1].etat == value;
    },
  },
];

function addProject() {
  router.push({ name: 'creationProjet' });
}
function handleClick(row) {
  router.push(`/projet/${row.idProjet}`);
}
</script>

<template>
  <NH1>La liste des projets</NH1>
  <n-card>
    <NSpace vertical>
      <NSpace justify="end">
        <NButton
          v-if="auth.user?.role === Role.ChefMision"
          @click="addProject"
          type="success"
          icon-placement="right"
        >
          Créer un projet
          <template #icon>
            <NIcon>
              <Add />
            </NIcon>
          </template>
        </NButton>
      </NSpace>
      <STable @onRowClicked="handleClick" :data="projects" :columns="cols" />
    </NSpace>
  </n-card>
</template>

<style scoped>
#filter {
  width: 200px;
}
</style>
