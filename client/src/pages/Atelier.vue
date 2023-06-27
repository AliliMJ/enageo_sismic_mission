<script setup>
import STable from "../components/STable.vue";
import axios from "axios";
import { NSpace, NButton, NIcon, NInput, NH1, useMessage } from "naive-ui";
import { Add } from "@vicons/ionicons5";

import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { SearchOutline as search } from "@vicons/ionicons5";
import { useAuth } from "../stores/authentication";
import MaterielTag from "../components/MaterielTag.vue";
import Modal from "../components/AddMaterielToPanne.vue";

import { h } from "vue";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line, Bar } from "vue-chartjs";
const router = useRouter();
// const route = useRoute();
// const dialog = useDialog();
// const message = useMessage();

const auth = useAuth();
const message = useMessage();

const materielEnPanne = ref([]);

const showModal = ref(false);

materielEnPanne.value = (
  await axios.get(
    `http://localhost:3000/material/materielEnPanneByMission/${String(
      auth.employe.codeMission
    )}`
  )
).data;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const stat = (
  await axios.get(
    `http://localhost:3000/statistiques/atelierstatistiques/${String(
      auth.employe.codeMission
    )}`
  )
).data;

/* start pannes interne per month */

const pannesDates = ref([]);
stat.nbReparationInterneByMarque.forEach((element) => {
  pannesDates.value.push(element.marque);
});

const pannesData = ref([]);
stat.nbReparationInterneByMarque.forEach((element) => {
  pannesData.value.push(element.nbr);
});

const pannesDates1 = ref([]);
stat.nbReparationExterneByMarque.forEach((element) => {
  pannesDates1.value.push(element.marque);
});

const pannesData1 = ref([]);
stat.nbReparationExterneByMarque.forEach((element) => {
  pannesData1.value.push(element.nbr);
});

/* end pannes interne per month */

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const barData = {
  labels: pannesDates.value,
  datasets: [
    {
      label: "nombre des pannes par les marque des vehicules",
      backgroundColor: ["rgb(255, 0, 0 , 0.3)"],
      borderColor: ["rgb(255, 0, 0)"],
      borderWidth: 1,
      data: pannesData.value,
    },
  ],
};

const barData1 = {
  labels: pannesDates1.value,
  datasets: [
    {
      label: "nombre des pannes par les marque des vehicules",
      backgroundColor: ["rgb(0, 255, 0 , 0.3)"],
      borderColor: ["rgb(0, 255, 0)"],
      borderWidth: 1,
      data: pannesData1.value,
    },
  ],
};

/* start line chart */

// const pannesDates1 = ref([]);
// stat.nbReparationInterneByMonth.forEach((element) => {
//   pannesDates1.value.push(element.dates);
// });
// const pannesData1 = ref([]);
// stat.nbReparationInterneByMonth.forEach((element) => {
//   pannesData1.value.push(element.nbr);
// });

const pannesInterneDates = ref([]);
stat.nbReparationInterneByMonth.forEach((element) => {
  pannesInterneDates.value.push(element.dates);
});
const pannesInterneData = ref([]);
stat.nbReparationInterneByMonth.forEach((element) => {
  pannesInterneData.value.push(element.nbr);
});

/* start pannes Externe per month */

const pannesExterneDates = ref([]);
stat.nbPannesExterneByMonth.forEach((element) => {
  pannesExterneDates.value.push(element.dates);
});
const pannesExterneData = ref([]);
stat.nbPannesExterneByMonth.forEach((element) => {
  pannesExterneData.value.push(element.nbr);
});
/* end pannes Externe per month */

// let dates = pannesDates1.value.concat(pannesExterneDates.value);
// dates = [...new Set(dates)];
// dates = dates.sort();
// console.log(dates);

// let nombres = [];

// for(let i=0; i<dates.length;i++){
//   let nb=0;

//   for(let j=0 ; j<pannesDates1.value.length;j++){
//     if(pannesDates1.value[j]==dates[i])
//     nb++
//   }

//   for(let k=0 ; k<pannesExterneDates.value.length;k++){
//     if(pannesExterneDates.value[k]==dates[i])
//     nb++
//   }

//   nombres.push(nb);
// }

// console.log(nombres);

const lineData1 = {
  labels: pannesInterneDates.value,
  datasets: [
    {
      label: "nombres des réparation interne  par mois",
      backgroundColor: "rgb(255,0,0)",
      borderColor: "rgb(255,0,0)",
      data: pannesInterneData.value,
      // cubicInterpolationMode: 'monotone',
      fill: false,
      tension: 0.4,
    },
  ],
};

const lineData2 = {
  labels: pannesExterneDates.value,
  datasets: [
    {
      label: "nombres des réparation externe  par mois",
      backgroundColor: "rgb(0,255,0)",
      borderColor: "rgb(0,255,0)",
      data: pannesExterneData.value,
      // cubicInterpolationMode: 'monotone',
      fill: false,
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

/* end line chart */

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
  if (materielEnPanne.status === 0 || materielEnPanne.status === 1) {
    router.push(`/atelier/${materielEnPanne.codeMat}`);
  } else if (materielEnPanne.status === 3) {
    router.push(`/suiviMateriel/${materielEnPanne.codeMat}`);
  }
};

const searchDesignation = ref("");
const searchFilter = () => {
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materielEnPanne.value = (
        await axios.get(
          `http://localhost:3000/material/EnPanneMateriel/designation/${String(
            auth.employe.codeMission
          )}/?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materielEnPanne.value = (
        await axios.get(
          `http://localhost:3000/material/materielEnPanneByMission/${String(
            auth.employe.codeMission
          )}`
        )
      ).data;
    }
  });
};

const showInsertMaterielModal = () => {
  showModal.value = true;
};

async function confirmAddInterne(codeMatricule) {
  const materiel = (
    await axios.post(
      `http://localhost:3000/material/mettreEnPanne/${codeMatricule}`
    )
  ).data;
  materielEnPanne.value.push(materiel.materielEnPanne);
  showModal.value = false;
  message.success("matriel bien ajoutee a l'atelier");
}

async function confirmAddExterne(codeMatricule) {
  const materiel = (
    await axios.post(
      `http://localhost:3000/material/mettreEnPanneExterne/${codeMatricule}`
    )
  ).data;
  materielEnPanne.value.push(materiel.materielEnPanne);
  showModal.value = false;
  message.success("matriel bien ajoutee a l'atelier");
}

const props = defineProps(["Number(projet.value.idProjet)"]);
</script>

<template>
  <NH1>les réparation de la mission</NH1>
  <NSpace justify="space-between">
    <NSpace> </NSpace>
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
        Ajouter une réparation
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

  <NSpace style="margin-top: 15px; margin-left: 5px;">
    <NSpace vertical class="line-space">
      <Line :data="lineData1" :options="lineOptions" />
    </NSpace>
    <NSpace vertical class="line-space">
      <Line :data="lineData2" :options="lineOptions" />
    </NSpace>
  </NSpace>

  <NSpace style="margin-top: 5px;margin-bottom:20px">
    <NSpace vertical class="bar-space">
      <Bar :data="barData" :options="barOptions" style="height: 180px" />
    </NSpace>
    <NSpace vertical class="bar-space">
      <Bar :data="barData1" :options="barOptions" style="height: 180px" />
    </NSpace>
  </NSpace>

  <Modal
    v-if="showModal"
    :showModal="showModal"
    @cancel="showModal = false"
    @confirmAddInterne="confirmAddInterne"
    @confirmAddExterne="confirmAddExterne"
    :codeMission="auth.employe.codeMission"
  />
</template>

<style scoped>
.bar-space {
  width: 38vw;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
  margin-top: 10px;
  margin-left: 6px;
}

.line-space {
  width: 38vw;
  height: 180px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
}
</style>
