<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "vue-chartjs";
import axios from "axios";
import { NSpace, NGrid, NGridItem, NForm, NCard, NIcon, NText } from "naive-ui";
import {
  PersonOutline as person,
  StatsChart as chart,
  BriefcaseOutline as bag,
  MailOutline as mail
} from "@vicons/ionicons5";
import {
  ArrowTrendingLines24Regular as arrowTop,
  ArrowTrending20Regular as arrowTopSimple,
} from "@vicons/fluent";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const stat = (await axios.get(`http://localhost:3000/comptes/stats`)).data;

const usersByYear = (await axios.get(`http://localhost:3000/comptes/dates`))
  .data;

const employesByYear = (await axios.get(`http://localhost:3000/employes/stats`))
  .data;

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const pieData = {
  labels: [
    "Administrateur",
    "chef mission",
    "chef terrain",
    "gestionnaire",
    "directeur",
  ],
  datasets: [
    {
      backgroundColor: [" #F47A1F", "#FDBB2F", "#377B2B", "#7AC142", "#007CC3"],
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

const usersDates = [];
usersByYear.forEach((element) => {
  usersDates.push(element.year);
});
const usersDatesData = [];
usersByYear.forEach((element) => {
  usersDatesData.push(element.nbr);
});

const employesDates = [];
employesByYear.forEach((element) => {
  employesDates.push(element.year);
});
const employesDatesData = [];
employesByYear.forEach((element) => {
  employesDatesData.push(element.nbr);
});

const bar1Options = {
  responsive: true,
  maintainAspectRatio: false,
};

const bar1Data = {
  labels: usersDates,
  datasets: [
    {
      label: "nombre des comptes créé par année",
      backgroundColor: ["rgb(54, 162, 235 , 0.2)"],
      borderColor: ["rgb(54, 162, 235)"],
      borderWidth: 1,
      data: usersDatesData,
    },
  ],
};

const bar2Options = {
  responsive: true,
  maintainAspectRatio: false,
};

const bar2Data = {
  labels: employesDates,
  datasets: [
    {
      label: "nombre des employes rejoint par annee",
      backgroundColor: ["rgba(255, 205, 86, 0.2)"],
      borderColor: ["rgb(255, 205, 86)"],
      borderWidth: 1,
      data: employesDatesData,
    },
  ],
};
</script>

<template>
  <NSpace class="space">
    <NGrid x-gap="20" y-gap="20" :cols="4">
      <n-grid-item :span="4" class="pageHeader">
        Tableau de board de l'administrateur
      </n-grid-item>
      <n-grid-item :span="1">
        <NSpace class="testCard1" vertical>
          <NSpace justify="space-between">
            <NSpace class="header">
              <n-icon class="headerIcon1">
                <person />
              </n-icon>
              Nombre des comptes
            </NSpace>
            <NSpace>
              {{ stat.nbUsers }}
            </NSpace>
          </NSpace>
          <NSpace justify="end">
            <n-icon>
              <chart style="color: orange" />
            </n-icon>
          </NSpace>
        </NSpace>
      </n-grid-item>

      <n-grid-item :span="1">
        <NSpace class="testCard1" vertical>
          <NSpace justify="space-between">
            <NSpace class="header">
              <n-icon class="headerIcon2">
                <bag />
              </n-icon>
              nombre des employés
            </NSpace>
            <NSpace>
              {{ stat.nbEmployes }}
            </NSpace>
          </NSpace>
          <NSpace justify="end">
            <n-icon>
              <chart style="color: orange" />
            </n-icon>
          </NSpace>
        </NSpace>
      </n-grid-item>

      <n-grid-item :span="1">
        <NSpace class="testCard1" vertical>
          <NSpace justify="space-between">
            <NSpace class="header">
              <n-icon class="headerIcon3">
                <person />
              </n-icon>
              Nombre des compte ({{ usersDates[usersDates.length - 1] }})
            </NSpace>
            <NSpace>
              {{ usersDatesData[usersDatesData.length - 1] }}
            </NSpace>
          </NSpace>
          <NSpace justify="end">
            <n-icon
              v-if="
                usersDatesData[usersDatesData.length - 1] >
                usersDatesData[usersDatesData.length - 2]
              "
            >
              <arrowTop style="color: green" />
            </n-icon>
            <n-icon
              v-if="
                usersDatesData[usersDatesData.length - 1] <
                usersDatesData[usersDatesData.length - 2]
              "
            >
              <arrowTopSimple style="color: red; transform: scaleY(-1)" />
            </n-icon>
          </NSpace>
        </NSpace>
      </n-grid-item>

      <n-grid-item :span="1">
        <NSpace class="testCard1" vertical>
          <NSpace justify="space-between">
            <NSpace class="header">
              <n-icon class="headerIcon4">
                <bag />
              </n-icon>
              nombre d'employés ({{ employesDates[employesDates.length - 1] }})
            </NSpace>
            <NSpace>
              {{ employesDatesData[employesDatesData.length - 1] }}
            </NSpace>
          </NSpace>
          <NSpace justify="end">
            <n-icon
              v-if="
                employesDatesData[employesDatesData.length - 1] >
                employesDatesData[employesDatesData.length - 2]
              "
            >
              <arrowTop style="color: green" />
            </n-icon>
            <n-icon
              v-if="
                employesDatesData[employesDatesData.length - 1] <
                employesDatesData[employesDatesData.length - 2]
              "
            >
              <arrowTopSimple style="color: red; transform: scaleY(-1)" />
            </n-icon>
          </NSpace>
        </NSpace>
      </n-grid-item>
      <n-grid-item :span="2">

        <NSpace vertical>
          <NSpace class="testCard1" vertical>
          <NSpace justify="space-between">
            <NSpace class="header">
              <n-icon class="headerIcon5">
                <mail />
              </n-icon>
              nombre des employés qui ont un compte email
            </NSpace>
            <NSpace>
              {{ stat.nbEmployesEmail }}
            </NSpace>
          </NSpace>
          <NSpace justify="end">
            <n-icon>
              <chart style="color: orange" />
            </n-icon>
          </NSpace>
        </NSpace>

        <NSpace vertical  class="pie">
          <NSpace class="pieTitle">
            La distribution par rôle des compte
          </NSpace>
          <Pie :data="pieData" :options="pieOptions" />
        </NSpace>
      </NSpace>
      </n-grid-item>
      <n-grid-item :span="2">
        <NSpace vertical justify="space-between">
          <NSpace vertical class="bar1">
            <NSpace class="barTitle">
              nombre des comptes créé par année
            </NSpace>
            <Bar
              :data="bar1Data"
              :options="bar1Options"
              style="height: 180px"
            />
          </NSpace>
          <NSpace vertical class="bar2">
            <NSpace class="barTitle">
              nombre des employés rejoindre par année
            </NSpace>
            <Bar
              :data="bar2Data"
              :options="bar2Options"
              style="height: 180px"
            />
          </NSpace>
        </NSpace>
      </n-grid-item>
    </NGrid>
  </NSpace>
</template>

<style scooped>
.pie {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  padding: 3px 10px;
  height: 352px;
}

.pieTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 5px 10px 5px;
}

.barTitle {
  font-size: 18px;
  font-weight: bold;
  margin: 2px 2px 2px 2px;
}

.bar1 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  height: 220px;
  padding: 0px 15px;
  /* width: 560px; */
}

.bar2 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  height: 220px;
  padding: 0px 15px;
  /* width: 565px; */
}

.space {
  padding: 0px 2px;
}

.testCard1 {
  /* width: 265px;  */
  height: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  padding: 12px 8px 10px 8px;
}

.headerIcon1 {
  font-size: 18px;
  color: white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 18px;
}

.headerIcon2 {
  font-size: 18px;
  color: white;
  background-color: #d70000;
  padding: 7px;
  border-radius: 18px;
}

.headerIcon3 {
  font-size: 18px;
  color: white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 18px;
}

.headerIcon4 {
  font-size: 18px;
  color: white;
  background-color: #FFFF00;
  padding: 7px;
  border-radius: 18px;
}

.headerIcon5 {
  font-size: 18px;
  color: white;
  background-color: #0044cd;
  padding: 7px;
  border-radius: 18px;
}

.pageHeader {
  font-size: 25px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
