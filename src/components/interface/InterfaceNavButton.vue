<template>
  <f7-link
    class="navigation-button"
    v-bind:class="{ compress: compress, tall: subtitle }"
  >
    <slot></slot>
    <div v-if="subtitle" class="subtitle-container">
      <span>{{ subtitle }}</span>
    </div>
  </f7-link>
</template>

<script lang="ts">
export default {
  name: "NavButton",
  props: {
    compress: {
      type: Boolean,
      default: true,
    },
    subtitle: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.navigation-button {
  display: flex;
  margin-top: 13px;
  align-items: center;
  justify-content: center;
  max-width: 45px;
  margin-right: 5px;
  width: 33px;
  height: 33px;
  line-height: 40px;
  border-radius: 6px;
  cursor: pointer;
  color: rgb(132, 132, 137);

  i {
    font-size: 24px;
  }

  &.compressed {
    max-width: 33px !important;
    width: 33px !important;
    height: 33px !important;
    margin-right: 2px !important;
  }

  &.tall {
    height: 52px !important;
    align-items: baseline;

    /deep/ i {
      margin-top: -2px;
    }
  }

  .subtitle-container {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 2px;

    span {
      position: absolute;
      bottom: 2px;
      font-size: 12px;
      color: white;
    }
  }
}

.navigation-button:hover {
  background-color: rgb(229, 229, 234);
}

.theme-dark.device-desktop,
.theme-dark.device-tablet {
  .navigation-button {
    color: #8e8e93;
  }

  .navigation-button:hover {
    background-color: rgba(44, 44, 46);
  }
}
</style>
