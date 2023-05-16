<script setup>
const { projectStates } = defineProps({
  projectStates: Object,
});

const libStates = {
  PLANIFICATION: 'Planification',
  EN_PRODUCTION: 'En cours',
  CLOTURE: 'Terminé',
  ANNULE: 'Annulé',
};
let currentState;

if (projectStates.length > 0) {
  currentState =
    libStates[
      projectStates.sort((e1, e2) => {
        return new Date(e1.dPassageEtat) - new Date(e2.dPassageEtat);
      })[0]?.etat
    ] ?? 'Inconnue';
} else currentState = '';
</script>

<template>{{ currentState }}</template>
