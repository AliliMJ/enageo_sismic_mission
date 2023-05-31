<script setup>
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NButton,
  NInput,
  NText,
  NH1,
  useMessage,
} from 'naive-ui';

import AddRendementModal from '../components/AddRendementModal.vue';
import TabRendement from '../components/TabRendement.vue';

import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Activites, ActiviteUnit } from '../utils/enums';

import axios from 'axios';

const router = useRouter();
const route = useRoute();
const message = useMessage();

const showModal = ref(false);
let cardCount = 0;

const rendements = ref([]);
const resume = ref(null);
const titre = ref(null);

function handleConfirmAdd(rendement) {
  cardCount++;
  rendements.value.push({
    key: cardCount,
    ...rendement,
    activite: selectedActivity.value,
  });

  showModal.value = false;
}
function removeCard(key) {
  rendements.value = rendements.value.filter((r) => r.key !== key);
}

async function createReport() {
  const idProjet = route.params.idProjet;

  try {
    await axios.post('http://localhost:3000/rapports', {
      rendements: rendements.value,
      idProjet,
      resume: resume.value,
      titre: titre.value,
    });
    router.back();
    message.success('Un rapport a été ajouté');
  } catch (e) {
    message.error(e?.response?.data?.err);
  }
}

function annuler() {
  router.back();
}

const selectedActivity = ref('');

function openModal(activity) {
  selectedActivity.value = activity;
  showModal.value = true;
}

let tabs = Object.keys(Activites).map((a) => {
  return { name: Activites[a], title: a, unit: ActiviteUnit[a] };
});
</script>

<template>
  <n-h1>Création du rapport du jour</n-h1>
  <n-space vertical>
    <n-card>
      <NSpace vertical>
        <NText strong> Titre du rapport </NText>
        <n-input
          placeholder="Saisissez un titre pour ce rapport"
          style="width: 50%"
          v-model:value="titre"
        />
        <NText strong> Résumé du rapport </NText>

        <n-input
          type="textarea"
          placeholder="Veuillez écrire un résumé pour ce rapport"
          style="width: 50%"
          :resizable="false"
          v-model:value="resume"
        />
      </NSpace>
      <template #footer>
        <n-space>
          <n-button type="success" @click="createReport"
            >Créer rapport</n-button
          >
          <n-button @click="annuler">Annuler</n-button>
        </n-space>
      </template>
    </n-card>

    <n-card title="Rendement des équipes" style="min-height: 500px">
      <n-tabs type="line" animated>
        <n-tab-pane v-for="tab of tabs" :name="tab.name" :tab="tab.title">
          <TabRendement
            :activite="tab.name"
            :rendements="rendements.filter((r) => r.activite === tab.name)"
            :valueUnit="tab.unit"
            @openModal="openModal"
            @remove="removeCard"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
  <add-rendement-modal
    :showModal="showModal"
    @confirm="handleConfirmAdd"
    @cancel="showModal = false"
  />
</template>
<style scoped>
.add-rendement-button {
  height: 100%;
}
</style>
