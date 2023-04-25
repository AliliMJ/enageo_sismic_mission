<template>
  <NSpace vertical>
    <Modal
      title="Ajouter un nouveau utilisateur"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="confirmAdd"
    />

    <NH1>Utilisateurs</NH1>
    <NSpace justify="end">
      <searchUser @sendId="getId" />
      <NButton
        @click="showInsertEmployeModal"
        class="button"
        type="success"
        icon-placement="right"
      >
        Ajouter
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <STable @onRowClicked="handleClick" :data="users" :columns="cols" />
  </NSpace>
</template>

<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NButton, NIcon, NSpace, useDialog } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Modal from '../common/AddUserModal.vue';
import searchUser from '../common/searchUser.vue';

const router = useRouter();
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

const users = ref([]);
onMounted(async () => {
  users.value = (await axios.get('http://localhost:3000/users')).data;
});

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'role', key: 'role' },
  {
    title: 'date de création',
    key: 'dateCreationCompte',
    render(row) {
      return new Date(row.dateCreationCompte).toLocaleDateString('fr');
    },
  },
];

const handleClick = (user) => {
  router.push(`/utilisateur/${user.id}`);
};

function getId(value) {}

async function confirmAdd(event) {
  // if(value==true){
  //   showModal = false;
  // }
  console.log(event);
  if (event.isValid) {
    try {
      const user = (await axios.post('http://localhost:3000/users', event.data))
        .data; // adds the user sent from the user modal (event.data)
      users.value.push(user);
    } catch {
      console.log('Erreur');
    }
  }
}

/* script to add user */

const showModal = ref(false);

const showInsertEmployeModal = () => {
  showModal.value = true;
};
</script>
