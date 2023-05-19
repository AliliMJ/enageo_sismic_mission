<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 600px; height: 300px"
      :title="`Affecter l'employé a une équipe`"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:15px 30px"
      content-style="padding:15px 30px"
    >
        <NSpace vertical justify="space-between" style="margin-top:15px">
              <NSelect
                        placeholder="les equipes"
                        :options="equipesOptions"
                        v-model:value="equipeRef"
                        @update:value="showInformations"
                      />
               </NSpace>
              <NSpace justify="space-between" style="margin-top:25px">
            <NSpace>
              <NText class="header" > id : </NText>
              <NText> {{ idRef }} </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> code activite : </NText>
              <NText>  {{ codeActiviteRef }} </NText>
            </NSpace>
            <NSpace>
              <NText class="header"> nom : </NText>
              <NText> {{ nomRef }} </NText>
            </NSpace>
          </NSpace>
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
import {
  NModal,
  NCard,
  NButton,
  NSpace,
  NSelect,
  NText,
  useMessage,
} from "naive-ui";
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["confirm", "cancel"]);
const message = useMessage();

const equipeRef = ref();
const equipeRef1 = ref();
const idRef = ref();
const nomRef = ref();
const codeActiviteRef = ref();

const equipes = (await axios.get(
  `http://localhost:3000/equipes/getEquipesbyMission/${props.codeMission}`
)).data;

const equipesOptions = [];
equipes.forEach((element) => {
  equipesOptions.push({
    label: element.idEquipe + " - " + element.nom,
    value: element.idEquipe
  });
});

const onConfirm = async () => {
  const req = {
    idEquipe : idRef.value
  }
  console.log(props.idEmploye);
  const equipes = (await axios.put(
  `http://localhost:3000/employes/updateEmployeEquipe/${props.idEmploye}`,req
)).data;
message.success("l'employé a bien affecté à l'équipe",{ duration: 5e3 })
  emit("confirm");
};
const onCancel = () => {
  emit("cancel");
};

const props = defineProps({
  showModal: Boolean,
  codeMission: String,
  idEmploye : String
});

 
async function showInformations() {

const searchIndex = equipes.findIndex((equipe) => equipe.idEquipe==Number(equipeRef.value));
equipeRef1.value = equipes[searchIndex];

idRef.value=equipeRef1.value.idEquipe;
nomRef.value = equipeRef1.value.nom;
codeActiviteRef.value = equipeRef1.value.codeActivite;

}

</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
