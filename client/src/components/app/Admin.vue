<script setup>
import { useRouter } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent, NCard } from 'naive-ui';

import AdminMenu from '../menu/AdminMenu.vue';

//const auth = useAuth();

const router = useRouter();
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <AdminMenu />
    </NLayoutSider>

    <NLayoutContent>
      <NCard :bordered="false">
        <Suspense>
          <RouterView />
        </Suspense>
      </NCard>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.n-layout-sider {
  height: 100vh;
}
</style>
