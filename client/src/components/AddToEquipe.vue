<script setup>
import axios from 'axios';
import {
  NModal,
  NSelect,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NButton,
  NSpace,
  useDialog,
} from 'naive-ui';
import { useAuth } from '../stores/authentication';

const auth = useAuth();
const dialog = useDialog();
const props = defineProps({
  equipe: Object,
});

const emit = defineEmits(['confirm']);

function confirm() {
  if (selectedEmploye.value.idEquipe != null) {
    dialog.warning({
      content:
        "Cet employé est déja dans une équipe. Voulez vous lui changer l'équipe?",
      title: "Confirmer l'affectation",

      positiveText: 'Affecter',
      negativeText: 'Annuler',
      onPositiveClick: () => {
        showModal.value = false;
        return emit('confirm', selectedEmploye.value);
      },
    });
  } else {
    emit('confirm', selectedEmploye.value);
    showModal.value = false;
  }
}

function close() {
  showModal = true;
}

const selectedEmploye = ref({ nom: null });

const options = ref([]);

const loading = ref(false);
async function handleSearch(query) {
  if (query.length > 0) {
    loading.value = true;
    const employes = (
      await axios.get(
        'http://localhost:3000/employes/employeByMission/' +
          auth.employe.codeMission +
          '?like=' +
          query
      )
    ).data;

    options.value = employes.map((e) => ({
      label: `${e.id} ${e.nom} ${e.prenom}`,
      value: e.id,
      employe: e,
    }));
    loading.value = false;
  } else {
    options.value = [];
  }
}
const showModal = ref(false);
function handleSelect(value, option) {
  console.log('value');
  selectedEmploye.value = option.employe;
}
</script>

<template>
  <n-button type="success" @click="showModal = true"
    >Ajouter un employé à l'équipe</n-button
  >
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    size="large"
    style="max-width: 70%"
  >
    <n-card :title="`Affecter un employé à l'équipe ${equipe.activite.nomAct}`">
      <n-select
        v-model:value="selectedEmploye.nom"
        @search="handleSearch"
        :options="options"
        :loading="loading"
        filterable
        clearable
        remote
        @update:value="handleSelect"
      >
      </n-select>
      <template #footer>
        <n-space>
          <n-button
            type="success"
            @click="confirm"
            :disabled="selectedEmploye.nom == null"
            >Affecter</n-button
          >
          <n-button @click="close">Annuler</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
