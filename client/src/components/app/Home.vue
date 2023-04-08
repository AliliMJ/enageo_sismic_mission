<script setup>
import { NLayout } from 'naive-ui';
import { useAuth } from 'stores/authentication.js';
import { useRouter } from 'vue-router';
const auth = useAuth();

const router = useRouter();
const logout = () => {
  router.push('/login');
  auth.logout();
};
</script>

<template>
  <n-layout class="app">
    <h1>Home</h1>
    Welcome! {{ auth.user }}

    <button @click="logout">Logout</button>
  </n-layout>
</template>

<style>
.app {
  min-height: 100vh;
  width: 100vw;
}
</style>
