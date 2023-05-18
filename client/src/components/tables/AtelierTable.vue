<script setup>
import STable from "common/STable.vue";
import axios from "axios";
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
  NH1,
} from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { History20Regular as history } from "@vicons/fluent";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, computed, watch } from "vue";
import { SearchOutline as search } from "@vicons/ionicons5";
import { useAuth } from "../../stores/authentication";
import MaterielTag from "common/MaterielTag.vue";
import Modal from "common/addMaterielToPanne.vue";
import HistoryModal from "common/ReparationHistory.vue";
import { h } from "vue";

const router = useRouter();
// const route = useRoute();
// const dialog = useDialog();
// const message = useMessage();

const auth = useAuth();

const employe = ref();
const projet = ref();
const materielEnPanne = ref([]);

const showModal = ref(false);
const showHistoryModal = ref(false);

employe.value = (
  await axios.get(`http://localhost:3000/employes/${auth.user.employeId}`)
).data;
projet.value = (
  await axios.get(
    `http://localhost:3000/projets/projetByMission/${employe.value.codeMission}`
  )
).data;

onMounted(async () => {
  materielEnPanne.value = (
    await axios.get(
      `http://localhost:3000/material/materielEnPanneByProject/${Number(projet.value.idProjet)}`
    )
  ).data;
});

const cols = [
  { title: "code materiel", key: "codeMat" },
  { title: "designation", key: "designation" },
  { title: "matricule", key: "matricule" },
  {
    title: "Status",
    key: "statuMateriel",
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
    },
  },
];

const handleClick = (materielEnPanne) => {
  router.push(`/atelier/${materielEnPanne.codeMat}`);
};

const searchDesignation = ref("");
const searchFilter = () => {
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materielEnPanne.value = (
        await axios.get(
          `http://localhost:3000/material/EnPanneMateriel/designation/${Number(projet.value.idProjet)}/?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materielEnPanne.value = (
        await axios.get(
          `http://localhost:3000/material/materielEnPanneByProject/${Number(projet.value.idProjet)}`
        )
      ).data;
    }
  });
};

const showInsertMaterielModal = () => {
  showModal.value = true;
};

const showHistoryModalAction = () => {
  showHistoryModal.value = true;
};

async function confirmAdd(codeMatricule) {
  const materiel = (
    await axios.post(
      `http://localhost:3000/material/mettreEnPanne/${codeMatricule}`
    )
  ).data;
  materielEnPanne.value.push(materiel.materielEnPanne);
  showModal.value = false;
}

const props = defineProps(["Number(projet.value.idProjet)"]);

</script>

<template>
  <NH1>L'atelier mecanique de la mission</NH1>
  <NSpace justify="space-between">
    <!-- <NButton
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
    </NButton> -->
    <NSpace>
      
    </NSpace>
    <NSpace>
      <n-input
        v-model:value="searchDesignation"
        @update:value="searchFilter"
        placeholder="Rechercher par designation"
        style="width: 255px"
      >
        <template #suffix>
          <n-icon :component="search" />
        </template>
      </n-input>
        <NButton
          @click="showInsertMaterielModal"
          class="button"
          type="success"
          icon-placement="right"
        >
          Ajouter un matériel à l'atelier
          <template #icon>
            <NIcon>
              <Add />
            </NIcon>
          </template>
        </NButton>
      </NSpace>
      <NSpace>
    <STable
      @onRowClicked="handleClick"
      :data="materielEnPanne"
      :columns="cols"
    />
  </NSpace>
  </NSpace>
  <Modal
    :showModal="showModal"
    @cancel="showModal = false"
    @confirm="confirmAdd"
    :idProjet="projet.idProjet"
  />
  <!-- <HistoryModal
    :showHistoryModal="showHistoryModal"
    @cancel="showHistoryModal = false"
  /> -->
</template>

<style scoped>
</style>
