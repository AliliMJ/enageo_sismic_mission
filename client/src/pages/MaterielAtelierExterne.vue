<template>
  <NSpace class="pageHeader" style="margin-bottom: 10px">
    details sur la reparation № {{ idRepRef }}
  </NSpace>
  <NGrid
    x-gap="20"
    y-gap="20"
    :cols="10"
    style="padding-left: 5px; padding-right: 200px; width: 78vw"
  >
    <n-grid-item :span="10" class="div1">
      <NGrid :span="10" :x-gap="15" :y-gap="5">
        <NGridItem :span="25" style="margin-bottom: 25px">
          <NSpace justify="space-between">
            <NText style="font-weight: bold; font-size: 18px"
              >les informations sur le materiel :</NText
            >
            <NButton
              @click="showHistoryModalAction"
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
        </NGridItem>
        <!-- <NGridItem :span="25">
            <n-divider style="weight:10px"/>
        </NGridItem> -->
        <NGridItem :span="3">
          <NText style="font-weight: bold; font-size: 18px">id : </NText>
          <NText style="font-size: 18px"> {{ codeMat }} </NText>
        </NGridItem>
        <NGridItem :span="5">
          <NText style="font-weight: bold; font-size: 18px">
            la marque :
          </NText>
          <NText style="font-size: 18px"> {{ marqueRef }} </NText>
        </NGridItem>
        <NGridItem :span="7">
          <NText style="font-weight: bold; font-size: 18px">
            date mise en service :
          </NText>
          <NText style="font-size: 18px"> {{ dateServiceRef }} </NText>
        </NGridItem>
        <NGridItem :span="7">
          <NText style="font-weight: bold; font-size: 18px">
            le modèle :
          </NText>
          <NText style="font-size: 18px"> {{ modeleRef }} </NText>
        </NGridItem>
        <NGridItem :span="6">
          <NText style="font-weight: bold; font-size: 18px"
            >designation :
          </NText>
          <NText style="font-size: 18px"> {{ designationRef }} </NText>
        </NGridItem>
        <NGridItem :span="6">
          <NText style="font-weight: bold; font-size: 18px">matrciule : </NText>
          <NText style="font-size: 18px"> {{ matriculeRef }} </NText>
        </NGridItem>
        <NGridItem :span="5">
          <NText style="font-weight: bold; font-size: 18px">l'etat : </NText>
          <NText style="font-size: 18px"> {{ statusRef }} </NText>
        </NGridItem>
        <NGridItem :span="6">
          <NText style="font-weight: bold; font-size: 18px"
            >Type du materiel :
          </NText>
          <NText style="font-size: 18px"> {{ typeMaterielRef }} </NText>
        </NGridItem>
      </NGrid>
    </n-grid-item>

    <n-grid-item :span="10">
      <n-space vertical style="margin-top: 65px; margin-bottom: 10px">
        <n-steps :current="currentRef" :status="currentStatus">
          <n-step
            title="l'atelier mécanique"
            description="Le véhicule se situe au niveau de l'atelier mécanique"
          />
          <n-step
            title="sur la route"
            description="sur la  route vers la direction générale"
          />
          <n-step
            title="arrivé à la direction"
            description="à l'atelier de la direction générale"
          />
          <n-step
            title="sur la route"
            description="la véhicule est sur route vers la mission"
          />
          <n-step
            title="arrivée"
            description="la véhicule est arrivée à la mission"
          />
        </n-steps>

        <n-space>
          <n-button-group>
            <n-button
              type="success"
              @click="next"
              icon-placement="right"
              v-if="
                ((auth.user.role === Role.Gestionnaire &&
                  (currentRef === 1 || currentRef === 4)) ||
                  (auth.user.role === Role.ChefMision &&
                    (currentRef === 2 || currentRef === 3))) &&
                !showSaveRef
              "
            >
              suivant
              <template #icon>
                <NIcon>
                  <arrow />
                </NIcon>
              </template>
            </n-button>
            <n-button
              type="success"
              @click="EndDemandeReparation"
              icon-placement="right"
              v-if="auth.user.role === Role.Gestionnaire && currentRef === 5"
            >
              finaliser la demande de reparation
              <template #icon>
                <NIcon>
                  <arrow />
                </NIcon>
              </template>
            </n-button>
          </n-button-group>
          <NButton type="success" @click="save" v-if="showSaveRef"
            >Sauvegarder
            <template #icon>
              <NIcon>
                <Save />
              </NIcon>
            </template>
          </NButton>
        </n-space>
      </n-space>
    </n-grid-item>
    <n-grid-item :span="10" class="div4">
      <NForm :disabled="auth.user.role != Role.ChefMission && currentRef != 3">
        <NGrid :span="10" :x-gap="30">
          <NFormItemGi :span="2" label="id">
            <NInput v-model:value="idRepRef" />
          </NFormItemGi>
          <NFormItemGi :span="5" label="date de la panne">
            <NDatePicker
              format="dd/MM/yyyy"
              v-model:value="dPanneRef"
              type="date"
            />
          </NFormItemGi>
          <NFormItemGi :span="5" label="date debut reparation">
            <NDatePicker
              format="dd/MM/yyyy"
              v-model:value="dDebRepRef"
              type="date"
            />
          </NFormItemGi>
          <NFormItemGi :span="5" label="date fin reparation">
            <NDatePicker
              format="dd/MM/yyyy"
              v-model:value="dFinRepRef"
              type="date"
            />
          </NFormItemGi>
          <NFormItemGi :span="5" label="cout (DA)">
            <NInput v-model:value="coutRef" />
          </NFormItemGi>
          <NFormItemGi :span="11" label="detail">
            <NInput
              type="textarea"
              v-model:value="detailRef"
              :autosize="{
                minRows: 7,
                maxRows: 7,
              }"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <NSpace justify="space-between">
        <NSpace>
          <NButton
            class="button"
            type="info"
            @click="mettreEnReparationExterne"
            v-if="materiel.status === 0"
          >
            creer une demande de reparation
          </NButton>
        </NSpace>
        <NSpace>
          <NButton
            class="button"
            type="success"
            @click="mettreEnBonEtat"
            v-if="currentRef === 5 && auth.user.role === Role.ChefMission"
          >
            confirmer
          </NButton>
        </NSpace>
      </NSpace>
    </n-grid-item>
  </NGrid>

  <HistoryModal
    :showHistoryModal="showHistoryModal"
    :codeMat="codeMat"
    @cancel="showHistoryModal = false"
  />
</template>

<script setup>
import axios from 'axios';

import { History20Regular as history } from '@vicons/fluent';
import HistoryModal from '../components/ReparationHistory.vue';
import {
  NSpace,
  NButton,
  NIcon,
  NGrid,
  NFormItemGi,
  NGridItem,
  NInput,
  NDatePicker,
  useMessage,
  NText,
  NSteps,
  NStep,
  NButtonGroup,
  NForm,
} from 'naive-ui';
import { ArrowForward as arrow, SaveOutline as Save } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../stores/authentication';
import { Role } from '../utils/enums';

const currentRef = ref(1);
const currentStatus = ref('process');
const showSaveRef = ref(false);

const router = useRouter();
const route = useRoute();
const auth = useAuth();
const message = useMessage();

const codeMat = route.params.codeMat;
const showHistoryModal = ref(false);

const idRepRef = ref();
const dPanneRef = ref();
const dDebRepRef = ref();
const dFinRepRef = ref();
const detailRef = ref();
const coutRef = ref();

const designationRef = ref();
const marqueRef = ref();
const modeleRef = ref();
const dateServiceRef = ref();
const matriculeRef = ref();
const statusRef = ref();
const typeMaterielRef = ref();

const lastReparation = (
  await axios.get(
    `http://localhost:3000/atelier/getLastReparationByMaterialCodeWithDemande/${codeMat}`
  )
).data;

const demandeReparation = lastReparation.DemadeReparation;

if (demandeReparation.dSortie != null) {
  currentRef.value++;
}
if (demandeReparation.dArrive != null) {
  currentRef.value++;
}
if (demandeReparation.dRetour != null) {
  currentRef.value++;
}
if (demandeReparation.dEntree != null) {
  currentRef.value++;
}

console.log(currentRef.value);

const materiel = (await axios.get(`http://localhost:3000/material/${codeMat}`))
  .data;

const typeMateriel = (
  await axios.get(
    `http://localhost:3000/typeMateriel/getTypeMaterielById/${materiel.idTypeMat}`
  )
).data;

typeMaterielRef.value = typeMateriel.libelle;
designationRef.value = materiel.designation;
matriculeRef.value = materiel.matricule;
if (Number(materiel.status) === 1) {
  statusRef.value = 'en reparation';
} else {
  statusRef.value = 'en panne';
}
marqueRef.value = materiel.marque;
modeleRef.value = materiel.modele;
dateServiceRef.value = new Date(materiel.dateService).toLocaleDateString('fr');

//typeMaterielRef.value = materiel.typemateriel.libelle

idRepRef.value = String(lastReparation.idRep);
dPanneRef.value = new Date(lastReparation.dPanne).valueOf();

if (lastReparation.dDebRep != null) {
  dDebRepRef.value = new Date(lastReparation.dDebRep).valueOf();
}

if (lastReparation.dFinRep != null) {
  dFinRepRef.value = new Date(lastReparation.dFinRep).valueOf();
}

detailRef.value = lastReparation.detailProbleme;

async function mettreEnReparationExterne() {
  const req = {
    idRep: Number(idRepRef.value),
  };

  const reparationExterne = (
    await axios.put(
      ` http://localhost:3000/material/mettreEnReparationExterne/${codeMat}`,
      req
    )
  ).data;
}

function next() {
  if (currentRef.value === null) {
    currentRef.value = 1;
  } else if (currentRef.value >= 5) {
    currentRef.value = null;
  } else {
    currentRef.value++;
    showSaveRef.value = true;
  }
}

async function save() {
  if (currentRef.value === 2) {
    const demandeReparation = (
      await axios.put(
        ` http://localhost:3000/atelier/updateDemandeReparationdSortie/${lastReparation.idRep}`,
        { dSortie: new Date() }
      )
    ).data;
    showSaveRef.value = false;
  }

  if (currentRef.value === 3) {
    const demandeReparation = (
      await axios.put(
        ` http://localhost:3000/atelier/updateDemandeReparationdArrive/${lastReparation.idRep}`,
        { dArrive: new Date() }
      )
    ).data;
    showSaveRef.value = false;
  }

  if (currentRef.value === 4) {
    if (
      dDebRepRef.value != null &&
      dFinRepRef.value != null &&
      detailRef.value != null &&
      coutRef.value != null
    ) {
      const demandeReparation = (
        await axios.put(
          ` http://localhost:3000/atelier/updateDemandeReparationdRetour/${lastReparation.idRep}`,
          { dRetour: new Date() }
        )
      ).data;
      showSaveRef.value = false;

      const req = {
        dDebRep: new Date(dDebRepRef.value),
        dFinRep: new Date(dFinRepRef.value),
        detail: detailRef.value,
        cout: coutRef.value,
      };

      (
        await axios.put(
          ` http://localhost:3000/atelier/updateReparation/${lastReparation.idRep}`,
          req
        )
      ).data;
    } else {
      currentRef.value--;
      message.error('il faut remplir tout les champs sur la reparation', {
        duration: 10000,
      });
    }
  }

  if (currentRef.value === 5) {
    const demandeReparation = (
      await axios.put(
        ` http://localhost:3000/atelier/updateDemandeReparationdEntree/${lastReparation.idRep}`,
        { dEntree: new Date() }
      )
    ).data;
  }
  showSaveRef.value = false;
}

async function EndDemandeReparation() {
  (
    await axios.put(
      ` http://localhost:3000/atelier/EndReparationExterne/${lastReparation.idRep}`,
      { codeMat: codeMat }
    )
  ).data;
}

const mettreEnReparation = async () => {
  const req = {
    idRep: Number(idRepRef.value),
    dDebRep: new Date(dDebRepRef.value + 4000000),
  };

  console.log(req.dDebRep);
  if (dDebRepRef.value != null) {
    const reparation = (
      await axios.put(
        ` http://localhost:3000/material/mettreEnReparation/${codeMat}`,
        req
      )
    ).data;
    message.success('materiel ajoutee a la reparation');
    router.push('/atelier');
  } else {
    message.error('il faut remplit toutes les champs necissaires');
  }
};

const mettreEnBonEtat = async () => {
  const req = {
    idRep: Number(idRepRef.value),
    dFinRep: new Date(dFinRepRef.value + 4000000),
    detailProbleme: detailRef.value,
    cout: coutRef.value,
  };
  if (dFinRepRef.value != null && detailRef.value != null) {
    const reparation = (
      await axios.put(
        ` http://localhost:3000/material/mettreBonEtat/${codeMat}`,
        req
      )
    ).data;
    message.success('materiel ajoutee a bon etat');
    router.push('/atelier');
  } else {
    message.error('il faut remplit toutes les champs necissaires');
  }
};

const showHistoryModalAction = () => {
  showHistoryModal.value = true;
};
</script>

<style scoped>
.space {
  width: 100%;
  height: 100%;
}

.div1 {
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 15px;
}

.div2 {
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 15px;
}

.div3 {
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 10px;
}

.div4 {
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 10px;
}

.historyButton {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
