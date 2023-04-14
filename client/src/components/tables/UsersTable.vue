<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';

import STable from 'common/STable.vue';
import { NH1 } from 'naive-ui';

const auth = useAuth();

console.log(auth.user.hashPassword);
const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

console.log(req);

const users = (await axios.post('http://localhost:3000/users', req)).data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'role', key: 'role' },
];
</script>

<template>
  <NH1>Utilisateurs</NH1>
  <STable :data="users" :columns="cols" />
</template>
