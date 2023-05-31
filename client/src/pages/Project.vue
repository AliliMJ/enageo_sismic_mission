<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import RapportTable from '../components/Rapports.vue';
import {
  NButton,
  NSpace,
  NStep,
  NSteps,
  NH1,
  NButtonGroup,
  NIcon,
  NCard,
  useMessage,
} from 'naive-ui';
import StatProjet from '../components/StatProjet.vue';
import { computed, ref } from 'vue';
import { etatProjet, Role } from '../utils/enums';
import { ArrowForward, Close, SaveOutline as Save } from '@vicons/ionicons5';
import { useAuth } from '../stores/authentication';
const message = useMessage();
const auth = useAuth();
const router = useRouter();
const route = useRoute();
const idProjet = route.params.idProjet;

const project = ref({});
const etats = ref([]);
const current = ref(0);
const rapports = ref([]);
onMounted(async () => {
  const projetData = (
    await axios.get(`http://localhost:3000/projets/${idProjet}`)
  ).data;

  project.value = projetData;
  etats.value = projetData.Etats;
  current.value = etats.value.length > 2 ? 4 : etats.value.length;
  rapports.value = projetData.Rapports;
});

const createdStates = ref([]);
const showSave = ref(false);

function redirectReportCreation() {
  router.push('/projet/' + idProjet + '/creerRapport');
}

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
  try {
    await axios.put(`http://localhost:3000/projets/${idProjet}`, {
      createdStates: createdStates.value,
      annule: project.value.annule,
    });
    createdStates.value = [];
    showSave.value = false;
  } catch (e) {
    message.error(e?.response?.data?.err);
  }
}
const status = computed(() => {
  if (project.value?.annule) return 'error';
  else return 'process';
});
</script>

<template>
  <NSpace vertical>
    <n-h1>Statistiques</n-h1>
    <StatProjet />
    <div>
      <n-h1>Etat du projet</n-h1>
      <n-card title="Les phases du projet">
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
          <n-button-group v-if="auth.user?.role === Role.ChefMision">
            <n-button
              round
              @click="cancel"
              v-if="current < 3 && !project.annule"
            >
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
      </n-card>
    </div>
    <n-h1>Rapports journaliers</n-h1>
    <n-card>
      <RapportTable :rapports="rapports" :idProject="idProjet" />

      <template #footer>
        <n-button
          @click="redirectReportCreation"
          type="success"
          v-if="auth.user?.role === Role.ChefTerrain"
          >Créer un rapport</n-button
        >
      </template>
    </n-card>
  </NSpace>
</template>

<style scoped>
.status {
  padding-left: 1px;
}
</style>
