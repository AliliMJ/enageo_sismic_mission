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
      <NCard :bordered="false" content-style="padding:15px;background:rgb(248, 248, 248);" footer-style="padding:0px">
        <Suspense>
          <NScrollbar style="height: 90vh">
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
