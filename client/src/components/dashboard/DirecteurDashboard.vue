<script setup>
import Chart from 'chart.js/auto';
import {
  NRow,
  NCol,
  NCard,
  NSpace,
  NGrid,
  NGi,
  NStatistic,
  NText,
  NH1,
  NTag,
  NProgress,
  NIcon,
} from 'naive-ui';

import { onMounted, ref } from 'vue';
import {
  AlertCircleOutline as Info,
  HelpCircleOutline as Hint,
} from '@vicons/ionicons5';

const myChart = ref(null);

onMounted(() => {
  new Chart(myChart.value, {
    type: 'line',
    data: {
      labels: ['jan', 'fev', 'march', 'avril', 'mai'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 80, 50, 50, 110],
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
</script>

<template>
  <n-h1>Statistiques</n-h1>
  <n-grid :cols="4" x-gap="12" y-gap="12">
    <n-gi
      ><n-card class="stat-card" title="État d'avancement">
        <n-space vertical align="center">
          <n-progress
            type="dashboard"
            gap-position="bottom"
            :percentage="80" /></n-space></n-card
    ></n-gi>
    <n-gi
      ><n-card class="stat-card" title="Coût des charges">
        <template #header-extra>
          <n-icon class="hint" depth="3" size="30"> <Hint /> </n-icon>
        </template>
        <n-space align="center">
          <n-text class="stat-val">12k</n-text>
          <n-text class="unit" depth="3" strong>Dinars</n-text>
        </n-space>
        <template #footer>
          <n-text depth="2"> Le coût des ressources </n-text>
        </template>
      </n-card></n-gi
    >
    <n-gi
      ><n-card class="stat-card" title="Taux de prodution"
        ><template #header-extra>
          <n-icon class="hint" depth="3" size="30">
            <Hint />
          </n-icon>
        </template>
        <n-space align="center" justify="space-between">
          <n-text class="stat-val">90%</n-text>
          <n-tag size="small" type="success">+ 10%</n-tag>
        </n-space>
        <template #footer>
          <n-text depth="2"> Taux de point vibrés tirés </n-text>
        </template>
      </n-card></n-gi
    >
    <n-gi
      ><n-card class="stat-card" title="Délais"
        ><template #header-extra>
          <n-icon class="hint" depth="3" size="30"> <Hint /> </n-icon>
        </template>
        <n-space align="center">
          <n-text class="stat-delai">12</n-text>
          <n-text class="unit" depth="3" strong>Jours passés</n-text>
        </n-space>
        <n-space align="center">
          <n-text class="stat-delai">100</n-text>
          <n-text class="unit" depth="3" strong>Jours restant</n-text>
        </n-space>
      </n-card></n-gi
    >
    <n-gi :span="3">
      <n-card>
        <canvas id="ctx" ref="myChart"></canvas>
      </n-card>
    </n-gi>
    <n-gi>
      <div style="display: flex; flex-direction: column; height: 100%">
        <n-card style="flex: 1" title="Production">
          <n-space align="center">
            <n-text class="stat-val">123</n-text>
            <n-text class="unit" depth="3" strong>Points vibrés</n-text>
          </n-space>
        </n-card>
        <div style="height: 12px"></div>
        <n-card style="flex: 1" title="Gain">
          <template #header-extra>
            <n-icon class="hint" depth="3" size="30"> <Hint /> </n-icon>
          </template>
          <n-space align="center">
            <n-text class="stat-val">800k</n-text>
            <n-text class="unit" depth="3" strong>Dinars</n-text>
          </n-space>
        </n-card>
      </div>
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
