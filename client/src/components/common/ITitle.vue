<template>
  <n-space>
    <n-h1>{{props.title}}</n-h1>
    <n-el tag="h4" class="secondary">{{props.subtitle}}</n-el>
  </n-space>

</template>

<script setup>
  import { NEl, NSpace, NH1 } from 'naive-ui';
 
  const props = defineProps({
    title:String,
    subtitle:String,
  });
</script>