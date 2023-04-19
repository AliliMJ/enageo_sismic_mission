<script setup>
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

const isEditPersonel = ref(false);
const isEditEmploi = ref(false);

const employe = (await axios.get(`http://localhost:3000/employes/${id}`)).data;

console.log(employe);
</script>

<template>
  <!-- <NTab animated line name="details" default-value="data">
    <NTabPane name="data" tab="Données">
      <NCard title="Données personelles"> </NCard>
    </NTabPane>
    <NTabPane name="documents" tab="Documents">documents</NTabPane>
  </NTab> -->

  <!-- <NButton circle quaternary @click="editEmploi">
                <template #icon>
                  <NIcon depth="3">
                    <Pen />
                  </NIcon>
                </template>
              </NButton> -->

  <n-card title="Détails" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="data" tab="Données">
        <NSpace vertical>
          <NSpace>
            <NCard title="Données personelles">
              <!--nom, prénom, date de naissance, sexe-->
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="12" label="Nom">
                    <NInput value="ALILI" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Prénom">
                    <NInput value="Mohamed Lamine" />
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
