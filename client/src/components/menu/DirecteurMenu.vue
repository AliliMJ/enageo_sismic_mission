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
  AnalyticsOutline as Analytics,
  LocationOutline as Location,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  ...optionDashboard,
  {
    title: renderMenuItem('Analyse', Route.Analyse),
    key: Route.Analyse,
    icon: renderIcon(Analytics),
  },
  {
    title: renderMenuItem('Carte', Route.Carte),
    key: Route.Carte,
    icon: renderIcon(Location),
  },

  ...optionsCompte,
];
</script>
