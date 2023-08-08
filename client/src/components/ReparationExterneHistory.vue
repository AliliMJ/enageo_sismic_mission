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
  NSteps,
  NStep,
} from 'naive-ui';
import { ref, watch } from 'vue';

const props = defineProps({
  showExterneModal: Boolean,
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
  cout: materielWithReparations.cout,
  idTypeMat: materielWithReparations.idTypeMat,
  reparationsInterne: materielWithReparations.ReparationsInterne,
  reparationsExterne: materielWithReparations.ReparationsExterne,
});

const reparationsExterne = materielRef.value.reparationsExterne;

const emit = defineEmits(['confirm', 'cancel']);

const currentRef = ref(1);
const currentStatus = ref('process');

const idRepRef = ref();
const dPanneRef = ref();
const dDebRepRef = ref();
const dFinRepRef = ref();
const detailRef = ref();
const coutRef = ref();

const dSortieRef = ref(null);
const dArriveRef = ref();
const dRetourRef = ref();
const dEntreeRef = ref();

const cols = [
  { title: 'code', key: 'idRep' },
  {
    title: 'date de la panne',
    key: 'dPanne',
    render(row) {
      return new Date(row.dPanne).toLocaleDateString('fr');
    },
  },
  {
    title: 'Début réparation',
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
    title: 'Fin réparation',
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
  currentRef.value = 1;
  currentStatus.value = 'process';

  idRepRef.value = String(reparationRow.idRep);
  dPanneRef.value = new Date(reparationRow.dPanne).valueOf();

  if (reparationRow.dDebRep === null) {
    dDebRepRef.value = null;
  } else {
    dDebRepRef.value = new Date(reparationRow.dDebRep).valueOf();
  }

  if (reparationRow.dFinRep === null) {
    dFinRepRef.value = null;
  } else {
    dFinRepRef.value = new Date(reparationRow.dFinRep).valueOf();
  }

  coutRef.value = String(reparationRow.cout);
  detailRef.value = reparationRow.detailProbleme;

  if (reparationRow.dSortie != null) {
    currentRef.value++;
    dSortieRef.value = reparationRow.dSortie;
  }
  if (reparationRow.dArrive != null) {
    currentRef.value++;
    dArriveRef.value = reparationRow.dArrive;
  }
  if (reparationRow.dRetour != null) {
    currentRef.value++;
    dRetourRef.value = reparationRow.dRetour;
  }
  if (reparationRow.dEntree != null) {
    currentRef.value++;
    currentStatus.value = 'finish';
    dEntreeRef.value = reparationRow.dEntree;
  }
};

const onCancel = () => {
  emit('cancel');
};
</script>

<template>
  <n-modal
    v-model:show="props.showExterneModal"
    :mask-closable="false"
    size="huge"
  >
    <n-card
      style="width: 1150px; height: 620px"
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
              :data="reparationsExterne"
              :columns="cols"
              :border="true"
              style="margin-top: 15px"
            />
          </n-grid-item>
        </NGrid>
        <n-steps
          :current="currentRef"
          :status="currentStatus"
          style="margin-top: 20px"
        >
          <n-step title="à l'atelier mécanique">
            <div class="n-step-description">
              <div v-if="dPanneRef != null">
                {{ new Date(dPanneRef).toLocaleDateString('fr-FR') }}
              </div>
              Le véhicule se situe au niveau de l'atelier mécanique
            </div>
          </n-step>

          <n-step title="sur route">
            <div class="n-step-description">
              <div v-if="dSortieRef != null">
                {{ new Date(dSortieRef).toLocaleDateString('fr-FR') }}
              </div>
              sur la route vers la direction générale
            </div>
          </n-step>

          <n-step title="arrivé à la direction">
            <div class="n-step-description">
              <div v-if="dArriveRef != null">
                {{ new Date(dArriveRef).toLocaleDateString('fr-FR') }}
              </div>
              à l'atelier de la direction générale
            </div>
          </n-step>

          <n-step title="sur route">
            <div class="n-step-description">
              <div v-if="dRetourRef != null">
                {{ new Date(dRetourRef).toLocaleDateString('fr-FR') }}
              </div>
              la véhicule est sur route vers la mission
            </div>
          </n-step>

          <n-step title="arrivée">
            <div class="n-step-description">
              <div v-if="dEntreeRef != null">
                {{ new Date(dEntreeRef).toLocaleDateString('fr-FR') }}
              </div>
              la véhicule est arrivée à la mission
            </div>
          </n-step>
        </n-steps>
      </NSpace>
      <template #footer>
        <NSpace justify="end">
          <NButton type="warning" @click="onCancel">Fermer</NButton>
        </NSpace>
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
  height: 18vw;
}

.div3 {
  background-color: rgb(254, 254, 254);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 10px;
}
</style>
