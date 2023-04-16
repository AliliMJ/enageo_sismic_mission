<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu, NDivider } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { optionsCompte } from './menuOptions.js';
import { renderIcon, renderMenuItem } from '../../utils/render.js';
import { Route } from '../../enums';
import {
  BarChartOutline as Dashboard,
  PeopleOutline as Users,
} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  {
    label: renderMenuItem('Tableau de bord', 'dashboard'),
    key: 'dashboard',
    icon: renderIcon(Dashboard),
  },
  {
    label: renderMenuItem('Utilisateurs', Route.Utilisateur),
    key: Route.Utilisateur,
    icon: renderIcon(Users),
  },

  ...optionsCompte,
];
</script>
