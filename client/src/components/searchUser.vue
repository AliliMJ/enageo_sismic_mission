<script setup>
import axios from 'axios';

import { NAutoComplete } from 'naive-ui';
import { ref, computed, watch } from 'vue';

const users = ref([]);
const options = computed(() => {
  return users.value.map((e) => ({
    label: `${e.id} ${e.email}`,
    value: e.id,
  }));
});

const value = ref('');
watch(value, async () => {
  if (value.value.length > 0) {
    users.value = (
      await axios.get(
        `http://localhost:3000/users/username?like=${value.value}`
      )
    ).data;
  }
});

const emit = defineEmits(['sendId']);

const sendId = function () {
  emit('sendId', value.value.split(' ')[0]);
};
</script>

<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Nom d'utilisateur"
    @update:value="sendId"
  />
</template>
