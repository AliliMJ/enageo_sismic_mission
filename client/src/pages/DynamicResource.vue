<script setup>
import axios from 'axios';
import {
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NForm,
  NFormItem,
  NText,
  NDynamicInput,
  NCard,
  NDivider,
  NSpace,
  NH2,
  NH1,
  NAutoComplete,
  NList,
  NThing,
  NListItem,
  useDialog,
  useMessage,
  NTag,
} from 'naive-ui';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const resourceForm = ref({
  title: null,
  data: [],
  rules: {
    transform: null,
    threshold: null,
  },
});

function onCreateField() {
  return {
    field: null,
    type: null,
    description: null,
    default: null,
  };
}

const coutFields = computed(() => {
  //find the occurence of $
  const expression = resourceForm.value.rules.transform;

  if (expression?.length > 0 && expression[expression?.length - 1] === '$') {
    return resourceForm.value.data.map((f) => ({
      label: expression + f.field,
      value: expression + f.field,
    }));
  }
});
function resetField(index) {
  resourceForm.value.data[index].default = null;
}
const thresholdFields = computed(() => {
  //find the occurence of $
  const expression = resourceForm.value.rules.threshold;

  if (expression?.length > 0 && expression[expression?.length - 1] === '$') {
    return resourceForm.value.data
      .filter((f) => f.type === 'stock')
      .map((f) => ({
        label: expression + f.field,
        value: expression + f.field,
      }));
  }
});

const typeOptions = [
  { label: 'Nombre', value: 'number' },
  { label: 'Texte', value: 'string' },
  { label: 'Booléan', value: 'boolean' },
  { label: 'Stock', value: 'stock' },
];

async function ajouterResource() {
  const data = resourceForm.value.data
    .map((data) => {
      let def;
      if (data.type == 'boolean') def = data.default === 0 ? false : true;
      else def = data.default;

      return {
        [data.field]: {
          type: data.type,
          default: def,
        },
      };
    })
    .reduce((result, obj) => {
      return Object.assign(result, obj);
    }, {});

  const resource = {
    title: resourceForm.value.title,
    data,
    rules: {
      transform:
        'return {title:this.title, coutTotal:' +
        resourceForm.value.rules.transform.replaceAll('$', 'this.') +
        '}',
      threshold:
        'return ' + resourceForm.value.rules.threshold.replaceAll('$', 'this.'),
    },
  };
  await axios.post(`http://localhost:3000/resource`, resource);
  message.success('Une ressource à été créee');
  router.back();
}
</script>

<template>
  <n-h1>Créer un nouveau type de ressource</n-h1>
  <n-card>
    <n-form :model="resourceForm">
      <n-h2>Titre de la ressource</n-h2>
      <NFormItem ignore-path-change :show-label="false">
        <n-input
          v-model:value="resourceForm.title"
          @keydown.enter.prevent
          placeholder="Saissisez un titre pour la nouvelle ressource"
        />
      </NFormItem>
      <n-h2>Définition des champs</n-h2>
      <NDynamicInput
        v-model:value="resourceForm.data"
        :on-create="onCreateField"
      >
        <template #create-button-default> Ajouter plus de données </template>
        <template #default="{ value, index }">
          <NSpace>
            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`data[${index}].field`"
            >
              <n-input
                v-model:value="resourceForm.data[index].field"
                placeholder="Nom du champ"
                @keydown.enter.prevent
              />
            </NFormItem>
            <span> = </span>
            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`data[${index}].type`"
            >
              <n-select
                placeholder="Type"
                v-model:value="resourceForm.data[index].type"
                :options="typeOptions"
                @update:value="resetField(index)"
              />
            </NFormItem>

            <NFormItem
              ignore-path-change
              :show-label="false"
              :path="`data[${index}].default`"
            >
              <n-input
                v-if="resourceForm.data[index].type == 'string'"
                v-model:value="resourceForm.data[index].default"
                @keydown.enter.prevent
                placeholder="Saissisez le texte par défaut"
              />
              <n-select
                v-else-if="resourceForm.data[index].type == 'boolean'"
                placeholder="Saissisez la valeur par défaut"
                v-model:value="resourceForm.data[index].default"
                :options="[
                  { label: 'Vrai', value: 1 },
                  { label: 'Faux', value: 0 },
                ]"
              />
              <n-input-number
                v-else-if="resourceForm.data[index].type == 'number'"
                v-model:value="resourceForm.data[index].default"
                @keydown.enter.prevent
                placeholder="Saissisez une valeur par défaut "
                :show-button="false"
              />
            </NFormItem>

            <NDivider />
          </NSpace>
        </template>
      </NDynamicInput>

      <n-h2>Définition des régles</n-h2>
      <NFormItem ignore-path-change label="Cout total">
        <n-auto-complete
          v-model:value="resourceForm.rules.transform"
          :options="coutFields"
          placeholder="Saissiez une formule mathématique"
          @keydown.enter.prevent
        />
      </NFormItem>
      <NFormItem ignore-path-change label="Seuil minimum">
        <n-auto-complete
          v-model:value="resourceForm.rules.threshold"
          :options="thresholdFields"
          placeholder="Saissiez une formule logique"
          @keydown.enter.prevent
        />
      </NFormItem>
      <n-form-item>
        <n-button type="success" @click="ajouterResource">Ajouter</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>
.n-input-number {
  min-width: 40%;
}
.n-select {
  min-width: 230px;
}
</style>
