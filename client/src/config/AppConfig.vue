<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />

    <n-message-provider>
      <n-dialog-provider>
        <slot></slot>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NDialogProvider,
  NMessageProvider,
  NConfigProvider,
  NGlobalStyle,
  darkTheme,
} from 'naive-ui';
</script>
