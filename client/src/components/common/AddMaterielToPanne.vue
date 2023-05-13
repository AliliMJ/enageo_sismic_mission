<template>
  <n-modal v-model:show="props.showModal" :mask-closable="false" size="huge">
    <n-card
      style="width: 1400px; height: 700px;"
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
          margin-top: -20px;
          margin-bottom: 10px;
        "
      >
        ajouter une materiel a la reparation
      </NSpace>
      <NSpace class="parent" justify="space-between">
        <NSpace vertical>
          <NSpace vertical class="child1">
            <NSpace justify="space-between">
              <NSpace style="font-size: 20px; font-weight: bold">
                les materiels
              </NSpace>
              <searchGoodMateriel
                :idProjet="props.idProjet"
                @sendGoodMateriel="getGoodMateriel"
                style="width: 230px"
              />
            </NSpace>
            <NSpace>
              <STable
                @onRowClicked="handleClick"
                :data="goodMateriel"
                :columns="cols"
                style="font-size: 13px"
              />
            </NSpace>
          </NSpace>
          <NSpace class="child3">
            <NSpace style="font-size:20px;font-weight:bold;margin-bottom: 10px;"> Reparation </NSpace>
            <NGrid :span="24" :x-gap="15" :y-gap="0">
              <NFormItemGi :span="5" label="code matricule">
                <NInput />
              </NFormItemGi>
              <NFormItemGi :span="5">
                <NSpace vertical>
                  <n-popover trigger="hover">
                    <template #trigger>
                      <NDatePicker format="dd/MM/yyyy" type="date" />
                    </template>
                    <span
                      >date de la panne</span
                    >
                  </n-popover>

                  <n-popover trigger="hover">
                    <template #trigger>
                      <NDatePicker format="dd/MM/yyyy" type="date" />
                    </template>
                    <span
                      >date de reparation</span
                    >
                  </n-popover>
                </NSpace>
              </NFormItemGi>
              <NFormItemGi :span="14" label="detail sur le probleme">
                <NInput
                  style="height: 100px; resize: none"
                  type="textarea"
                  placeholder="details"
                  autosize="false"
                />
              </NFormItemGi>
            </NGrid>
          </NSpace>
        </NSpace>

        <NSpace class="child2" vertical>
          <NSpace class="panneTitle"> les pannes </NSpace>
          <n-divider style="margin-top: 10px; margin-bottom: 10px" />
          <NSpace>
            <n-scrollbar style="max-height: 460px">
              <n-dynamic-input
                v-model:value="customValue"
                :on-create="onCreate"
              >
                <template #create-button-default> ajouter les pannes </template>
                <template #default="{ value }">
                  <div class="panneParent">
                    <n-input
                      class="div1"
                      v-model:value="value.designation"
                      type="text"
                    />
                    <n-input-number v-model:value="value.cout" class="div2" />
                    <n-input
                      class="div3"
                      v-model:value="value.description"
                      type="textarea"
                    />
                  </div>
                </template>
              </n-dynamic-input>
            </n-scrollbar>
          </NSpace>
        </NSpace>
      </NSpace>
      <n-space justify="end" style="margin-bottom: 0px; margin-top: 15px">
        <NButton @click="onConfirm" value="success" type="success"
          >Confirmer</NButton
        >
        <NButton @click="onCancel">Annuler</NButton>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import {
  NModal,
  NScrollbar,
  NCard,
  NSpace,
  NButton,
  NGrid,
  NFormItemGi,
  NGridItem,
  NInput,
  NSelect,
  useMessage,
  NDynamicInput,
  NCheckbox,
  NInputNumber,
  NDivider,
  NDatePicker,
  NPopover,
} from "naive-ui";
import STable from "common/STable.vue";
import { h } from "vue";
import StatusTag from "common/StatusTag.vue";
import searchGoodMateriel from "common/SearchGoodMateriel.vue";

const emit = defineEmits(["confirm", "cancel"]);

const message = useMessage();

const props = defineProps({
  title: String,
  showModal: Boolean,
  idProjet: String,
});

const customValue = ref([
  {
    designation: "designation de la panne",
    cout: 0,
    description: "description de la panne",
  },
]);

function onCreate() {
  return {
    designation: "designation de la panne",
    cout: 0,
    description: "description de la panne",
  };
}

const searchGood = ref("");

const idProjet = ref(props.idProjet);

const goodMateriel = ref([]);

goodMateriel.value = (
  await axios.get(
    `http://localhost:3000/material/materielGoodByProject/${idProjet.value}`
  )
).data;

const cols = [
  { title: "code materiel", key: "codeMat" },
  { title: "designation", key: "designation" },
  { title: "matricule", key: "matricule" },
  {
    title: "Status",
    key: "status",
    render(row) {
      return h(StatusTag, { enPanne: row.enPanne });
    },
  },
];

function afficher() {
  console.log(
    "--> " + customValue.value[customValue.value.length - 1].designation
  );
}

const handleClick = (materielEnPanne) => {};

const onConfirm = () => {};

const onCancel = () => {
  emit("cancel");
};

function getGoodMateriel(materiels) {
  goodMateriel.value = materiels;
}
</script>

<style scoped>
.card {
  height: 600px;
}

 .panneTitle {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0px;
}
.child1 {
  background-color: rgb(252, 252, 252);
  width: 48vw;
  height: 343px;
  margin: 0px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.child2 {
  background-color: rgb(252, 252, 252);
  width: 32vw;
  height: 552px;
  margin: 0px;
  padding: 15px 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.child3 {
  background-color: rgb(252, 252, 252);
  width: 48.65vw;
  height: 180px;
  margin: 0px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.panneParent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: 75vw;
  height: 130px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
  width: 250px;
  height: 35px;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
  width: 100px;
}
.div3 {
  grid-area: 2 / 1 / 3 / 3;
}
</style> 
