<script setup>
import { NScrollbar } from 'naive-ui';
const result = await fetch('data.json');
const data = await result.json();

$(function () {
  $('#output').pivotUI(data, {});
});
</script>
<template>
  <div id="output"></div>
</template>

<style scoped>
#output {
  font-family: Verdana;
}
</style>
