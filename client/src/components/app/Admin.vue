<script setup>
import { useRouter } from 'vue-router';
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NScrollbar,
} from 'naive-ui';

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
      <NScrollbar style="height: 100vh">
        <NCard :bordered="false">
          <Suspense>
            <RouterView />
          </Suspense>
        </NCard>
      </NScrollbar>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.n-layout-sider {
  height: 100vh;
}
</style>
