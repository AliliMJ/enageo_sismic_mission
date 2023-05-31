<script setup>
import { RouterView } from 'vue-router';
import AppConfig from './AppConfig.vue';
</script>

<template>
  <app-config>
    <RouterView />
  </app-config>
</template>

<style scoped>
.n-layout-header {
  padding: 24px;
}
</style>
