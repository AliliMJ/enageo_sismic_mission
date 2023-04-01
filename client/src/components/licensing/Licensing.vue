<template>



  <modal :showModal="showModal" title="Activation du logiciel">
  <n-spin :show="loading" description="Veuillez patienter...">
    <i-form>
      <n-form-item label="Nom" path="data.username">
        <n-input type="text" v-model:value="formValue.data.username" placeholder="Votre nom"/>
      </n-form-item>
      <n-form-item label="Clé d'activation" path="data.key">
        <n-input type="text" v-model:value="formValue.data.key" placeholder="Clé d'activation"/>

      </n-form-item>
    </i-form>
  </n-spin>
    <template #action>
      <n-button iconPlacement="right" type="success" :disabled="loading" @click="onActivate">Activer</n-button>
    </template>
    
  </modal>

</template>

<script setup>
  import {ref, provide} from 'vue';
  import {NInput, NButton,NSpin, useMessage, NFormItem} from 'naive-ui';
  import IForm from 'common/IForm.vue';
  import Modal from 'common/Modal.vue';
  import {activate} from 'licensing';
  import { useForm } from 'composables/useForm';
  import licensingArgs from './index';
  import { database } from 'database';
  import { useLoader } from 'composables/useLoader';
  const message = useMessage();
  const form = useForm(licensingArgs);
  

  const {formValue, validate} = form;
  provide('form', form);

  const showModal = ref(false);
  const {loading, setLoading } = useLoader();

  database.ref('registration').get((snapshot)=>{
    if(snapshot.exists()) {
      const license = snapshot.val();
      const now = new Date();
      const expiration = new Date(license.expiration.seconds*1000);

      if(expiration <= now) {
        
        
        message.info('Votre licence a expiré');
        showModal.value = true;
      }
      if (!license.activated) {
        message.info('Votre licence est désactivée');
        showModal.value = true;
      }
      if(license.username){
        form.formValue.value.data.username = license.username;
      }

    }else {
      showModal.value =  true;
    }
  });

  const reset = ()=>{
    database.ref('registration').remove();  
  }

  const onActivate = async() => {
    
    validate({
      
      async valide() {
          setLoading(true);
          activate(
            formValue.value.data.key, 
            formValue.value.data.username).then(registration=>{

              if(registration.success) {
                showModal.value = false;
                message.success(registration.message);
              }else {
                message.error(registration.message);
              }
              
            }).catch(error=>message.error(error)).finally(()=>{
              setTimeout(()=>setLoading(false), 1000);
            });

        
      },
      invalide(){
        message.error(`Veuillez remplir tout les champs correctement`);
      }
    })
    

    
  }
</script>