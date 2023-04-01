<template>
  <i-title :title="user.name" subtitle="Client"/>
  <n-space vertical>
  <n-descriptions label-placement="left" bordered :columns="1">
     
      <n-descriptions-item label="Crédit"> 

        <unit :value="user.credit" :format="()=>'Dinars'"/>

      </n-descriptions-item>
  </n-descriptions>
  <element-provider :element="element">
    <n-space>
      <update-element/>
      <delete-element @onDeleted="onDeleted"/>
    </n-space>
  </element-provider>
  </n-space>
</template>

<script setup>
 
  import { NDescriptions, NDescriptionsItem, NSpace } from 'naive-ui';
  import UpdateElement from 'components/element/UpdateElement.vue';
  import DeleteElement from 'components/element/DeleteElement.vue';
  import ElementProvider from 'config/ElementProvider.vue';
  import Unit from 'common/Unit.vue';
  import ITitle from 'common/ITitle.vue';
  import userProps from './index';
  import { useInfo } from 'composables/useInfo';

  const {info:user, element, onDeleted} = useInfo(userProps);


</script>