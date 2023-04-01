<template>
  <app-config>
    <n-layout class="app">
      <h1>Home</h1>
    </n-layout>
  </app-config>
</template>

<script setup>
import AppConfig from 'config/AppConfig.vue';
import { NLayout } from 'naive-ui';
</script>

<style>
.app {
  min-height: 100vh;
  width: 100vw;
}
</style>
