<script setup>
import axios from 'axios';
import { NAutoComplete , NIcon } from 'naive-ui';
import { ref, computed, watch } from 'vue';
import { SearchOutline as search } from '@vicons/ionicons5';

const searchValue = ref("");
const materielGood = ref([]);

const props = defineProps({
  idProjet: String,
});


// watch(searchValue, async () => {

//   if (searchValue.value.length > 0) {

//     materielGood.value = (
//       await axios.get(
//         `http://localhost:3000/material/goodMateriel/designation/${Number(props.idProjet)}?like=${searchValue.value}`
//       )
//     ).data;
//   }else{
//     materielGood.value = (
//       await axios.get(
//         `http://localhost:3000/material/materielGoodByProject/${props.idProjet}`
//       )
//     ).data;
//   }
// });

const options = computed(() => {
  return materielGood.value.map((e) => ({
    label: `${e.codeMat} ${e.designation}`,
    value: e.codeMat,
  }));
});

const searchFilter = () => {
  watch(searchValue, async () => {
    if (searchValue.value.length > 0) {
      materielGood.value = (
        await axios.get(
          `http://localhost:3000/material/goodMateriel/designation/${Number(props.idProjet)}?like=${searchValue.value}`
        )
      ).data;
    } else {
      materielGood.value = (await axios.get(`http://localhost:3000/material/materielGoodByProject/${Number(props.idProjet)}`)).data;
    }
  });
};


const emit = defineEmits(['sendGoodMateriel']);

const sendGoodMateriel = function () {
  emit('sendGoodMateriel',materielGood.value);
};


</script>

<template>
  <n-auto-complete
    v-model:value="searchValue"
    :options="options"
    placeholder="Rechercher par designation"
    @update:value="searchFilter"
  >
  <template #suffix>
          <n-icon :component="search" />
        </template>
  </n-auto-complete>
</template>
