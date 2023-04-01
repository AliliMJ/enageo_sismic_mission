<template>
  <i-title :title="item.title" subtitle="Produit"/>
  <n-space vertical>

 
  <n-descriptions label-style="width:200px" label-placement="left" bordered :columns="1">
      <n-descriptions-item label="Stock" > 
        <unit :value="item.stock" :format="()=>item.unit"/>
      </n-descriptions-item>
      <n-descriptions-item 
        v-if="item?.description?.length > 0" 
        label="Description" 
        > 
        {{item.description}}
      </n-descriptions-item>
      <n-descriptions-item label="Prix"> 
        <unit :value="item.stock" :format="()=>'Dinars'"/>
      </n-descriptions-item>
      <n-descriptions-item label="Déclarer faible quand"> 
        <n-space>

          <n-p>&le;</n-p><unit :value="item.lowStock" :format="()=>item.unit"/>
        </n-space>
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

  import { NDescriptions, NDescriptionsItem, NSpace, NP } from 'naive-ui';
  import Unit from 'common/Unit.vue';
  import ITitle from 'common/ITitle.vue';
  import itemArgs from './index';
  import { useInfo } from 'composables/useInfo';
  import ElementProvider from 'config/ElementProvider.vue';
  import UpdateElement from 'components/element/UpdateElement.vue';
  import DeleteElement from 'components/element/DeleteElement.vue';


  const {info:item, element, onDeleted} = useInfo(itemArgs);


</script>