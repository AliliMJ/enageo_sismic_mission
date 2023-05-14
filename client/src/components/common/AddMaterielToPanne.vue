<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false" size="huge">
    <n-card
      style="width: 700px; height: 550px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace
        style="
          font-size: 20px;
          font-weight: bold;
          margin-top: -10px;
          margin-bottom: 40px;
        "
      >
        ajouter une materiel a la reparation
      </NSpace>

      <NSpace vertical justify="space-between" style="height: 440px">
        <NSpace vertical class="child1">
          <NSpace justify="end">
            <!-- <searchGoodMateriel
              :idProjet="props.idProjet"
              @sendGoodMateriel="getGoodMateriel"
              style="width: 230px"
            /> -->
            <n-input
              v-model:value="searchDesignation"
              @update:value="searchFilter"
              placeholder="Rechercher par designation"
              style="width: 255px"
            >
              <template #suffix>
                <n-icon :component="search" />
              </template>
            </n-input>
          </NSpace>
          <NSpace>
            <NDataTable
              :data="goodMateriel"
              :columns="cols"
              style="font-size: 13px"
              :row-key="rowKey"
              :checked-row-keys="checkedRowKeysRef"
              @update:checked-row-keys="handleCheck"
            />
          </NSpace>
        </NSpace>
        <NSpace> </NSpace>
        <n-space justify="end">
          <NButton @click="onConfirm" value="success" type="success"
            >Confirmer</NButton
          >
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </NSpace>
    </n-card>
  </n-modal>
</template>

<script setup>
import axios from 'axios';
import {
  NModal,
  NCard,
  NSpace,
  NButton,
  useMessage,
  NInput,
  NIcon,
  NDataTable
} from "naive-ui";
import { SearchOutline as search } from '@vicons/ionicons5';
//import STable from "common/STable.vue";
//import StatusTag from "common/StatusTag.vue";
import MaterielTag from 'common/MaterielTag.vue';
import { h } from 'vue';
import { ref, watch } from 'vue';
const emit = defineEmits(['confirm', 'cancel']);

const message = useMessage();

const props = defineProps({
  title: String,
  showModal: Boolean,
  idProjet: String,
});

const idProjet = ref(props.idProjet);
const checkedRowKeysRef = ref([]);
const rowKey = (row) => {
  return row.codeMat;
};

// function checkedRowKeys(){
// }

const goodMateriel = ref([]);

goodMateriel.value = (
  await axios.get(
    `http://localhost:3000/material/materielGoodByProject/${idProjet.value}`
  )
).data;

const cols = [
  {
    title: "Status",
    key: "statuMateriel",
    type: 'selection',
    multiple: false,
  },
  { title: 'code materiel', key: 'codeMat' },
  { title: 'designation', key: 'designation' },
  { title: 'matricule', key: 'matricule' },
  {
    title: 'Status',
    key: 'statuMateriel',
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
  },
}
];

const handleCheck = (rowKeys) => {
  checkedRowKeysRef.value = rowKeys;
};

const onConfirm = () => {};

const onCancel = () => {
  emit('cancel');
};

const searchDesignation = ref('');
const searchFilter = () => {
  console.log('=======>' + searchDesignation.value);
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      goodMateriel.value = (
        await axios.get(
          `http://localhost:3000/material/goodMateriel/designation/${idProjet.value}?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      goodMateriel.value = (
        await axios.get(
          `http://localhost:3000/material/materielGoodByProject/${idProjet.value}`
        )
      ).data;
    }
  });
};
</script>

<style scoped></style>
