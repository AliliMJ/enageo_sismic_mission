<script setup>
import axios from 'axios';
import STable from './STable.vue';
import {
  NModal,
  NCard,
  NSpace,
  NButton,
  NInput,
  NGrid,
  NGridItem,
  NText,
  NDatePicker,
  NFormItemGi,
} from 'naive-ui';
import { ref } from 'vue';

const props = defineProps({
  showHistoryModal: Boolean,
  codeMat: String,
});

const materielWithReparations = (
  await axios.get(
    `http://localhost:3000/material/getMaterielWithReparations/${props.codeMat}`
  )
).data;

const materielRef = ref({
  codeMat: materielWithReparations.codeMat,
  designation: materielWithReparations.designation,
  matricule: materielWithReparations.matricule,
  idProjet: materielWithReparations.idProjet,
  status: materielWithReparations.status,
  idTypeMat: materielWithReparations.idTypeMat,
  reparations: materielWithReparations.Reparations,
});

const reparations = materielRef.value.reparations;

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = async () => {
  emit('confirm');
};

const onCancel = () => {
  emit('cancel');
};

const idRepRef = ref();
const dPanneRef = ref();
const dDebRepRef = ref();
const dFinRepRef = ref();
const detailRef = ref();
const coutRef = ref();

const cols = [
  { title: 'code reparation', key: 'idRep' },
  {
    title: 'date de la panne',
    key: 'dPanne',
    render(row) {
      return new Date(row.dPanne).toLocaleDateString('fr');
    },
  },
  {
    title: 'date du debut reparation',
    key: 'dDebRep',
    render(row) {
      if (row.dDebRep === null) {
        return 'pas encore';
      } else {
        return new Date(row.dDebRep).toLocaleDateString('fr');
      }
    },
  },
  {
    title: 'date fin reparation',
    key: 'dFinRep',
    render(row) {
      if (row.dFinRep === null) {
        return 'pas encore';
      } else {
        return new Date(row.dFinRep).toLocaleDateString('fr');
      }
    },
  },
];

const handleClick = async (reparationRow) => {
  const reparation = (
    await axios.get(
      `http://localhost:3000/atelier/getReparationsById/${Number(
        reparationRow.idRep
      )}`
    )
  ).data;

  idRepRef.value = String(reparation.idRep);
  dPanneRef.value = new Date(reparation.dPanne).valueOf();

  if (reparation.dDebRep === null) {
    dDebRepRef.value = null;
  } else {
    dDebRepRef.value = new Date(reparation.dDebRep).valueOf();
  }

  if (reparation.dFinRep === null) {
    dFinRepRef.value = null;
  } else {
    dFinRepRef.value = new Date(reparation.dFinRep).valueOf();
  }

  detailRef.value = reparation.detailProbleme;
};

const mettreEnReparation = async () => {
  const req = {
    idRep: Number(idRepRef.value),
    dDebRep: new Date(dDebRepRef.value + 4000000),
  };

  if (dDebRepRef.value != null) {
    const reparation = (
      await axios.put(
        ` http://localhost:3000/material/mettreEnReparation/${props.codeMat}`,
        req
      )
    ).data;
    console.log('success');
  } else {
    console.log('failed');
  }
};
</script>

<template>
  <n-modal
    v-model:show="props.showHistoryModal"
    :mask-closable="false"
    size="huge"
  >
    <n-card
      style="width: 1300px; height: 650px"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace vertical justify="space-between">
        <NGrid x-gap="20" y-gap="20" :cols="10">
          <n-grid-item :span="10" class="pageHeader">
            historique des reparations du materiel
          </n-grid-item>
          <n-grid-item :span="5" class="div2">
            <NGrid :span="20" :x-gap="24">
              <NFormItemGi :span="4" label="id">
                <NInput v-model:value="idRepRef" />
              </NFormItemGi>
              <NFormItemGi :span="8" label="date de la panne">
                <NDatePicker
                  format="dd/MM/yyyy"
                  v-model:value="dPanneRef"
                  type="date"
                />
              </NFormItemGi>
              <NFormItemGi :span="6" label="cout (DA)">
                <NInput v-model:value="coutRef" />
              </NFormItemGi>
              <NFormItemGi :span="8" label="date debut reparation">
                <NDatePicker
                  format="dd/MM/yyyy"
                  v-model:value="dDebRepRef"
                  type="date"
                />
              </NFormItemGi>
              <NFormItemGi :span="8" label="date fin reparation">
                <NDatePicker
                  format="dd/MM/yyyy"
                  v-model:value="dFinRepRef"
                  type="date"
                />
              </NFormItemGi>
              <NFormItemGi :span="16" label="detail">
                <NInput
                  type="textarea"
                  v-model:value="detailRef"
                  resize="none"
                />
              </NFormItemGi>
            </NGrid>
            <NSpace justify="end"> </NSpace>
          </n-grid-item>

          <n-grid-item :span="5" class="div3">
            <NText style="font-size: 15px; font-weight: bold"
              >la liste des reparations du materiel</NText
            >
            <STable
              @onRowClicked="handleClick"
              :data="reparations"
              :columns="cols"
              :border="true"
              style="margin-top: 15px"
            />
          </n-grid-item>
        </NGrid>
      </NSpace>
      <template #footer>
          <n-space justify="end" style="margin-top: 20px">
          <NButton @click="onConfirm" value="success" type="success"
            >Confirmer</NButton
          >
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.div2 {
  background-color: rgb(254, 254, 254);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 15px;
}

.div3 {
  background-color: rgb(254, 254, 254);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 10px;
}
</style>
