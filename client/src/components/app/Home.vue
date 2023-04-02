<template>
  <n-layout class="app">
    <h1>Home</h1>
    Welcome! {{ auth.user?.email }}
    <button @click="logout">Logout</button>
  </n-layout>
</template>

<script setup>
import { NLayout } from 'naive-ui';
import { useAuth } from '../../stores/authStore';
import { useRouter } from 'vue-router';
const auth = useAuth();
const router = useRouter();
const logout = () => {
  router.push('/login');
  auth.logout();
};
</script>

<style>
.app {
  min-height: 100vh;
  width: 100vw;
}
</style>
