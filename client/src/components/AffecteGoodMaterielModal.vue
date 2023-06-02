<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px; height: 350px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:15px 30px"
      content-style="padding:15px 30px"
    >
    <NDataTable
              :data="materiels"
              :columns="cols"
              style="font-size: 13px; width: 620px"
              :row-key="rowKey"
              :checked-row-keys="checkedRowKeysRef"
              @update:checked-row-keys="handleCheck"
              :max-height="300"
            />
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
} from 'naive-ui';

import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  emit('confirm',);
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
