<script setup>
import { NText } from 'naive-ui';
const { etatEmployeId } = defineProps({ etatEmployeId: Number });
</script>

<template>
  <NText strong depth="3" v-if="etatEmployeId === 1">En mission</NText>
  <NText strong depth="3" v-if="etatEmployeId === 2">En congé</NText>
</template>
