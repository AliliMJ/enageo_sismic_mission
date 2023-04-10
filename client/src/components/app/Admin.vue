<script setup>
import { useRouter } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui';

import AdminMenu from '../menu/AdminMenu.vue';
//const auth = useAuth();

const router = useRouter();
// const logout = () => {
//   router.push('/login');
//   auth.logout();
// };
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider>
      <AdminMenu />
    </NLayoutSider>

    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
