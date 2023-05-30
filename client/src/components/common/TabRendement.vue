<script setup>
import { NTabPane, NButton, NSpace, NIcon } from 'naive-ui';
import { AddSquareMultiple20Regular as AddCard } from '@vicons/fluent';
import ProductionCard from './ProductionCard.vue';

const { activite, rendements, valueUnit, readOnly } = defineProps({
  activite: String,
  rendements: Array,
  valueUnit: String,
  readOnly: Boolean,
});

const emit = defineEmits(['openModal', 'remove']);

function emitOpenModal() {
  emit('openModal', activite);
}

function emitRemove(key) {
  emit('remove', key);
}
</script>

<template>
  <n-space class="rendments-cards">
    <ProductionCard
      v-for="rendement of rendements"
      :rendement="rendement"
      :valueUnit="valueUnit"
      @remove="emitRemove"
    />

    <n-button
      v-if="!readOnly"
      class="add-rendement-button"
      ghost
      type="success"
      @click="emitOpenModal"
    >
      Ajouter
      <template #icon
        ><NIcon :size="30"><AddCard /></NIcon
      ></template>
    </n-button>
  </n-space>
</template>
<style scoped>
.add-rendement-button {
  height: 100%;
}
</style>
