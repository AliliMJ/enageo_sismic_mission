<template>
  
  <n-button 
    v-if="selectedKeys.length > 0"
    ghost
    type="error"
    @click="handleOnDelete"
    >Supprimer
    </n-button>
    

</template>

<script setup>

  import { NButton, useDialog, useMessage } from 'naive-ui';
  import { inject } from 'vue';
  const dialog = useDialog();
  const message = useMessage();
  const {selectedKeys, useStore} = inject('element');
  const store = useStore();
  const emit= defineEmits(['onDeleted']);

  const handleOnDelete = () => {
    dialog.warning({
      title: 'Supprimer',
          content: `Êtes-vous sûr de supprimer ${selectedKeys.value.length} élèment(s)?`,
          positiveText: 'Oui',
          negativeText: 'Non',
          onPositiveClick: async() => {
            selectedKeys.value.forEach(async (key) => {
              await store.remove(key);
            });
            selectedKeys.value= [];
            message.loading('Suppression...');
            emit('onDeleted');
          },
        
    });

  }



</script>