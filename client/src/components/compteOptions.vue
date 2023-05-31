<script setup>
import { NButton, NIcon, NPopover, NButtonGroup } from "naive-ui";
import {
  EllipsisVertical as OptionIcon,
  TrashOutline as Delete,
  PencilOutline as Pen,
} from "@vicons/ionicons5";

const emit = defineEmits(["delete", "update"]);

function onDeleteButtionClicked() {
  emit("delete");
}

function onUpdateButtionClicked() {
  emit("update");
}
</script>

<template>
  <NPopover trigger="click">
    <template #trigger>
      <NButton circle>
        <template #icon>
          <NIcon>
            <OptionIcon />
          </NIcon>
        </template>
      </NButton>
    </template>
    <NButtonGroup vertical>
      <NButton
        @click="onUpdateButtionClicked"
        class="option-item"
        quaternary
        type="warning"
        >Modifier
        <template #icon>
          <NIcon><Pen /></NIcon>
        </template>
      </NButton>
      <NButton
        @click="onDeleteButtionClicked"
        class="option-item"
        quaternary
        type="error"
        >
        <template #icon>
          <NIcon><Delete /></NIcon>
        </template>
        Supprimer
      </NButton>
    </NButtonGroup>
  </NPopover>
</template>
<style scoped>
.option-item {
  justify-content: start;
}
</style>
