<script setup>
import axios from 'axios';

import STable from '../common/STable.vue';

import { NH1 } from 'naive-ui';

import { useAuth } from '../../stores/authentication.js';
const auth = useAuth();

const equipes = (
  await axios.post('http://localhost:3000/equipes/mission', {
    userId: auth?.user?.id,
  })
).data;
console.log(equipes);
const cols = [
  { title: 'Nom', key: 'nom' },
  {
    title: 'Activité',
    key: 'activite',
    render({ activite }) {
      return activite.nomAct;
    },
  },
];
</script>

<template>
  <NH1>La liste des équipes</NH1>
  <STable :data="equipes" :columns="cols" />
</template>
