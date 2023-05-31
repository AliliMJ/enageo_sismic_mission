<script setup>
import axios from 'axios';
import { NAutoComplete } from 'naive-ui';
import { ref, computed, watch } from 'vue';

const employes = ref([]);
const options = computed(() => {
  return employes.value.map((e) => ({
    label: `${e.id} - ${e.nom} ${e.prenom}`,
    value: e.id,
  }));
});

const props = defineProps({
  codeMission : String
});

const value = ref('');
watch(value, async () => {
  if (value.value.length > 0) {
    employes.value = (
      await axios.get(`http://localhost:3000/employes//getEmployesWithoutMissionByName?like=${value.value}`)
    ).data;
  }
});

const emit = defineEmits(['sendId']);

const sendId = function (v) {
  emit('sendId',v);
};

</script>

<template>
  <n-auto-complete
    placeholder="Sélectionnez un employe"
    :options="options"
    v-model:value="value"
    @select="sendId"
  />
</template>
