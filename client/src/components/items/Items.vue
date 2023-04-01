<template>
  <element-provider :element="element">
    <item-table />
    <i-elements />
  </element-provider>
</template>

<script setup>
import itemArgs from './index';
import IElements from 'element/IElements.vue';

import ItemTable from './ItemTable.vue';
import { useElement } from 'composables/useElement';
import ElementProvider from 'config/ElementProvider.vue';

const element = useElement(itemArgs);
</script>
