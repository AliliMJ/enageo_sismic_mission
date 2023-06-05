<script setup>
import { NTag } from 'naive-ui';
import { Resource } from '../utils/resource';

const props = defineProps({
  stock: Object,
});
</script>
<template>
  <n-tag type="success" round v-if="!new Resource(props.stock).threshold()"
    >Suprérieur</n-tag
  >
  <n-tag type="warning" round v-else>Inférieur</n-tag>
</template>
