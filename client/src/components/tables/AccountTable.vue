<script setup>
import axios from 'axios';

import STable from '../common/STable.vue';
import { NH1, NButton, NIcon, NSpace, useDialog, NInput } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import Modal from '../common/AddUserModal.vue';
import { SearchOutline as search } from '@vicons/ionicons5';
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
const searchUsername = ref('');

onMounted(async () => {
  users.value = (await axios.get('http://localhost:3000/comptes')).data;
});

const searchFilter = () => {
  watch(searchUsername, async () => {
    if (searchUsername.value.length > 0) {
      users.value = (
        await axios.get(
          `http://localhost:3000/comptes/username/?like=${searchUsername.value}`
        )
      ).data;
    } else {
      users.value = (await axios.get(`http://localhost:3000/comptes`)).data;
    }
  });
};
async function confirmAdd(event) {
  if (event.isValid == true) {
    showModal.value = false;
  }
  if (event.isValid) {
    try {
      const user = (
        await axios.post('http://localhost:3000/comptes', event.data)
      ).data; // adds the user sent from the user modal (event.data)
      users.value.push(user);
    } catch {
      console.log('Erreur');
    }
  }
}
const cols = [
  { title: 'id', key: 'id' },
  { title: "Nom d'utilisateur", key: 'username' },
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
  router.push(`/compte/${user.id}`);
};

/* script to add user */

const showModal = ref(false);

const showInsertEmployeModal = () => {
  showModal.value = true;
};
</script>

<template>
  <NSpace vertical>
    <Modal
      title="Créer un nouveau compte"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="confirmAdd"
    />

    <NH1>La liste des comptes</NH1>
    <NSpace justify="end">
      <!-- <searchUser v-model="searchUsername" :on-update="searchFilter" /> -->
      <n-input
        v-model:value="searchUsername"
        @update:value="searchFilter"
        placeholder="Rechercher par nom d'utilisateur"
        style="width: 255px"
      >
        <template #suffix>
          <n-icon :component="search" />
        </template>
      </n-input>
      <NButton
        @click="showInsertEmployeModal"
        class="button"
        type="success"
        icon-placement="right"
      >
        Créer compte
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NSpace class="tableContainer">
      <STable @onRowClicked="handleClick" :data="users" :columns="cols" />
    </NSpace>
  </NSpace>
</template>

<style scoped></style>
