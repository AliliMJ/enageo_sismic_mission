<template>
<i-form>
  <n-form-item label="Titre" path="data.title">
      <n-input maxlength="30" show-count v-model:value="formValue.data.title" placeholder="Le titre de l'item" />
  </n-form-item>
  <n-form-item label="Description" path="data.description">
      <n-input 
        type="textarea" 
        maxlength="255" 
        show-count 
        v-model:value="formValue.data.description" 
        placeholder="Description" 
        :autosize="{
        minRows: 3,
        maxRows: 5
        }"
        />
  </n-form-item>

    <n-form-item label="Prix" path="data.price">
      <n-input-number :min="0" v-model:value="formValue.data.price" placeholder="Input Price" />
    </n-form-item>
    

  
  <n-form-item label="Stock" path="data.stock">
      <n-input-number :min="0" v-model:value="formValue.data.stock" placeholder="Input Stock" />
  </n-form-item>
  <n-form-item label="Unité" path="data.unit">
      <n-select
          v-model:value="formValue.data.unit"
          placeholder="Select unit"
          :options="unitOptions"
          
        />
    </n-form-item>
    <n-form-item label="La quantité est faible" path="data.lowStock">
      <n-select
          v-model:value="formValue.data.lowStock"
          placeholder="Selectionner quand le stock devient faible"
          :options="lowStockOptions"
          
        />
    </n-form-item>
</i-form>
</template>

<script setup>

  

  import { inject, computed } from 'vue';
  import IForm from 'common/IForm.vue';
  import { NInput, NFormItem, NInputNumber, NSelect } from "naive-ui";

  

  const {formValue} = inject('form');

  const unitOptions = [
    'kg',
    'pièce',
    'gramme',
    'mètre',
    'mètre carré'
  ].map(v=> {
    return {label:v, value:v};
  });

  const lowStockOptions = computed(()=>[
    5,
    10, 
    20,
    50,
    100,
    150 
  ].map(v=>({label:`${v} ${formValue.value.data.unit}`, value:v})));
 

</script>