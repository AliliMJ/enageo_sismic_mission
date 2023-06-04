<template>
  <n-config-provider :theme="auth.theme">
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot></slot>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  NConfigProvider,
} from 'naive-ui';
import { useAuth } from './stores/authentication';
const auth = useAuth();

//:theme-overrides="themeOverrides"

// const themeOverrides = {
//   common: {
//     primaryColor: '#f0e130',
//   },
// };
</script>
