<script setup>
import {
  NModal,
  NForm,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NCard,
  NButton,
  NSpace,
  NTimePicker,
} from 'naive-ui';

import { ref } from 'vue';

const props = defineProps({
  showModal: Boolean,
});
const formRef = ref(null);
const model = ref({
  hDebut: 0,
  hFin: 0,
  valeur: null,
});
const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  const data = {
    hDebut: model.value.hDebut / 60000,
    hFin: model.value.hFin / 60000,
    valeur: model.value.valeur,
  };
  emit('confirm', data);
};
const onCancel = () => {
  emit('cancel');
};
</script>

<template>
  <n-modal :show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="Ajouter un rendement"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="model">
        <n-grid :span="24" :x-gap="20">
          <n-form-item-gi :span="12" label="Heure de début" path="hDebut">
            <n-time-picker
              v-model:value="model.hDebut"
              format="HH:mm"
              placeholder="Début"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Heure de fin" path="hFin">
            <n-time-picker
              v-model:value="model.hFin"
              format="HH:mm"
              placeholder="Fin"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Valeur de rendement" path="valeur">
            <n-input-number
              :show-button="false"
              v-model:value="model.valeur"
              placeholder="Rendement"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space>
          <n-button @click="onConfirm" type="success">Confirmer</n-button>
          <n-button @click="onCancel">Annuler</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
