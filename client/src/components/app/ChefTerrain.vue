<script setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NScrollbar,
} from 'naive-ui';
import ChefTerrainMenu from '../menu/ChefTerrainMenu.vue';
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <ChefTerrainMenu />
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
