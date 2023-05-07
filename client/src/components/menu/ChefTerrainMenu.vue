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
  AnalyticsOutline as Analytics,
  HammerOutline as Project,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  ...optionDashboard,
  {
    title: renderMenuItem('Equipe', Route.Equipe),
    key: 'equipe',
    icon: renderIcon(Project),
  },
  {
    title: renderMenuItem('Terrain', Route.Terrain),
    key: 'terrain',
    icon: renderIcon(Analytics),
  },
  { title: renderMenuItem('Rapport', Route.Rapport), key: 'rapport' },

  ...optionsCompte,
];
</script>
