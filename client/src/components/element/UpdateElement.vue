<template>
  <n-button v-if="selectedKeys.length === 1" @click="openModal">Modifier</n-button>
  
  <modal title="Mise à jour" :showModal="showModal">
    <component :is="form.formCom"/>
     
      <template #action>
          <n-button type="success" @click="handleConfirm">Enregistrer</n-button>
      </template>
      <template #cancel>
          <n-button ghost type="error" @click="handleCancel">Annuler</n-button>
      </template>
    </modal>
</template>

<script setup>
import {  NButton, useDialog, useMessage } from 'naive-ui';
import { ref, inject, provide } from 'vue';
import Modal from 'common/Modal.vue';

const {useStore, selectedKeys, useElementForm} = inject('element');
const store = useStore();
const form = useElementForm();
provide('form', form);


const showModal = ref(false);
const message = useMessage();
const dialog = useDialog();





const validateSelection = () => {

    
    if (selectedKeys.value?.length != 1) 
      throw 'Vous devez selectionner un seul élèment pour le modifier';
    const [key] = selectedKeys.value;
    const element = store.getData[key];
    if (element===undefined || element === null)
      throw `Cet element n'existe pas dans la bibiothèque`;
    else
      return element;
}

const openModal = () => {
  try {
    const element = validateSelection();
    form.formValue.value.data = {...element};
    showModal.value = true;

  }catch(errorMessage) {
    message.error(errorMessage);
  }
}


const handleConfirm = ()=> {
  form.validate({
    valide(){
      const updatedElement = form.formValue.value.data;
      const [key] = selectedKeys.value;
      dialog.warning({
          title: "Confirmer",
          content: "êtes-vous sûr?",
          positiveText: "Oui",
          negativeText: "Non",
          onPositiveClick: async () => {
            message.loading("Mise à jour des données...");
            store.update(key, {...updatedElement});
            selectedKeys.value = [];
            showModal.value = false;
            form.reset();
          },
        });

    },
    invalide() {
        message.error(`Veuillez remplir tout les champs correctement`);
    }
  })
  
}
const handleCancel =  async() => {
    message.info('Opération de mise à jour annulée');
    showModal.value = false;
    form.reset();
 }

</script>