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
import { PeopleOutline as Users ,
         BriefcaseOutline as Case,
         BusOutline as Bus} from '@vicons/ionicons5';

const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  ...optionDashboard,
  {
    label: renderMenuItem('Comptes', Route.Compte),
    key: Route.Compte,
    icon: renderIcon(Users),
  },
  {
    label: renderMenuItem('les employes', Route.EmployesAdmin),
    key: Route.EmployesAdmin,
    icon: renderIcon(Case),
  },
  {
    label: renderMenuItem('vehicules', Route.MaterielsAdmin),
    key: Route.MaterielsAdmin,
    icon: renderIcon(Bus),
  },

  ...optionsCompte,
];
</script>
