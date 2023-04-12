<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { optionsCompte } from '../menuOptions.js';
import { renderMenuItem } from './render';
import { Route } from '../../enums';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
  console.log(selectedKey.value);
});
console.log(route.name);
const menuOptions = [
  {
    label: renderMenuItem('Tableau de bord', 'gestDashboard'),
    key: 'gestDashboard',
  },
  {
    label: `Tables`,
    key: 'tables',
    children: [
      {
        label: renderMenuItem('Matériel', Route.Material),
        key: Route.Material,
      },
      { label: renderMenuItem('Employés', Route.Employe), key: Route.Employe },
    ],
  },
  ...optionsCompte,
];
</script>
