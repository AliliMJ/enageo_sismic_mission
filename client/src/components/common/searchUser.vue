<script setup>
import axios from 'axios';

import { NAutoComplete } from 'naive-ui';
import { ref, computed, watch } from 'vue';
import { defineEmits } from 'vue'
import { useAuth } from '../../stores/authentication';

const auth = useAuth();

const users = ref([]);
const options = computed(() => {
  return users.value.map((e) => ({
    label: `${e.id} ${e.email}`,
    value: e.id,
  }));
});

const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

const value = ref("");
watch(value, async () => {
  if (value.value.length > 0) {
    users.value = (
      await axios.get(`http://localhost:3000/users/u?like=${value.value}`)
    ).data;
  }
});


const emit = defineEmits(['sendId']);

const sendId = function() {
  emit("sendId",value.value.split(' ')[0])
}
</script>

<template>
    <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Email"
    @update:value="sendId"
  />
</template>

