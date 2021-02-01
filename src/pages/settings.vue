<template>
  <f7-page class="theme-tertiary">
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="popup-close" link="#">Cancel</f7-link>
      </f7-nav-left>
      <f7-nav-title>
        <f7-segmented strong tag="p">
          <f7-button tab-link="#profile" active>Profile</f7-button>
          <f7-button tab-link="#options">Options</f7-button>
          <f7-button tab-link="#theme">Theme</f7-button>
        </f7-segmented>
      </f7-nav-title>
    </f7-navbar>
    <f7-tabs style="margin-top: 20px">
      <f7-tab id="profile" class="page-content" tab-active>
        <f7-block>
          <div class="media-align-center">
            <BoxedMedia text="AG" size="xlarge" color="blue" circle center></BoxedMedia>
          </div>
          <br />
          <f7-block class="text-align-center no-margin-top">
            <h2 style="margin-bottom: 15px">Aydan Gaite</h2>
            <h5 class="no-margin-top">Practitioner</h5>

            <f7-list class="no-hairlines no-margin text-color-red" inset no-chevron>
              <f7-list-item
                @click="$root.login().signOut()"
                title="Sign Out"
                link="#"
              ></f7-list-item>
            </f7-list>
          </f7-block>
        </f7-block>
      </f7-tab>
      <f7-tab id="options" class="page-content"> </f7-tab>
      <f7-tab id="theme" class="page-content">
        <f7-list simple-list inset>
          <f7-list-item>
            <span>Transparency</span>
            <f7-toggle checked></f7-toggle>
          </f7-list-item>
          <f7-block-footer>
            With transparency is enabled, menu bars and other navigation elements may be
            opaque and slightly blured
          </f7-block-footer>
        </f7-list>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script lang="ts">
import Vue from "vue";

import BoxedMedia from "../components/interface/InterfaceBoxedMedia.vue";
export default Vue.extend({
  components: {
    BoxedMedia,
  },
});
</script>
