<script setup>
import { NSpace, NCard, NH1 } from 'naive-ui';

import axios from 'axios';
import { Activites } from '../utils/enums';
const consumptions = (
  await axios.get('http://localhost:3000/resource/consommation')
).data;
console.log(consumptions);

const production = (
  await axios.get(
    'http://localhost:3000/rapports/production/' + Activites.Enregistrement
  )
).data;
console.log(production);

$(function () {
  $('#charges').pivotUI(consumptions, {});
});
$(function () {
  $('#production').pivotUI(production, {});
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
</style>
