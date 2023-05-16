<script setup>
const result = await fetch('data.json');
const data = await result.json();

$(function () {
  $('#output').pivotUI(data, {}, false, 'fr');
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
