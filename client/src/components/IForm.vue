<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
    <slot></slot>
  </n-form>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { NForm } from 'naive-ui';

const { rules, formRef, formValue } = inject('form');
</script>
