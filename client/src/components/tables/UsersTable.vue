<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';
import { h } from 'vue';
import STable from 'common/STable.vue';
import { NH1, NButton, NIcon, NSpace, useDialog } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import OptionButton from '../common/OptionButton.vue';

const auth = useAuth();

const dialog = useDialog();

function deleteUser(id) {
  dialog.warning({
    title: 'Confimer la supprission',
    content: 'Êtes-vous sur de supprimer cet utilisateur?',
    positiveText: 'Confirmer',
    negativeText: 'Annuler',
    onPositiveClick: () => console.log("l'utilisateur a été supprimé", id),
    onNegativeClick: () => console.log('Suppression annulée'),
  });
}

console.log(auth.user.hashPassword);
const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

const users = (await axios.post('http://localhost:3000/users', req)).data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'role', key: 'role' },
  {
    title: 'date de création',
    key: 'dateCreationCompte',
    render(row) {
      return new Date(row.dateCreationCompte).toLocaleDateString();
    },
  },
];
</script>

<template>
  <NSpace vertical>
    <NH1>Utilisateurs</NH1>
    <NSpace justify="end">
      <NButton class="button" type="success" icon-placement="right">
        Ajouter
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <STable :data="users" :columns="cols" />
  </NSpace>
</template>
