<template>

  <n-button @click="openModal" type="success">Nouveau</n-button>
  
  <modal title="Ajouter" :showModal="showModal" @keyup.alt.enter="handleSubmit">
    <component :is="form.formCom"/>
     
      <template #action> 
            <n-space >
              <n-button 
                :disabled="added.length<1" 
                type="success" 
                @click="handleConfirm">Enregistrer</n-button>

              <n-button @click="handleSubmit">Ajouter</n-button>
            </n-space>
      </template>
      <template #cancel>
          <n-button ghost type="error" @click="handleCancel">Annuler</n-button>
      </template>
  </modal>

</template>

<script setup>
import { inject, provide, ref } from "vue";


import { NButton, useDialog, useMessage, NSpace } from "naive-ui";
import Modal from "common/Modal.vue";

const {useStore, useElementForm} = inject('element');
const form = useElementForm();
const store = useStore();
provide('form', form);

const added = ref([]);
const showModal = ref(false);
const dialog = useDialog();
const message = useMessage();
const openModal = () => {
  form.reset();
  form.autoFocus();
  showModal.value = true;
}
 
 const handleConfirm = () => {
        dialog.warning({
          title: "Confirm",
          content: "êtes-vous sûr?",
          positiveText: "Oui",
          negativeText: "Non",
          onPositiveClick: async () => {
            message.loading("Mise à jour des données...");
            added.value.forEach(async (element)=>{
              await store.push({...element});
            });
       
             showModal.value = false;
             
             
          },
        });
      }
 const handleCancel =  async() => {
    message.info(`Vous avez annulé l'ajout`);
    added.value=[];
    showModal.value = false;
    form.reset();
 }

 const handleSubmit = ()=>{
    form.validate({
              valide() {

                added.value.push(form.formValue.value.data);
                form.reset();
                form.autoFocus();
                message.success("Element ajouté");
                

              },
              invalide(errors){
                message.error(`Veuillez remplir tout les champs correctement`);
              }
             });
  }
</script>