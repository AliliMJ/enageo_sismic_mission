<script setup>
import { useAuth } from '../stores/authentication';
import { NSwitch, NText, NCard } from 'naive-ui';

const auth = useAuth();

const isDark = ref(auth.theme !== null);

function toggle() {
  auth.toggleTheme();
}
</script>

<template>
  <n-card>
    <n-text> Dark theme </n-text>

    <n-switch v-model:value="isDark" @update:value="toggle" />
  </n-card>
</template>
