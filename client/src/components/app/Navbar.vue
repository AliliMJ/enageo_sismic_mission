<template>
  <NSpace justify="end" class="space">
    <NIcon size="30" class="icon" trigger="click">
      <Persone />
    </NIcon>
  </NSpace>
</template>

<script setup>
import { NSpace, NIcon } from 'naive-ui';
import { PersonCircleOutline as Persone } from '@vicons/ionicons5';
</script>

<style scoped>
.space {
  padding: 0;
}

.icon {
  right: 35px;
}
</style>
