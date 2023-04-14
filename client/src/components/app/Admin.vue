<script setup>
import { useRouter } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader } from 'naive-ui';

import AdminMenu from '../menu/AdminMenu.vue';
//const auth = useAuth();

const router = useRouter();
</script>

<template>
  <NLayout>
    <NLayoutHeader bordered> </NLayoutHeader>

    <NLayout has-sider>
      <NLayoutSider bordered>
        <AdminMenu />
      </NLayoutSider>

      <NLayoutContent>
        <Suspense>
          <RouterView />
        </Suspense>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped>
.n-layout-sider {
  height: 100vh;
}

.n-layout-header {
  padding: 24px;
}
</style>
