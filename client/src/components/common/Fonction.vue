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
</template>
