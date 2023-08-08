<script setup>
import { NCard, NTabs, NTabPane, NSpace, NInput, NText, NH1 } from 'naive-ui';

import TabRendement from '../components/TabRendement.vue';

import { useRoute } from 'vue-router';
import { Activites, ActiviteUnit } from '../utils/enums';

import axios from 'axios';

const route = useRoute();

const rapport = (
  await axios.get(`http://localhost:3000/rapports/${route.params.idRapport}`)
).data;

let tabs = Object.keys(Activites).map((a) => {
  return { name: Activites[a], title: a, unit: ActiviteUnit[a] };
});
</script>

<template>
  <n-h1>Création du rapport du jour</n-h1>
  <n-space vertical>
    <n-card>
      <NSpace vertical>
        <NText strong> Titre du rapport </NText>
        <n-input
          disabled
          placeholder="Saisissez un titre pour ce rapport"
          style="width: 50%"
          v-model:value="rapport.titre"
        />
        <NText strong> Résumé du rapport </NText>

        <n-input
          disabled
          type="textarea"
          placeholder="Veuillez écrire un résumé pour ce rapport"
          style="width: 50%"
          :resizable="false"
          v-model:value="rapport.resume"
        />
      </NSpace>
    </n-card>

    <n-card title="Rendement des équipes" style="min-height: 500px">
      <n-tabs type="line" animated>
        <n-tab-pane v-for="tab of tabs" :name="tab.name" :tab="tab.title">
          <TabRendement
            :readOnly="true"
            :activite="tab.name"
            :rendements="
              rapport.Rendements.filter(
                (r) => r.Equipe.codeActivite === tab.name
              )
            "
            :valueUnit="tab.unit"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>
<style scoped>
.add-rendement-button {
  height: 100%;
}
</style>
