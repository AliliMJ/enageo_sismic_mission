<script setup>
import axios from 'axios';

async function demande() {
  try {
    await axios.post('http://localhost:3000/consommation', {
      projet: { nom: 'regan', mission: 'EGS270' },
      titre: 'eau',
      quantite: 100,
      date: new Date(),
      coutTotal: 1000,
    });
    alert('consommation ajoutée');
  } catch (e) {
    alert('Failed to insert');
    console.log(e);
  }
}
</script>
<template>
  <h1>Demande de ressources</h1>
  <button @click="demande">Ajouter</button>
</template>
