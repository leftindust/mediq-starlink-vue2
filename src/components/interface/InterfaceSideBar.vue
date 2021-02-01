<template>
  <f7-panel
    v-bind:class="{ 'no-vibrancy': !$root.isMac }"
    left
    reveal
    class="sidebar"
    :close-by-backdrop-click="false"
    :visible-breakpoint="1000"
  >
    <f7-view>
      <f7-page>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </f7-page>
    </f7-view>
  </f7-panel>
</template>

<script lang="ts">
import { f7, f7ready } from "framework7-vue";
import Vue from "vue";

export default Vue.extend({
  name: "SideBar",
  mounted() {
    f7ready(() => {
      const sidebar = f7.panel.get(".sidebar");
      sidebar.open(false);
    });
  },
});
</script>

<style lang="less" scoped>
.panel {
  user-select: none;

  background-color: transparent;

  min-width: 160px;
  max-width: 30vw;

  .page {
    background-color: transparent;

    .page-content {
      &::-webkit-scrollbar {
        display: none;
      }

      width: 100%;
    }

    //App-wide searchbar
    .searchbar.app {
      padding-top: 45px;
    }

    //Sidebar panel button
    .navigation-button {
      position: absolute;
      margin-left: 10px;
      z-index: 10000;

      &:hover {
        background-color: rgb(199, 199, 204);
      }

      &.left-spacing {
        margin-left: 100px;
      }

      .f7-icons {
        font-size: 24px;
        color: rgb(99, 99, 102);
      }
    }

    //Titles
    /deep/ .block-title {
      font-weight: 700;
      color: rgb(142, 142, 147);
      padding: 0;
      font-size: 13px;
      vertical-align: bottom;
      padding-top: 10px;
      user-select: none;

      margin-bottom: 0px;
      margin-left: 0px;
    }

    .block {
      background: transparent;
    }

    /deep/ .treeview-item-root {
      padding-left: 0px;
      padding-right: 0px;

      .treeview-item-content {
        width: 100%;

        .icon {
          color: #2196f3;
          font-size: 20px;
        }

        .treeview-item-label {
          font-size: 15px;
          width: 100%;
        }
      }
    }

    //List view
    /deep/ .list {
      margin: 0 auto;
      ul {
        background-color: transparent;

        .item-title {
          font-size: 15px;
          font-weight: 400;
          color: rgb(44, 44, 46);
        }

        .item-text {
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
        }

        .f7-icons {
          font-size: 22px;
        }
      }
    }

    //Menu items
    .content {
      padding-left: 19px;
      padding-right: 19px;
    }

    //Footer items
    .footer {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: var(--f7-panel-width);
      max-width: 100%;

      /deep/ .list {
        width: var(--f7-panel-left-width);
      }

      /deep/ .item-title {
        font-size: 17px !important;
        font-weight: 600 !important;
      }
    }
  }
}

//Dark theme specific styling
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
  .panel {
    border-right: 1px solid black;

    /deep/ ul {
      .item-title {
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
