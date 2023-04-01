<template>
  <slot></slot>
</template>

<script setup>
import { provide } from 'vue';

  const props = defineProps({
    element:Object
  });
  provide('element',props.element);

</script>