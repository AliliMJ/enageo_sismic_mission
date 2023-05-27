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
  NAlert,
} from "naive-ui";
import {
  Edit32Filled as Pen,
  ContactCard20Regular as contact,
  Info20Regular as detail,
  BookContacts20Regular as personelInfo,
} from "@vicons/fluent";
import {
  TrashOutline as trash,
  BriefcaseOutline as bag,
} from "@vicons/ionicons5";
import AffecteEquipeModal from "../common/AffecteEquipeModal.vue";
import { ref, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const id = route.params.id;

const isEditEmploye = ref(true);
const affecteEquipeModal = ref(false);

const employe = (await axios.get("http://localhost:3000/employes/" + id)).data;
const wilaya = (await axios.get("http://localhost:3000/wilaya")).data;
const fonction = (await axios.get("http://localhost:3000/fonction")).data;
const missions = (await axios.get("http://localhost:3000/missions")).data;

const employeRef = ref({
  id: String(id),
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

const fonctionRef = ref(Number(employe.fonction.idFonction));

let missionRef;
if (employe.Mission != null) {
  missionRef = ref({
    code: employe.Mission.codeMission,
    methodologie: employe.Mission.methodologie,
  });
} else {
  missionRef = ref();
}

let equipeRef;
if (employeRef.value.equipe != null) {
  equipeRef = ref({
    idEquipe: String(employeRef.value.equipe.idEquipe),
    codeActivite: employeRef.value.equipe.codeActivite,
    nom: employeRef.value.equipe.nom,
    performance: String(employeRef.value.equipe.performance),
    codeMission: employeRef.value.equipe.codeMission,
  });
} else {
  equipeRef = ref();
}

/* employe operations */

const deleteEmployeWithMission = async () => {
  try {
    await axios.put(
      `http://localhost:3000/employes/deleteEmployeWithMission/${id}`
    );
  } catch (error) {}
};

function handleConfirmDeleteEmploye() {
  dialog.warning({
    title: "Confirmation",
    content: "êtes-vous sûr de supprimer cette employe?",
    positiveText: "Supprimer",
    negativeText: "Annuler",
    onPositiveClick: () => {
      message.success("employe supprimer");
      deleteEmployeWithMission();
      router.push("/employe");
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
    dateRejoint: new Date(employeRef.value.dateRejoint + 4000000),
    dateNaissance: new Date(employeRef.value.dateNaiss + 4000000),
    lieuNaissance: Number(employeRef.value.lieuNaiss),
    email: employeRef.value.email,
    numTel: employeRef.value.numTel,
    adresse: employeRef.value.adresse,
    sexe: employeRef.value.sexe,
    numIdentite: employeRef.value.numId,
    groupeSanguin: employeRef.value.groupeSanguin,
    regimTravail: employeRef.value.regimTravail,
    codeMission: employeRef.value.missionCode,
    etat: employeRef.value.etat,
    fonctionId: Number(fonctionRef.value),
  };
  await axios.put(`http://localhost:3000/employes/${id}`, req);
  message.success("employé modifiée");
  isEditEmploye.value = true;
};

/* end employe operations */

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
    label: element.numWilaya + "- " + element.nom,
    value: element.numWilaya,
  });
});

const etatEmployeOptions = [
  { label: "En mission", value: "mission" },
  { label: "En congé", value: "conge" },
  { label: "en maladie", value: "maladie" },
  { label: "en sanctionné", value: "sanctionne" },
  { label: "en travail", value: "travail" },
];

const fonctionOptions = [];
fonction.forEach((element) => {
  fonctionOptions.push({
    label: element.idFonction + " " + element.nom,
    value: element.idFonction,
  });
});

const missionOptions = [];
missions.forEach((element) => {
  missionOptions.push({
    label: element.codeMission + " (" + element.methodologie + ")",
    value: element.codeMission,
  });
});
</script>

<template>
  <NSpace justtify="space-between">
    <n-card style="margin: 10px; width: 750px">
      <template #header>
        <NSpace justify="start">
          <n-icon :size="25">
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
                  F  </NFormItemGi>
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
                    <NFormItemGi
                      :span="12"
                      label="mission"
                      v-if="employeRef.mission"
                    >
                      <NSelect
                        v-model:value="missionRef.code"
                        placeholder="non mission"
                        :options="missionOptions"
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
        <n-tab-pane
          name="team"
          tab="Equipe"
          v-if="fonctionRef != 2 && fonctionRef != 5 && fonctionRef != 7"
        >
          <NSpace v-if="equipeRef != null">
            <NSpace vertical>
              <NSpace>
                <NCard style="width: 700px">
                  <template #header>
                    <NSpace justify="start">
                      <n-icon :size="30">
                        <personelInfo />
                      </n-icon>
                      <NText> information sur l'equipe </NText>
                    </NSpace>
                  </template>
                  <!--nom, prénom, date de naissance, sexe-->
                  <NForm :disabled="isEditEmploye">
                    <NGrid :span="24" :x-gap="24">
                      <NFormItemGi :span="12" label="id">
                        <NInput v-model:value="equipeRef.idEquipe" disabled />
                      </NFormItemGi>
                      <NFormItemGi :span="12" label="code Activite">
                        <NInput
                          v-model:value="equipeRef.codeActivite"
                          disabled
                        />
                      </NFormItemGi>
                      <NFormItemGi :span="12" label="nom">
                        <NInput v-model:value="equipeRef.nom" disabled />
                      </NFormItemGi>
                      <NFormItemGi :span="12" label="performance">
                        <NInput
                          v-model:value="equipeRef.performance"
                          disabled
                        />
                      </NFormItemGi>
                      <NFormItemGi :span="12" label="Mission">
                        <NInput
                          v-model:value="equipeRef.codeMission"
                          disabled
                        />
                      </NFormItemGi>
                    </NGrid>
                  </NForm>
                </NCard>
              </NSpace>
            </NSpace>
          </NSpace>
          <NSpace vertical v-if="equipeRef == null">
            <n-alert title="employé sans équipe" type="warning" closable>
              <NSpace vertical v-if="equipeRef == null">
                <NText> ce employe n'est pas affecté a aucun equipe </NText>
                <NText
                  style="text-decoration: underline; cursor: pointer"
                  @click="affecteEquipeModal = true"
                >
                  vous voulez lui affecter un équipe ?
                </NText>
              </NSpace>
            </n-alert>
          </NSpace>
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <NSpace vertical>
      <NCard
        header-style="display:flex;flex-direction:row-reverse"
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
            <contact style="font-size: 25px; position: absolute; top: -4px" />
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

      <NCard
        header-style="display:flex;flex-direction:row-reverse"
        title="Fonction"
        style="
          margin: 10px;
          width: 400px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        "
      >
        <template #header-extra>
          <n-icon class="cardIcon">
            <bag style="font-size: 25px; position: absolute; top: -4px" />
          </n-icon>
        </template>
        <NForm disabled>
          <NGrid :span="12" :x-gap="12">
            <NFormItemGi :span="18" label="la fonction">
              <NInput v-model:value="employeRef.fonction.nom" />
            </NFormItemGi>
            <NFormItemGi :span="18" label="description">
              <NInput
                v-model:value="employeRef.fonction.description"
                type="textarea"
              />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCard>
    </NSpace>
    <AffecteEquipeModal
      :showModal="affecteEquipeModal"
      :codeMission="missionRef.code"
      :idEmploye="employeRef.id"
      @cancel="affecteEquipeModal = false"
      @confirm="affecteEquipeModal = false"
    />
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

.cardShadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
}

.cardIcon {
  margin-right: 25px;
}
</style>
