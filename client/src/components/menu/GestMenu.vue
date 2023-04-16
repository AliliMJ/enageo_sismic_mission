<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { optionsCompte } from './menuOptions.js';
import { renderIcon, renderMenuItem } from '../../utils/render.js';
import { Route } from '../../enums';
import {
  CubeOutline as Cube,
  ConstructOutline as Atelier,
  BarChartOutline as Dashboard,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
  console.log(selectedKey.value);
});
console.log(route.name);
const menuOptions = [
  {
    label: renderMenuItem('Tableau de bord', 'dashboard'),
    key: 'dashboard',
    icon: renderIcon(Dashboard),
  },
  {
    label: 'Atelier',
    key: 'atelier',
    icon: renderIcon(Atelier),
  },
  {
    label: `Espace`,
    key: 'space',
    icon: renderIcon(Cube),
    children: [
      {
        label: renderMenuItem('Matériel', 'materiel'),
        key: Route.Material,
      },
      { label: renderMenuItem('Employés', 'employe'), key: Route.Employe },
    ],
  },
  ...optionsCompte,
];
</script>
