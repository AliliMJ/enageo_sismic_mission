<template>
  <n-modal v-model:show='props.showModal' :mask-closable='false' size='huge'>
    <n-card
      style='width: 600px; height: 500px'
      title="ajouter noveau véhicule"
      :bordered='false'
      size='huge'
      role='dialog'
      aria-modal='true'
    >
      <n-scrollbar style='max-height: 400px'>
        <NForm>
          <NGrid :span='16' :x-gap='24'>
            <NFormItemGi :span='10' label='code du véhicule'>
              <NInput v-model:value='materiel.codeMat' />
            </NFormItemGi>
            <NFormItemGi :span='10' label='la marque'>
              <NInput v-model:value='materiel.marque'/>
            </NFormItemGi>
            <NFormItemGi :span='10' label='le modèle'>
                <NInput v-model:value='materiel.modele'/>
            </NFormItemGi>
            <NFormItemGi :span='8' label='Date de service'>
              <NDatePicker
                format='dd/MM/yyyy'
                v-model:value='materiel.dateService'
                type='date'
              />
            </NFormItemGi>
            <NFormItemGi :span='10' label="designation">
              <NInput  v-model:value='materiel.designation'/>
            </NFormItemGi>
            <NFormItemGi :span='10' label="numéro d'immatriculation">
              <NInput  v-model:value='materiel.matricule'/>
            </NFormItemGi>
            <NFormItemGi :span='10' label='type véhicule'>
              <NSelect
                placeholder='type'
                :options='typeOptions'
                v-model:value='materiel.type'
              />
            </NFormItemGi>
          </NGrid>
        </NForm>
      </n-scrollbar>
      <template #footer>
        <n-space justify='end'>
          <NButton @click='onConfirm' value='success' type='success'
            >Confirmer</NButton
          >
          <NButton @click='onCancel'>Annuler</NButton>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import {
  NModal,
  NScrollbar,
  NCard,
  NSpace,
  NButton,
  NGrid,
  NFormItemGi,
  NInput,
  NSelect,
  useMessage,
  NForm,
  NDatePicker
} from 'naive-ui';

const emit = defineEmits(['confirm', 'cancel']);

const message = useMessage();

const materiel = ref({
    codeMat : '',
    marque : '',
    modele : '',
    matricule : '',
    designation : '',
    dateService : (new Date()).valueOf(),
    status : 2,
    type : 1
});

const types = (
  await axios.get(
    `http://localhost:3000/typeMateriel/getAllTypes`
  )
).data;

const typeOptions = [];
types.forEach((element) => {
  typeOptions.push({
    label: element.libelle,
    value: element.idTypeMat,
  });
});

const props = defineProps({
  title: String,
  showModal: Boolean,
});

const onConfirm = () => {
  materiel.value.dateService = new Date(materiel.value.dateService);
  emit('confirm',materiel.value);
};

const onCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.modal {
  width: 400px;
}
</style>
