<script setup>
import axios from 'axios';
import { NAutoComplete } from 'naive-ui';
import { ref, computed, watch } from 'vue';

const materielEnPanne = ref([]);
const options = computed(() => {
  return materielEnPanne.value.map((e) => ({
    label: `${e.codeMat} ${e.designation}`,
    value: e.codeMat,
  }));
});

const searchValue = ref('');

watch(searchValue, async () => {
  if (searchValue.value.length > 0) {
    materielEnPanne.value = (
      await axios.get(
        `http://localhost:3000/material/designation?like=${searchValue.value}`
      )
    ).data;
  }
});

const emit = defineEmits(['sendCodeMat']);

const sendCodeMat = function () {
  emit('sendCodeMat', searchValue.value.split(' ')[0]);
};
</script>

<template>
  <n-auto-complete
    v-model:value="searchValue"
    :options="options"
    placeholder="designation du materiel"
    @update:value="sendCodeMat"
  />
</template>
