<script setup>
const { projectStates } = defineProps({
  projectStates: Object,
});
console.log(projectStates);

const libStates = {
  PLANIFICATION: 'Planification',
  EN_PRODUCTION: 'En cours',
  CLOTURE: 'Terminé',
  ANNULE: 'Annulé',
};

const currentState = projectStates.sort((e1, e2) => {
  return new Date(e1.dPassageEtat) - new Date(e2.dPassageEtat);
})[0];
</script>

<template>
  {{ libStates[currentState.etat] }}
</template>
