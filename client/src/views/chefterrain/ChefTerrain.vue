<script setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NScrollbar,
} from 'naive-ui';
import ChefTerrainMenu from './ChefTerrainMenu.vue';
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <ChefTerrainMenu />
    </NLayoutSider>

    <NLayoutContent embedded>
      <Suspense>
        <NScrollbar style="height: 85vh">
          <RouterView />
        </NScrollbar>
      </Suspense>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.n-layout-sider {
  height: 100vh;
}

.n-layout-content {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
