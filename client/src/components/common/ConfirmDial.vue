<template>
  <n-dialog
    title="Confirmation"
    content="deconexion ?"
    negative-text="Annuler"
    positive-text="Confirmer"
    @positive-click="handlePositiveClick('logout')"
    @negative-click="handleNegativeClick"
  />
</template>

<script setup>
import { NDialog } from "naive-ui";
import { h } from 'vue';
import { RouterLink } from 'vue-router';

function handleNegativeClick() {
    window.alert("clicked")
}

function handlePositiveClick(name) {
  return () =>
    h(
      RouterLink,
      {
        to: { name },
      },
    );
}
</script>
