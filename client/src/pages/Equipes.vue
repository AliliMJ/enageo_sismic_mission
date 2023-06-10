<script setup>
import axios from 'axios';

import STable from '../components/STable.vue';

import { NH1, NList, NThing, NListItem, NCard, NButton, NTag } from 'naive-ui';

import { useAuth } from '../stores/authentication.js';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const equipes = (
  await axios.post('http://localhost:3000/equipes/mission', {
    userId: auth?.user?.id,
  })
).data;

function itemClicked(item) {
  router.push('/equipe/' / item.idEquipe);
}
</script>

<template>
  <NH1>La liste des équipes</NH1>
  <n-card>
    <n-list hoverable clickable>
      <n-list-item v-for="equipe of equipes" @click="itemClicked(equipe)">
        <n-thing :title="equipe.activite.nomAct">
          <template #description>
            {{ `${equipe.Membres.length} employés` }}
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-card>
</template>
