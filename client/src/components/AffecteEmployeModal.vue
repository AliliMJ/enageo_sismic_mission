<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px; height: 350px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:15px 30px"
      content-style="padding:15px 30px"
    >
      <n-scrollbar style="max-height: 400px">
        <NSpace vertical justify="space-between">
          <NSpace>
            <SearchEmployeWithoutMission @sendId="getId" style="width: 640px" />
          </NSpace>
          <n-divider title-placement="left" v-if="idRef != null">
            les informations sur employe
          </n-divider>
          <NSpace justify="space-between" v-if="idRef != null">
            <NSpace>
              <NText class="header"> id : </NText>
              <NText> {{ idRef }} </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> nom : </NText>
              <NText> {{ nomRef }} </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> prenom : </NText>
              <NText> {{ prenomRef }} </NText>
            </NSpace>
            <NSpace>
              <NText class="header">fonction : </NText>
              <NText> {{ fonctionRef }} </NText>
            </NSpace>
          </NSpace>
        </NSpace>
        <n-divider />
      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <NButton @click="onConfirm" type="success">Confirmer</NButton>
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import {
  NModal,
  NCard,
  NScrollbar,
  NButton,
  NSpace,
  NInput,
  NText,
  NIcon,
  NDivider,
} from 'naive-ui';
import SearchEmployeWithoutMission from './searchEmployeWithoutMission.vue';

import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['confirm', 'cancel']);

const idRef = ref();
const nomRef = ref();
const prenomRef = ref();

const fonctionRef = ref();

const onConfirm = () => {
  emit('confirm', idRef.value);
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

async function getId(value) {
  idRef.value = value;
  const employe = (
    await axios.get('http://localhost:3000/employes/' + idRef.value)
  ).data;
  console.log(employe);
  nomRef.value = employe.nom;
  prenomRef.value = employe.prenom;
  fonctionRef.value = employe.fonction.nom;
}
</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
