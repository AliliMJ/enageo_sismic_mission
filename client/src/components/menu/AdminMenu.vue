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
  BarChartOutline as Dashboard,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  {
    label: renderMenuItem('Tableau de bord', 'adminDashboard'),
    key: 'adminDashboard',
    icon: renderIcon(Dashboard),
  },
  {
    label: `Espace`,
    key: 'espace',
    icon: renderIcon(Cube),
    children: [
      {
        label: renderMenuItem('Utilisateurs', Route.Utilisateur),
        key: Route.Utilisateur,
      },
    ],
  },
  ...optionsCompte,
];
</script>
