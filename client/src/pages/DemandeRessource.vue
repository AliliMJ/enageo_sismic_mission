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
  NH2,
  NH1,
  NAutoComplete,
  NList,
  NThing,
  NListItem,
  useDialog,
  useMessage,
  NTag,
} from 'naive-ui';
import { h, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const resources = ref([]);
const dialog = useDialog();
const message = useMessage();

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
const resourceOption = ref([]);
const titre = ref(null);

const resourceForm = ref({
  resource: {
    mesure: { type: null, unit: null },
    prixUnitaire: null,
  },
  valeurMesure: null,
  otherData: [],
});

watch(titre, async () => {
  if (titre.value?.length > 0) {
    const data = (
      await axios.get(
        `http://localhost:3000/resource/titre?like=${titre.value}`
      )
    ).data;
    resourceOption.value = data.map((r) => ({
      label: r.titre,
      value: r,
    }));
  }
});

function resetField(index) {
  resourceForm.value.otherData[index].value = null;
}

function selectResource(data) {
  resourceForm.value.resource.mesure = data?.mesure;
  resourceForm.value.resource.prixUnitaire = data?.prixUnitaire;
}

function ajouter() {
  resources.value.push({
    titre: titre.value,
    [`${resourceForm.value.resource.mesure.type}`]:
      resourceForm.value.valeurMesure,
    prixUnitaire: resourceForm.value.resource.prixUnitaire,
    mesure: resourceForm.value.resource.mesure,

    ...resourceForm.value.otherData
      .map((data) => {
        if (data.type === 2) {
          return { [data.field]: data.value === 0 ? false : true };
        }
        return { [data.field]: data.value };
      })
      .reduce((result, obj) => {
        return Object.assign(result, obj);
      }, {}),
  });

  resourceForm.value = {
    resource: {
      mesure: { type: null, unit: null },
      prixUnitaire: null,
    },
    valeurMesure: null,
    otherData: [],
  };
  titre.value = null;
}

async function confirm() {
  dialog.warning({
    title: 'Confirm',
    content: 'Voulez-vous commander ces ressources?',
    positiveText: 'Oui',
    negativeText: 'Non',
    onPositiveClick: async () => {
      await axios.post(
        'http://localhost:3000/resource/consommation',
        resources.value
      );
      message.success(`${resources.value.length} resources ont été commandées`);
      router.back();
    },
  });
}
</script>
<template>
  <n-h1>Demande de ressources</n-h1>
  <n-space vertical>
    <n-card>
      <n-form :model="resourceForm">
        <n-form-item label="Titre" path="titre">
          <n-auto-complete
            v-model:value="titre"
            placeholder="Une ressource peut être un carburant, une pièce mécanique, ..."
            :options="resourceOption"
            @select="selectResource"
          />
        </n-form-item>

        <n-form-item
          v-if="resourceForm.resource.mesure?.type"
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
                resourceForm.resource.mesure.unit
              }}</NText>
            </template>
          </n-input-number>
        </n-form-item>
        <n-h2>Autres données</n-h2>

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
                    { label: 'Vrai', value: 1 },
                    { label: 'Faux', value: 0 },
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
      </n-form>
      <template #footer>
        <n-space justify="space-between">
          <n-space>
            <n-button @click="ajouter" type="success" ghost> Ajouter </n-button>
            <n-button> Liste </n-button>
          </n-space>
          <n-button type="success" @click="confirm"> Confirmer </n-button>
        </n-space>
      </template>
    </n-card>
    <n-card>
      <n-list>
        <n-list-item v-for="resource of resources">
          <n-thing :title="resource.titre">
            <template #description>
              <n-tag size="small" type="success">{{
                resource.mesure.type
              }}</n-tag>
            </template>
            <template #header-extra
              ><n-space align="center">
                <n-text style="font-size: 1.5rem; marging: 0"
                  >x {{ resource[resource.mesure.type] }}</n-text
                >
                <n-text strong :depth="3">{{ resource.mesure.unit }}</n-text>
              </n-space>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-card>
  </n-space>
</template>
<style scoped>
.n-input-number {
  min-width: 40%;
}
.n-select {
  min-width: 230px;
}
</style>
