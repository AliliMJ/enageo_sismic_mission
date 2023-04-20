<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false" size="huge">
    <n-card
      style="width: 600px; height: 500px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-scrollbar style="max-height: 200px">
        <slot>
          <NGrid :span="24" :x-gap="5">
            <NFormItemGi :span="12" label="email">
              <NInput />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Prénom">
              <NInput />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Employe">
              <NSelect
                placeholder="selectionner un employe"
                :options="options"
                v-model:value="selectedValue1"
                @update:value="printMessage"
              />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Employe">
              <NSelect
                placeholder="selectionner un role"
                :options="RoleOptions"
                v-model:value="selectedValue2"
              />
            </NFormItemGi>
          </NGrid>
        </slot>
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
import axios from 'axios';
import { ref } from 'vue';
import {
  NModal,
  NScrollbar,
  NCard,
  NSpace,
  NButton,
  NIcon,
  NGrid,
  NForm,
  NFormItemGi,
  NInput,
  NSelect,
  NDatePicker,
} from 'naive-ui';
const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  console.log(selectedValue1.value);
  emit('confirm');
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

const employes = (await axios.get('http://localhost:3000/employes')).data;

const options = [];
const RoleOptions = [
  {
    label: 'Chef mision',
    value: 'CHEF_MISSION',
  },
  {
    label: 'Chef terrain',
    value: 'CHEF_TERRAIN',
  },
  {
    label: 'Gestionnaire',
    value: 'GESTIONNAIRE',
  },
];

const selectedValue1 = ref(null);
const selectedValue2 = ref(null);

employes.forEach((element) => {
  options.push({
    label: element.id + '- ' + element.nom + ' ' + element.prenom,
    value: element.id,
  });
});

function printMessage() {
  console.log('hello');
  console.log(selectedValue1.value);
}

console.log(options);
</script>

<style scoped>
.modal {
  width: 400px;
}
</style>
