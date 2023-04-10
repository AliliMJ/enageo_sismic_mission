<script setup>
import { useRouter } from 'vue-router';

import GestMenu from '../menu/GestMenu.vue';
//const auth = useAuth();

const router = useRouter();
// const logout = () => {
//   router.push('/login');
//   auth.logout();
// };
</script>

<template>
  <GestMenu />
</template>
