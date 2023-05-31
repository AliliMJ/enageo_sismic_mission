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
  ConstructOutline as Atelier,
  PeopleOutline as people,
  BusOutline as bus,
  WaterOutline as Water,
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
    label: renderMenuItem('Matériel', Route.Material),
    key: Route.Material,
    icon: renderIcon(bus),
  },
  {
    label: renderMenuItem('Employés', Route.Employe),
    key: Route.Employe,
    icon: renderIcon(people),
  },
  {
    label: renderMenuItem('Ressource', Route.Ressource),
    key: Route.Ressource,
    icon: renderIcon(Water),
  },

  ...optionsCompte,
];
</script>
