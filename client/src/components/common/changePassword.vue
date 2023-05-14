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
              <NInput
                type="password"
                show-password-on="click"
                placeholder="Password"
                v-model:value="password1"
                :maxlength="8"
              />
            </NFormItemGi>
            <NFormItemGi :span="12" label="nouveau mot de passe">
              <NInput
                type="password"
                show-password-on="click"
                placeholder="Password"
                v-model:value="password2"
                :maxlength="8"
              />
            </NFormItemGi>
            <NFormItemGi :span="12" label="confirmer le nouveau mot de passe">
              <NInput
                type="password"
                show-password-on="click"
                placeholder="Password"
                v-model:value="password3"
                :maxlength="8"
              />
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
import { useAuth } from '../../stores/authentication';

const emit = defineEmits(['confirm', 'cancel']);
const password1 = ref('');
const password2 = ref('');
const password3 = ref('');

const auth = useAuth();

const message = useMessage();

const props = defineProps({
  title: String,
  showModal: Boolean,
});

async function onConfirm () {

  try{
  const req = {
  username : auth.user.username,
  password : password1.value,
  }
   const response = (await axios.post('http://localhost:3000/verifyPassword',req)).data;

   if(password2.value===password3.value){

    const newReq = {
      username : auth.user.username,
       password : password3.value,
    }

    await axios.put('http://localhost:3000/changePassword',newReq);
    message.success("le mot de passe est bien modifiee");
   }else{
    message.error("les deux mot de passe sont differents");
   }

  }catch(e){
    console.log(e.response.data);
    message.error("l'ancient mot de passe est incorrect");
  }

  // if (Number(response.response)==0) {
  //   message.error("l'ancient mot de passe est incorrect");
  // }else{
  //   if(password2.value!=password3.value){
  //     message.error("les deux mot de passe sont differents");
  //   }
  // }

  emit("confirm", event);
}
const onCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.modal {
  width: 400px;
}
</style>
