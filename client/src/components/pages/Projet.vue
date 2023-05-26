<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import RapportTable from '../tables/RapportTable.vue';
import {
  NButton,
  NSpace,
  NStep,
  NSteps,
  NH1,
  NButtonGroup,
  NIcon,
} from 'naive-ui';
import { computed, ref } from 'vue';
import { etatProjet } from '../../enums';
import { ArrowForward, Close, SaveOutline as Save } from '@vicons/ionicons5';

const router = useRouter();
const route = useRoute();
const idProjet = route.params.idProjet;

const projetData = (
  await axios.get(`http://localhost:3000/projets/${idProjet}`)
).data;

const project = ref(projetData);

const etats = ref(project.value.Etats);
const createdStates = ref([]);
const showSave = ref(false);

function redirectReportCreation() {
  router.push('/projet/' + idProjet + '/creerRapport');
}

const current = ref(etats.value.length > 2 ? 4 : etats.value.length);
const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };

function next() {
  if (current.value === null) current.value = 1;
  else if (current.value > 1) {
    current.value = 4;
    etats.value.push({
      dPassageEtat: new Date(),
      etat: etatProjet[2],
    });
    createdStates.value.push({
      dPassageEtat: new Date(),
      etat: etatProjet[2],
    });
    showSave.value = true;
  } else {
    current.value++;
    etats.value.push({
      dPassageEtat: new Date(),
      etat: etatProjet[current.value - 1],
    });
    createdStates.value.push({
      dPassageEtat: new Date(),
      etat: etatProjet[current.value - 1],
    });
    showSave.value = true;
  }
}
function cancel() {
  if (!project.value.annule) {
    project.value.annule = true;
    showSave.value = true;
  }
}
async function save() {
  axios.put(`http://localhost:3000/projets/${idProjet}`, {
    createdStates: createdStates.value,
    annule: project.value.annule,
  });
  createdStates.value = [];
  showSave.value = false;
}
const status = computed(() => {
  if (project.value.annule) return 'error';
  else return 'process';
});
</script>

<template>
  <NSpace vertical>
    <div>
      <n-h1>Etat du projet</n-h1>
      <n-space vertical class="status">
        <n-steps :current="current" :status="status">
          <n-step title="Planification">
            <div class="n-step-description" v-if="etats[0]">
              {{
                new Date(etats[0].dPassageEtat).toLocaleDateString(
                  'fr-FR',
                  dateOptions
                )
              }}
            </div>
          </n-step>
          <n-step title="Production">
            <div class="n-step-description" v-if="etats[1]">
              {{
                new Date(etats[1].dPassageEtat).toLocaleDateString(
                  'fr-FR',
                  dateOptions
                )
              }}
            </div>
          </n-step>
          <n-step title="Terminé">
            <div class="n-step-description" v-if="etats[2]">
              {{
                new Date(etats[2].dPassageEtat).toLocaleDateString(
                  'fr-FR',
                  dateOptions
                )
              }}
            </div>
          </n-step>
        </n-steps>
        <n-button-group>
          <n-button round @click="cancel" v-if="current < 3 && !project.annule">
            Annuler le projet
            <template #icon>
              <NIcon>
                <Close />
              </NIcon>
            </template>
          </n-button>
          <n-button
            round
            @click="next"
            v-if="current < 4 && !project.annule"
            icon-placement="right"
          >
            État suivant
            <template #icon>
              <NIcon>
                <ArrowForward />
              </NIcon>
            </template>
          </n-button>
        </n-button-group>

        <NButton type="success" @click="save" v-if="showSave"
          >Sauvegarder

          <template #icon>
            <NIcon>
              <Save />
            </NIcon>
          </template>
        </NButton>
      </n-space>
    </div>

    <RapportTable :rapports="project.Rapports" />
    <n-button @click="redirectReportCreation" type="success"
      >Créer un rapport</n-button
    >
  </NSpace>
</template>

<style scoped>
.status {
  padding-left: 1px;
}
</style>
