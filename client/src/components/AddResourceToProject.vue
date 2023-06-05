<script setup>
import axios from 'axios';
import {
  NModal,
  NSelect,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NButton,
  NSpace,
} from 'naive-ui';
import { firstLetterUpperCase } from '../utils/format';

const resource = ref({ title: null, data: {} });

const options = ref([]);
const loading = ref(false);
const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(['confirm', 'close', 'error']);
function onBlur() {
  if (resource.value.title?.length == 0) {
    resource.value = { title: null, data: {} };
    options.value = [];
  }
}
function confirm() {
  let data = {},
    stock = {};
  Object.keys(resource.value.data).forEach((k) => {
    if (resource.value.data[k].type == 'stock')
      stock[k] = resource.value.data[k].value;
    else
      data[k] = resource.value.data[k].value ?? resource.value.data[k].default;
  });
  for (let k in stock) {
    if (stock[k] == null)
      return emit('error', 'Veuillez remplir tous les champs de stock');
    if (stock[k] <= 0)
      return emit(
        'error',
        'Une valeur de stock doit être strictement positive'
      );
  }

  emit('confirm', {
    title: resource.value.title,
    resource: resource.value._id,
    data: {
      ...data,
    },
    stock,

    rules: resource.value.rules,
  });
}

function close() {
  emit('close');
}
function handleSelect(value, option) {
  resource.value = option.resource;
}

async function handleSearch(query) {
  if (query.length > 0) {
    loading.value = true;
    const resources = (
      await axios.get('http://localhost:3000/resource?title=' + query)
    ).data;

    options.value = resources.map((r) => ({
      label: r.title,
      value: r.title,
      resource: r,
    }));
    loading.value = false;
    resource.value = resources[0];
    if (resource.value == undefined) {
      options.value = [];
      resource.value = { title: query, data: {} };
    }

    // let defs = {};
    // Object.keys(resource.value.data).forEach((k) => {
    //   if (resource.value.data[k].default != undefined)
    //     defs[k] = resource.value.data[k].default;
    // });

    //model.value = defs;
  } else {
    options.value = [];
    resource.value = { title: query, data: {} };
  }
}
</script>

<template>
  <n-modal
    v-model:show="props.showModal"
    :mask-closable="false"
    size="large"
    style="max-width: 70%"
  >
    <n-card title="Ajouter une resource au stock">
      <n-form :model="resource">
        <n-form-item label="Titre">
          <n-select
            v-model:value="resource.title"
            filterable
            placeholder="Search Songs"
            :options="options"
            :loading="loading"
            clearable
            remote
            @search="handleSearch"
            @blur="onBlur"
            @update:value="handleSelect"
          />
        </n-form-item>
        <n-form-item
          v-if="resource.data"
          v-for="key of Object.keys(resource.data)"
          :label="firstLetterUpperCase(key)"
        >
          <n-input
            v-if="resource.data[key].type == 'string'"
            v-model:value="resource.data[key].value"
            style="flex-grow: 1"
            placeholder="Remplir ce champ"
            :default-value="resource.data[key].default"
          />
          <n-input-number
            v-else-if="resource.data[key].type == 'number'"
            v-model:value="resource.data[key].value"
            style="flex-grow: 1"
            :show-button="false"
            placeholder="Remplir ce champ"
            :default-value="resource.data[key].default"
          />
          <n-input-number
            v-else-if="resource.data[key].type == 'stock'"
            v-model:value="resource.data[key].value"
            style="flex-grow: 1"
            :show-button="false"
            placeholder="Remplir ce champ"
            :default-value="resource.data[key].default"
            :min="0"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button @click="confirm" type="success">Confirmer</n-button>
          <n-button @click="close">Annuler</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
