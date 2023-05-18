<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px;height: 400px;"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-scrollbar style="max-height: 400px">
        <NSpace vertical justify="space-between">
      <SearchEmployeWithoutMission
      @sendId="getId"
      @keyup="test"/>

      <NSpace justify="space-between" style="margin-top:25px">
            <NSpace>
              <NText class="header" > id : </NText>
              <NText> 1 </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> nom : </NText>
              <NText>  abouri  </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> prenom : </NText>
              <NText>  Abdelkrim  </NText>
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
import { NModal, NCard,  NScrollbar, NButton , NSpace , NInput , NText} from 'naive-ui';
import SearchEmployeWithoutMission from '../common/searchEmployeWithoutMission.vue';
import { ref} from "vue";
import axios from "axios";

const emit = defineEmits(['confirm', 'cancel']);

const idRef = ref();
const nomRef = ref();
const prenomRef = ref();

const onConfirm = () => {
  emit('confirm');
};
const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

 function getId(value) {
//   const employe = (
//   await axios.get("http://localhost:3000/employes/" + value)
// ).data;
//   const fonction = (await axios.get(`http://localhost:3000/fonction/${employe.fonctionId}`)).data;
//   idRef.value = employe.id;
}

const test = () => {
  console.log("j'ai terminee");
}

</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
