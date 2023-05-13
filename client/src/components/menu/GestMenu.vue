<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { optionsCompte, optionDashboard } from './menuOptions.js';
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
});

const menuOptions = [
  ...optionDashboard,
  {
    label: renderMenuItem('Atelier mécanique', Route.Atelier),
    key: 'atelier',
    icon: renderIcon(Atelier),
  },
  {
    label: `Espace`,
    key: 'space',
    icon: renderIcon(Cube),
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
