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
} from "@vicons/fluent";
import {
  TrashOutline as trash,
} from "@vicons/ionicons5";

import { ref, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const id = route.params.id;

const isEditUser = ref(true);

const user = (await axios.get(`http://localhost:3000/comptes/${id}`)).data;
const employe = (
  await axios.get("http://localhost:3000/employes/" + user.employeId)
).data;

const userRef = ref({
  id: user.id,
  username: user.username,
  role: user.role,
  dateCreate: new Date(user.dateCreationCompte).valueOf(),
});

const employeRef = ref({
  id: String(user.employeId),
  nom: employe.nom,
  prenom: employe.prenom,
  dateRejoint: new Date(employe.dateRejoint).valueOf(),
  dateNaiss: new Date(employe.dateNaissance).valueOf(),
  lieuNaiss: employe.lieuNaissance,
  email: employe.email,
  numTel: employe.numTel,
  adresse: employe.adresse,
  sexe: employe.sexe,
  numIdentite: String(employe.numIdentite),
  etat: String(employe.etat),
  fonction: employe.fonction,
  equipe: employe.Equipe,
  groupeSanguin: employe.groupeSanguin,
  mission: employe.Mission,
  regimTravail: employe.regimTravail,
});

/* user operations */

const deleteUser = async () => {
  await axios.delete(`http://localhost:3000/comptes/${user.id}`);
};

function handleConfirmDeleteUser() {
  dialog.warning({
    title: "Confirmation",
    content: "êtes-vous sûr de supprimer cette utilisateur?",
    positiveText: "Supprimer",
    negativeText: "Annuler",
    onPositiveClick: () => {
      message.success("utilisateur supprimer");
      deleteUser();
      router.push("/comptes");
    },
    onNegativeClick: () => {
      message.error("Suppression annulée");
    },
  });
}

const updateUser = async () => {
  const req = {
    username: userRef.value.username,
    role: userRef.value.role,
  };
  await axios.put(`http://localhost:3000/comptes/${user.id}`, req);
  message.success("utilisateur modifiee");
};


const roleOptions = [
  {
    label: "Chef mision",
    value: "CHEF_MISSION",
  },
  {
    label: "Chef terrain",
    value: "CHEF_TERRAIN",
  },
  {
    label: "Gestionnaire",
    value: "GESTIONNAIRE",
  },
  {
    label: "administrateur",
    value: "ADMINISTRATEUR",
  },
];
</script>

<template>
  <NSpace justtify="space-between">
    <n-card style="margin: 10px; width: 750px">
      <template #header>
        <NSpace justify="start">
          <n-icon :size="30">
            <detail />
          </n-icon>
          <NText> Détails </NText>
        </NSpace>
      </template>
      <n-tabs type="line" animated>
        <n-tab-pane name="compte" tab="Compte">
          <NSpace justify="end" style="margin-bottom: 10px">
            <n-button
              text
              style="font-size: 30px"
              class="trash"
              @click="handleConfirmDeleteUser"
            >
              <n-icon>
                <trash />
              </n-icon>
            </n-button>
            <n-button
              text
              style="font-size: 30px"
              class="pen"
              @click="isEditUser = !isEditUser"
            >
              <n-icon>
                <pen />
              </n-icon>
            </n-button>
          </NSpace>
          <NCard title="details sur le compte">
            <NForm :disabled="isEditUser">
              <NGrid :span="24" :x-gap="24">
                <NFormItemGi :span="12" label="id">
                  <NInput v-model:value="id" disabled />
                </NFormItemGi>
                <NFormItemGi :span="12" label="nom d'utilisateur">
                  <NInput v-model:value="userRef.username" />
                </NFormItemGi>
                <NFormItemGi :span="12" label="Role">
                  <NSelect
                    v-model:value="userRef.role"
                    :options="roleOptions"
                  />
                </NFormItemGi>
                <NFormItemGi :span="12" label="date creation de compte">
                  <NDatePicker
                    format="dd/MM/yyyy"
                    v-model:value="userRef.dateCreate"
                    type="date"
                    disabled
                  />
                </NFormItemGi>
              </NGrid>
              <NSpace justify="end">
                <n-button
                  type="success"
                  :disabled="isEditUser"
                  @click="updateUser"
                >
                  Confirmer
                </n-button>
              </NSpace>
            </NForm>
          </NCard>
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <NSpace vertical>
      <NCard
        header-style="display:flex;flex-direction:row-reverse;"
        title="Contact"
        style="
          margin: 10px;
          width: 400px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        "
      >
        <template #header-extra>
          <n-icon class="cardIcon">
            <contact />
          </n-icon>
        </template>
        <NForm disabled>
          <NGrid :span="12" :x-gap="12">
            <NFormItemGi :span="18" label="Email">
              <NInput v-model:value="employeRef.email" />
            </NFormItemGi>
            <NFormItemGi :span="18" label="Numéro de téléphone">
              <NInput v-model:value="employeRef.numTel" />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCard>
    </NSpace>

    <!-- <NCard
          header-style="display:flex;flex-direction:row-reverse;"
          title="Equipe"
          style="margin-bottom: 16px; width: 700px"
          v-if="equipeRef"
         >
          <template #header-extra>
            <n-icon class="contactIcon">
              <team />
            </n-icon>
          </template>
          <NForm disabled >
            <NGrid :span="24" :x-gap="24">
              <NFormItemGi :span="12" label="id de l'equipe">
                <NInput v-model:value="equipeRef.idEquipe" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="code d'activite">
                <NInput v-model:value="equipeRef.codeActivite" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="nom">
                <NInput v-model:value="equipeRef.nom" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="performance">
                <NInput v-model:value="equipeRef.performance" />
              </NFormItemGi>
              <NFormItemGi :span="12" label="code de la mission">
                <NInput v-model:value="equipeRef.codeMission" />
              </NFormItemGi>
            </NGrid>
          </NForm>
 </NCard> -->
  </NSpace>
</template>

<style scoped>
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
