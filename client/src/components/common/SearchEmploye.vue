<script setup>
import axios from 'axios';

import { NAutoComplete } from 'naive-ui';
import { ref, computed, watch } from 'vue';
import { defineEmits } from 'vue'

const employes = ref([]);
const options = computed(() => {
  return employes.value.map((e) => ({
    label: `${e.id} ${e.nom} ${e.prenom}`,
    value: e.id,
  }));
});

const value = ref(null);
watch(value, async () => {
  if (value.value.length > 0) {
    employes.value = (
      await axios.get(`http://localhost:3000/employes?like=${value.value}`)
    ).data;
  }
});


const emit = defineEmits(['sendId']);

const sendId = function() {
 // console.log("employe updated : "+options[0].value+" "+employes[0].value)
  emit("sendId",value.value)
}
</script>

<template>
  <n-auto-complete
    placeholder="Sélectionnez un employe"
    :options="options"
    v-model:value="value"
    @update:value="sendId"
  />
</template>
