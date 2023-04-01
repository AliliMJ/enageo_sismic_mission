<template>
  <n-menu :options="menuOptions" v-model:value="selectedKey" />
</template>

<script setup>
import { NMenu } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import {
  CartOutline as Cart,
  SyncOutline as Sync,
  LibraryOutline as Library,
  HomeOutline as Home,
} from '@vicons/ionicons5';
import { renderIcon, renderMenuItem } from 'utils/render.js';
import { names } from '@/names';
const route = useRoute();
const selectedKey = ref(route.name);
watch(route, (route) => {
  selectedKey.value = route.name;
});

const menuOptions = [
  {
    label: renderMenuItem('Tableau de bord', names.dashboard),
    key: names.dashboard,
  },
  {
    label: `Bien d'équipement`,
    key: 'bs',
    children: [
      {
        type: 'group',
        label: 'Transport',
        children: [{ label: 'Véhicules', key: 'vehicule' }],
      },
      {
        type: 'group',
        label: 'Travaux',
        children: [
          { label: 'Vibeurs', key: 'vibreurs' },
          { label: 'Bulldozers', key: 'buldozer' },
          { label: 'Labo', key: 'labo' },
        ],
      },
      {
        type: 'group',
        label: 'Outils',
        children: [
          { label: 'Ordinateurs', key: 'ordinateurs' },
          { label: 'Appareils éléctroniques', key: 'elec' },
          { label: 'Piéces mécaniques', key: 'mechanical' },
        ],
      },
    ],
  },
  {
    label: 'Ressources',
    key: 'resources',
    children: [
      {
        type: 'group',
        label: 'Nouriture',
        children: [
          { label: 'Liquides', key: 'liquid' },
          { label: 'Solides', key: 'solid' },
        ],
      },
      {
        type: 'group',
        label: 'Ressources énergétiques',
        children: [
          { label: 'Éssence', key: 'essence' },
          { label: 'Mazot', key: 'mazot' },
          { label: 'Gaz', key: 'gaz' },
        ],
      },
    ],
  },
];
</script>
