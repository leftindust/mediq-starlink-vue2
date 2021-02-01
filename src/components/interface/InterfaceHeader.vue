<template>
  <h3 class="no-margin-bottom">
    <slot></slot>
    {{ title }}
  </h3>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Header",
  props: {
    title: String,
  },
});
</script>
