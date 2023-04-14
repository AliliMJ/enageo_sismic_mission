<script setup>
import { NTag } from 'naive-ui';
const { fonctionId } = defineProps({
  fonctionId: Number,
});
</script>

<template>
  <n-tag v-if="fonctionId === 1" type="info" round :bordered="false"
    >Chef mission</n-tag
  >
  <n-tag v-if="fonctionId === 2" type="info" round :bordered="false">
    Chef terrain
  </n-tag>
</template>
