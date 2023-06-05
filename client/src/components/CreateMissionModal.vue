<script setup>
import { NModal, NSelect, NInput, NCard, NForm, NFormItem } from 'naive-ui';
import { MissionType } from '../utils/enums';

const props = defineProps({
  showModal: Boolean,
});
const emit = defineEmits(['confirm', 'close']);

function close() {
  emit('close');
}

function confirm(data) {
  emit('confirm', data);
}

const model = ref({
  code: null,
  type: null,
  description: null,
});
const types = MissionType.map((t) => ({
  label: t,
  value: t,
}));
</script>

<template>
  <n-form :model="model">
    <n-form-item label="Code">
      <n-input-number v-model:value="model.code" />
    </n-form-item>
    <n-form-item label="Type">
      <n-select :options="types" />
    </n-form-item>
    <n-form-item label="Description">
      <n-select :options="types"></n-select>
    </n-form-item>
  </n-form>
</template>
