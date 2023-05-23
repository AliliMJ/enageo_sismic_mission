<script setup>
import '../../dist/jquery/jquery.min.js';
import '../../dist/jquey-ui/jquery-ui.min.js';
import '../../dist/pivot/pivot.js';
import '../../dist/pivot/pivot.fr.min.js';
import '../../dist/pivot/pivot.css';

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
  overflow: scroll;
  word-break: keep-all;
}
</style>
