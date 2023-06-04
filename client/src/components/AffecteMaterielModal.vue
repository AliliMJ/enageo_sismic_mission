<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px; height: 450px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:15px 30px"
      content-style="padding:15px 30px"
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

      <NSpace vertical justify="space-between">
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
              style="width: 280px"
            >
              <template #suffix>
                <n-icon :component="search" />
              </template>
            </n-input>
          </NSpace>
          <NSpace>
            <NDataTable
              :data="materiels"
              :columns="cols"
              style="font-size: 13px; width: 620px"
              :row-key="rowKey"
              :checked-row-keys="checkedRowKeysRef"
              @update:checked-row-keys="handleCheck"
              :max-height="300"
            />
          </NSpace>
        </NSpace>
      </NSpace>

      <template #footer>
        <n-space justify="end">
          <NButton @click="onConfirm" type="success">Confirmer</NButton>
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import {
  NModal,
  NCard,
  NScrollbar,
  NButton,
  NSpace,
  NInput,
  NText,
  NIcon,
  NDivider,
  NDataTable,
  useMessage,
} from 'naive-ui';
import { SearchCircleOutline as search } from '@vicons/ionicons5';

import { ref, h, watch } from 'vue';
import MaterielTag from './MaterielTag.vue';
import axios from 'axios';

const message = useMessage();

const checkedRowKeysRef = ref([]);

const rowKey = (row) => {
  return String(row.codeMat);
};

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = async () => {
  if (checkedRowKeysRef.value === undefined) {
    message.warning('il faut choisir un materiel!!!', { duration: 5e3 });
  } else {
    message.success("matriel bien ajoutee a l'atelier");
    emit('confirm', checkedRowKeysRef.value);
  }
};

const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

const materiels = ref([]);
materiels.value = (
  await axios.get('http://localhost:3000/material/materielWithoutMission')
).data;

const cols = [
  {
    title: 'Status',
    key: 'statuMateriel',
    type: 'selection',
    multiple: false,
  },
  { title: 'Code', key: 'codeMat' },
  { title: 'Marque', key: 'marque' },
  { title: 'modèle', key: 'modele' },
  { title: 'Désignation', key: 'designation' },
  {
    title: 'date du mise en service',
    key: 'dateService',
    render(row) {
      return new Date(row.dateService).toLocaleDateString('fr');
    },
  },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
    },
  },
];

const handleCheck = (rowKeys) => {
  checkedRowKeysRef.value = rowKeys;
};

const searchDesignation = ref('');
const searchFilter = () => {
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materiels.value = (
        await axios.get(
          `http://localhost:3000/material/allMaterielWithoutMission/designation?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materiels.value = (
        await axios.get(`http://localhost:3000/material/materielWithoutMission`)
      ).data;
    }
  });
};
</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
