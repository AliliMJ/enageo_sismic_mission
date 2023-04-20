<script setup>
//choisir le client
//choisir des objectifs et etablir des plans
import {
  NForm,
  NDynamicInput,
  NFormItem,
  NInput,
  NH1,
  NH2,
  NSelect,
  NSpace,
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

const model = ref({
  client: '',
  dynamic: [],
});
const onCreate = () => ({ objectif: null, value: '', start: '', duration: '' });
</script>

<template>
  <NH1>Création du projet</NH1>
  <NForm :model="model">
    <NH2>Plan</NH2>

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
        </NSpace>
      </template>
    </NDynamicInput>
  </NForm>
</template>
<style scoped>
.n-select {
  min-width: 200px;
}
</style>
