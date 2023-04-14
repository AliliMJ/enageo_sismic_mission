<template>
  <n-data-table
    :columns="[...props.columns]"
    :data="props.data"
    bordered
    :pagination="{ pageSize: 10 }"
    :row-key="rowKey"
    :max-height="290"
  >
  </n-data-table>
</template>

<script setup>
import { NDataTable } from 'naive-ui';

const rowKey = (row) => row.key;

const props = defineProps({
  columns: Array,
  data: Array,
});
</script>
