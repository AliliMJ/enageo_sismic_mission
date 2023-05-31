<script setup>
import { NTag } from 'naive-ui';

const { statuMateriel } = defineProps({
    statuMateriel : Number
});

</script>

<template>
  <n-tag v-if="statuMateriel === 0 " type="error" round :bordered="false">En panne</n-tag>
  <n-tag v-if="statuMateriel === 1" type="warning" round :bordered="false"> en reparation </n-tag>
  <n-tag v-if="statuMateriel === 3" type="info"  round :bordered="false"> en reparation externe </n-tag>
  <n-tag v-if="statuMateriel === 2" type="success"  round :bordered="false"> Bon état </n-tag>
</template>
