<script setup>
//choisir le client
//choisir des objectifs et etablir des plans
import axios from 'axios';
import {
  NForm,
  NDynamicInput,
  NFormItem,
  NInput,
  NH1,
  NSelect,
  NSpace,
  NCard,
  NDatePicker,
  NButton,
  NInputNumber,
  NDivider,
  NText,
} from 'naive-ui';
import { ref } from 'vue';

const selectOptions = [
  {
    label: 'Points Vibrés',
    value: 1,
  },
  {
    label: 'Surface étudiée (km carrés)',
    value: 2,
  },
];

const clientOptions = [
  {
    label: 'Sonatrach',
    value: 1,
  },
];
async function createProject() {
  console.log(new Date('2023-05-09T23:00:00.000Z'));
  try {
    await axios.post('http://localhost:3000/projets/create', {
      clientId: model.value.client,
      plan: model.value.dynamic.map((p) => ({
        valeur: p.value,
        duree: p.duration,
        objectifId: p.objectif,
        debut: new Date(p.start),
      })),
    });
  } catch (e) {
    console.log(e);
  }
}
const model = ref({
  name: null,
  client: null,
  dynamic: [],
});
const onCreate = () => ({
  objectif: null,
  value: '',
  start: null,
  duration: null,
});
</script>

<template>
  <NH1>Création du projet</NH1>
  <NForm :model="model">
    <NSpace vertical>
      <NCard title="Propriétés">
        <NSpace>
          <NFormItem label="Nom du projet" path="client">
            <n-input
              placeholder="Saisissez un nom"
              v-model:value="model.name"
            />
          </NFormItem>
          <NFormItem label="Client" path="client">
            <n-select
              placeholder="Sélectionnez un client"
              v-model:value="model.client"
              :options="clientOptions"
            />
          </NFormItem>
        </NSpace>
        <NButton type="success" @click="createProject">Créer le projet</NButton>
      </NCard>
      <NCard title="Plan">
        <NDynamicInput v-model:value="model.dynamic" :on-create="onCreate">
          <template #create-button-default> Ajouter un plan </template>
          <template #default="{ value, index }">
            <NSpace>
              <NFormItem
                ignore-path-change
                :show-label="false"
                :path="`dynamic[${index}].objectif`"
              >
                <n-select
                  placeholder="Sélectionnez un objectif"
                  v-model:value="model.dynamic[index].objectif"
                  :options="selectOptions"
                />
              </NFormItem>

              <NFormItem
                ignore-path-change
                :show-label="false"
                :path="`dynamic[${index}].value`"
              >
                <n-input
                  v-model:value="model.dynamic[index].value"
                  placeholder="Valeur"
                  @keydown.enter.prevent
                />
              </NFormItem>
              <NFormItem
                ignore-path-change
                :show-label="false"
                :path="`dynamic[${index}].start`"
              >
                <NDatePicker
                  v-model:value="model.dynamic[index].start"
                  type="date"
                  placeholder="Date de début"
                />
              </NFormItem>
              <NFormItem
                ignore-path-change
                :show-label="false"
                :path="`dynamic[${index}].duration`"
              >
                <NInputNumber
                  :show-button="false"
                  v-model:value="model.dynamic[index].duration"
                  placeholder="Durée"
                >
                  <template #suffix>
                    <NText depth="3" strong>Jours</NText>
                  </template>
                </NInputNumber>
              </NFormItem>
              <NDivider />
            </NSpace>
          </template>
        </NDynamicInput>
      </NCard>
    </NSpace>
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
