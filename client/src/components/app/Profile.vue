<script setup>
import {
  NCard,
  NTabs,
  NTabPane,
  NSpace,
  NGrid,
  NForm,
  NFormItemGi,
  NInput,
  NSelect,
  NDatePicker,
  NScrollbar,
} from 'naive-ui';
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

            <NCard title="Contact">
              <NForm disabled>
                <NGrid :span="24" :x-gap="24">
                  <NFormItemGi :span="24" label="Email">
                    <NInput value="alili.mohamedlamine@gmail.com" />
                  </NFormItemGi>
                  <NFormItemGi :span="24" label="Numéro de téléphone">
                    <NInput value="0792640179" />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </NCard>
          </NSpace>
          <NCard title="Emploi">
            <!--date emploi, position, fonction-->
          </NCard>
        </NSpace>
      </n-tab-pane>
      <n-tab-pane name="account" tab="Mon compte"> mon compte </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
