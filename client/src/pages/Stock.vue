<script setup>
import axios from 'axios';

import { useRoute, useRouter } from 'vue-router';
import { Resource, createConsumption } from '../utils/resource';

import STable from '../components/STable.vue';

import AddResourceToProject from '../components/AddResourceToProject.vue';
import AddConsumptionModal from '../components/AddConsumptionModal.vue';
import {
  NH1,
  NSpace,
  NButton,
  NIcon,
  NSelect,
  NCard,
  useMessage,
} from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { h, onMounted } from 'vue';

const message = useMessage();

const showAddResourceModal = ref(false);

const route = useRoute();

const idProjet = route.params.idProjet;
const selectedRow = ref(null);
const showAddConsumptionModal = ref(false);

const stock = ref([]);
onMounted(async () => {
  stock.value = (
    await axios.get('http://localhost:3000/resource/stock/' + idProjet)
  ).data;
});
function renderResource(row) {
  if (row.stock != undefined) {
    const stockKey = Object.keys(row.stock)[0];
    return `${row.title} ${stockKey} : ${row.stock[stockKey]}`;
  }
  return `${row.title}`;
}
const cols = [
  {
    title: 'Ressource',
    key: 'data',
    render: renderResource,
  },
];

async function onResourceAdded(resource) {
  const d = {
    ...resource,
    idProjet: Number(idProjet),
  };
  await axios.post('http://localhost:3000/resource/addResource', d);

  //const r = new Resource(d);
  //console.log(r);

  showAddResourceModal.value = false;
  message.success('Une ressource a été ajoutée au stock');
  // stock.value = (
  //   await axios.get('http://localhost:3000/resource/stock/' + idProjet)
  // ).data;
}

function handleRowClick(row) {
  selectedRow.value = row;
  showAddConsumptionModal.value = true;
}

async function onStockConsumed(data) {
  showAddConsumptionModal.value = false;
  await axios.post('http://localhost:3000/resource/consommation', data);
}
</script>

<template>
  <NH1>Stock</NH1>
  <n-card>
    <NSpace vertical>
      <NSpace justify="end">
        <NButton
          @click="showAddResourceModal = true"
          type="success"
          icon-placement="right"
        >
          Ajouter une ressource
          <template #icon>
            <NIcon>
              <Add />
            </NIcon>
          </template>
        </NButton>
      </NSpace>
      <STable :data="stock" :columns="cols" @on-row-clicked="handleRowClick" />
    </NSpace>
  </n-card>
  <AddResourceToProject
    :show-modal="showAddResourceModal"
    @close="showAddResourceModal = false"
    @confirm="onResourceAdded"
  />
  <AddConsumptionModal
    v-if="showAddConsumptionModal"
    :show-modal="showAddConsumptionModal"
    :resource="selectedRow"
    @confirm="onStockConsumed"
    @close="showAddConsumptionModal = false"
  />
</template>
