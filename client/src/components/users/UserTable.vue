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

  const {selectedKeys, useStore} = inject('element');
  const store = useStore();
  const columns = [
    {
        title: 'Nom',
        key: 'name',
    },
    {
        title: 'Credit',
        key: 'credit',
        render(row) {
          return h(
            Unit,
            {
              value: row.credit,
              format: ()=>'Dinars'
            }
          )
        }

    },
];

</script>