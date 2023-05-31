<script setup>
import {
  NDescriptions,
  NDescriptionsItem,
  NCard,
  NSpace,
  NTag,
  NIcon,
  NText,
  NButton,
} from 'naive-ui';
import {
  ArrowRight24Filled as ArrowRight,
  Dismiss48Regular as Dismiss,
} from '@vicons/fluent';

const { rendement, valueUnit } = defineProps({
  rendement: Object,
  valueUnit: String,
});

const emit = defineEmits(['remove']);

const onRemoveBtnClicked = () => {
  emit('remove', rendement.key);
};
function formatMinutes(timeInMinutes) {
  const hour = Math.ceil(timeInMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (timeInMinutes % 60).toString().padStart(2, '0');
  return `${hour}:${minutes} ${timeInMinutes >= 720 ? 'PM' : 'AM'}`;
}
const startTime = formatMinutes(rendement.hDebut);
const finishTime = formatMinutes(rendement.hFin);
</script>

<template>
  <n-card class="production-card">
    <NDescriptions label-placement="top">
      <n-descriptions-item>
        <template #label> Horaires </template>
        <NSpace align="center">
          <NTag type="success" round>{{ startTime }}</NTag>
          <NIcon><ArrowRight /></NIcon>
          <NTag type="success" round>{{ finishTime }}</NTag>
        </NSpace>
      </n-descriptions-item>
    </NDescriptions>
    <template #header>
      {{ rendement.valeur }}
      <NText class="type-rendement" depth="3">{{ valueUnit }}</NText>
    </template>
    <!-- <template #action>
      <NButton type="error"
        >Supprimer
        <template #icon>
          <NIcon :size="24"><Delete /></NIcon>
        </template>
      </NButton>
    </template> -->

    <template #header-extra>
      <NButton
        size="tiny"
        circle
        class="dismiss"
        type="error"
        quaternary
        @click="onRemoveBtnClicked"
      >
        <NIcon><Dismiss /></NIcon>
      </NButton>
    </template>
  </n-card>
</template>
<style scoped>
.type-rendement {
  font-size: 8pt;
}

.dismiss {
  opacity: 0;
}

.production-card:hover .dismiss {
  opacity: 1;

  transition: 0.1s ease-in-out;
}
</style>
