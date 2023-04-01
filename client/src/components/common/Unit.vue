<template>
  <n-space :size="4">
    <n-p>
      {{props.value}}
    </n-p>
    <n-el tag="span" class="unit" >
      {{props.format(props.unit)}}
    </n-el>
    

    
  </n-space>
</template>
<script setup>
import { NP, NSpace, NEl} from 'naive-ui';

  const props = defineProps({
    value:Number,
    unit:String,
    format: Function
  });

</script>

<style>
  .unit {
    color: var(--text-color-disabled);
    font-size: var(--font-size-mini);
    font-weight: var(--font-weight-strong);
  }
</style>