<script setup>
import {
  NForm,
  NFormItem,
  NSelect,
  NButton,
  NInput,
  NModal,
  NCard,
  NSpace,
} from 'naive-ui';

const missionTypeOptions = [
  { label: '2D', value: 'MISSION2D' },
  { label: '3D', value: 'MISSION3D' },
];

const props = defineProps({
  showModal: Boolean,
});
const emit = defineEmits(['confirm', 'cancel']);

const model = ref({
  codeMission: null,
  methodologie: null,
  description: null,
});
function confirm() {
  emit('confirm', model.value);
  model.value = {
    codeMission: null,
    methodologie: null,
    description: null,
  };
}
function cancel() {
  emit('cancel');
}
</script>
<template>
  <n-modal :show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="Ajouter un chanter"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form :model="model">
        <n-form-item label="codeMission">
          <n-input
            v-model:value="model.codeMission"
            placeholder="Saisissez le codeMission du chantier"
          />
        </n-form-item>
        <n-form-item label="Méthodologie">
          <n-select
            v-model:value="model.methodologie"
            :options="missionTypeOptions"
            placeholder="Saisissez la méthodologie du chantier"
          />
        </n-form-item>
        <n-form-item label="Desciption">
          <n-input
            type="textarea"
            v-model:value="model.description"
            :resizable="false"
            placeholder="Saisissez une desciption pour chantier"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space>
          <n-button @click="confirm" type="success">Confirmer</n-button>
          <n-button @click="cancel">Annuler</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
