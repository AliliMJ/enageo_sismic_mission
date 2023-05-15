<template>
  <NGrid x-gap="20" y-gap="20" :cols="10">
    <n-grid-item :span="10" class="pageHeader">
      details sur le materiel
    </n-grid-item>

    <n-grid-item :span="10" class="div1">
      <NGrid :span="10" :x-gap="24">
        <NFormItemGi :span="3" label="de du materiel">
          <NInput />
        </NFormItemGi>
        <NFormItemGi :span="6" label="designation">
          <NInput />
        </NFormItemGi>
        <NFormItemGi :span="3" label="matricule">
          <NInput/>
        </NFormItemGi>
        <NFormItemGi :span="3" label="l'etat">
          <NInput/>
        </NFormItemGi>
        <NFormItemGi :span="3" label="type du materiel">
          <NInput/>
        </NFormItemGi>
      </NGrid>
    </n-grid-item>

    <n-grid-item :span="5" class="div2"> div2 </n-grid-item>
    <n-grid-item :span="5" class="div3"> 
        <STable :data="reparations" :columns="cols"/>
     </n-grid-item>
  </NGrid>
</template>

<script setup>
import axios from "axios";
import STable from 'common/STable.vue';
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NButton,
  NIcon,
  NGrid,
  NForm,
  NFormItemGi,
  NGridItem,
  NInput,
  NSelect,
  NDatePicker,
  useDialog,
  useMessage,
  NText,
} from "naive-ui";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const message = useMessage();

const codeMat = route.params.codeMat;

const materielWithReparations = (
  await axios.get(
    `http://localhost:3000/material/getMaterielWithReparations/${codeMat}`
  )
).data;

const materielRef = ref({
  codeMat: materielWithReparations.codeMat,
  designation: materielWithReparations.designation,
  matricule: materielWithReparations.matricule,
  idProjet: materielWithReparations.idProjet,
  status: materielWithReparations.status,
  idTypeMat: materielWithReparations.idTypeMat,
  reparations: materielWithReparations.Reparations,
});

const reparations = (
  await axios.get(
    `http://localhost:3000/atelier/allReparationsByMateriel/${codeMat}`
  )
).data

// reparations.forEach((element) => {
//     element.dPanne = new Date(element.dPanne)
// });

// const reparationsRef = ref({
//     idRep : Number(reparations)
// })

const cols = [
  { title: 'code reparation', key: 'idRep' },
  { title: "date de la panne", key: 'dPanne' },
  { title: 'date de debut du reparation', key: 'dDebRep' },
  { title: 'date de fin du reparation', key: 'dFinRep' },
  { title: 'detail sur le probleme', key: 'detailProbleme' },
];

</script>

<style scoped>
.space {
  width: 100%;
  height: 100%;
}

.div1 {
  background-color: red;
  padding:10px
}

.div2 {
  background-color: green;
}

.div3 {
  background-color: yellow;
}
</style>
