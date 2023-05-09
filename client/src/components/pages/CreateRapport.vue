<script setup>
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NButton,
  NIcon,
  NInput,
  NText,
  NDivider,
} from 'naive-ui';
import AddRendementModal from 'common/AddRendementModal.vue';

import ProductionCard from 'common/ProductionCard.vue';
import { AddSquareMultiple20Regular as AddCard } from '@vicons/fluent';
import { ref } from 'vue';

const showModal = ref(false);
let cardCount = 0;

const rendements = ref([]);

function handleConfirmAdd(rendement) {
  cardCount++;
  rendements.value.push({ key: cardCount, ...rendement });
  showModal.value = false;
}
function removeCard(key) {
  console.log('key:', key);
  console.log('rendements', rendements.value);
  rendements.value = rendements.value.filter((r) => r.key !== key);
}
</script>

<template>
  <n-card title="Création d'un rapport de production" style="min-height: 500px">
    <n-tabs type="line" animated>
      <n-tab-pane name="enregistrement" tab="Enregistrement">
        <n-space id="rendments-cards">
          <ProductionCard
            v-for="rendement of rendements"
            :rendement="rendement"
            valueUnit="Points vibrés"
            @remove="removeCard"
          />

          <n-button
            id="add-rendement-button"
            ghost
            type="success"
            @click="showModal = true"
          >
            Ajouter
            <template #icon
              ><NIcon :size="30"><AddCard /></NIcon
            ></template>
          </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="topo" tab="Topographie"> Topographie </n-tab-pane>
      <n-tab-pane name="pose" tab="Pose"> Pose </n-tab-pane>
      <n-tab-pane name="ramasse" tab="Ramasse"> Pose </n-tab-pane>
    </n-tabs>
    <template #footer>
      <n-divider />
      <NSpace vertical>
        <NText strong> Résumé du rapport </NText>

        <n-input
          type="textarea"
          placeholder="Veuillez écrire un résumé pour ce rapport"
          style="width: 50%"
          :resizable="false"
        />
      </NSpace>
    </template>
    <template #action>
      <n-space>
        <n-button type="success">Créer rapport</n-button>
        <n-button>Annuler</n-button>
      </n-space>
    </template>
  </n-card>

  <add-rendement-modal
    :showModal="showModal"
    @confirm="handleConfirmAdd"
    @cancel="showModal = false"
  />
</template>
<style scoped>
#add-rendement-button {
  height: 100%;
}
</style>
