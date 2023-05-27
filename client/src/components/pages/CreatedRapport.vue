<script setup>
import { NButton } from 'naive-ui';
import router from '../../router/routes';

function openCreationRapport() {
  router.push({ name: 'createRapport' });
}
</script>

<template>
  <NButton @click="openCreationRapport" type="success"
    >Écrire un rapport</NButton
  >
</template>
