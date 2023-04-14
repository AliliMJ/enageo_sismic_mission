<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';
import STable from 'common/STable.vue';
import { NH1 } from 'naive-ui';

import STable from 'common/STable.vue';
import { NH1, NTag, NButton, NIcon, NSpace } from 'naive-ui';
import { h } from 'vue';
import OptionButton from '../common/OptionButton.vue';
import { Add } from '@vicons/ionicons5';
const auth = useAuth();

console.log(auth.user.hashPassword);
const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

console.log(req);

const employes = (await axios.get('http://localhost:3000/employes')).data;

const fonctions = (await axios.get('http://localhost:3000/employes/fonctions'))
  .data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'nom', key: 'nom' },
  { title: 'prénom', key: 'prenom' },
  {
    title: 'fonction',
    key: 'fonctionId',
    render(row) {
      return h(
        NTag,
        { round: true, bordered: false, type: 'info' },
        {
          default: () =>
            fonctions.filter((f) => f.id === row.fonctionId)[0].nom,
        }
      );
    },
  },
  {
    title: 'Date naissance',
    key: 'dateNaissance',
    render(row) {
      return new Date(row.dateNaissance).toLocaleDateString();
    },
  },
  {
    title: 'Date Adhésion',
    key: 'dateAdhesion',
    render(row) {
      return new Date(row.dateAdhesion).toLocaleDateString();
    },
  },
  {
    title: 'Options',
    key: 'options',
    render(row) {
      return h(OptionButton);
    },
  },
];
</script>

<template>
  <NSpace vertical>
    <NH1>Employés</NH1>
    <NButton type="success" icon-placement="right">
      Ajouter
      <template #icon>
        <NIcon>
          <Add />
        </NIcon>
      </template>
    </NButton>
    <STable :data="employes" :columns="cols" />
  </NSpace>
</template>
