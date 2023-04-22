<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';

import { NH1, NSpace, NButton, NIcon } from 'naive-ui';
import { Add } from '@vicons/ionicons5';

import { useAuth } from 'stores/authentication.js';

const auth = useAuth();

const projectsData = (
  await axios.post('http://localhost:3000/projets', { userid: auth.user?.id })
).data;

console.log(projects);

const cols = [
  { title: 'Id', key: 'id' },
  { title: 'État', key: 'etat' },
  { title: 'Date création', key: 'createdAt' },
];
</script>

<template>
  <NSpace vertical>
    <NH1>La liste des projets</NH1>
    <NSpace justify="end">
      <NButton
        @click="showInsertEmployeModal"
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
    <STable :data="projects" :columns="cols" />
  </NSpace>
</template>
