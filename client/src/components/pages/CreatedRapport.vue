<script setup>
import { NButton } from 'naive-ui';
import router from '../../router/routes';
import { Route } from '../../enums';

function openCreationRapport() {
  router.push({ name: 'createRapport' });
}
</script>

<template>
  <NButton @click="openCreationRapport" type="success"
    >Écrire un rapport</NButton
  >
</template>
