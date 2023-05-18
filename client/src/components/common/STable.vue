<template>
  <n-data-table
    :columns="[...props.columns]"
    :data="props.data"
    bordered
    :pagination="{ pageSize: 10 }"
    :row-key="rowKey"
    :max-height="290"
    size="small"
    :row-props="rowProps"
    pagination-behavior-on-filter="first"
  >
  </n-data-table>
</template>

<script setup>
import { NDataTable } from 'naive-ui';

const rowKey = (row) => row.key;

const emit = defineEmits(['onRowClicked']);

const onRowClicked = (row) => {
  emit('onRowClicked', row);
};

const rowProps = (row) => ({
  style: 'cursor: pointer;',
  onClick: () => {
    onRowClicked(row);
  },
});
const props = defineProps({
  columns: Array,
  data: Array,
});
</script>
