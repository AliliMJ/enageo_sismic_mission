<template>
  <n-modal v-model:show="props.showModal" :mask-closable=false>
    <n-card
      style="width: 600px"
      :title="props.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"


      
    >
    <n-scrollbar style="max-height:400px">

   
    <slot></slot>
     </n-scrollbar>
    <template #footer>
      <n-space justify="space-between">
        <div>
          <slot name="action"></slot>

        </div>
        <div>

          <slot name="cancel"></slot>
        </div>

      </n-space>
    </template>
    </n-card>
</n-modal>
</template>

<script setup>
  import { NModal, NCard, NSpace, NScrollbar} from 'naive-ui';
  const props = defineProps({
    title:String,
    showModal:Boolean
  });
</script>