<template>
    
    <element-provider :element="element">
      <user-table/>
      <i-elements/>
    </element-provider>
</template>

<script setup>
  import IElements from 'element/IElements.vue';
  import { useElement } from 'composables/useElement';
  import UserTable from './UserTable.vue'; 
  import ElementProvider from 'config/ElementProvider.vue';
  import userArgs from './index';
  const element = useElement(userArgs);
  
  
  

</script>