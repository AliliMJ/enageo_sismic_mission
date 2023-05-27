<template>
  <n-notification-provider>
    <n-message-provider>
      <n-dialog-provider>
        <slot></slot>
      </n-dialog-provider>
    </n-message-provider>
  </n-notification-provider>
</template>

<script setup>
import {
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui';
</script>
