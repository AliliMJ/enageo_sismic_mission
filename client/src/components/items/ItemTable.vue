<template>
  <i-table
    :columns="columns"
    :data="store.getArray"
    :checkedRowKeys="selectedKeys"
  />
</template>
<script setup>
import ITable from 'common/ITable.vue';
import { inject, h } from 'vue';
import Unit from 'common/Unit.vue';

const { selectedKeys, useStore } = inject('element');
const store = useStore();
const columns = [
  {
    title: 'Titre',
    key: 'title',
  },
  {
    title: 'Prix',
    key: 'price',
    render(row) {
      return h(Unit, {
        value: row.price,
        unit: row.unit,
        format: (unit) => `Dinars/ ${unit}`,
      });
    },
  },
  {
    title: 'Stock',
    key: 'stock',
    render(row) {
      return h(Unit, {
        value: row.stock,
        unit: row.unit,
        format: (unit) => `${unit}`,
      });
    },
  },
];
</script>
