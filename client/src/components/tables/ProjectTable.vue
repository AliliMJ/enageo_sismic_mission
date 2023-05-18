<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';

import { NH1, NSpace, NButton, NIcon } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { h } from 'vue';
import EtatProjet from '../common/EtatProjet.vue';

import { useAuth } from 'stores/authentication.js';
import { useRouter } from 'vue-router';
import { Role } from '../../enums';

const auth = useAuth();
const router = useRouter();

const projects = (
  await axios.post('http://localhost:3000/projets', { userid: auth.user?.id })
).data;

console.log(projects);

const cols = [
  { title: 'Id', key: 'idProjet' },
  { title: 'Nom', key: 'nom' },
  {
    title: 'état',
    key: 'Etats',
    render(row) {
      return h(EtatProjet, { projectStates: row.Etats });
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
  <NSpace vertical>
    <NH1>La liste des projets</NH1>
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
</template>
