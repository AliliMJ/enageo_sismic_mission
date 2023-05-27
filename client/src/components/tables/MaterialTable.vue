<script setup>
import axios from 'axios';

<<<<<<< HEAD
import STable from "common/STable.vue";
import { NSpace, NButton, NIcon, NInput, NH1 , useMessage} from "naive-ui";
import { h } from "vue";
import MaterielTag from "common/MaterielTag.vue";
import { useAuth } from "../../stores/authentication";
import { useRouter} from "vue-router";
import { ref , watch } from "vue";
import Modal from "common/AffecteMaterielModal.vue";
import { SearchOutline as search ,
          Add} from "@vicons/ionicons5";
=======
import STable from '../common/STable.vue';
import { NSpace, NButton, NIcon, NInput, NH1 } from 'naive-ui';
import { h } from 'vue';
import MaterielTag from '../common/MaterielTag.vue';
import { useAuth } from '../../stores/authentication';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import Modal from '../common/AffecteGoodMaterielModal.vue';
import { SearchOutline as search, Add } from '@vicons/ionicons5';
>>>>>>> 2464b55c5b507e52a316dbec5a50ba1aacc06c3d

const auth = useAuth();
const router = useRouter();
const message = useMessage();

const showModal = ref(false);

const employe = ref();
const projet = ref();
const materiels = ref([]);

employe.value = (
  await axios.get(`http://localhost:3000/employes/${auth.user.employeId}`)
).data;
projet.value = (
  await axios.get(
    `http://localhost:3000/projets/projetByMission/${employe.value.codeMission}`
  )
).data;

 materiels.value = (
  await axios.get(
    `http://localhost:3000/material/materielByProject/${projet.value.idProjet}`
  )
).data;

const cols = [
  { title: 'Code', key: 'codeMat' },
  { title: 'Marque', key: 'marque' },
  { title: 'modèle', key: 'modele' },
  {
    title: 'date du mise en service',
    key: 'dateService',
    render(row) {
      return new Date(row.dateService).toLocaleDateString('fr');
    },
  },
  { title: 'Désignation', key: 'designation' },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(MaterielTag, { statuMateriel: row.status });
    },
  },
  // {
  //   title: 'Occupation',
  //   key: 'occupation',
  //   render(row) {
  //     return row.projetId ?? 'Disponible';
  //   },
  // },
];

const searchDesignation = ref('');
const searchFilter = () => {
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materials.value = (
        await axios.get(
          `http://localhost:3000/material/goodMateriel/designation/${projet.value.idProjet}?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materials.value = (
        await axios.get(
          `http://localhost:3000/material/materielGoodByProject/${projet.value.idProjet}`
        )
      ).data;
    }
  });
};

const handleClick = (materiel) => {
  router.push(`/materiel/${materiel.codeMat}`);
};

const showInsertMaterielModal = () => {
  showModal.value = true;
};

async function confirmAdd(codeMatricule) {

  const req = {
    codeMat : String(codeMatricule)
  };

  const materiel = (
    await axios.put(
      `http://localhost:3000/material/ajouterMaterielWithProject/${projet.value.idProjet}`,req
    )
  ).data;
 materiels.value.push(materiel);
  showModal.value = false;
}

const searchDesignation = ref('');
const searchFilter = () => {
  console.log('=======>' + searchDesignation.value);
  watch(searchDesignation, async () => {
    if (searchDesignation.value.length > 0) {
      materiels.value = (
        await axios.get(
          `http://localhost:3000/material/allMateriel/designation/${projet.value.idProjet}?like=${searchDesignation.value}`
        )
      ).data;
    } else {
      materiels.value = (
        await axios.get(
          `http://localhost:3000/material/materielByProject/${projet.value.idProjet}`
        )
      ).data;
    }
  });
};
</script>

<template>
  <NH1>La liste des matériels du {{ projet.codeMission }}</NH1>
  <NSpace justify="space-between">
    <NSpace> </NSpace>
    <NSpace>
      <n-input
        v-model:value="searchDesignation"
        @update:value="searchFilter"
        placeholder="Rechercher par designation"
        style="width: 255px"
      >
        <template #suffix>
          <n-icon :component="search" />
        </template>
      </n-input>
      <NButton
        @click="showInsertMaterielModal"
        class="button"
        type="success"
        icon-placement="right"
      >
        Affecter un matériel à la mission
        <template #icon>
          <NIcon>
            <Add />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NSpace>
<<<<<<< HEAD
      <STable :data="materiels" :columns="cols" @onRowClicked="handleClick"/>
=======
      <STable :data="materials" :columns="cols" @onRowClicked="handleClick" />
>>>>>>> 2464b55c5b507e52a316dbec5a50ba1aacc06c3d
    </NSpace>
  </NSpace>
  <Modal
    v-if="showModal"
    :showModal="showModal"
    @cancel="showModal = false"
    @confirm="confirmAdd"
    :idProjet="projet.idProjet"
  />
</template>
