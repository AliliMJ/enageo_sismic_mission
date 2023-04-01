<template>
  <n-data-table
    
    :columns="[{type:'selection'}, ...props.columns]"
    :data="props.data"
    bordered
    :pagination="{pageSize: 10}"
    @update:checked-row-keys="handleCheck"
    :row-key="rowKey"
    :checked-row-keys="checkedRowKeys"
    :max-height="350"


  >
  </n-data-table>
  

  
</template>


<script setup>

import { NDataTable} from 'naive-ui';
import { inject } from 'vue';

const {selectedKeys:checkedRowKeys} = inject('element');

  const handleCheck = (rowKeys) => {
    checkedRowKeys.value = rowKeys;
  }

  const rowKey = (row) => row.key;
 
  const props = defineProps({
      columns: Array,
      data: Array,
      loading: Boolean,
  });
  
</script>