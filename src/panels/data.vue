<template>
  <f7-page class="theme-secondary" name="data">
    <template #fixed>
      <AppBar view="data" :navigation="false" :root="false">
        <template #left>
          <NavButton compress class="panel-close"
            ><f7-icon f7="xmark_circle_fill"></f7-icon
          ></NavButton>
        </template>
        <template #search-full>
          <f7-searchbar
            placeholder="Search"
            inline
            custom-search
            :disable-button="false"
          ></f7-searchbar>
        </template>
      </AppBar>
    </template>
    <f7-block class="no-margin-bottom"> </f7-block>
  </f7-page>
</template>

<script lang="ts">
import { f7ready } from "framework7-vue";
import Vue from "vue";

import AppBar from "../components/interface/InterfaceAppBar.vue";
import NavButton from "../components/interface/InterfaceNavButton.vue";

export default Vue.extend({
  components: {
    AppBar,
    NavButton,
  },
});
</script>

<style lang="less" scoped>
.data-pieces {
  margin-top: 60px;

  .link {
    display: initial;
    color: var(--f7-block-text-color);
  }

  .media-circle {
    margin-bottom: 5px;
  }

  p {
    margin-top: 5px;
    font-size: 13px;
  }
}
</style>
