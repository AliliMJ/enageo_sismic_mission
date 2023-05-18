<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NTag, NButton, NIcon, NSpace, useDialog , NInput } from 'naive-ui';
import { h, ref , onMounted, computed, watch} from 'vue';
import Modal from '../common/Modal.vue';
import { Add } from '@vicons/ionicons5';
import Fonction from '../common/Fonction.vue';
import Position from '../common/Position.vue';
import { useRouter } from 'vue-router';
import { SearchOutline as search } from "@vicons/ionicons5";
import { useAuth } from '../../stores/authentication';

const auth = useAuth();
const dialog = useDialog();

function deleteEmploye(id) {
  dialog.warning({
    title: 'Confimer la supprission',
    content: 'Êtes-vous sur de supprimer cet employé?',
    positiveText: 'Confirmer',
    negativeText: 'Annuler',
    onPositiveClick: () => console.log('Employé supprimer', id),
    onNegativeClick: () => console.log('Suppression annulée'),
  });
}

function updateEmploye(id) {
  window.alert(id);
}

const employe = (await axios.get(`http://localhost:3000/employes/${auth.user.id}`)).data;

const employes = ref([]);
 employes.value = (await axios.get(`http://localhost:3000/employes/employeByMission/${employe.codeMission}`)).data;

const router = useRouter();
const cols = [
  { title: 'id', key: 'id' },

  { title: 'nom', key: 'nom' },
  { title: 'prénom', key: 'prenom' },
  {
    title: 'fonction',
    key: 'fonctionId',
    render(row) {
      return h(Fonction, { fonctionId: row.fonctionId });
    },
  },
  {
    title: 'Position',
    key: 'etatEmployeId',
    render(row) {
      return h(Position, { etatEmployeId: row.etatEmployeId });
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
const showModal = ref(false);
const showInsertEmployeModal = () => {
  showModal.value = true;
};

const searchName = ref("");
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
    <Modal
      :title="`affecter un employé au mission ${ employe.codeMission }`"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="showModal = false"
    />
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
        @click="showInsertEmployeModal"
        type="success"
        icon-placement="right"
      >
        Affecter nouvel employé
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <STable @onRowClicked="handleClick" :data="employes" :columns="cols" pagination-behavior-on-filter="first"/>
  </NSpace>
</template>

<style scoped>
#new-employe {
  align-self: self-start;
}
</style>
