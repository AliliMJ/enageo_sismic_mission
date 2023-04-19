<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NSpace } from 'naive-ui';

import { useRouter } from 'vue-router';

//const projects = (await axios.post('http://localhost:3000/projets', {user:id})).data;
const projects = [];

const router = useRouter();
const cols = [
  { title: 'Id', key: 'id' },
  { title: 'État', key: 'état' },
  { title: 'Date création', key: 'createdAt' },
];

const handleClick = (employe) => {
  router.push(`/employe/${employe.id}`);
};
</script>

<template>
  <NSpace vertical>
    <NH1>La liste des projets</NH1>
    <NSpace justify="end"> </NSpace>
    <STable @onRowClicked="handleClick" :data="projects" :columns="cols" />
  </NSpace>
</template>
