<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false">
    <n-card
      style="width: 700px; height: 600px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      header-style="padding:15px 30px"
      content-style="padding:15px 30px"
    >
      <n-scrollbar style="max-height: 460px">
        <NForm>
          <NGrid :span="24" :x-gap="24">
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
            <NFormItemGi :span="12" label="Date de rejoint">
              <NDatePicker
                format="dd/MM/yyyy"
                v-model:value="employeRef.dateRejoint"
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
            <NFormItemGi :span="12" label="l'adresse mail">
              <NInput v-model:value="employeRef.email" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="numéro du téléphone">
              <NInput v-model:value="employeRef.numTel" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="l'adresse">
              <NInput v-model:value="employeRef.adresse" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Sexe">
              <NSelect
                v-model:value="employeRef.sexe"
                :options="sexeOptions"
                placeholder="sexe"
              />
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
            <NFormItemGi :span="12" label="fonction de l'employe">
              <NSelect
                :options="fonctionOptions"
                v-model:value="employeRef.fonction"
              />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Mission">
              <NSelect
                :options="missionOptions"
                v-model:value="employeRef.codeMission"
              />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <NButton @click="onConfirm" type="success">Confirmer</NButton>
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import {
  NModal,
  NCard,
  NScrollbar,
  NButton,
  NSpace,
  NInput,
  NText,
  NIcon,
  NDivider,
  NDataTable,
  useMessage,
  NFormItemGi,
  NSelect,
  NForm,
  NGrid,
  NDatePicker,
} from 'naive-ui';
import { SearchCircleOutline as search } from '@vicons/ionicons5';

import { ref, h, watch } from 'vue';
import MaterielTag from './MaterielTag.vue';
import axios from 'axios';

const message = useMessage();

const wilaya = (await axios.get('http://localhost:3000/wilaya')).data;
const fonction = (await axios.get('http://localhost:3000/fonction')).data;
const missions = (await axios.get('http://localhost:3000/missions')).data;

const employeRef = ref({
  id: 0,
  nom: '',
  prenom: '',
  dateRejoint: new Date().valueOf(),
  dateNaiss: new Date().valueOf(),
  lieuNaiss: 43,
  email: '',
  numTel: '',
  adresse: '',
  sexe: '',
  numIdentite: '',
  etat: 'conge',
  fonction: 0,
  equipe: '',
  groupeSanguin: '',
  codeMission: '',
  regimTravail: '',
});

const emit = defineEmits(['confirm', 'cancel']);
const onConfirm = async () => {
  const req = {
    nom: employeRef.value.nom,
    prenom: employeRef.value.prenom,
    dateRejoint: new Date(employeRef.value.dateRejoint + 4000000),
    dateNaissance: new Date(employeRef.value.dateNaiss + 4000000),
    lieuNaissance: Number(employeRef.value.lieuNaiss),
    email: employeRef.value.email,
    numTel: employeRef.value.numTel,
    adresse: employeRef.value.adresse,
    sexe: employeRef.value.sexe,
    numIdentite: employeRef.value.numIdentite,
    groupeSanguin: employeRef.value.groupeSanguin,
    regimTravail: employeRef.value.regimTravail,
    etat: employeRef.value.etat,
    fonctionId: employeRef.value.fonction,
    codeMission: employeRef.value.codeMission,
  };

  let employe = await axios.post(`http://localhost:3000/employes/`, req).data;
  message.success('Employé ajouté');
  employe.dateRejoint = new Date(employe.dateRejoint);
  employe.dateNaissance = new Date(employe.dateNaissance);
  emit('confirm',employe);
};

const onCancel = () => {
  emit('cancel');
};
const props = defineProps({
  title: String,
  showModal: Boolean,
});

const missionOptions = missions.map((m) => ({
  label: m.codeMission,
  value: m.codeMission,
}));

const groupeSanguinOptions = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const sexeOptions = [
  { label: 'Femme', value: 'Femme' },
  { label: 'Homme', value: 'Homme' },
];

const lieuOptions = [];
wilaya.forEach((element) => {
  lieuOptions.push({
    label: element.numWilaya + '- ' + element.nom,
    value: element.numWilaya,
  });
});

const fonctionOptions = [];
fonction.forEach((element) => {
  fonctionOptions.push({
    label: element.idFonction + ' ' + element.nom,
    value: element.idFonction,
  });
});
</script>

<style scoped>
.header {
  font-weight: bold;
  margin-right: 5px;
}
</style>
