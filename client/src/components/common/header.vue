<template>
        <NSpace justify="end" class="space">
            <n-image
    width="500"
    src="../../assets/ENAGEOTEXT.png"/>
            <NIcon size="30" class="icon">
            <Persone/>
          </NIcon>
        </NSpace>
</template>

<script setup>
import {NSpace , NIcon , NImage} from 'naive-ui';
import { PersonCircleOutline as Persone } from '@vicons/ionicons5';
import compteOption from '../common/compteOptions.vue';
</script>

<style scoped>

.space {
    padding: 0;
}

.icon {
    right: 35px;
}

.logoImg {
width: 20px;
height: 5px;
z-index: 100;
}

</style>