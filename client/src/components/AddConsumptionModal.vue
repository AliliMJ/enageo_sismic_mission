<script setup>
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NButton,
  NSpace,
} from 'naive-ui';
import { firstLetterUpperCase } from '../utils/format';

const stock = ref({});
onMounted(() => {
  if (props.resource?.stock != null) {
    Object.keys(props.resource?.stock).map((k) => {
      stock.value[k] = null;
    });
  } else {
    stock.value = {};
  }
});

const props = defineProps({
  showModal: Boolean,
  resource: Object,
});

const emit = defineEmits(['confirm', 'close', 'error']);

function confirm() {
  //verify that stock is sufficent
  for (let k in props.resource.stock) {
    if (stock.value[k] == null)
      return emit('error', 'Veuillez remplir tous les champs');
    if (stock.value[k] <= 0) {
      return emit(
        'error',
        'La valeur de consommation doit être strictement positive'
      );
    }
    if (props.resource.stock[k] < stock.value[k]) {
      console.log('qjqjq');
      return emit('error', 'Stock est insuffisant');
    }
    if (stock.value[k] <= 0) {
      return emit(
        'error',
        'La valeur de consommation doit être strictement positive'
      );
    }
  }
  emit('confirm', { ...props.resource, stock: stock.value });
}
function close() {
  emit('close');
  stock.value = {};
}
</script>

<template>
  <n-modal
    v-model:show="props.showModal"
    :mask-closable="false"
    size="large"
    style="max-width: 70%"
  >
    <n-card title="Ajouter une consommation">
      <n-form v-if="props.resource" :model="stock">
        <n-form-item label="Titre">
          <n-input
            v-model:value="props.resource.title"
            filterable
            clearable
            remote
            disabled
          />
        </n-form-item>
        <n-form-item
          v-for="key of Object.keys(stock)"
          :label="firstLetterUpperCase(key)"
        >
          <n-input-number
            v-model:value="stock[key]"
            style="flex-grow: 1"
            :show-button="false"
            placeholder="Remplir ce champ"
            :min="0"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button @click="confirm" type="success">Confirmer</n-button>
          <n-button @click="close">Annuler</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
