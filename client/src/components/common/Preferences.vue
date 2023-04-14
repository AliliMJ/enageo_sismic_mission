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

const emps = (await axios.post('http://localhost:3000/employees', req)).data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'status', key: 'status' },
  { title: 'fonction', key: 'fonction' },
];
</script>

<template>
  <STable :data="emps" :columns="cols" />
</template>
