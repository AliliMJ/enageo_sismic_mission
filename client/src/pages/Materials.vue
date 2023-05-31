<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';
import { NSpace, NButton, NIcon, NInput, NH1, useMessage } from 'naive-ui';
import { h } from 'vue';
import MaterielTag from '../components/MaterielTag.vue';
import { useAuth } from '../stores/authentication';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import Modal from '../components/AffecteGoodMaterielModal.vue';
import { SearchOutline as search, Add } from '@vicons/ionicons5';

const auth = useAuth();
const router = useRouter();
const message = useMessage();

const showModal = ref(false);

const materiels = ref([]);

materiels.value = (
  await axios.get(
    `http://localhost:3000/material/materielByMission/${auth.employe.codeMission}`
  )
).data;

const cols = [
  { title: 'Code', key: 'codeMat' },
  { title: 'Marque', key: 'marque' },
  { title: 'modèle', key: 'modele' },
  {
    title: 'date du mise en service',
    key: 'dateService',
    render(row) {
      return new Date(row.dateService).toLocaleDateString('fr');
    },
  },
  { title: 'Désignation', key: 'designation' },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
    },
  },
  // {
  //   title: 'Occupation',
  //   key: 'occupation',
  //   render(row) {
  //     return row.projetId ?? 'Disponible';
  //   },
  // },
];

const handleClick = (materiel) => {
  router.push(`/materiel/${materiel.codeMat}`);
};

const showInsertMaterielModal = () => {
  showModal.value = true;
};

async function confirmAdd(codeMatricule) {
  const req = {
    codeMat: String(codeMatricule),
  };

  const materiel = (
    await axios.put(
      `http://localhost:3000/material/ajouterMaterielWithMission/${auth.employe.codeMission}`,
      req
    )
  ).data;
  materiels.value.push(materiel);
  showModal.value = false;
}

const searchDesignation = ref('');
const searchFilter = () => {
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materiels.value = (
        await axios.get(
          `http://localhost:3000/material/allMateriel/designation/${auth.employe.codeMission}?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materiels.value = (
        await axios.get(
          `http://localhost:3000/material/materielByMission/${auth.employe.codeMission}`
        )
      ).data;
    }
  });
};
</script>

<template>
  <NH1>La liste des matériels du {{ auth.employe.codeMission }}</NH1>
  <NSpace justify="space-between">
    <NSpace> </NSpace>
    <NSpace>
      <n-input
        v-model:value="searchDesignation"
        @update:value="searchFilter"
        placeholder="Rechercher par designation"
        style="width: 255px"
      >
        <template #suffix>
          <n-icon :component="search" />
        </template>
      </n-input>
      <NButton
        @click="showInsertMaterielModal"
        class="button"
        type="success"
        icon-placement="right"
      >
        Affecter un matériel à la mission
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NSpace>
      <STable :data="materiels" :columns="cols" @onRowClicked="handleClick" />
    </NSpace>
  </NSpace>
  <Modal
    v-if="showModal"
    :showModal="showModal"
    @cancel="showModal = false"
    @confirm="confirmAdd"
    :codeMission="auth.employe.codeMission"
  />
</template>
