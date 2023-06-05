<script setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NButton,
  NIcon,
  NGrid,
  NForm,
  NFormItemGi,
  NInput,
  NSelect,
  NDatePicker,
  useDialog,
  useMessage,
  NText,
} from "naive-ui";
import {
  Edit32Filled as Pen,
  ContactCard20Regular as contact,
  Info20Regular as detail,
  PeopleTeam16Regular as team,
  BookContacts20Regular as personelInfo,
  VehicleTruckProfile20Regular as truck,
  History20Regular as history,
} from "@vicons/fluent";
import {
  TrashOutline as trash,
  FolderOpenOutline as folder,
} from "@vicons/ionicons5";
import MaterielTag from "../components/MaterielTag.vue";
import { ref, onMounted } from "vue";
import { useAuth } from "../stores/authentication";
import HistoryModal from "../components/ReparationHisotryNoEdit.vue";
import ExterneModal from "../components/ReparationExterneHistory.vue";

const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const auth = useAuth();

const isEdit = ref(true);
const showHistoryModal = ref(false);
const showExterneModal = ref(false);

const materiel = ref();
materiel.value = (
  await axios.get(
    `http://localhost:3000/material/getMaterielWithReparations/${route.params.codeMat}`
  )
).data;
materiel.value.dateService = new Date(materiel.value.dateService).valueOf();

const typeMateriel = (
  await axios.get(`http://localhost:3000/typeMateriel/getAllTypes`)
).data;

const typeOptions = [];
typeMateriel.forEach((element) => {
  typeOptions.push({
    label: element.libelle,
    value: element.idTypeMat,
  });
});

async function updateMateriel() {
  const req = {
    materiel: materiel.value,
  };
}

async function deleteMateriel() {
  dialog.warning({
    title: "Confirmation",
    content: "êtes-vous sûr de supprimer ce matériel ?",
    positiveText: "Supprimer",
    negativeText: "Annuler",
    onPositiveClick: () => {
      message.success("matériel supprimée");
      deleteMaterielFunction();
      router.push("/materiel");
    },
    onNegativeClick: () => {
      message.error("Suppression annulée");
    },
  });
}

async function deleteMaterielFunction() {
  await axios.put(
    `http://localhost:3000/material/deleteMateriel/${route.params.codeMat}`
  );
}
</script>

<template>
  <NSpace vertical>
    <NSpace justify="end">
      <NButton
        @click="showExterneModal = true"
        class="button"
        icon-placement="left"
        color="rgb(255,0,0)"
      >
        Consulter l'historique des reparations externe
        <template #icon>
          <NIcon>
            <history />
          </NIcon>
        </template>
      </NButton>

      <NButton
        @click="showHistoryModal = true"
        class="button"
        icon-placement="left"
        color="rgb(100,100,100)"
      >
        Consulter l'historique des reparations
        <template #icon>
          <NIcon>
            <history />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NSpace>
      <NCard>
        <template #header>
          <NSpace jusitfy="space-between">
            <NSpace>
              <n-icon :size="30">
                <truck />
              </n-icon>
              <NText>
                information sur le vehicule ({{ materiel.designation }})
              </NText>
              <MaterielTag :statuMateriel="materiel.status" />
            </NSpace>
          </NSpace>
        </template>
        <NSpace justify="end" style="margin-bottom: 20px">
          <NSpace>
            <n-button
              text
              style="font-size: 30px"
              class="trash"
              @click="deleteMateriel"
            >
              <n-icon>
                <trash />
              </n-icon>
            </n-button>
            <n-button
              text
              style="font-size: 30px"
              class="pen"
              @click="isEdit = !isEdit"
            >
              <n-icon>
                <pen />
              </n-icon>
            </n-button>
          </NSpace>
        </NSpace>
        <NForm :disabled="isEdit">
          <NGrid :span="24" :x-gap="24">
            <NFormItemGi :span="4" label="code du materiel">
              <NInput v-model:value="materiel.codeMat" />
            </NFormItemGi>
            <NFormItemGi :span="6" label="La marque">
              <NInput v-model:value="materiel.marque" />
            </NFormItemGi>
            <NFormItemGi :span="6" label="Le modele">
              <NInput v-model:value="materiel.modele" />
            </NFormItemGi>
            <NFormItemGi :span="6" label="Date de mise en service">
              <NDatePicker
                format="dd/MM/yyyy"
                type="date"
                v-model:value="materiel.dateService"
              />
            </NFormItemGi>
            <NFormItemGi :span="6" label="designation">
              <NInput v-model:value="materiel.designation" />
            </NFormItemGi>

            <NFormItemGi :span="6" label="matricule">
              <NInput v-model:value="materiel.matricule" />
            </NFormItemGi>
            <NFormItemGi :span="6" label="type du materiel">
              <NSelect
                placeholder="type du materiel"
                :options="typeOptions"
                v-model:value="materiel.idTypeMat"
              />
            </NFormItemGi>
          </NGrid>
          <NSpace justify="end">
            <n-button type="success" :disabled="isEdit" @click="updateMateriel">
              Confirmer
            </n-button>
          </NSpace>
        </NForm>
      </NCard>
    </NSpace>
  </NSpace>
  <HistoryModal
    :showHistoryModal="showHistoryModal"
    :codeMat="route.params.codeMat"
    @cancel="showHistoryModal = false"
  />
  <ExterneModal
    :showExterneModal="showExterneModal"
    :codeMat="route.params.codeMat"
    @cancel="showExterneModal = false"
  />
</template>

<style scoped>
.passwordText {
  text-decoration: underline;
}

.passwordText:hover {
  cursor: pointer;
}
.trash {
  color: #d03050;
}

.trash:hover {
  color: #de576d;
}

.pen {
  color: #f0a020;
}

.pen:hover {
  color: #eba83d;
}

.folderIcon {
  margin-right: 10px;
  font-size: 20px;
}

.contactIcon {
  margin-right: 10px;
  font-size: 25px;
}

.cardShadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
