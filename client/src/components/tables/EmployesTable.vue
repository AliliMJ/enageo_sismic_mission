<script setup>
import axios from 'axios';
<<<<<<< HEAD
import { useAuth } from '../../stores/authentication';
import STable from 'common/STable.vue';
const auth = useAuth();

console.log(auth.user.hashPassword);
const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

console.log(req);

const emps = (await axios.post('http://localhost:3000/employees', req)).data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'status', key: 'status' },
  { title: 'fonction', key: 'fonction' },
=======

import STable from 'common/STable.vue';
import { NH1 } from 'naive-ui';

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
      return fonctions.filter((f) => f.id === row.fonctionId)[0].nom;
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
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea
];
</script>

<template>
<<<<<<< HEAD
  <STable :data="emps" :columns="cols" />
=======
  <NH1>Employés</NH1>
  <STable :data="employes" :columns="cols" />
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea
</template>
