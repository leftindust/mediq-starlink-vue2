<template>
  <f7-page class="theme-secondary" name="notfound">
    <template #fixed>
      <AppBar view="dashboard"></AppBar>
    </template>
    <f7-block>
      <br />
      <h1>Not Found</h1>
      <p>
        Something went wrong on our end: we could not find the document you where
        requesting
      </p>
      <div class="container">
        <f7-button fill large>Report</f7-button>
      </div>
    </f7-block>
  </f7-page>
</template>

<script lang="ts">
import AppBar from "../components/interface/InterfaceAppBar.vue";

export default {
  components: {
    AppBar,
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
