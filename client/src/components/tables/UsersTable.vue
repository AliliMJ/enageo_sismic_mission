<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';
import STable from 'common/STable.vue';
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
  <STable :data="users" :columns="cols" />
</template>
