<script setup>
//choisir le client
//choisir des objectifs et etablir des plans
import axios from 'axios';
import MapEditor from '../app/MapEditor.vue';
import { useRouter } from 'vue-router';
import {
  NForm,
  NEmpty,
  NInput,
  NH1,
  NSpace,
  NCard,
  NButton,
  NInputNumber,
  NGrid,
  NFormItemGi,
  NModal,
  NDataTable,
} from 'naive-ui';
import { ref } from 'vue';
import { useAuth } from '../../stores/authentication';
const colCoordinates = [
  { title: 'longitude', key: 'longitude' },
  { title: 'latitude', key: 'latitude' },
];

const auth = useAuth();
const router = useRouter();
const showMapEditor = ref(false);
const coordinates = ref([]);

function addCoordinates(data) {
  const co = data.map((c) => {
    return { longitude: c[0], latitude: c[1] };
  });

  co.pop();
  coordinates.value = co;
  showMapEditor.value = false;
}

async function createProject() {
  try {
    await axios.post('http://localhost:3000/projets/create', {
      idEmploye: auth.employe.id,
      nom: model.value.name,
      description: model.value.description,
      budget: model.value.budget,
      coordinates: coordinates.value,
    });
    router.back();
  } catch (e) {
    console.log(e);
  }
}
const model = ref({
  name: null,
  budget: null,
  description: null,
});
</script>

<template>
  <NH1>Création du projet</NH1>
  <NForm :model="model">
    <NSpace vertical>
      <NCard title="Propriétés">
        <NGrid :span="24" :x-gap="24">
          <n-form-item-gi :span="12" label="Nom" path="name">
            <n-input
              placeholder="Saisissez le nom du projet"
              v-model:value="model.name"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" label="Budget" path="budget">
            <n-input-number
              placeholder="Saisissez le budget du projet"
              v-model:value="model.budget"
              :show-button="false"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Description" path="description">
            <n-input
              placeholder="Saisissez une description pour le projet"
              v-model:value="model.description"
              type="textarea"
            />
          </n-form-item-gi>
        </NGrid>
        <NButton type="success" @click="createProject">Créer le projet</NButton>
      </NCard>
      <NCard title="Les coordonnées">
        <n-data-table
          :columns="colCoordinates"
          :data="coordinates"
          ref="projectsTable"
        >
          <template #empty>
            <n-empty description="Aucune coordonnée">
              <template #extra>
                <NButton dashed @click="showMapEditor = true"
                  >Ouvrir la carte</NButton
                >
              </template>
            </n-empty>
          </template>
        </n-data-table>
      </NCard>
    </NSpace>

    <n-modal v-model:show="showMapEditor">
      <MapEditor @finish="addCoordinates" />
    </n-modal>
  </NForm>
</template>
<style scoped>
.n-select {
  min-width: 230px;
}
.n-input-number {
  max-width: 150px;
}
</style>
