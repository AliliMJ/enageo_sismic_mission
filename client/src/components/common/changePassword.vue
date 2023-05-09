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
            <NGrid :span="24" :x-gap="5" cols="1">
              <NFormItemGi :span="12" label="l'ancient mot de passe">
                <NInput v-model:value="password1" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="nouveau mot de passe">
                <NInput v-model:value="password2" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="confirmer le nouveau mot de passe">
                <NInput v-model:value="password3" />
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
    useMessage,
  } from 'naive-ui';
  
  const emit = defineEmits(['confirm', 'cancel']);
  const password1 = ref('');
  const password2 = ref('');
  const password3 = ref('');

  
  const message = useMessage();
  
  const props = defineProps({
    title: String,
    showModal: Boolean,
  });

  
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
  