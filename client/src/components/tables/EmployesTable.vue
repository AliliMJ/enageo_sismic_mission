<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NTag, NButton, NIcon, NSpace, useDialog } from 'naive-ui';
import { h } from 'vue';
import OptionButton from '../common/OptionButton.vue';
import { Add } from '@vicons/ionicons5';

const dialog = useDialog();

function deleteEmploye(id) {
  dialog.warning({
    title: 'Confimer la supprission',
    content: 'Êtes-vous sur de supprimer cet employé?',
    positiveText: 'Confirmer',
    negativeText: 'Annuler',
    onPositiveClick: () => console.log('Employé supprimer', id),
    onNegativeClick: () => console.log('Suppression annulée'),
  });
}

function updateEmploye(id) {
  window.alert(id);
}

const employes = (await axios.get('http://localhost:3000/employes')).data;

const fonctions = (await axios.get('http://localhost:3000/employes/fonctions'))
  .data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'nom', key: 'nom' },
  { title: 'prénom', key: 'prenom' },
  {
    title: 'fonction',
    key: 'fonctionId',
    render(row) {
      return h(
        NTag,
        { round: true, bordered: false, type: 'info' },
        {
          default: () =>
            fonctions.filter((f) => f.id === row.fonctionId)[0].nom,
        }
      );
    },
  },
  {
    title: 'Date naissance',
    key: 'dateNaissance',
    render(row) {
      return new Date(row.dateNaissance).toLocaleDateString();
    },
  },
  {
    title: 'Date Adhésion',
    key: 'dateAdhesion',
    render(row) {
      return new Date(row.dateAdhesion).toLocaleDateString();
    },
  },
  {
    title: 'Options',
    key: 'options',
    render(row) {
      return h(OptionButton, { onDelete: () => deleteEmploye(row.id) } , { onUpdate: () => updateEmploye(row.id) });
    },
  },
];
</script>

<template>
  <NSpace vertical>
    <NH1>La liste des employés</NH1>
    <NSpace justify="end">
      <NButton type="success" icon-placement="right">
        Nouvel employé
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <STable :data="employes" :columns="cols" />
  </NSpace>
</template>

<style scoped>
#new-employe {
  align-self: self-start;
}
</style>
