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
  HammerOutline as Project,
  PeopleOutline as Equipe,
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
    icon: renderIcon(Equipe),
  },

  {
    title: renderMenuItem('Projet', Route.Projet),
    key: 'projet',
    icon: renderIcon(Project),
  },

  ...optionsCompte,
];
</script>
