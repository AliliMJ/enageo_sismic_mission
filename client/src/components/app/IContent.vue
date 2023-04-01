<template>
  <n-layout-content class="content">
    <i-data>
      <n-scrollbar style="max-height: 500px"> </n-scrollbar>
    </i-data>
  </n-layout-content>
</template>

<script setup>
import IData from 'app/IData.vue';

import { NLayoutContent, NScrollbar } from 'naive-ui';
</script>

<style>
.content {
  padding: 10px;
}
</style>
