<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import CreateProject from '../pages/CreateProject.vue';
import { NH1, NSpace, NButton, NIcon } from 'naive-ui';
import { Add } from '@vicons/ionicons5';

import { useRouter } from 'vue-router';

//const projects = (await axios.post('http://localhost:3000/projets', {user:id})).data;
const projects = [];

const router = useRouter();
const cols = [
  { title: 'Id', key: 'id' },
  { title: 'État', key: 'état' },
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
