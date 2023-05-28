<script setup>
import { NH1, NH2, NCard, NTag, NButton, NText } from 'naive-ui';
</script>

<template>
  <n-h1> Le projet en production </n-h1>
  <n-card id="prod">
    <template #header>
      <n-h1>Sol d'or</n-h1>
    </template>
    <template #header-extra>
      <n-tag type="info" size="small">EGS210</n-tag>
    </template>
    <n-h2>Description</n-h2>
    <n-text
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio itaque
      q</n-text
    >

    <template #footer>
      <n-button type="info">Consulter</n-button>
    </template>
  </n-card>
</template>

<style scoped>
#prod .n-h2 {
  font-size: 1rem;
}
#prod .n-h1 {
  font-size: 1.5rem;
  margin: 0;
}
#prod .n-text {
  font-size: 0.875rem;
}
</style>
