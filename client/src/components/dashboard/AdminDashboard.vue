<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "vue-chartjs";
import axios from "axios";
import { NSpace, NGrid, NFormItemGi, NForm, NCard , NIcon, NText } from "naive-ui";
import {
  TrashOutline as trash,
  FolderOpenOutline as folder,
  BriefcaseOutline as bag,
  PersonOutline as person
} from "@vicons/ionicons5";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const stat = (await axios.get(`http://localhost:3000/comptes/stats`)).data;

console.log(stat.datesCreation.annees);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      fontSize: 100,
      text: "nombres des comptes par le role",
      titleAlign: "left",
    },
  },
};

const data = {
  labels: [
    "Administrateur",
    "chef mission",
    "chef terrain",
    "gestionnaire",
    "directeur",
  ],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#FFFF00"],
      data: [
        Number(stat.nbAdmins),
        Number(stat.nbCMission),
        Number(stat.NbCTerrain),
        Number(stat.NbGestionnare),
        Number(stat.nbDirecteur),
      ],
    },
  ],
};
</script>

<template>
  <NSpace class="space">
  <NGrid x-gap="45" :cols="4">
    <NFormItemGi :span="1">
      <NCard
        header-style="display:flex;flex-direction:row-reverse;font-size:20px;padding:15px"
        title="les comptes"
        class="card"
        content-style="font-size:30px;position:absolute;top:4px;left:180px;"
      >
        <template #header-extra>
          <n-icon class="cardIcon1">
            <person />
          </n-icon>
        </template>
        {{ stat.nbUsers }}
        </NCard>
    </NFormItemGi>
    <NFormItemGi :span="1">
      <NCard
        header-style="display:flex;flex-direction:row-reverse;font-size:20px;padding:15px"
        title="les employes"
        class="card"
        content-style="font-size:30px;position:absolute;top:4px;left:180px;"
      >
        <template #header-extra>
          <n-icon class="cardIcon2">
            <bag />
          </n-icon>
        </template>
        {{ stat.nbEmployes }}
        </NCard>
    </NFormItemGi>
    <NFormItemGi :span="1">
      <n-card  class="card"> Card Content 2 </n-card>
    </NFormItemGi>
    <NFormItemGi :span="1">
      <n-card  class="card"> Card Content 2 </n-card>
    </NFormItemGi>
    <NFormItemGi :span="2" class="pie">
      <Pie :data="data" :options="options" />
    </NFormItemGi>
    <NFormItemGi :span="2" class="pie">
      <Pie :data="data" :options="options" />
    </NFormItemGi>
  </NGrid>
</NSpace>
</template>

<style scooped>
.pie {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
}

.card {
  width: 280px;
  height: 65px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
}

.cardIcon1 {
  margin-right: 10px;
  font-size: 20px;
  color:white;
  background-color: #d03050;
  padding: 7px;
  border-radius: 20px;
}

.cardIcon2 {
  margin-right: 10px;
  font-size: 20px;
  color:white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 20px;
}
.space {
  padding: 0px 4px;
}

</style>
