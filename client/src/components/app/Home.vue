<script setup>
import Admin from './Admin.vue';
import { useAuth } from '../../stores/authentication';
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
} from 'naive-ui';
import { LogInOutline as Logout } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import Gestionnaire from './Gestionnaire.vue';
import Navbar from './Navbar.vue';

const auth = useAuth();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <NButton id="logout-btn" type="error" @click="logout"
    >Déconnecter

    <template #icon>
      <NIcon><Logout /></NIcon>
    </template>
  </NButton>

  <NLayout>
    <NLayoutHeader bordered> <Navbar /></NLayoutHeader>
    <NLayoutContent>
      <Admin v-if="auth.user.role === 'ADMINISTRATEUR'" />
      <Gestionnaire v-else-if="auth.user.role === 'GESTIONNAIRE'" />
    </NLayoutContent>
  </NLayout>
</template>

<style>
#logout-btn {
  position: absolute;
  bottom: 20px;
  left: 24px;
  z-index: 10;
}
.n-layout-header {
  padding: 10px;
}
</style>
