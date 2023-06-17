<script setup>
import Chart from 'chart.js/auto';
import { NCard, NSpace, NGrid, NGi, NText, NProgress, NIcon } from 'naive-ui';

import { onMounted, ref } from 'vue';
import axios from 'axios';
import {
  AlertCircleOutline as Info,
  HelpCircleOutline as Hint,
} from '@vicons/ionicons5';

const props = defineProps({
  projet: Object,
});

const myChart = ref(null);
function dateDiff(prodData) {
  if (prodData.length == 0 || prodData.length == 1) return 0;
  const firstData = prodData[0];
  const lastData = prodData[prodData.length - 1];
  const { jour: firstDay, mois: firstMonth, annee: firstYear } = firstData;
  const { jour: lastDay, mois: lastMonth, annee: lastYear } = lastData;

  const startDate = new Date(firstYear, firstMonth, firstDay);
  const endDate = new Date(lastYear, lastMonth, lastDay);
  const differenceInDays = Math.floor(
    (endDate - startDate) / (1000 * 3600 * 24)
  );
  return differenceInDays;
}

function groupVP(prodData) {
  let labels = [];
  let data = [];

  const differenceInDays = dateDiff(prodData);
  prodData.forEach((e) => {
    labels.push(
      `${e.jour} ${e.libMois} ${differenceInDays > 14 ? `${e.annee}` : ''}`
    );
    data.push(e.vp);
  });

  return { labels, data };
}

const production = (
  await axios.get(
    'http://localhost:3000/rapports/productionByProject/' +
      props.projet.idProjet
  )
).data;
const timePassed = () => {
  if (production.length > 0) {
    new Date();
    const firstProdDay = new Date(
      production[0].annee,
      production[0].mois,
      production[0].jour
    );
    const now = new Date();
    console.log(production[0].jour, production[0].mois, production[0].annee);
    return Math.floor((now - firstProdDay) / (1000 * 3600 * 24));
  }

  return 0;
};

const remainingTime = () => {
  const now = new Date();
  const fin = new Date(props.projet.objDateFin);
  const debut = new Date(props.projet.objDateDebut);
  if (now >= fin) {
    return 0;
  } else if (now <= debut) {
    return Math.floor((fin - debut) / (1000 * 3600 * 24));
  } else {
    return Math.floor((fin - now) / (1000 * 3600 * 24));
  }
};

const groupedData = groupVP(production);

onMounted(() => {
  new Chart(myChart.value, {
    type: 'line',
    data: {
      labels: groupedData.labels,
      datasets: [
        {
          label: 'Les points vibrés',
          data: groupedData.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0,
        },
      },
    },
  });
});
const { totalVp, totalGain } = production.reduce(
  (acc, current) => {
    return {
      totalVp: acc.totalVp + current.vp,
      totalGain: acc.totalGain + current.gain,
    };
  },
  { totalVp: 0, totalGain: 0 }
);

const pourcentage = Math.round((totalVp / props.projet.objVP) * 100);
</script>

<template>
  <n-grid :cols="4" x-gap="12" y-gap="12">
    <n-gi
      ><n-card class="stat-card" title="État d'avancement">
        <n-space vertical align="center">
          <n-progress
            type="dashboard"
            gap-position="bottom"
            :percentage="pourcentage" /></n-space></n-card
    ></n-gi>
    <n-gi
      ><n-card class="stat-card" title="Gain">
        <template #header-extra>
          <n-icon class="hint" depth="3" size="30"> <Hint /> </n-icon>
        </template>
        <n-space align="center">
          <n-text class="stat-val">{{ Math.round(totalGain / 1000) }} k</n-text>
          <n-text class="unit" depth="3" strong>Dinars</n-text>
        </n-space>
        <template #footer>
          <n-text depth="2"> Le gain </n-text>
        </template>
      </n-card></n-gi
    >
    <n-gi
      ><n-card class="stat-card" title="Production"
        ><template #header-extra>
          <n-icon class="hint" depth="3" size="30">
            <Hint />
          </n-icon>
        </template>
        <n-space align="center">
          <n-text class="stat-val">{{ totalVp }}</n-text>
          <n-text class="unit" depth="3" strong>Vp tirés</n-text>
        </n-space>
        <n-space align="center">
          <n-text class="stat-val">{{ props.projet.objVP - totalVp }}</n-text>
          <n-text class="unit" depth="3" strong>Vp restants</n-text>
        </n-space>
        <template #footer>
          <n-text depth="2"> le nombre de points vibrés tirés </n-text>
        </template>
      </n-card></n-gi
    >
    <n-gi
      ><n-card class="stat-card" title="Délais"
        ><template #header-extra>
          <n-icon class="hint" depth="3" size="30"> <Hint /> </n-icon>
        </template>
        <n-space align="center">
          <n-text class="stat-delai">{{ timePassed() }}</n-text>
          <n-text class="unit" depth="3" strong>Jours passés</n-text>
        </n-space>
        <n-space align="center">
          <n-text class="stat-delai">{{ remainingTime() }}</n-text>
          <n-text class="unit" depth="3" strong>Jours restant</n-text>
        </n-space>
      </n-card></n-gi
    >
    <n-gi :span="4">
      <n-card>
        <canvas id="ctx" ref="myChart"></canvas>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<style scoped>
.unit {
  font-size: 1rem;
}
.stat-delai {
  font-size: 2rem;
  font-weight: 700;
}
.stat-val {
  font-size: 2.5rem;
  font-weight: 700;
}
.stat-card {
  height: 100%;
}
.hint {
  opacity: 0;
}
.n-card:hover .hint {
  opacity: 1;

  transition: 0.2s ease-in-out;
}
</style>
