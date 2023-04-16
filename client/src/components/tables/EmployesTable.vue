<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NTag, NButton, NIcon, NSpace, useDialog } from 'naive-ui';
import { h } from 'vue';
import OptionButton from '../common/OptionButton.vue';
import { Add } from '@vicons/ionicons5';
import Fonction from '../common/Fonction.vue';
import Position from '../common/Position.vue';
import { useRouter } from 'vue-router';

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

const employes = (await axios.get('http://localhost:3000/employes')).data;

const router = useRouter();
const cols = [
  { title: 'id', key: 'id' },

  { title: 'nom', key: 'nom' },
  { title: 'prénom', key: 'prenom' },
  {
    title: 'fonction',
    key: 'fonctionId',
    render(row) {
      return h(Fonction, { fonctionId: row.fonctionId });
    },
  },
  {
    title: 'Position',
    key: 'etatEmployeId',
    render(row) {
      return h(Position, { etatEmployeId: row.etatEmployeId });
    },
  },
  {
    title: 'Date Adhésion',
    key: 'dateAdhesion',
    render(row) {
      return new Date(row.dateAdhesion).toLocaleDateString();
    },
  },
];

const handleClick = (employe) => {
  router.push(`/employe/${employe.id}`);
};
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
    <STable @onRowClicked="handleClick" :data="employes" :columns="cols" />
  </NSpace>
</template>

<style scoped>
#new-employe {
  align-self: self-start;
}
</style>
