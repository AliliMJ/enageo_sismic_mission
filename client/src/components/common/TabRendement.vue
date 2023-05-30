<script setup>
import {NTabPane, NButton, NSpace, }
</script>

<template>
  <n-tab-pane name="topo" tab="Topographie">
    <n-space class="rendments-cards">
      <ProductionCard
        v-for="rendement of rendements.filter(
          (r) => r.activite === Activites.Enregistrement
        )"
        :rendement="rendement"
        valueUnit="Points vibrés"
        @remove="removeCard"
      />

      <n-button
        class="add-rendement-button"
        ghost
        type="success"
        @click="() => openModal(Activites.Enregistrement)"
      >
        Ajouter
        <template #icon
          ><NIcon :size="30"><AddCard /></NIcon
        ></template>
      </n-button>
    </n-space>
  </n-tab-pane>
</template>
