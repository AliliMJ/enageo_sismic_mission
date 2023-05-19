<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px;height: 400px;"
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
      <SearchEmployeWithoutMission
      @sendId="getId"
      style="width:507px"/>
      <NButton
        @click="showInsertEmployeDetails"
        type="success"
        icon-placement="right"
      >
        Rechercher
        <template #icon>
          <NIcon>
            <Search1 />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
      <NSpace justify="space-between" style="margin-top:25px">
            <NSpace>
              <NText class="header" > id : </NText>
              <NText> {{idRef}} </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> nom : </NText>
              <NText>  {{nomRef}}  </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> prenom : </NText>
              <NText>  {{prenomRef}}  </NText>
            </NSpace>
            <NSpace>
              <NText class="header">fonction : </NText>
              <NText>  directeur </NText>
            </NSpace>
          </NSpace>
        </NSpace>
        <NSpace justify="space-between" style="margin-top:15px">
          <NSpace>
              <NText class="header">sexe : </NText>
              <NText>  Homme </NText>
            </NSpace>
            <NSpace>
              <NText></NText>
              <NText></NText>
            </NSpace>
        </NSpace>
      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <NButton @click="onConfirm" type="warning">Confirmer</NButton>
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NModal, NCard,  NScrollbar, NButton , NSpace , NInput , NText , NIcon} from 'naive-ui';
import SearchEmployeWithoutMission from '../common/searchEmployeWithoutMission.vue';
import { SearchCircleOutline as Search } from '@vicons/ionicons5';
import { PersonSearchOutlined as Search1 } from '@vicons/material';

import { ref} from "vue";
import axios from "axios";

const emit = defineEmits(['confirm', 'cancel']);

const idRef = ref();
const nomRef = ref();
const prenomRef = ref();
const dateRejointRef = ref()
const fonctionRef = ref();
const regimTravail = ref();

const onConfirm = () => {
  emit('confirm',idRef.value);
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

function showInsertEmployeDetails() {
const idRef = ref();
const nomRef = ref();
const prenomRef = ref();
const dateRejointRef = ref()
const fonctionRef = ref();
const regimTravail = ref();
}


async function getId(value)  {
    idRef.value = value;
    const employe = (await axios.get('http://localhost:3000/employes/'+idRef.value)).data;
    nomRef.value = employe.nom;
    prenomRef.value = employe.prenom;
  };


</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
