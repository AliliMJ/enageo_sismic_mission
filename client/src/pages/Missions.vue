<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';

import { NH1, NSpace, NButton, NIcon, NCard, useMessage } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import AddMissionModal from '../components/AddMissionModal.vue';

import { ref, onMounted } from 'vue';
const message = useMessage();

const missions = ref([]);
onMounted(async () => {
  missions.value = (await axios.get('http://localhost:3000/missions/')).data;
});

const cols = [
  { title: 'Code', key: 'codeMission' },
  { title: 'Description', key: 'description' },
];
const showAddMissionModal = ref(false);

async function addMission(mission) {
  try {
    const m = (await axios.post('http://localhost:3000/missions/', mission))
      .data;
    missions.value.push(m);
    showAddMissionModal.value = false;
    message.success('Un chantier a été créé');
  } catch (e) {
    console.log(e);
  }
}
function handleClick(row) {}
</script>

<template>
  <NH1>La liste des chantiers</NH1>

  <n-card>
    <NSpace vertical>
      <NSpace justify="end">
        <NButton
          @click="showAddMissionModal = true"
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
      <STable :data="missions" @onRowClicked="handleClick" :columns="cols" />
    </NSpace>
  </n-card>
  <AddMissionModal
    @confirm="addMission"
    @cancel="showAddMissionModal = false"
    :showModal="showAddMissionModal"
  />
</template>

<style scoped></style>
