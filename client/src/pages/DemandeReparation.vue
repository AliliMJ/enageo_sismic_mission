<script setup>
import STable from '../components/STable.vue';
import axios from 'axios';
import { NSpace, NButton, NIcon, NInput, NH1 } from 'naive-ui';
import { Add } from '@vicons/ionicons5';

import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { SearchOutline as search } from '@vicons/ionicons5';
import { useAuth } from '../stores/authentication';
import MaterielTag from '../components/MaterielTag.vue';

import { h } from 'vue';

const router = useRouter();

const auth = useAuth();

const materiel = ref([]);

materiel.value = (
  await axios.get(
    `http://localhost:3000/material/materielEnReparationExterne/${String(
      auth.employe.codeMission
    )}`
  )
).data;

const cols = [
  { title: 'code materiel', key: 'codeMat' },
  { title: 'designation', key: 'designation' },
  { title: 'matricule', key: 'matricule' },
  {
    title: 'Status',
    key: 'statuMateriel',
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
    },
  },
];

const handleClick = (materielEnPanne) => {
  router.push(`/suiviMateriel/${materielEnPanne.codeMat}`);
};
</script>

<template>
  <NH1>L'atelier mecanique de la mission</NH1>
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
        Ajouter un matériel à l'atelier
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NSpace>
      <STable @onRowClicked="handleClick" :data="materiel" :columns="cols" />
    </NSpace>
  </NSpace>
</template>

<style scoped>
.bar-space {
  width: 38vw;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
}

.line-space {
  width: 38vw;
  height: 180px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
}
</style>
