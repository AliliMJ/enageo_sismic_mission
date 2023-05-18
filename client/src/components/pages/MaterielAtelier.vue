<template>
  <NSpace class="pageHeader">
    details sur la reparation n {{ idRepRef }}
  </NSpace>
  <NSpace justify="space-between" class="historyButton">
    <NSpace> </NSpace>
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
  <NGrid
    x-gap="20"
    y-gap="20"
    :cols="10"
    style="padding-left: 5px; padding-right: 200px; width: 1200px"
  >
    <n-grid-item :span="10" class="div1">
      <NGrid :span="10" :x-gap="15">
        <NGridItem :span="30" style="margin-bottom: 15px">
          <NText style="font-weight: bold; font-size: 18px"
            >les informations sur le materiel :</NText
          >
        </NGridItem>
        <NGridItem :span="3">
          <NText style="font-weight: bold; font-size: 18px">id : </NText>
          <NText style="font-size: 18px"> {{ codeMat }} </NText>
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
      <NSpace justify="end">
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
import STable from 'common/STable.vue';
import { History20Regular as history } from '@vicons/fluent';
import HistoryModal from 'common/ReparationHistory.vue';
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
  NGridItem,
  NInput,
  NSelect,
  NDatePicker,
  useDialog,
  useMessage,
  NText,
} from 'naive-ui';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { h } from 'vue';
import MaterielTag from 'common/MaterielTag.vue';

const router = useRouter();
const route = useRoute();
const dialog = useDialog();
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
const matriculeRef = ref();
const statusRef = ref();
const typeMaterielRef = ref();

const lastReparation = (
  await axios.get(`http://localhost:3000/atelier/lastReparation/${codeMat}`)
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
