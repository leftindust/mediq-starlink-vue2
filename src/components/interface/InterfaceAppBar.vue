<template>
  <f7-navbar>
    <f7-nav-left
      v-bind:class="{
        'left-spacing': $root.isMac && !fullscreen && root,
        'left-spacing-panel': $root.isMac && spacing && !fullscreen && root,
      }"
    >
      <slot name="left"></slot>
      <slot name="search-full"></slot>
    </f7-nav-left>
    <f7-nav-right>
      <slot name="right"></slot>
      <slot name="search"></slot>
    </f7-nav-right>
  </f7-navbar>
</template>

<script lang="ts">
import { f7 } from "framework7-vue";

import Vue from "vue";

export default Vue.extend({
  name: "AppBar",
  props: {
    root: {
      type: Boolean,
      default: false,
    },
    view: String,
    navigation: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    spacing: false,
    fullscreen: false,
  }),
  mounted() {
    // Change spacing based on right panel status
    f7.$(document).on("panel:open", ".panel-right", () => {
      this.spacing = true;
    });

    f7.$(document).on("panel:close", ".panel-right", () => {
      this.spacing = false;
    });
  },
});
</script>

<style lang="less" scoped>
@media (max-width: 1000px) {
  .with-panel-left-reveal {
    .left-spacing {
      margin-left: 0px !important;
      transition: 0.2s;
    }
  }
}

.with-panel-right-reveal {
  .left-spacing-panel {
    margin-left: 90px;
    transition: 0.2s;
  }
}

.navbar {
  margin-bottom: 20px;

  /deep/ .navigation-button {
    flex: 1;
    padding: 10px !important;
    height: 33px;
    width: 100%;
  }

  .right {
    margin-left: 0px;
  }

  .left {
    flex: 1 !important;

    margin-right: 0px;

    transition: margin-left 0.2s;

    @media (max-width: 1000px) {
      &.left-spacing {
        margin-left: 135px;
        transition: 0.2s;
      }
    }

    /deep/ .searchbar {
      width: 100%;

      .searchbar-input-wrap {
        height: 35px;
        border-radius: 12px;
        border: 5px solid transparent;
        transition: border-color 80ms linear;
      }

      .searchbar-input-wrap:focus-within {
        border-color: rgba(0, 122, 255, 0.7);
      }

      @media (max-width: 1000px) {
        margin-left: 15px;
      }
      @media (min-width: 1000px) {
        margin-left: 5px;
      }
    }
  }

  .navbar-bg {
    height: 60px;

    &:after {
      display: none;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;

    margin-right: 20px;

    h6 {
      font-size: 13px;
      text-align: left;
    }
  }

  /deep/ .navigation-button {
    margin-top: 0px;
    line-height: normal;
    align-items: center;
    justify-content: center;
    margin-left: 2px !important;
    margin-right: 2px !important;
    height: 33px;
  }

  .navigation-group {
    margin-right: 30px;
    display: flex;

    &.navigation-controller {
      font-size: 24px;
    }
  }
}

/deep/ .f7-icons {
  font-size: 22px;
}
</style>
