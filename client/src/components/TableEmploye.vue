<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';
import {
  NH1,
  NTag,
  NButton,
  NIcon,
  NSpace,
  useDialog,
  NInput,
  useMessage,
} from 'naive-ui';
import { h, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import Fonction from './Fonction.vue';

import { SearchOutline as search } from '@vicons/ionicons5';

import { Fonctions } from '../utils/enums';
import EtatEmployeTag from './EtatEmployeTag.vue';

const props = defineProps({
  employes: Array,
});
const router = useRouter();

const cols = [
  { title: 'id', key: 'id' },

  { title: 'nom', key: 'nom' },
  { title: 'prénom', key: 'prenom' },
  {
    title: 'fonction',
    key: 'fonctionId',
    defaultFilterOptionValues: [],
    filterOptions: [
      { label: 'Chef mission', value: Fonctions.ChefMision },
      { label: 'Chef terrain', value: Fonctions.ChefTerrain },
      { label: 'Gestionnaire', value: Fonctions.Gestionnaire },
      { label: 'Médcin', value: Fonctions.Medcin },
      { label: 'Ouvrier', value: Fonctions.Ouvrier },
    ],
    filter(value, row) {
      return row.fonctionId === value;
    },
    render(row) {
      return h(Fonction, { fonctionId: row.fonctionId });
    },
  },
  {
    title: 'Etat',
    key: 'etat',
    defaultFilterOptionValues: [],
    filterOptions: [
      { label: 'En mission', value: 'mission' },
      { label: 'En conge', value: 'conge' },
      { label: 'En maladie', value: 'maladie' },
    ],
    filter(value, row) {
      return row.etat === value;
    },
    render(row) {
      return h(EtatEmployeTag, { EtatEmploye: row.etat });
    },
  },
  {
    title: 'Date rejoint',
    key: 'dateRejoint',
    render(row) {
      return new Date(row.dateRejoint).toLocaleDateString();
    },
  },
];

const handleClick = (employe) => {
  router.push(`/employe/${employe.id}`);
};

const searchName = ref('');
const searchFilter = () => {
  watch(searchName, async () => {
    if (searchName.value.length > 0) {
      employes.value = (
        await axios.get(
          `http://localhost:3000/employes/getEmployesBymissionByName/${employe.codeMission}?like=${searchName.value}`
        )
      ).data;
    } else {
      employes.value = (
        await axios.get(
          `http://localhost:3000/employes/employeByMission/${employe.codeMission}`
        )
      ).data;
    }
  });
};
</script>

<template>
  <NSpace vertical>
    <NSpace justify="end">
      <n-input
        v-model:value="searchName"
        @update:value="searchFilter"
        placeholder="Rechercher par nom"
        style="width: 255px"
      >
        <template #suffix>
          <n-icon :component="search" />
        </template>
      </n-input>
    </NSpace>
    <STable
      @onRowClicked="handleClick"
      :data="props.employes"
      :columns="cols"
      pagination-behavior-on-filter="first"
    />
  </NSpace>
</template>

<style scoped>
#new-employe {
  align-self: self-start;
}
</style>
