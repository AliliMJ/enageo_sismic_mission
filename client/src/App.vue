<script setup>
import AppConfig from 'config/AppConfig.vue';
import { NLayout } from 'naive-ui';
import { RouterView } from 'vue-router';
</script>

<template>
  <app-config>
    <n-layout class="app">
      <RouterView />
    </n-layout>
  </app-config>
</template>

<style>
.app {
  min-height: 100vh;
  width: 100vw;
}
</style>
