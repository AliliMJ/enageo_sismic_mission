<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';

import { NH1, NSpace, NButton, NIcon, NCard } from 'naive-ui';
import { Add } from '@vicons/ionicons5';

import { h, ref } from 'vue';

const createMissionModal = ref(false);

const missions = (await axios.get('http://localhost:3000/missions/')).data;

const cols = [
  { title: 'Code', key: 'codeMission' },
  { title: 'Description', key: 'description' },
];

function addMission() {}
function handleClick(row) {}
</script>

<template>
  <NH1>La liste des chantiers</NH1>
  <n-card>
    <NSpace vertical>
      <NSpace justify="end">
        <NButton
          @click="createMissionModal = true"
          type="success"
          icon-placement="right"
        >
          Créer un chantier
          <template #icon>
            <NIcon>
              <Add />
            </NIcon>
          </template>
        </NButton>
      </NSpace>
      <STable @onRowClicked="handleClick" :data="chantiers" :columns="cols" />
    </NSpace>
  </n-card>
</template>

<style scoped></style>
