<template>
  <n-space>
  <n-el tag="span" class="strong secondary" v-if="props.title">
                 {{props.title}}
   </n-el>
  <unit :value="props.value" :format="formatPrice"/>

  </n-space>
</template>

<script setup>
  import { formatPrice } from 'utils/formatters';
  import { NSpace, NEl } from 'naive-ui';
  import Unit from 'common/Unit.vue'
  const props = defineProps({
    value:Number,
    title:String
  })

</script>
