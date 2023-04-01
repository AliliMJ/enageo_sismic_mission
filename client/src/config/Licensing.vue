<template>
  <modal :showModal="showActivationModal" title="Activation du logiciel">
  <n-space vertical>

    <n-input v-if="!userId" type="text" v-model:value="nameInput" placeholder="Votre nom"/>
    <n-input type="text" v-model:value="keyInput" placeholder="Clé d'activation"/>
  </n-space>
    <template #action>
      <n-button @click="onActivate">Activer</n-button>
    </template>
  </modal>
  

</template>

<script setup>
  import {ref, provide} from 'vue';
  import {NInput, NButton, NSpace, useMessage} from 'naive-ui';
  import Modal from 'common/Modal.vue';
  import {db} from '@/firebase';
  import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
  import { uuidv4 } from '@firebase/util';
  import { useForm } from 'composables/useForm';
  const message = useMessage();
  const form = useForm();
  provide(form, 'form');
  
  const registrationKey = localStorage.getItem('registrationKey');
  const userId = localStorage.getItem('userId');
  if(!userId) {
    userId = uuidv4();
    localStorage.setItem('userId', userId);
  }

  const showActivationModal = ref(false);
  const keyInput = ref('');
  const nameInput = ref('');

  if(!registrationKey) showActivationModal.value = true;

  const onActivate = async() => {
    const docRef = doc(db, 'licenses', keyInput.value);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const license = docSnap.data();
      if(!license.userId) { // new user

        const activationData = {
            activated:true,
            userId,
            activationDate:Timestamp.now(),
            username:nameInput.value};
         
        setDoc(docRef, 
              activationData
        ).then(()=>{
          localStorage.setItem('registrationKey', docRef.id);
          
          showActivationModal.value = false;  
          message.success(`Vous venez d'activer votre produit`);
        });        

      }else {
        if(license.userId !== userId)
          message.error(`Cette clé vous apparient pas, veuillez achter le produit`);
        else {
          localStorage.setItem('registrationKey', docRef.id);
          showActivationModal.value = false;
          message.success(`Vous venez d'activer votre produit`);
        }
      }

    }
    else
      message.error(`Cette clé est invalide`);
  }

</script>