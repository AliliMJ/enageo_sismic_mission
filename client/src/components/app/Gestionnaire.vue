<script setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NScrollbar,
} from 'naive-ui';
import GestMenu from '../menu/GestMenu.vue';
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <GestMenu />
    </NLayoutSider>

    <NLayoutContent>
      <NCard :bordered="false">
        <Suspense>
          <NScrollbar style="height: 85vh">
            <RouterView />
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
