<script setup>
import { etatProjetText } from '../../enums';
import { NTag, NIcon } from 'naive-ui';
import {
  CloseCircle as Annule,
  CheckmarkCircle as Done,
  PauseCircle as Planing,
  HelpCircle as Unknown,
  EllipsisHorizontalCircleSharp as Progress,
} from '@vicons/ionicons5';
const { projectStates, annule } = defineProps({
  projectStates: Object,
  annule: Boolean,
});
const stateIndex = projectStates.length - 1;
const currentState = etatProjetText[stateIndex] ?? 'Inconnue';
function getTagType() {
  if (annule) return 'error';
  if (stateIndex === 0) return 'warning';
  if (stateIndex === 1) return 'info';
  if (stateIndex === 2) return 'success';
}
</script>

<template>
  <n-tag round :type="getTagType()"
    >{{ currentState }}
    <template #icon>
      <NIcon>
        <Annule v-if="annule" />
        <Done v-else-if="stateIndex === 2" />
        <Progress v-else-if="stateIndex === 1" />
        <Planing v-else-if="stateIndex === 0" />
        <Unknown v-else />
      </NIcon>
    </template>
  </n-tag>
</template>
