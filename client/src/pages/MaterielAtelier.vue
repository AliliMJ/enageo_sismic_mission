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
    <n-grid-item :span="10" class="div4">
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
      <NSpace justify="space-between">
        <NSpace>
          <NButton
            class="button"
            type="info"
            @click="mettreEnReparationExterne"
            v-if="materiel.status === 1"
          >
            creer une demande de reparation externe
          </NButton>
        </NSpace>
        <NSpace>
          <NButton
            class="button"
            type="warning"
            @click="mettreEnReparation"
            v-if="materiel.status === 0"
          >
            mettre en reparation
          </NButton>
          <NButton
            class="button"
            type="success"
            @click="mettreEnBonEtat"
            v-if="materiel.status === 1"
          >
            mettre en Bon etat
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
  useDialog,
} from 'naive-ui';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const message = useMessage();
const dialog = useDialog();

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
    `http://localhost:3000/atelier/lastReparationInterne/${codeMat}`
  )
).data;

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
coutRef.value = lastReparation.cout;

const mettreEnReparation = async () => {
  const req = {
    idRep: Number(idRepRef.value),
    dDebRep: new Date(dDebRepRef.value + 4000000),
  };

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

async function mettreEnReparationExterne() {
  if (detailRef.value === null && coutRef.value === 0) {
    dialog.warning({
      title: 'Confirmation',
      content:
        'êtes-vous sûr de créer une réparation externe avec une description vide et coût null?',
      positiveText: 'Confirmer',
      negativeText: 'Annuler',
      onPositiveClick: async () => {
        const req = {
          idRep: Number(idRepRef.value),
          detailProbleme: detailRef.value,
          dPanne: new Date(dPanneRef.value),
          vide: 1,
        };
        const reparationExterne = (
          await axios.put(
            ` http://localhost:3000/material/mettreEnReparationExterne/${codeMat}`,
            req
          )
        ).data;
        router.push('/atelier');
        message.success('la réparation externe est bien créé');
      },
      onNegativeClick: () => {
        message.error('création annulée');
      },
    });
  } else {
    const req = {
      idRep: Number(idRepRef.value),
      detailProbleme: detailRef.value,
      dPanne: new Date(dPanneRef.value),
      vide: 0,
    };
    const reparationExterne = (
      await axios.put(
        ` http://localhost:3000/material/mettreEnReparationExterne/${codeMat}`,
        req
      )
    ).data;
    router.push('/atelier');
    message.success('la réparation externe est bien créé');
  }
}

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
  background-color: rgb(255, 255, 255);
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
