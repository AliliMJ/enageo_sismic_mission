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
      <n-scrollbar style="max-height: 400px">
        <slot>
          <NGrid :span="24" :x-gap="5">
            <NFormItemGi :span="12" label="username">
              <NInput v-model:value="username" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Role">
              <NSelect
                placeholder="selectionner un role"
                :options="RoleOptions"
                v-model:value="selectedRole"
              />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Employe">
              <SearchEmploye @sendId="getId" />
            </NFormItemGi>
          </NGrid>
        </slot>
      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <NButton @click="onConfirm" value="success" type="success"
            >Confirmer</NButton
          >
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
  NGrid,
  NFormItemGi,
  NInput,
  NSelect,
  useMessage,
} from 'naive-ui';
import SearchEmploye from '../common/SearchEmploye.vue';

const emit = defineEmits(['confirm', 'cancel']);
const username = ref('');
const employeId = ref();
const selectedRole = ref();

const message = useMessage();

const props = defineProps({
  title: String,
  showModal: Boolean,
});

const employes = (await axios.get('http://localhost:3000/employes')).data;

const EmployeOptions = [];
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
  {
    label: 'administrateur',
    value: 'ADMINISTRATEUR',
  },
];

const MissionsOptions = [
  { label: 'EGS60', value: 'EGS60' },
  { label: 'EGS120', value: 'EGS120' },
  { label: 'EGS150', value: 'EGS150' },
  { label: 'EGS170', value: 'EGS170' },
  { label: 'EGS180', value: 'EGS180' },
  { label: 'EGS190', value: 'EGS190' },
  { label: 'EGS210', value: 'EGS210' },
  { label: 'EGS220', value: 'EGS220' },
  { label: 'EGS250', value: 'EGS250' },
  { label: 'EGS270', value: 'EGS270' },
];

const onConfirm = () => {
  // sends an object to the parent indicating {isValid, data}
  let event = {};
  if (
    username.value === '' ||
    selectedRole.value === undefined ||
    employeId.value === undefined
  ) {
    message.warning('toutes les champs doit etre remplit');
    event.isValid = false;
  } else {
    console.log('les champs est remplit');
    event.isValid = true;
    event.data = {
      username: username.value,
      employeId: Number(employeId.value),
      role: selectedRole.value,
    };
    username.value='';
    selectedRole.value=undefined;
    employeId.value=undefined;

    //insert();
  }
  emit('confirm', event);
};
const onCancel = () => {
  emit('cancel');
};

employes.forEach((element) => {
  EmployeOptions.push({
    label: element.id + '- ' + element.nom + ' ' + element.prenom,
    value: element.id,
  });
});

function getId(value) {
  employeId.value = value;
}
</script>

<style scoped>
.modal {
  width: 400px;
}
</style>
