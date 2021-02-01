<template>
  <span class="error block media-center">
    <p class="text-align-center">
      <f7-icon :color="color" :ios="`f7:${icon}`"></f7-icon>
    </p>
    <f7-list class="no-margin text-align-center" media-list inset>
      <h4>{{ title }}</h4>
      <f7-list-item class="master-detail-selected" :text="reason"> </f7-list-item>
      <p></p>
      <h6 class="one-line-word-clamp error-message">{{ message }}</h6>
    </f7-list>
    <f7-block>
      <f7-row>
        <f7-col width="100">
          <f7-button color="purple" large>Try Again</f7-button>
        </f7-col>
      </f7-row>
      <br />
      <f7-block-footer class="text-align-center"
        >If this problem persists you can <a>report this error</a> to notify our support
        team</f7-block-footer
      >
    </f7-block>
  </span>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Error",
  props: {
    title: {
      type: String,
      default: "There has been an error",
    },
    reason: {
      type: String,
      default: "This is likely an error related to your internet connection",
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "wifi_exclamationmark",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
});
</script>

<style lang="less" scoped>
.f7-icons {
  font-size: 35px;
}
/*
.error {
    height: 100%;
    position: absolute;
    top: 750%;
    padding-left: 10px;
    padding-right: 10px;
}
*/
</style>
