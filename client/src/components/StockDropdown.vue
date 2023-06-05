<script setup>
import { NDropdown, NButton, NText, NSpace } from 'naive-ui';
import { h } from 'vue';

const props = defineProps({
  stock: Object,
});
const options = computed(() => {
  return Object.keys(props.stock).map((k) => ({
    label: `${props.stock[k]}`,
    key: k,
  }));
});

function renderLabel(option) {
  return h(
    NSpace,
    {},
    {
      default: () => [
        h(NText, { strong: true }, { default: () => option.label }),
        h(NText, { depth: 3 }, { default: () => option.key }),
      ],
    }
  );
}
</script>
<template>
  <n-dropdown :options="options" :render-label="renderLabel">
    <n-button round type="info" ghost size="small">Monter</n-button>
  </n-dropdown>
</template>
