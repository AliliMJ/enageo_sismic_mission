<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false" size="huge">
    <n-card
      style="width: 650px; height: 550px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace
        style="
          font-size: 20px;
          font-weight: bold;
          margin-top: -10px;
          margin-bottom: 40px;
        "
      >
        details sur l'evenement
      </NSpace>
      <NForm disabled>
      <NGrid :span="24" :x-gap="25">
          <NFormItemGi :span="13" label="titre">
            <NInput v-model:value="props.evenement.titre" />
          </NFormItemGi>
          <NFormItemGi :span="11" label="type d'evenement">
            <NSelect
              placeholder="selectionner le type d'evenement"
              v-model:value="props.evenement.type"
            />
          </NFormItemGi>
          <NFormItemGi :span="7" label="date de l'evenement">
            <n-input v-model:value="props.evenement.date">
              <template #suffix>
                <n-icon :component="calendar" />
              </template>
            </n-input>
          </NFormItemGi>
          <NFormItemGi :span="6" label="l'heure">
            <n-input v-model:value="props.evenement.Heure">
              <template #suffix>
                <n-icon :component="time" />
              </template>
            </n-input>
          </NFormItemGi>
          <NFormItemGi :span="24" label="description sur l'evenement">
            <NInput
              v-model:value="props.evenement.description"
              type="textarea"
              :autosize="{
                minRows: 6,
                maxRows: 6,
              }"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <template #footer>
        <n-space justify="end">
          <NButton type="warning" @click="onClose">Fermer</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import {
  NModal,
  NCard,
  NSpace,
  NButton,
  NInput,
  NIcon,
  NGrid,
  NFormItemGi,
  NSelect,
  NTimePicker,
  NForm,
} from "naive-ui";
import {
  TimeOutline as time,
  CalendarOutline as calendar,
} from "@vicons/ionicons5";

const emit = defineEmits(["close"]);

const props = defineProps({
  title: String,
  showModal: Boolean,
  evenement: Object,
});

const onClose = () => {
  emit("close");
};
</script>
