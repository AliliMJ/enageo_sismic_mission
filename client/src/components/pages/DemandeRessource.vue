<script setup>
import {
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NForm,
  NFormItem,
  NText,
  NDynamicInput,
  NCard,
  NDivider,
  NSpace,
} from 'naive-ui';
import { ref } from 'vue';

const resources = ref([]);

const typeOptions = [
  { label: 'Nombre', value: 0 },
  { label: 'Texte', value: 1 },
  { label: 'Booléan', value: 2 },
];

function onCreate() {
  return {
    field: null,
    type: null,
    value: null,
  };
}

const resourceForm = ref({
  resource: {
    titre: 'Eau',
    mesure: { type: 'Volume', unite: 'métre cube' },
    prixUnitaire: null,
  },
  valeurMesure: null,
  otherData: [{ field: 'jjj', type: 1, value: 'heee' }],
});

function resetField(index) {
  console.log(index);

  resourceForm.value.otherData[index].value = null;
}
</script>
<template>
  <h1>Demande de ressources</h1>

  <n-form :model="resourceForm">
    <n-form-item label="Titre" path="resource.titre">
      <n-input
        v-model:value="resourceForm.resource.titre"
        placeholder="Saissisez un titre pour la ressource"
      />
    </n-form-item>
    <n-form-item
      v-if="resourceForm.resource.mesure"
      :label="resourceForm.resource.mesure?.type"
      path="valeurMesure"
    >
      <n-input-number
        v-model:value="resourceForm.valeurMesure"
        placeholder="Saissisez une valeur de mesure"
        :show-button="false"
      >
        <template #suffix>
          <NText depth="3" strong>{{
            resourceForm.resource.mesure.unite
          }}</NText>
        </template>
      </n-input-number>
    </n-form-item>

    <NCard title="Autres données">
      <NDynamicInput
        v-model:value="resourceForm.otherData"
        :on-create="onCreate"
      >
        <template #create-button-default> Ajouter plus de données </template>
        <template #default="{ value, index }">
          <NSpace>
            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`otherData[${index}].field`"
            >
              <n-input
                v-model:value="resourceForm.otherData[index].field"
                placeholder="Nom du champ"
                @keydown.enter.prevent
              />
            </NFormItem>
            <span> = </span>
            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`otherData[${index}].type`"
            >
              <n-select
                placeholder="Type"
                v-model:value="resourceForm.otherData[index].type"
                :options="typeOptions"
                @update:value="resetField(index)"
              />
            </NFormItem>

            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`otherData[${index}].value`"
            >
              <n-input
                v-if="resourceForm.otherData[index].type == 1"
                v-model:value="resourceForm.otherData[index].value"
                @keydown.enter.prevent
                placeholder="Saissisez un texte"
              />
              <n-select
                v-else-if="resourceForm.otherData[index].type == 2"
                placeholder="Valeur"
                v-model:value="resourceForm.otherData[index].value"
                :options="[
                  { label: 'Vrai', value: true },
                  { label: 'Faux', value: false },
                ]"
              />
              <n-input-number
                v-else-if="resourceForm.otherData[index].type == 0"
                v-model:value="resourceForm.otherData[index].value"
                @keydown.enter.prevent
                placeholder="Saissisez un nombre"
                :show-button="false"
              />
            </NFormItem>

            <NDivider />
          </NSpace>
        </template>
      </NDynamicInput>
    </NCard>

    <n-form-item>
      <n-button type="success"> Ajouter </n-button>
    </n-form-item>
    <n-form-item>
      <n-button type="warning"> Confirmer </n-button>
    </n-form-item>
  </n-form>
</template>
<style scoped>
.n-input-number {
  min-width: 40%;
}
.n-select {
  min-width: 230px;
}
</style>
