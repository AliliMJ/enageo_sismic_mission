<template>
  <n-layout-header bordered class="header"> </n-layout-header>
</template>

<script setup>
import { NLayoutHeader } from 'naive-ui';
</script>

<style>
.header {
  padding: 12px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.element {
  color: var(--n-text-color);
  transition: 0.3s var(--cubic-bezier-ease-in-out);
}
.element:hover {
  color: var(--primary-color-hover);
}
</style>
