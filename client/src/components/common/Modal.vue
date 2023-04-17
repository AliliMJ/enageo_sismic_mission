<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 600px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-scrollbar style="max-height: 400px">
        <slot></slot>
      </n-scrollbar>
      <template #footer>
        <n-space>
          <NButton @click="onConfirm" type="warning">Confirmer</NButton>
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NModal, NCard, NSpace, NScrollbar, NButton } from 'naive-ui';
const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  emit('confirm');
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});
</script>
