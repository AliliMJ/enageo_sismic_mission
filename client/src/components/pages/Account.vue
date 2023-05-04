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
} from "@vicons/fluent";
import {
  TrashOutline as trash,
  FolderOpenOutline as folder,
  BriefcaseOutline as bag,
} from "@vicons/ionicons5";

import { ref, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const id = route.params.id;

const isEditUser = ref(true);
const isEditEmploye = ref(true);

const user = (await axios.get(`http://localhost:3000/comptes/${id}`)).data;
const employe = (
  await axios.get("http://localhost:3000/employes/" + user.employeId)
).data;
const etatEmploye = (
  await axios.get("http://localhost:3000/etatEmploye/" + employe.etatEmployeId)
).data;
const fonction = (
  await axios.get("http://localhost:3000/fonction/" + employe.fonctionId)
).data;

if(employe.equipeId!=null){
  const equipe = (
  await axios.get("http://localhost:3000/equipe/" + employe.idEquipe)
).data;
}

const wilaya = (
  await axios.get("http://localhost:3000/wilaya")
).data;

// const nom = ref(employe.nom);
// const prenom = ref(employe.prenom);
// const dateNaiss = ref(new Date(employe.dateNaissance).valueOf());
// const dateAdd = ref(new Date(employe.dateAdhesion).valueOf());
// const email = ref(user.email);
// const role = ref(user.role);
// const dateCreate = ref(new Date(user.dateCreationCompte).valueOf());

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
  numId: String(employe.numIdentite),
  etat: String(employe.etatEmployeId),
  fonction: String(employe.fonctionId),
  equipeId: String(employe.equipeId),
  groupeS: employe.groupeSanguin,
  missionCode: employe.missionCode,
  regimT: employe.regimTravail,
});

// const equipeRef = ref({
//   idEquipe : equipe.idEquipe,
//   codeAct : equipe.codeActivite,
//   nom : equipe.nom,
//   performance : equipe.performance,
//   codeMission : equipe.codeMission
// });

const fonctionRef = ref({
  idFonction: fonction.idFonction,
  nomFonction: fonction.nom,
  description: fonction.description,
});

const etatRef = ref({
  id: etatEmploye.id,
  libEtat: etatEmploye.libEtat,
});

const wilayaRef = ref({
  numWilaya: wilaya.numWilaya,
  nom: wilaya.nom,
});

/* user operations */

const deleteUser = async () => {
  const req = {
    id: Number(user.id),
  };
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

/* end user operations */

/* ------------------------------------------------------- */

/* employe operations */

const deleteEmploye = async () => {
  const req = {
    id: Number(employeRef.value.id),
  };
  try {
    await axios.delete(`http://localhost:3000/comptes/${user.id}`);
    await axios.delete(`http://localhost:3000/employes/${employeRef.value.id}`);
  } catch (error) {
    console.error(error);
  }
};

function handleConfirmDeleteEmploye() {
  dialog.warning({
    title: "Confirmation",
    content: "êtes-vous sûr de supprimer cette employe?",
    positiveText: "Supprimer",
    negativeText: "Annuler",
    onPositiveClick: () => {
      message.success("employe supprimer");
      deleteEmploye();
      router.push("/utilisateur");
    },
    onNegativeClick: () => {
      message.error("Suppression annulée");
    },
  });
}

const updateEmploye = async () => {
  const req = {
    id: Number(employeRef.value.id),
    nom: employeRef.value.nom,
    prenom: employeRef.value.prenom,
    dateRejoint : new Date(employeRef.value.dateRejoint + 4000000),
    dateNaissance: new Date(employeRef.value.dateNaiss + 4000000),
    etatEmployeId: Number(employeRef.value.etat),
    fonctionId: Number(employeRef.value.fonction),
    equipeId: Number(employeRef.value.equipeId),
    numIdentite: employeRef.value.numIdentite,
    groupeSanguin: employeRef.value.groupeSanguin,
    missionCode: employeRef.value.missionCode,

  // id: String(user.employeId),
  // nom: employe.nom,
  // prenom: employe.prenom,
  // dateRejoint: new Date(employe.dateRejoint).valueOf(),
  // dateNaiss: new Date(employe.dateNaissance).valueOf(),
  // lieuNaiss: employe.lieuNaissance,
  // email: employe.email,
  // numTel: employe.numTel,
  // adresse: employe.adresse,
  // sexe: employe.sexe,
  // numId: String(employe.numIdentite),
  // etat: String(employe.etatEmployeId),
  // fonction: String(employe.fonctionId),
  // equipeId: String(employe.equipeId),
  // groupeS: employe.groupeSanguin,
  // missionCode: employe.missionCode,
  // regimT: employe.regimTravail,
  };
  console.log("la date : " + req.dateNaissance);
  await axios.put(`http://localhost:3000/employes/${user.employeId}`, req);
  message.success("employe modifiee");
};

/* end employe operations */

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

const groupeSanguinOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const lieuOptions = [];

wilaya.forEach((element) => {
  lieuOptions.push({
    label: element.numWilaya+" "+element.nom,
    value: element.numWilaya,
  });
});

const etatEmployeOptions = [
    { label: 'En mission' , value: 'En mission'},
    { label: 'En congé' , value: 'En mission'},
    { label: 'en maladie' , value: 'En mission'},
    { label: 'en sanctionné' , value: 'En mission'}];

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
        <n-tab-pane name="data" tab="Données">
          <NSpace justify="end" style="margin-bottom: 10px">
            <n-button
              text
              style="font-size: 30px"
              class="trash"
              @click="handleConfirmDeleteEmploye"
            >
              <n-icon>
                <trash />
              </n-icon>
            </n-button>
            <n-button
              text
              style="font-size: 30px"
              class="pen"
              @click="isEditEmploye = !isEditEmploye"
            >
              <n-icon>
                <pen />
              </n-icon>
            </n-button>
          </NSpace>
          <NSpace vertical>
            <NSpace>
              <NCard style="width: 700px">
                <template #header>
                  <NSpace justify="start">
                    <n-icon :size="30">
                      <personelInfo />
                    </n-icon>
                    <NText> informations personnel </NText>
                  </NSpace>
                </template>
                <!--nom, prénom, date de naissance, sexe-->
                <NForm :disabled="isEditEmploye">
                  <NGrid :span="24" :x-gap="24">
                    <NFormItemGi :span="12" label="id">
                      <NInput v-model:value="employeRef.id" disabled />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Nom">
                      <NInput v-model:value="employeRef.nom" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Prénom">
                      <NInput v-model:value="employeRef.prenom" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Date de naissance">
                      <NDatePicker
                        format="dd/MM/yyyy"
                        v-model:value="employeRef.dateNaiss"
                        type="date"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="lieu de naissance">
                      <NSelect
                        placeholder="wilaya"
                        :options="lieuOptions"
                        v-model:value="employeRef.lieuNaiss"
                      />
                    </NFormItemGi>

                    <NFormItemGi :span="12" label="Date de rejoint">
                      <NDatePicker
                        format="dd/MM/yyyy"
                        v-model:value="employeRef.dateRejoint"
                        type="date"
                        disabled
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="l'adresse">
                      <NInput v-model:value="employeRef.adresse" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Sexe">
                      <NSelect v-model:value="employeRef.sexe" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="numero identite">
                      <NInput v-model:value="employeRef.numId" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Groupe Sanguin">
                      <NSelect
                        placeholder="GroupeSanguin"
                        :options="groupeSanguinOptions"
                        v-model:value="employeRef.groupeS"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Regime de travail">
                      <NInput v-model:value="employeRef.regimT" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="mission">
                      <NInput
                        v-model:value="employeRef.missionCode"
                        placeholder="non mission"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="etat de l'employe">
                      <NInput v-model:value="etatRef.libEtat" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="fonction">
                      <NInput v-model:value="fonctionRef.nomFonction" />
                    </NFormItemGi>
                  </NGrid>
                  <NSpace justify="end">
                    <n-button
                      type="success"
                      :disabled="isEditEmploye"
                      @click="updateEmploye"
                    >
                      Confirmer
                    </n-button>
                  </NSpace>
                </NForm>
              </NCard>
            </NSpace>
          </NSpace>
        </n-tab-pane>
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
            <!-- <n-button type="error" @click="handleConfirmDelete"> supprimer </n-button>
          <n-button type="warning" @click="isEditUser=!isEditUser"> modifier </n-button> -->
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
          <n-icon class="contactIcon">
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

      <!-- <NCard
      header-style="display:flex;flex-direction:row-reverse;"
      title="Emploi"
      style="margin-bottom: 16px; width: 400px"
    >
      <template #header-extra>
        <n-icon class="contactIcon">
          <bag />
        </n-icon>
      </template>
      <NForm disabled>
        <NGrid :span="12" :x-gap="12">
          <NFormItemGi :span="18" label="Email">
            <NInput v-model:value="userRef.email" />
          </NFormItemGi>
          <NFormItemGi :span="18" label="Numéro de téléphone">
            <NInput value="0541383260" />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NCard> -->
    </NSpace>
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
