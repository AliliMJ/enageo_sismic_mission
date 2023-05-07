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
} from 'chart.js';
import { Pie, Bar } from 'vue-chartjs';
import axios from 'axios';
import {
  NSpace,
  NGrid,
  NFormItemGi,
  NForm,
  NCard,
  NIcon,
  NText,
} from 'naive-ui';
import {
  TrashOutline as trash,
  FolderOpenOutline as folder,
  BriefcaseOutline as bag,
  PersonOutline as person,
} from '@vicons/ionicons5';

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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      fontSize: 100,
      text: 'nombres des comptes par le role',
      titleAlign: 'left',
    },
  },
};

const data = {
  labels: [
    'Administrateur',
    'chef mission',
    'chef terrain',
    'gestionnaire',
    'directeur',
  ],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFFF00'],
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

const dates = [];
usersByYear.forEach((element) => {
  dates.push(element.year);
});

console.log(dates);

const datesdata = [];
usersByYear.forEach((element) => {
  datesdata.push(element.nbr);
});

console.log(datesdata);

const options1 = {
  responsive: true,
  maintainAspectRatio: false,
};

const data1 = {
  labels: dates,
  datasets: [
    {
      label: 'nombre des comptes créé par année',
      backgroundColor: ['rgb(54, 162, 235 , 0.2)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      data: datesdata,
    },
  ],
};
</script>

<template>
  <NSpace class="space">
    <NGrid x-gap="25" :cols="4">
      <NFormItemGi :span="1">
        <!-- <NCard
        header-style="display:flex;flex-direction:row-reverse;font-size:20px;padding:23px"
        title="les comptes"
        class="card"
        content-style="font-size:30px;"
      >
        <template #header-extra>
          <n-icon class="cardIcon1">
            <person />
          </n-icon>
        </template>
        {{ stat.nbUsers }}
        </NCard> -->

        <NSpace class="testCard" justify="space-between">
          <NSpace class="header">
            <n-icon class="headerIcon">
              <person />
            </n-icon>
            les comptes
          </NSpace>
          {{ stat.nbUsers }}
        </NSpace>
      </NFormItemGi>
      <NFormItemGi :span="1">
        <!-- <NCard
        header-style="display:flex;flex-direction:row-reverse;font-size:20px;padding:15px"
        title="les employes"
        class="card"
        content-style="font-size:30px;"
      >
        <template #header-extra>
          <n-icon class="cardIcon2">
            <bag />
          </n-icon>
        </template>
        {{ stat.nbEmployes }}
        </NCard> -->

        <NSpace class="testCard" justify="space-between">
          <NSpace class="header">
            <n-icon class="headerIcon">
              <person />
            </n-icon>
            les employes
          </NSpace>
          {{ stat.nbEmployes }}
        </NSpace>
      </NFormItemGi>

      <NFormItemGi :span="1">
        <!-- <NCard
        header-style="display:flex;flex-direction:row-reverse;font-size:20px;padding:15px"
        title="les comptes (2023)"
        class="card"
        content-style="font-size:30px;position:absolute;top:4px;left:180px;"
      >
        <template #header-extra>
          <n-icon class="cardIcon3">
            <bag />
          </n-icon>
        </template>
        {{ stat.nbEmployes }}
        </NCard> -->

        <NSpace class="testCard" justify="space-between">
          <NSpace class="header">
            <n-icon class="headerIcon">
              <person />
            </n-icon>
            les comptes ({{ dates[dates.length - 1] }})
          </NSpace>
          {{ datesdata[datesdata.length - 1] }}
        </NSpace>
      </NFormItemGi>

      <NFormItemGi :span="1">
        <NSpace class="testCard" justify="space-between">
          <NSpace class="header">
            <n-icon class="headerIcon">
              <person />
            </n-icon>
            les comptes ({{ dates[dates.length - 2] }})
          </NSpace>
          {{ datesdata[datesdata.length - 2] }}
        </NSpace>
      </NFormItemGi>
      <NFormItemGi :span="2" class="pie">
        <Pie :data="data" :options="options" />
      </NFormItemGi>
      <NFormItemGi :span="2">
        <NSpace vertical justify="space-around">
          <Bar :data="data1" :options="options1" class="bar1" />
          <Bar :data="data1" :options="options1" class="bar2" />
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NSpace>
</template>

<style scooped>
.pie {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  height: 400px;
}

.bar1 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  height: 200px;
  padding: 0px 15px;
  /* width:600px; */
}

.bar2 {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  height: 200px;
  padding: 0px 15px;
  /* width:600px; */
}

.card {
  width: 280px;
  height: 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
}

.cardIcon1 {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  background-color: #d03050;
  padding: 7px;
  border-radius: 20px;
}

.cardIcon2 {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 20px;
}

.cardIcon3 {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 20px;
}
.space {
  padding: 0px 4px;
}

.testCard {
  width: 280px;
  height: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 15px 10px 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.headerIcon {
  font-size: 20px;
  color: white;
  background-color: #00b01d;
  padding: 7px;
  border-radius: 20px;
}
</style>
