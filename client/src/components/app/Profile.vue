<script setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NButton,
  NIcon,
  NGrid,
  NForm,
  NFormItemGi,
  NInput,
  NSelect,
  NDatePicker,
} from "naive-ui";
</script>

<template>
<n-card title="Détails" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="data" tab="Données">
        <NSpace vertical>
          <NSpace>
            <NCard title="Compte">
              <!--nom, prénom, date de naissance, sexe-->
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="12" label="Nom">
                    <NInput value="nom" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Prénom">
                    <NInput value="prenom" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Date de naissance">
                    <NDatePicker :value="new Date()" type="date" />
                  </NFormItemGi>
                  <NFormItemGi :span="12" label="Sexe">
                    <NSelect value="Male" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>

        <n-tab-pane name="compte" tab="Compte">
          <NSpace justify="end" style="margin-bottom: 10px">
            <n-button
              text
              style="font-size: 30px"
              class="trash"
              @click="handleConfirmDeleteUser"
            >
              <n-icon>
                <trash />
              </n-icon>
            </n-button>
            <n-button
              text
              style="font-size: 30px"
              class="pen"
              @click="isEditUser = !isEditUser"
            >
              <n-icon>
                <pen />
              </n-icon>
            </n-button>
            <!-- <n-button type="error" @click="handleConfirmDelete"> supprimer </n-button>
          <n-button type="warning" @click="isEditUser=!isEditUser"> modifier </n-button> -->
          </NSpace>
          <NCard title="details sur le compte">
            <NForm :disabled="isEditUser">
              <NGrid :span="24" :x-gap="24">
                <NFormItemGi :span="12" label="id">
                  <NInput v-model:value="id" disabled />
                </NFormItemGi>
                <NFormItemGi :span="12" label="Email">
                  <NInput v-model:value="userRef.email" />
                </NFormItemGi>
                <NFormItemGi :span="12" label="Role">
                  <NSelect
                    v-model:value="userRef.role"
                    :options="roleOptions"
                  />
                </NFormItemGi>
                <NFormItemGi :span="12" label="date creation de compte">
                  <NDatePicker
                    format="dd/MM/yyyy"
                    v-model:value="userRef.dateCreate"
                    type="date"
                    disabled
                  />
                </NFormItemGi>
              </NGrid>
              <NSpace justify="end">
                <n-button
                  type="success"
                  :disabled="isEditUser"
                  @click="updateUser"
                >
                  Confirmer
                </n-button>
              </NSpace>
            </NForm>
          </NCard>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <NCard
      header-style="display:flex;flex-direction:row-reverse;"
      title="Contact"
      style="margin-bottom: 16px; width: 400px"
    >
      <template #header-extra>
        <n-icon class="contactIcon">
          <contact />
        </n-icon>
      </template>
      <NForm disabled>
        <NGrid :span="12" :x-gap="12">
          <NFormItemGi :span="18" label="Email">
            <NInput v-model:value="userRef.email" />
          </NFormItemGi>
          <NFormItemGi :span="18" label="Numéro de téléphone">
            <NInput value="0541383260" />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NCard>
  </NSpace>
</template>