<script setup>
import { NTag } from 'naive-ui';
import { etatEmployeEnum } from '../utils/enums';

const { EtatEmploye } = defineProps({
  EtatEmploye: String,
});
</script>

<template>
  <n-tag
    v-if="EtatEmploye === etatEmployeEnum.Mission"
    type="success"
    round
    :bordered="false"
    >En mission</n-tag
  >
  <n-tag
    v-if="EtatEmploye === etatEmployeEnum.Conge"
    type="warning"
    round
    :bordered="false"
    >En conge</n-tag
  >
  <n-tag
    v-if="EtatEmploye === etatEmployeEnum.Maladie"
    type="error"
    round
    :bordered="false"
    >En maladie</n-tag
  >

  <n-tag
    v-if="EtatEmploye === etatEmployeEnum.Travail"
    type="info"
    round
    :bordered="false"
    >En travail</n-tag
  >
</template>
