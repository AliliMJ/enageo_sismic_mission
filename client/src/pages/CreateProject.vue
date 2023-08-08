<script setup>
//choisir le client
//choisir des objectifs et etablir des plans
import axios from 'axios';
import MapEditor from '../components/MapEditor.vue';
import { useRouter } from 'vue-router';
import {
  NForm,
  NEmpty,
  NInput,
  NH1,
  NH2,
  NSpace,
  NCard,
  NButton,
  NInputNumber,
  NGrid,
  NFormItemGi,
  NModal,
  NDataTable,
  NGi,
  NDatePicker,
  useMessage,
} from 'naive-ui';
import { ref } from 'vue';

import { useAuth } from '../stores/authentication';
const colCoordinates = [
  { title: 'longitude', key: 'longitude' },
  { title: 'latitude', key: 'latitude' },
];

const auth = useAuth();
const router = useRouter();
const showMapEditor = ref(false);
const coordinates = ref([]);
const wilaya = ref(null);
const message = useMessage();

function addCoordinates(data) {
  const co = data.coordinates.map((c) => {
    return { longitude: c[0], latitude: c[1] };
  });
  co.pop();
  coordinates.value = co;
  wilaya.value = data.wilaya;
  showMapEditor.value = false;
}

async function createProject() {
  try {
    if (coordinates.value.length == 0) {
      return message.error(
        'Vous avez oblier de préciser des coordonnées pour le site du projet'
      );
    }
    await axios.post('http://localhost:3000/projets/create', {
      idEmploye: auth.employe.id,
      nom: model.value.name,
      description: model.value.description,
      budget: model.value.budget,
      coordinates: coordinates.value,
      wilaya: wilaya.value,
      objVP: model.value.objVP,
      objDateDebut: new Date(model.value.objDateDebut),
      objDateFin: new Date(model.value.objDateFin),
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
  objVP: null,
  objDateDebut: null,
  objDateFin: null,
});
</script>

<template>
  <NH1>Création du projet</NH1>
  <NForm :model="model">
    <NSpace vertical>
      <NCard>
        <template #header>
          <n-h2>Générale</n-h2>
        </template>
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
              :resizable="false"
            />
          </n-form-item-gi>
          <n-gi :span="24">
            <n-h2>Objectifs</n-h2>
          </n-gi>
          <n-form-item-gi :span="24" label="Points vibrés" path="objectif">
            <n-input-number
              placeholder="Saisissez le nombre de VP"
              v-model:value="model.objVP"
              :show-button="false"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Date début" path="dateDebut">
            <n-date-picker v-model:value="model.objDateDebut" type="date" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Date fin" path="dateFin">
            <n-date-picker v-model:value="model.objDateFin" type="date" />
          </n-form-item-gi>
          <n-gi :span="24">
            <n-h2>Coordonnées</n-h2>
          </n-gi>
          <n-gi :span="24">
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
          </n-gi>
        </NGrid>
        <template #footer>
          <NButton type="success" @click="createProject"
            >Créer le projet</NButton
          >
        </template>
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
  flex-grow: 1;
}
.n-date-picker {
  flex-grow: 1;
}
</style>
