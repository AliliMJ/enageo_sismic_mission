<script setup>
import { NSpace, NCard, NH1 } from 'naive-ui';

import axios from 'axios';
import { Activites } from '../utils/enums';

// const consumptions = (
//   await axios.get('http://localhost:3000/resource/consommation')
// ).data;

// const production = (
//   await axios.get(
//     'http://localhost:3000/rapports/production/' + Activites.Enregistrement
//   )
// ).data;
// let derivers = $.pivotUtilities.derivers;
let renderers = $.extend(
  $.pivotUtilities.renderers,
  $.pivotUtilities.c3_renderers
);
const monthOrder = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const consData = await fetch('d.json');
const prodData = await fetch('s.json');

const consommations = await consData.json();
const production = (await prodData.json()).map((p) => ({
  ...p,
  gains: p.vp * 30000,
}));
// consommations.sort((a, b) => {
//   const aMonthIndex = monthOrder.indexOf(a.mois);
//   const bMonthIndex = monthOrder.indexOf(b.mois);

//   if (a.annee !== b.annee) {
//     return a.annee - b.annee;
//   } else {
//     return aMonthIndex - bMonthIndex;
//   }
// });

$(function () {
  $('#charges').pivotUI(consommations, {
    renderers: renderers,
    rendererName: 'Horizontal Stacked Bar Chart',

    sorters: {
      annee: function (a, b) {
        return a - b; // Sorting by ascending order
      },
      mois: function (a, b) {
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
      },
    },
  });
});
$(function () {
  $('#production').pivotUI(production, {
    renderers: renderers,
    rendererName: 'Horizontal Stacked Bar Chart',

    sorters: {
      annee: function (a, b) {
        return a - b; // Sorting by ascending order
      },
      mois: function (a, b) {
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
      },
    },
  });
});
</script>
<template>
  <n-space vertical>
    <n-h1>Analyse</n-h1>
    <n-card title="Charges">
      <div id="charges"></div>
    </n-card>
    <n-card title="Production">
      <div id="production"></div>
    </n-card>
  </n-space>
</template>

<style scoped>
#charges {
  font-family: Verdana;
  word-break: keep-all;
}
#production {
  font-family: Verdana;
  word-break: keep-all;
}
.c3-line,
.c3-focused {
  stroke-width: 3px !important;
}
.c3-bar {
  stroke: white !important;
  stroke-width: 1;
}
.c3 text {
  font-size: 12px;
  color: grey;
}
.tick line {
  stroke: white;
}
.c3-axis path {
  stroke: grey;
}
.c3-circle {
  opacity: 1 !important;
}
.c3-xgrid-focus {
  visibility: hidden !important;
}
</style>
