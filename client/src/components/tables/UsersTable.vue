<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';
import STable from 'common/STable.vue';
import { NH1, NButton, NIcon, NSpace, useDialog , NAutoComplete} from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { h, ref , computed, watch} from 'vue';
import Modal from '../common/AddUserModal.vue';

const auth = useAuth();
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

//console.log(auth.user.hashPassword);

// search
// const searchedValue=ref(null);
// const users1 = ref([]);
// const options1 = computed(() => {
//   return users1.value.map((e) => ({
//     label: `${e.id} ${e.email}`,
//     value: e.id,
//   }));
// });


// watch(searchedValue, async () => {
//   if (searchedValue.value.length > 0) {
//     users1.value = (
//       await axios.get(`http://localhost:3000/users?like=${searchedValue.value}`)
//     ).data;
//   }
// });


//end

const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

const users = (await axios.get('http://localhost:3000/users')).data;

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
//const idUser=ref(10);
const handleClick = (user) => {
  router.push(`/utilisateur/${user.id}`);
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
      title="Ajouter un nouveau utilisateur"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="showModal = false"
    />

    <NH1>Utilisateurs</NH1>
    <NSpace justify="end">
      <!-- <n-auto-complete
    v-model:value="searchedValue"
    :options="options1"
    placeholder="Email"
  /> -->
      <NButton  @click="showInsertEmployeModal" class="button" type="success" icon-placement="right">
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
