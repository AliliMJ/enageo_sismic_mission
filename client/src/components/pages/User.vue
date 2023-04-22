<script setup>
import { NImage } from "naive-ui";
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
const employe = (await axios.get("http://localhost:3000/employes/" + user.id))
  .data;

console.log(
  "the name is : " + new Date(employe.dateNaissance).toLocaleDateString("fr")
);

const nom = ref(employe.nom);
const prenom = ref(employe.prenom);
const dateNaiss = ref(new Date(employe.dateNaissance));
const dateAdd = ref(new Date(employe.dateAdhesion));
const email = ref(user.email);
//const dateNaiss = ref(employe.dateNaissance.toLocaleDateString("fr"));
</script>

<template>
  <n-card title="Détails" style="margin-bottom: 16px; width: 900px">
    <n-tabs type="line" animated>
      
      <n-tab-pane name="data" tab="Données">
        <NSpace vertical>
          <NSpace>
            <NCard title="informations personnel">
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
                    <NDatePicker
                      format="dd/MM/yyyy"
                      v-model:value="dateNaiss"
                      type="date"
                    />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Sexe">
                    <NSelect value="Male" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Date d'adhesion">
                    <NDatePicker
                      format="dd/MM/yyyy"
                      v-model:value="dateAdd"
                      type="date"
                    />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="etat de l'employe">
                    <NSelect value="etat" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>

            <NCard title="Contact">
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="24" label="Email">
                    <NInput v-model:value="email" />
                  </NFormItemGi>
                  <NFormItemGi :span="24" label="Numéro de téléphone">
                    <NInput value="0541383260" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>
          </NSpace>
        </NSpace>

      </n-tab-pane>

      <n-tab-pane name="compte" tab="Compte">
        <NForm disabled>
          <NGrid :span="24" :x-gap="24">
            <NFormItemGi :span="12" label="id">
              <NInput value="id" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Email">
              <NInput value="email" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="Role">
              <NSelect value="role" />
            </NFormItemGi>
            <NFormItemGi :span="12" label="date creation de compte">
              <NInput value="date" />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </n-tab-pane>

    </n-tabs>
  </n-card>
</template>
