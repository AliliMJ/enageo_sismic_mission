<script setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NCard,
  NScrollbar,
} from 'naive-ui';
import ChefMissionMenu from '../menu/ChefMissionMenu.vue';
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider bordered>
      <ChefMissionMenu />
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
