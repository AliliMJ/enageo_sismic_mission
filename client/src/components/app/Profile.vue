<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
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
  NText
} from 'naive-ui';
import {
  Edit32Filled as Pen,
  ContactCard20Regular as contact,
  Info20Regular as detail,
  PeopleTeam16Regular as team,
  BookContacts20Regular as personelInfo,
} from '@vicons/fluent';
import {
  TrashOutline as trash,
  FolderOpenOutline as folder,
} from '@vicons/ionicons5';

import { ref, onMounted } from 'vue';
import { useAuth } from '../../stores/authentication';
import passwordModal from '../common/changePassword.vue';

const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const auth = useAuth();

const isEditUser = ref(true);
const isEditEmploye = ref(true);

const user = (await axios.get(`http://localhost:3000/comptes/${auth.user.id}`)).data;
const employe = (
  await axios.get('http://localhost:3000/employes/' + user.employeId)
).data;
const wilaya = (await axios.get("http://localhost:3000/wilaya")).data;
const fonction = (await axios.get("http://localhost:3000/fonction")).data;

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

const fonctionRef = ref(employe.fonction.idFonction);


let missionRef
if(employe.Mission!=null){
  missionRef = ref({
    code : employe.Mission.codeMission,
    methodologie : employe.Mission.methodologie,
  })
}else{
  missionRef=ref();
}

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
const roledisabled = ref(true);
if(auth.user.role=='ADMINISTRATEUR'){
  roledisabled.value=false;
}

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
      router.push("/comptes");
    },
    onNegativeClick: () => {
      message.error("Suppression annulée");
    },
  });
}

const updateEmploye = async () => {
    const req = {
        id : Number(employeRef.value.id),
        nom : employeRef.value.nom,
        prenom : employeRef.value.prenom,
         dateRejoint : new Date(employeRef.value.dateRejoint + 4000000),
         dateNaissance : new Date(employeRef.value.dateNaiss + 4000000),
         lieuNaissance : Number(employeRef.value.lieuNaiss),
         email : employeRef.value.email,
         numTel : employeRef.value.numTel,
        adresse : employeRef.value.adresse,
        sexe : employeRef.value.sexe,
         numIdentite : employeRef.value.numId,
         groupeSanguin : employeRef.value.groupeSanguin,
         regimTravail : employeRef.value.regimTravail,
        codeMission : employeRef.value.missionCode,
        etat : employeRef.value.etat,
        fonctionId : Number(fonctionRef.value),
    }

  console.log("request : "+req.fonctionId);
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
    label: element.numWilaya + " " + element.nom,
    value: element.numWilaya,
  });
});

const etatEmployeOptions = [
  { label: "En mission", value: "mission" },
  { label: "En congé", value: "conge" },
  { label: "en maladie", value: "maladie" },
  { label: "en sanctionné", value: "sanctionne" },
];

const fonctionOptions = [];
fonction.forEach((element) => {
  fonctionOptions.push({
    label: element.idFonction + " " + element.nom,
    value: element.idFonction,
  });
});

const showModal = ref(false);

const showChangePasswordModal = () => {
  showModal.value = true;
};

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
        <n-tab-pane name="data" tab="Mes données">
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
                      <NInput v-model:value="employeRef.numIdentite" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Groupe Sanguin">
                      <NSelect
                        placeholder="GroupeSanguin"
                        :options="groupeSanguinOptions"
                        v-model:value="employeRef.groupeSanguin"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Regime de travail">
                      <NInput v-model:value="employeRef.regimTravail" />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="mission" v-if="employeRef.mission">
                      <NInput
                        v-model:value="missionRef.code"
                        placeholder="non mission"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="etat de l'employe">
                      <NSelect
                        placeholder="etat"
                        :options="etatEmployeOptions"
                        v-model:value="employeRef.etat"
                      />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="fonction de l'employe">
                      <NSelect
                        :options="fonctionOptions"
                        v-model:value="fonctionRef"
                      />
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
        <n-tab-pane name="compte" tab="Mon compte">
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
                  <NInput v-model:value="auth.user.id" disabled />
                </NFormItemGi>
                <NFormItemGi :span="12" label="nom d'utilisateur">
                  <NInput v-model:value="userRef.username" />
                </NFormItemGi>
                <NFormItemGi :span="12" label="Role">
                  <NSelect
                    v-model:value="userRef.role"
                    :options="roleOptions"
                    :disabled="roledisabled||isEditUser"
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
              <NSpace justify="end" style="display:flex;align-items:center;">
                <NText @click="showChangePasswordModal()" class="passwordText">
                  changer mon mot de passe
                </NText>
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
    <passwordModal
      title="chnager mon mot de passed"
      :showModal="showModal"
      @cancel="showModal = false"
      @confirm="showModal = false"
    />
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

.passwordText {
  text-decoration:underline;
}

.passwordText:hover {
  cursor:pointer;
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
