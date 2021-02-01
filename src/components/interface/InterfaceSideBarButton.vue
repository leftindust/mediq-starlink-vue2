<template>
  <div
    class="sidebar-button"
    v-bind:class="{
      'left-spacing': $root.isMac && !fullscreen,
    }"
  >
    <NavButton :compress="false" @click.native="toggle">
      <f7-icon f7="sidebar_left"></f7-icon>
    </NavButton>
  </div>
</template>

<script lang="ts">
import { f7 } from "framework7-vue";
import { remote } from "electron";
const win = remote.getCurrentWindow();

import NavButton from "./InterfaceNavButton.vue";

export default {
  name: "SideBarButton",
  components: {
    NavButton,
  },
  data() {
    return {
      fullscreen: false,
    };
  },
  mounted() {
    // Change fullscreen state
    win.on("enter-full-screen", () => {
      this.fullscreen = true;
    });

    win.on("leave-full-screen", () => {
      this.fullscreen = false;
    });
  },
  methods: {
    toggle() {
      f7.panel.toggle(".sidebar");
    },
  },
};
</script>

<style lang="less" scoped>
@media (min-width: 1000px) {
  .sidebar-button {
    display: none;
  }
}

//Sidebar panel button
.sidebar-button {
  position: fixed;
  margin-left: 20px;

  z-index: 10000;

  &.left-spacing {
    margin-left: 100px;
  }
}

.navigation-button {
  &:hover {
    background-color: rgb(199, 199, 204);
  }

  .f7-icons {
    font-size: 24px;
    color: rgb(99, 99, 102);
  }
}

.theme-dark.device-desktop,
.theme-dark.device-tablet {
  .navigation-button {
    &:hover {
      background-color: rgb(58, 58, 60);
    }
    .f7-icons {
      color: rgb(174, 174, 178);
    }
  }
}
</style>
