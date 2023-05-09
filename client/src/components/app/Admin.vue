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
      <NCard :bordered="false" style="background-color: rgb(248, 248, 248)">
        <Suspense>
          <NScrollbar style="height: 95vh">
            <RouterView/>
          </NScrollbar>
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
