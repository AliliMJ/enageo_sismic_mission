<script setup>
import { NText } from 'naive-ui';
const { fonctionId } = defineProps({
  fonctionId: Number,
});
</script>

<template>
  <n-text italic strong v-if="fonctionId === 1" type="info" round
    >Chef mission</n-text
  >
  <n-text italic strong v-if="fonctionId === 2" type="info" round>
    Chef terrain
  </n-text>
  <n-text italic strong v-if="fonctionId === 3" type="info" round>
    Directeur
  </n-text>
  <n-text italic strong v-if="fonctionId === 4" type="info" round>
    administrateur
  </n-text>
  <n-text italic strong v-if="fonctionId === 5  " type="info" round>
    gestionnaire
  </n-text>
  <n-text italic strong v-if="fonctionId === 6  " type="info" round>
    ouvrier
  </n-text>
  <n-text italic strong v-if="fonctionId === 7  " type="info" round>
    agent de sécurité
  </n-text>
  <n-text italic strong v-if="fonctionId === 8  " type="info" round>
    medcin
  </n-text>
</template>
