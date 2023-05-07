<script setup>
import Admin from './Admin.vue';
import { useAuth } from '../../stores/authentication';
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NPageHeader
} from 'naive-ui';
import { LogOutOutline as Logout } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import Gestionnaire from './Gestionnaire.vue';
import ChefMission from './ChefMission.vue';
import Navbar from './Navbar.vue';

import { useMessage, useDialog } from 'naive-ui';
import { Role } from '../../enums';

const auth = useAuth();
const router = useRouter();

const message = useMessage();
const dialog = useDialog();

function handleConfirm() {
  dialog.warning({
    title: 'Confirmation',
    content: 'êtes-vous sûr de déconnecter?',
    positiveText: 'Déconnecter',
    negativeText: 'Annuler',
    onPositiveClick: () => {
      message.success('Déconnexion effectué avec success');
      auth.logout();
      router.push('/login');
    },
    onNegativeClick: () => {
      message.error('Déconnexion annulée');
    },
  });
}

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <NButton id="logout-btn" type="error" @click="handleConfirm()"
    >Déconnecter
    <template #icon>
      <NIcon><Logout /></NIcon>
    </template>
  </NButton>

  <NLayout >
    <NLayoutHeader bordered> <Navbar /></NLayoutHeader>

    <NLayoutContent>
      <Admin v-if="auth.user?.role === Role.Administrateur"/>
      <Gestionnaire v-else-if="auth.user?.role === Role.Gestionnaire" />
      <ChefMission v-else-if="auth.user?.role === Role.ChefMision" />
    </NLayoutContent>
  </NLayout>
</template>

<style>
#logout-btn {
  position: absolute;
  bottom: 20px;
  left: 10px;
  z-index: 10;
  width: 250px;
}
.n-layout-header {
  padding: 10px;
}
</style>
