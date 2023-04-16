<script setup>
import { useRouter } from 'vue-router';
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NLayoutHeader,
} from 'naive-ui';
import GestMenu from '../menu/GestMenu.vue';
//const auth = useAuth();

const router = useRouter();
// const logout = () => {
//   router.push('/login');
//   auth.logout();
// };
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <GestMenu />
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

.n-layout-header {
  padding: 24px;
}
</style>
