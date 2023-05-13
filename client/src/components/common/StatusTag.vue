<script setup>
import { NTag } from 'naive-ui';

const { enPanne } = defineProps({
  enPanne: Boolean,
});

</script>

<template>
  <n-tag v-if="enPanne" type="error" round :bordered="false">En panne</n-tag>
  <n-tag type="success" v-else round :bordered="false"> Bon état </n-tag>
</template>
