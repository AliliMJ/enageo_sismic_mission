<script setup>
import { useAuth } from '../stores/authentication';
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NPageHeader,
} from 'naive-ui';
import { LogOutOutline as Logout } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

import Admin from '../views/admin/Admin.vue';
import Gestionnaire from '../views/gestionnaire/Gestionnaire.vue';
import ChefMission from '../views/chefmission/ChefMission.vue';
import ChefTerrain from '../views/chefterrain/ChefTerrain.vue';
import Directeur from '../views/directeur/Directeur.vue';
import Navbar from '../layouts/Navbar.vue';
import NavbarEmpty from '../layouts/NavbarEmpty.vue';

import { useMessage, useDialog } from 'naive-ui';
import { Role } from '../utils/enums';

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
  <NLayout>
    <Suspense>
      <NLayoutHeader bordered>
        <NavbarEmpty
          v-if="
            auth.user?.role === Role.Directeur ||
            auth.user?.role === Role.Administrateur
          "
        />
        <Navbar
          v-else-if="
            auth.user?.role === Role.Gestionnaire ||
            auth.user?.role === Role.ChefMision ||
            auth.user?.role === Role.ChefTerrain
          "
        />
      </NLayoutHeader>
    </Suspense>
    <NLayoutContent>
      <Admin v-if="auth.user?.role === Role.Administrateur" />
      <Gestionnaire v-else-if="auth.user?.role === Role.Gestionnaire" />
      <ChefMission v-else-if="auth.user?.role === Role.ChefMision" />
      <ChefTerrain v-else-if="auth.user?.role === Role.ChefTerrain" />
      <Directeur v-else-if="auth.user?.role === Role.Directeur" />
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
