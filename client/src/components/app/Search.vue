<template>
  <n-auto-complete
    :options="options"
    placeholder="Chercher"
    :on-select="onSelect" 
    v-model:value="search"
    clearable
    blur-after-select
    clear-after-select  
  />


</template>

<script setup>

import { NAutoComplete } from 'naive-ui';
import { computed, ref } from 'vue';
import {router} from 'router/routes'
import { useUserStore } from 'stores/users';
import { useItemStore } from 'stores/items';

const itemStore = useItemStore();
const userStore = useUserStore();

const search = ref(null);



// const renderOption = (option)=> {
//   if(option.type!=='group') return h(RouterLink,{
//     to:{path:'/items'}
//   },{default:()=>option.label});
//   return option.label;
// }

const onSelect = (value) => {
  router.push(value);
}
const options = computed(()=>{
  if(!search.value) return [];
  const users = userStore.filterUsers(search.value).map(user=>({
    label:user.name,
    value:`/users/${user.key}`
  }));
  const items = itemStore.filterItems(search.value).map(item=>({
    label:item.title,
    value:`/items/${item.key}`
  }));

  const groups = [
    {label:'Clients', data:users},
    {label:'Items',data:items}
  ];


  return groups.filter(group=>group.data.length > 0).map(group=>{
      return {
        type:'group',
        label:group.label,
        children:group.data
        }
    });  
  });

</script>