<template>
  <i-form>

  
  <n-form-item  label="Name" path="data.name">
      <n-input ref="autoFocusRef"  maxlength="30" show-count v-model:value="formValue.data.name" placeholder="Le nom du client" />
  </n-form-item>
  <n-form-item label="Credit" path="data.credit">
      <n-input-number :min="0" v-model:value="formValue.data.credit" placeholder="Le montant de crédit" />
  </n-form-item>
</i-form>
</template>

<script setup>
import { inject, onMounted} from 'vue';
import { NInput, NFormItem, NInputNumber } from "naive-ui";
import IForm from 'common/IForm.vue';

const {formValue, autoFocusRef, autoFocus} = inject('form');
onMounted(()=>{
  autoFocus();
});




</script>