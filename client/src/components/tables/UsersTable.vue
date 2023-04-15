<script setup>
import axios from 'axios';
import { useAuth } from '../../stores/authentication';
import { h } from 'vue';
import STable from 'common/STable.vue';
import { NH1 , NButton , NIcon , NSpace} from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import OptionButton from '../common/OptionButton.vue';
//import * as ConfirmDialog from 'vuejs-confirm-dialog'
import ConfirmDial from '../common/ConfirmDial.vue';

const auth = useAuth();

console.log(auth.user.hashPassword);
const req = {
  email: auth.user.email,
  hashPassword: auth.user.hashPassword,
};

console.log(req);

const users = (await axios.post('http://localhost:3000/users', req)).data;

const cols = [
  { title: 'id', key: 'id' },
  { title: 'email', key: 'email' },
  { title: 'role', key: 'role' },
  { title: 'date de création',
    key: 'dateCreationCompte' ,
    render(row) {
      return new Date(row.dateCreationCompte).toLocaleDateString();
    },
 },
  {
    title: 'Options',
    key: 'options',
    render(row) {
      return h(OptionButton);
    },
  },
];
</script>

<template>
   <NSpace vertical>
  <NH1>Utilisateurs</NH1>
  <NButton class="button" type="success" icon-placement="right">
      Ajouter
      <template #icon>
        <NIcon>
          <Add />
        </NIcon>
      </template>
    </NButton>
  <STable :data="users" :columns="cols" />
</NSpace>

</template>