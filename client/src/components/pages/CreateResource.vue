<script setup>
import {
  NInput,
  NInputNumber,
  NButton,
  NForm,
  NFormItem,
  NText,
  NH1,
  NH2,
  NAutoComplete,
  NCard,
  useMessage,
} from 'naive-ui';
import { ref } from 'vue';
import { Mesure } from '../../enums';
import axios from 'axios';

const message = useMessage();

const resource = ref({
  titre: null,
  mesure: { type: null, unit: null },
  prixUnitaire: null,
});
const allMesures = Object.keys(Mesure).map((m) => ({
  value: Mesure[m],
  label: m,
}));
const units = ['mètre cube', 'mètre', 'kilogramme', 'piéce'].map((u, i) => ({
  label: u,
  value: i,
}));
const mesureOptions = computed(() => {
  return allMesures.filter((m) => {
    return m.label
      .toLocaleLowerCase()
      .includes(resource.value.mesure.type?.trim().toLocaleLowerCase());
  });
});

const unitOptions = computed(() => {
  return units.filter((u) => {
    return u.label
      .toLocaleLowerCase()
      .includes(resource.value.mesure.unit?.trim().toLocaleLowerCase());
  });
});

async function create() {
  await axios.post(`http://localhost:3000/resource`, resource.value);
  message.success('Une ressource à été créee');
  resource.value = {
    titre: null,
    mesure: { type: null, unit: null },
    prixUnitaire: null,
  };
}
</script>

<template>
  <n-h1>Creation d'un nouveau type de ressource</n-h1>
  <n-card>
    <n-form :model="resource">
      <n-form-item label="Titre" path="titre">
        <n-input
          v-model:value="resource.titre"
          placeholder="Saissisez un titre pour la ressource"
        />
      </n-form-item>
      <n-h2>Choissiez une mesure</n-h2>
      <n-form-item label="Mesure" path="mesure">
        <n-auto-complete
          v-model:value="resource.mesure.type"
          placeholder="Ex. Volume"
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
      <n-form-item label="Unité" path="unit">
        <n-auto-complete
          v-model:value="resource.mesure.unit"
          placeholder="Ex. Kg, mètre ..."
          :options="unitOptions"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="success" @click="create"> Créer </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>
.n-input-number {
  min-width: 50%;
}
</style>
