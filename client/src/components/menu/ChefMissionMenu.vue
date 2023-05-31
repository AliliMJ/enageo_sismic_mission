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
  HammerOutline as Project,
} from '@vicons/ionicons5';
import {
  DocumentTableTruck24Regular as Truck
} from '@vicons/fluent';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  ...optionDashboard,
  {
    title: renderMenuItem('Projet', Route.Projet),
    key: 'projet',
    icon: renderIcon(Project),
  },
  {
    title: renderMenuItem('Analyse', Route.Analyse),
    key: Route.Analyse,
    icon: renderIcon(Analytics),
  },
  {
    title: renderMenuItem('les demandes de trvail', Route.DemandeReparation),
    key: Route.DemandeReparation,
    icon: renderIcon(Truck),
  },
  ...optionsCompte,
];
</script>
