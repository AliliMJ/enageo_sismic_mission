<script setup>

import {NImage} from 'naive-ui';
import axios from "axios";
import { useRoute } from "vue-router";
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
  NInput,
  NSelect,
  NDatePicker,
} from "naive-ui";
import { Edit32Filled as Pen } from "@vicons/fluent";
import { ref } from "vue";
const route = useRoute();

const id = route.params.id;

const isEditUser = ref(false);
//const isEditEmploi = ref(false);

const user = (await axios.get(`http://localhost:3000/users/${id}`)).data;
const employe = (await axios.get('http://localhost:3000/employes/'+user.id)).data

console.log("the name is : "+new Date(employe.dateNaissance).toLocaleDateString("fr"))

const nom = ref(employe.nom);
const prenom = ref(employe.prenom);
//const dateNaiss = ref(Date(employe.dateNaissance).toLocaleDateString());
//const dateNaiss = ref(employe.dateNaissance.toLocaleDateString("fr"));


</script>

<template>
    
    <n-card title="Détails" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="data" tab="Données">
        <NSpace vertical>
          <NSpace>
            <NCard title="Compte">
              <!--nom, prénom, date de naissance, sexe-->
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="12" label="Nom">
                    <NInput v-model:value="nom" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Prénom">
                    <NInput v-model:value="prenom" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Date de naissance">
                    <NDatePicker :value="new Date()" type="date" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Sexe">
                    <NSelect value="Male" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>

            <NCard title="Contact">
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="24" label="Email">
                    <NInput value="alili.mohamedlamine@gmail.com" />
                  </NFormItemGi>
                  <NFormItemGi :span="24" label="Numéro de téléphone">
                    <NInput value="0792640179" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>
          </NSpace>
          <NCard title="Emploi">
            <!--date emploi, position, fonction-->
          </NCard>
        </NSpace>
      </n-tab-pane>
      <n-tab-pane name="documents" tab="Documents"> Hey Jude </n-tab-pane>
    </n-tabs>
  </n-card>

</template>