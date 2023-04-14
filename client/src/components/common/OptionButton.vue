<script setup>
import { NButton, NIcon } from 'naive-ui';
import { EllipsisVertical as OptionIcon } from '@vicons/ionicons5';
</script>

<template>
  <NButton circle>
    <template #icon>
      <NIcon>
        <OptionIcon />
      </NIcon>
    </template>
  </NButton>
</template>
