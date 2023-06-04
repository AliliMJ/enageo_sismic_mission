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
import Modal from '../components/AjouterEmployeModal.vue';
import { Add } from '@vicons/ionicons5';
import Fonction from '../components/Fonction.vue';

import { useRouter } from 'vue-router';
import { SearchOutline as search } from '@vicons/ionicons5';
import { useAuth } from '../stores/authentication';
import { Fonctions } from '../utils/enums';
import EtatEmployeTag from '../components/EtatEmployeTag.vue';

const auth = useAuth();
const dialog = useDialog();
const message = useMessage();

function deleteEmploye() {
}

async function confirmAdd() {
  showModal.value = false;
}



const employes = ref([]);
employes.value = (
  await axios.get(
    `http://localhost:3000/employes`
  )
).data;

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
  {
    title: 'mission',
    key: 'codeMission',
  },
];

const handleClick = (employe) => {
  router.push(`/detailEmploye/${employe.id}`);
};
const showModal = ref(false);
const showAjouterEmployeModal = () => {
  showModal.value = true;
};

const searchName = ref('');
const searchFilter = () => {
  watch(searchName, async () => {
    if (searchName.value.length > 0) {
      employes.value = (
        await axios.get(
          `http://localhost:3000/employes/?like=${searchName.value}`
        )
      ).data;
    } else {
      employes.value = (
        await axios.get(
          `http://localhost:3000/employes`
        )
      ).data;
    }
  });
};
</script>

<template>
    <Modal
      :title="`ajouter un employé à la base des données`"
      :showModal="showModal"
      v-if="showModal"
      @cancel="showModal = false"
      @confirm="confirmAdd"
    />
  <NSpace vertical>
    <NH1>La liste des employés</NH1>
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
      <NButton
        @click="showAjouterEmployeModal"
        type="success"
        icon-placement="right"
      >
        Ajouter employé
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <STable
      @onRowClicked="handleClick"
      :data="employes"
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
