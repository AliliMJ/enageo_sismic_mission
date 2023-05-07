<script setup>
import { NCard, NTabs, NTabPane, NSpace, NButton, NIcon } from 'naive-ui';

import ProductionCard from 'common/ProductionCard.vue';
import { AddSquareMultiple20Regular as AddCard } from '@vicons/fluent';

const rendements = [
  { hDeb: 543, hFin: 863, valeur: 20 },
  { hDeb: 632, hFin: 903, valeur: 12 },
];
</script>

<template>
  <n-card title="Créer un rapport de production" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="enregistrement" tab="Enregistrement">
        <n-space id="rendments-cards">
          <ProductionCard
            v-for="rendement of rendements"
            :rendement="rendement"
            valueUnit="Points vibrés"
          />

          <n-button id="add-rendement-button" ghost type="success">
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
  </n-card>
</template>
<style scoped>
#add-rendement-button {
  height: 100%;
}
</style>
