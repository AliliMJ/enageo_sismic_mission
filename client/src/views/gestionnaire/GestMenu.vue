<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { optionsCompte, optionDashboard } from '../../utils/menuOptions.js';
import { renderIcon, renderMenuItem } from '../../utils/render.js';
import { Route } from '../../utils/enums';
import {
  ConstructOutline as Atelier,
  PeopleOutline as people,
  BusOutline as bus,
  CubeOutline as Cube,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  ...optionDashboard,
  {
    label: renderMenuItem('suivre les réparations', Route.Atelier),
    key: 'atelier',
    icon: renderIcon(Atelier),
  },
  {
    label: renderMenuItem('véhicules', Route.Material),
    key: Route.Material,
    icon: renderIcon(bus),
  },
  {
    label: renderMenuItem('Employés', Route.Employe),
    key: Route.Employe,
    icon: renderIcon(people),
  },
  {
    label: renderMenuItem('Stock', Route.Stock),
    key: Route.Stock,
    icon: renderIcon(Cube),
  },

  ...optionsCompte,
];
</script>
