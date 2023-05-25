<script setup>
const data = [
  { chantier: 'EGS60', mois: 'janvier', production: 100, année: 2018 },
  { chantier: 'EGS60', mois: 'févirier', production: 90, année: 2018 },
  { chantier: 'EGS60', mois: 'mars', production: 120, année: 2018 },
  { chantier: 'EGS60', mois: 'avril', production: 70, année: 2018 },
  { chantier: 'EGS60', mois: 'mai', production: 30, année: 2018 },
  { chantier: 'EGS60', mois: 'juin', production: 111, année: 2018 },
  { chantier: 'EGS60', mois: 'juillet', production: 96, année: 2018 },
  { chantier: 'EGS60', mois: 'aout', production: 77, année: 2018 },
  { chantier: 'EGS60', mois: 'spectembre', production: 49, année: 2018 },
  { chantier: 'EGS60', mois: 'octobre', production: 130, année: 2018 },
  { chantier: 'EGS60', mois: 'novembre', production: 102, année: 2018 },
  { chantier: 'EGS60', mois: 'decembre', production: 99, année: 2018 },

  { chantier: 'EGS60', mois: 'janvier', production: 100, année: 2019 },
  { chantier: 'EGS60', mois: 'févirier', production: 90, année: 2019 },
  { chantier: 'EGS60', mois: 'mars', production: 120, année: 2019 },
  { chantier: 'EGS60', mois: 'avril', production: 70, année: 2019 },
  { chantier: 'EGS60', mois: 'mai', production: 30, année: 2019 },
  { chantier: 'EGS60', mois: 'juin', production: 111, année: 2019 },
  { chantier: 'EGS60', mois: 'juillet', production: 96, année: 2019 },
  { chantier: 'EGS60', mois: 'aout', production: 77, année: 2019 },
  { chantier: 'EGS60', mois: 'spectembre', production: 49, année: 2019 },
  { chantier: 'EGS60', mois: 'octobre', production: 130, année: 2019 },
  { chantier: 'EGS60', mois: 'novembre', production: 102, année: 2019 },
  { chantier: 'EGS60', mois: 'decembre', production: 99, année: 2019 },

  { chantier: 'EGS170', mois: 'janvier', production: 100, année: 2019 },
  { chantier: 'EGS170', mois: 'févirier', production: 90, année: 2019 },
  { chantier: 'EGS170', mois: 'mars', production: 120, année: 2019 },
  { chantier: 'EGS170', mois: 'avril', production: 70, année: 2019 },
  { chantier: 'EGS170', mois: 'mai', production: 30, année: 2019 },
  { chantier: 'EGS170', mois: 'juin', production: 111, année: 2019 },
  { chantier: 'EGS170', mois: 'juillet', production: 96, année: 2019 },
  { chantier: 'EGS170', mois: 'aout', production: 77, année: 2019 },
  { chantier: 'EGS170', mois: 'spectembre', production: 49, année: 2019 },
  { chantier: 'EGS170', mois: 'octobre', production: 130, année: 2019 },
  { chantier: 'EGS170', mois: 'novembre', production: 102, année: 2019 },
  { chantier: 'EGS170', mois: 'decembre', production: 99, année: 2019 },
];

$(function () {
  $('#output').pivotUI(data, {
    rows: ['chantier'],
    cols: ['mois'],
  });
});
</script>
<template>
  <div id="output"></div>
</template>

<style scoped>
#output {
  font-family: Verdana;
  word-break: keep-all;
}
</style>
