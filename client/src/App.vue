<script setup>
import { RouterView } from 'vue-router';
import AppConfig from 'config/AppConfig.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useAuth } from './stores/authentication';

const auth = useAuth();
const router = useRouter();
const logout = () => {
  router.push('/login');
  auth.logout();
};

const route = useRoute();

watch(route, (route) => {
  if (route.name == 'logout') logout();
});
</script>

<template>
  <app-config>
    <RouterView />
  </app-config>
</template>
