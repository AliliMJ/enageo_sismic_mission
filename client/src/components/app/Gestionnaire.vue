<script setup>
import { useRouter } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui';
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
    <NLayoutSider>
      <GestMenu />
    </NLayoutSider>

    <NLayoutContent>
      <Suspense>
        <RouterView />
      </Suspense>
    </NLayoutContent>
  </NLayout>
</template>
