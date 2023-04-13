<script setup>
import axios from 'axios';

import STable from 'common/STable.vue';
import StatusTag from 'common/StatusTag.vue';
import { h } from 'vue';

const materials = (await axios.get('http://localhost:3000/material')).data;

const cols = [
  { title: 'Code', key: 'code' },
  { title: 'Désignation', key: 'designation' },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(StatusTag, { enPanne: row.enPanne });
    },
  },
  {
    title: 'Occupation',
    key: 'occupation',
    render(row) {
      return row.projetId ?? 'Disponible';
    },
  },
];
</script>

<template>
  <STable :data="materials" :columns="cols" />
</template>
