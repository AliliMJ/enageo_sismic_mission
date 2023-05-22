<template>
    <n-modal v-model:show="props.showModal" :mask-closable="false" size="huge">
      <n-card
        style="width: 700px; height: 550px"
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
          signaler un nouveau evenement
        </NSpace>
        <NGrid :span="24" :x-gap="25">
            <NFormItemGi :span="12" label="titre">
              <NInput v-model:value="titreRef"  />
            </NFormItemGi>
            <NFormItemGi :span="12" label="type d'evenement">
              <NSelect
                placeholder="selectionner le type d'evenement"
                v-model:value="typeRef"
                :options="typeOptions"
              />
            </NFormItemGi>
            <NFormItemGi :span="6" label="date de l'evenement">
          <NDatePicker
            format="dd/MM/yyyy"
            type="date"
            placeholder="la date"
            v-model:value="dateRef"
          />
        </NFormItemGi>
        <NFormItemGi :span="6" label="l'heure">
            <n-time-picker  
             v-model:formatted-value="heureRef" 
             value-format="HH:mm"
             format="HH:mm" />
        </NFormItemGi>
        <NFormItemGi :span="24" label="description sur l'evenement" >
              <NInput 
              v-model:value="descriptionRef"
              type="textarea" 
              :autosize="{
              minRows: 6,
              maxRows: 6,
            }"  />
            </NFormItemGi>
          </NGrid>
        <template #footer>
      <n-space justify="end">
          <NButton @click="onConfirm" value="success" type="success"
            >Confirmer</NButton
          >
          <NButton @click="onCancel">Annuler</NButton>
        </n-space>
    </template>
      </n-card>
    </n-modal>
  </template>
  
  <script setup>
  import axios from 'axios';
  import {
    NModal,
    NCard,
    NSpace,
    NButton,
    NInput,
    NIcon,
    NDataTable,
    useDialog,
    useMessage,
    NGrid,
    NFormItemGi,
    NSelect,
    NDatePicker,
    NTimePicker
  } from "naive-ui";
  import { SearchOutline as search } from '@vicons/ionicons5';
  import MaterielTag from 'common/MaterielTag.vue';
  import { h } from 'vue';
  import { ref, watch } from 'vue';
  const emit = defineEmits(['confirm', 'cancel']);
  
  const message = useMessage();
  const dialog = useDialog();

  const titreRef = ref();
  const dateRef = ref();
  const heureRef = ref("00:00");
  const typeRef = ref();
  const descriptionRef = ref();
  
  const props = defineProps({
    title: String,
    showModal: Boolean,
    idProjet: Number,
    nb : Number
  });
  
 const typeOptions = [
    {
        label : "accident",
        value : "ACCIDENT"
    },
    {
        label : "vol",
        value : "VOL"
    }
];

  const onConfirm = async () => {
    //console.log(titreRef.value+" "+typeRef.value+" "+new Date(dateRef.value).toLocaleDateString('fr')+" "+heureRef.value+" "+descriptionRef.value);
    if((titreRef.value!=null)&&(typeRef.value!=null)&&(dateRef.value!=null)&&(descriptionRef.value!=null)){
    const event = {
        id : props.nb,
        titre : titreRef.value,
        type : typeRef.value,
        date : new Date(dateRef.value).toLocaleDateString('fr'),
        Heure : heureRef.value,
        readed : false,
        description : descriptionRef.value
    }
    console.log(event);
    emit('confirm',event);
    titreRef.value = null;
    typeRef.value=null;
    dateRef.value = null;
    heureRef.value="00:00";
    descriptionRef.value=null;
    message.success("l'evenement est bien declancher")
  }else{
    message.error("il faut remplir tous les champs")
  }
  };
  
  const onCancel = () => {
    emit('cancel');
  };
  
  </script>
  
  <style scoped></style>
  