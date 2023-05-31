<template>
  <n-config-provider :theme="auth.theme" :theme-overrides="themeOverrides">
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

const themeOverrides = {
  common: {
    primaryColor: '#FFD93D',
  },
};
</script>
