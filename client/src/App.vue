<script setup>
import { RouterView } from 'vue-router';
import AppConfig from 'config/AppConfig.vue';
</script>

<template>
  <app-config>
    <!-- <NLayout>
      <NLayoutHeader bordered v-if="auth.isAuthenticated">
        <button>wow</button></NLayoutHeader
      >

      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout> -->
    <RouterView />
  </app-config>
</template>

<style scoped>
.n-layout-header {
  padding: 24px;
}
</style>
