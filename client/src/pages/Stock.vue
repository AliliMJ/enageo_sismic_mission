<script setup>
import axios from 'axios';

import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../stores/authentication';

import STable from '../components/STable.vue';

import AddResourceToProject from '../components/AddResourceToProject.vue';
import AddConsumptionModal from '../components/AddConsumptionModal.vue';
import StockLevel from '../components/StockLevel.vue';
import StockDropdown from '../components/StockDropdown.vue';

import { NH1, NSpace, NButton, NIcon, NCard, useMessage } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { h, onMounted, watch } from 'vue';
const auth = useAuth();

const project = (
  await axios.get(
    `http://localhost:3000/projets/prodByMission/${auth.employe?.codeMission}`
  )
).data;

const message = useMessage();

const showAddResourceModal = ref(false);

const route = useRoute();

const selectedRow = ref(null);
const showAddConsumptionModal = ref(false);

const stock = ref([]);
onMounted(async () => {
  if (project != null)
    stock.value = (
      await axios.get(
        'http://localhost:3000/resource/stock/' + project.idProjet
      )
    ).data;
});
function renderResource(row) {
  if (row.stock != undefined) {
    const stockKey = Object.keys(row.stock)[0];
    return `${stockKey} : ${row.stock[stockKey]}`;
  }
  return `${row.title}`;
}
const cols = [
  {
    title: 'Ressource',
    key: 'title',
  },
  {
    title: 'Stock',
    key: 'stock',
    render: (row) => {
      return h(StockDropdown, { stock: row.stock });
    },
  },
  {
    title: 'Seuil minimum',
    key: 'seuil',
    render: (row) => {
      return h(StockLevel, { stock: row });
    },
  },
];
// watch(stock, () => {
//   console.log('change');
//   cols.value = [
//     {
//       title: 'Ressource',
//       key: 'data',
//       render: renderResource,
//     },
//     {
//       title: 'Seuil minimum',
//       key: 'stock',
//       render: (row) => {
//         return h(StockLevel, { stock: row });
//       },
//     },
//   ];
// });

async function onResourceAdded(resource) {
  const d = {
    ...resource,
    idProjet: Number(project.idProjet),
  };
  const res = (
    await axios.post('http://localhost:3000/resource/addResource', d)
  ).data;

  const resourceInStock = stock.value.filter((s) => {
    return s.resource === res.resource;
  })[0];

  if (resourceInStock != undefined) {
    const index = stock.value.indexOf(resourceInStock);
    stock.value[index] = res;
  } else {
    stock.value.push(res);
  }

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
  const r = await (
    await axios.get(
      `http://localhost:3000/resource/stock/${project.idProjet}/${data.resource}`
    )
  ).data;

  const resourceInStock = stock.value.filter((s) => {
    return s.resource === r.resource;
  })[0];

  if (resourceInStock != undefined) {
    const index = stock.value.indexOf(resourceInStock);
    stock.value[index] = r;
  } else {
    return message.warning(
      "La consommation n'a pas été ajoutée correctement. Veuillez rafraîchir la page."
    );
  }

  message.success('Une consommation a été ajoutée');
}
function handleError(msg) {
  message.error(msg);
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
    @error="handleError"
  />
  <AddConsumptionModal
    v-if="showAddConsumptionModal"
    :show-modal="showAddConsumptionModal"
    :resource="selectedRow"
    @confirm="onStockConsumed"
    @close="showAddConsumptionModal = false"
    @error="handleError"
  />
</template>
