<template>
Gestionnaire Dashboard
<STable :data="materiel" :columns="cols"/>
</template>

<script setup>
import MaterielTag from 'common/MaterielTag.vue';
import STable from 'common/STable.vue';
import { ref } from 'vue';
import { h } from 'vue';

const cols = [
  { title: 'code materiel', key: 'codeMat' },
  { title: "designation", key: 'designation' },
  { title: 'matricule', key: 'matricule' },
  {
    title: 'Status',
    key: 'statuMateriel',
    render(row) {
        return h(MaterielTag, { statuMateriel: row.statuMateriel });
    },
  }
];

const materiel = ref([
    {
        codeMat : 'mat1',
        designation : 'materiel1',
        matricule : '1654684',
        statuMateriel : 0
    },
    {
        codeMat : 'mat2',
        designation : 'materiel2',
        matricule : '165984684',
        statuMateriel : 1
    },
    {
        codeMat : 'mat3',
        designation : 'materiel3',
        matricule : '165465484',
        statuMateriel : 2
    }
])

</script>
