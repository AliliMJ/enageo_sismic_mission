<script setup>
import {
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NForm,
  NFormItem,
  NText,
} from 'naive-ui';
import { ref } from 'vue';

const resource = ref({
  titre: null,
  mesure: null,
  prixUnitaire: null,
});

const mesureOptions = [
  { label: 'Quantité', value: 'qant' },
  { label: 'Volume', value: 'vol' },
  { label: 'Longeur', value: 'long' },
  { label: 'Surface', value: 'sur' },
  { label: 'Poids', value: 'poid' },
];
</script>

<template>
  <h1>Creation d'un nouveau type de ressource</h1>
  <n-form :model="resource">
    <n-form-item label="Titre" path="titre">
      <n-input
        v-model:value="resource.titre"
        placeholder="Saissisez un titre pour la ressource"
      />
    </n-form-item>
    <n-form-item label="Mesure" path="mesure">
      <n-select
        v-model:value="resource.mesure"
        placeholder="Choisir une mesure"
        :options="mesureOptions"
      />
    </n-form-item>
    <n-form-item label="Prix unitaire" path="prixUnitaire">
      <n-input-number
        v-model:value="resource.prixUnitaire"
        placeholder="Saissisez un prix unitaire"
        :show-button="false"
      >
        <template #suffix>
          <NText depth="3" strong>Dinars</NText>
        </template>
      </n-input-number>
    </n-form-item>
    <n-form-item>
      <n-button type="success"> Créer </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped>
.n-input-number {
  min-width: 30%;
}
</style>
