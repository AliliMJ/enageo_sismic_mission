<template>
  <NSpace vertical>
    <Modal
      title="Créer un nouveau compte"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="confirmAdd"
    />

    <NH1>Utilisateurs</NH1>
    <NSpace justify="end">
      <!-- <searchUser v-model="searchEmail" :on-update="searchFilter" /> -->
      <n-input
        v-model:value="searchEmail"
        @update:value="searchFilter"
        placeholder="rechercher nom d'utilisateur"
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
    <STable @onRowClicked="handleClick" :data="users" :columns="cols" />
  </NSpace>
</template>

<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import { NH1, NButton, NIcon, NSpace, useDialog, NInput } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
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
const searchEmail = ref('');

onMounted(async () => {
  users.value = (await axios.get('http://localhost:3000/comptes')).data;
});

const searchFilter = () => {
  watch(searchEmail, async () => {
    if (searchEmail.value.length > 0) {
      users.value = (
        await axios.get(
          `http://localhost:3000/users/email/?like=${searchEmail.value}`
        )
      ).data;
    } else {
      users.value = (await axios.get(`http://localhost:3000/users`)).data;
    }
  });
};

// const options = computed(() => {
//   function filteredItems () {
//       return this.items.filter(item => {
//          return users.email.toLowerCase().indexOf(this.searchEmail.toLowerCase()) > -1
//       })
//     }
// });

//   const searchFilter = () => {
//     computed: {
//     function filteredItems () {
//       return this.items.filter(item => {
//          return users.email.toLowerCase().indexOf(this.searchEmail.toLowerCase()) > -1
//       })
//     }
//   }
// console.log("search : "+users1.value);
// }

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

async function confirmAdd(event) {
  if (event.isValid == true) {
    showModal.value = false;
  }
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
