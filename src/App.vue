<template>
  <f7-app :params="f7params">
    <!-- Dragbar -->
    <DragBar/>

    <!-- Login Screen -->
    <f7-login-screen>
      <f7-page login-screen>
        <f7-block class="no-select abstract">
          <video v-if="!$root.user" autoplay muted loop>
            <source src="@/assets/abstract-2.mp4" type="video/mp4"/>
          </video>
          <h2>StarLink</h2>

          <div style="margin-top: 100px">
            <f7-block class="no-padding">
              <f7-block-footer>
                If your clinic has not been initialized with StarLink, you can
                <f7-link>click here to get your clinic started...</f7-link>
              </f7-block-footer>
            </f7-block>
            <div v-if="ready">
              <f7-list inset no-hairlines-md>
                <f7-list-input
                    label="Email"
                    type="email"
                    placeholder="me@domain.com"
                    :value="$root.email"
                    @input="$root.email = $event.target.value"
                >
                </f7-list-input>
                <f7-list-input
                    label="Password"
                    type="password"
                    placeholder="My Password"
                    :value="$root.password"
                    @input="$root.password = $event.target.value"
                >
                </f7-list-input>
              </f7-list>
              <f7-block class="no-padding" style="max-width: 300px">
                <f7-button
                    @click="$root.login().signIn()"
                    class="color-primary rounded"
                    round
                    fill
                >Sign In
                </f7-button
                >
              </f7-block>
              <f7-block class="no-padding">
                <f7-block-footer>
                  Don't have an account? Contact your administrator to get your log-in
                  information.
                  <f7-link link="#">Contact your administrator...</f7-link>
                </f7-block-footer>
              </f7-block>
            </div>
            <f7-block v-if="!ready" class="no-padding" style="max-width: 300px">
              <br/>
              <f7-button @click="ready = !ready" class="color-primary rounded" round fill
              >Continue
              </f7-button
              >
            </f7-block>
          </div>
        </f7-block>
      </f7-page>
    </f7-login-screen>

    <!-- Sidebar Toggle -->
    <SideBarButton v-if="$root.user"></SideBarButton>

    <!-- Sidebar -->
    <SideBar v-if="$root.user">
      <template #content>
        <f7-block-title>Workflows</f7-block-title>
        <f7-treeview class="no-margin">
          <div class="treeview-item">
            <div class="treeview-item-root treeview-item-toggle">
              <div class="treeview-toggle"></div>
              <div class="treeview-item-content" @click="openModule('index.flowmodule')">
                <f7-list
                    class="no-hairlines no-margin"
                    style="width: 100%"
                    inset
                    no-chevron
                >
                  <f7-list-item title="Index" link="#" style="text-transform: capitalize">
                    <f7-icon slot="media" f7="skew"></f7-icon>
                  </f7-list-item>
                </f7-list>
              </div>
            </div>
            <div class="treeview-item-children">
              <f7-list
                  class="no-hairlines no-margin"
                  v-for="(index, module) in filterModules"
                  v-bind:key="module"
                  media-list
                  no-chevron
                  inset
              >
                <f7-list-item
                    :title="module.split('.').slice(0, -1).join('.')"
                    link="#"
                    style="text-transform: capitalize"
                    @click="openModule(module)"
                >
                </f7-list-item>
              </f7-list>
            </div>
          </div>
        </f7-treeview>
      </template>

      <!-- Footer Items -->
      <template #footer>
        <f7-list class="no-hairlines no-margin" media-list no-chevron>
          <f7-list-item
              title="Aydan Gaite"
              text="Practitioner"
              link="#"
              popup-open=".popup-user"
          >
            <BoxedMedia slot="media" :circle="true" text="AG" color="blue"></BoxedMedia>
          </f7-list-item>
        </f7-list>
      </template>
    </SideBar>

    <!-- Profile Page -->
    <f7-popup class="popup-user">
      <f7-view name="settings" id="settings" url="/settings/" :ios-swipe-back="false">
      </f7-view>
    </f7-popup>

    <!-- Data Panels -->
    <f7-panel
        reveal
        right
        :backdrop="false"
        v-bind:class="{ 'no-vibrancy': !$root.isMac }"
    >
      <f7-view
          name="panel"
          id="panel"
          url="/panel/data/"
          :animate="false"
          :ios-swipe-back="false"
      >
      </f7-view>
    </f7-panel>

    <!-- Views -->
    <f7-view main v-if="$root.user" class="theme-secondary">
      <f7-page @page:init="initializeRete">
        <template #fixed>
          <AppBar view="main" root>
            <template #left>
              <NavButton subtitle="Run" onclick="evaluate()">
                <f7-icon color="blue" ios="f7:play_fill"></f7-icon>
              </NavButton>
              <NavButton subtitle="Save"
              >
                <f7-icon ios="f7:floppy_disk"></f7-icon
                >
              </NavButton>
              <NavButton subtitle="Export"
              >
                <f7-icon ios="f7:square_arrow_right_fill"></f7-icon
                >
              </NavButton>
            </template>
            <template #right>
              <NavButton subtitle="Flows" @click.native="panel">
                <f7-icon ios="f7:skew"></f7-icon>
              </NavButton>
            </template>
          </AppBar>
          <div id="rete" class="node-editor" style="overflow: hidden"></div>
        </template>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import Vue from "vue";
import {f7, f7ready} from "framework7-vue";

import firebase from "firebase/app";
import "firebase/auth";

import routes from "./routes";

import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import AreaPlugin from "rete-area-plugin";
import alight from "alight";
import ContextMenuPlugin from "rete-context-menu-plugin";

import data from "@/engine/data.json";
// Components
import {NumberComponent} from "@/engine/components/NumberComponent";
import {MathComponent} from "@/engine/components/MathComponent";

import AppBar from "./components/interface/InterfaceAppBar.vue";
import NavButton from "./components/interface/InterfaceNavButton.vue";

import DragBar from "./components/interface/InterfaceDragBar.vue";
import SideBar from "./components/interface/InterfaceSideBar.vue";
import SideBarButton from "./components/interface/InterfaceSideBarButton.vue";
import BoxedMedia from "./components/interface/InterfaceBoxedMedia.vue";
import {PatientsComponent} from "@/engine/components/PateintsComponent";
import {LazyController} from "@/engine/LazyController";

export default Vue.extend({
  components: {
    AppBar,
    NavButton,
    DragBar,
    SideBar,
    SideBarButton,
    BoxedMedia,
  },
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        id: "com.leftindust.beta", // App bundle ID
        name: "leftindust", // App name
        theme: "ios", // Automatic theme detection

        // App routes
        routes: routes,
      },
      panel: {
        closeByBackdropClick: false,
      },
      ready: false,
      opened: true,
      modules: {
        "index.flowmodule": {
          data: data,
        },
      },
      currentModule: {},
      editor: null,
      controller: new LazyController()
    };
  },
  computed: {
    filterModules() {
      const modules = Object.assign({}, this.modules);
      delete modules["index.flowmodule"];
      return modules;
    },
  },
  methods: {
    evaluate() {
      this.controller.evaluate()
    },
    addModule() {
      this.modules["module" + Object.keys(this.modules).length + ".flowmodule"] = {
        data: this.initialData(),
      };
    },
    initialData() {
      return {id: "starlink@0.0.1", nodes: {}};
    },
    async openModule(name) {
      this.currentModule.data = this.editor.toJSON();
      this.currentModule = this.modules[name];

      await this.editor.fromJSON(this.currentModule.data);
      this.editor.trigger("process");
    },

    async createNode(component, {data = {}, meta = {}, x = 0, y = 0}) {
      const node = await component.createNode(JSON.parse(JSON.stringify(data)));
      node.meta = Object.assign(JSON.parse(JSON.stringify(meta)), node.meta);
      node.position[0] = x;
      node.position[1] = y;

      return node;
    },

    initializeRete() {
      alight("#modules", {
        modules: this.modules,
        addModule: this.addModule,
        openModule: this.openModule,
      });

      const container = document.querySelector("#rete");

      const components = [new NumberComponent(), new MathComponent(), new PatientsComponent(this.controller)];

      this.editor = new Rete.NodeEditor("starlink@0.0.1", container);
      this.editor.use(ConnectionPlugin, {curvature: 0.4});
      this.editor.use(VueRenderPlugin);

      this.editor.use(ContextMenuPlugin, {
        searchBar: false,
        delay: Math.pow(10, 1000),
        rename(component) {
          return component.name;
        },
        items: {
          "Add Component"() {
            f7.panel.open("right");
          },
        },
        nodeItems: {
          Clone: true,
          Delete: true,
        },
      });

      // Support for Command Key
      this.editor.on(
          "multiselectnode",
          (args) => (args.accumulate = args.e.ctrlKey || args.e.metaKey || args.e.shiftKey)
      );
      //this.editor.use(AreaPlugin);
      const engine = new Rete.Engine("starlink@0.0.1");

      components.map((c) => {
        this.editor.register(c);
        engine.register(c);
      });

      this.editor.on("process connectioncreated connectionremoved", async () => {
        if (this.editor.silent) return;

        await engine.abort();
        await engine.process(this.editor.toJSON());
      });

      this.editor.view.resize();
      this.openModule("index.flowmodule").then(() => {
        AreaPlugin.zoomAt(this.editor);
      });

      this.editor.on("showcontextmenu", ({e, node}) => {
        console.log(e.target);
        f7.$(document).click((event) => {
          this.editor.trigger("hidecontextmenu");
        });
      });
    },
  },
  mounted() {
    // Theme initialization
    f7ready(() => {
      f7.$("html").addClass("theme-dark");
      //Check if $root.user logged in
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$root.initialize();
        } else {
          f7.loginScreen.open(".login-screen");
        }
      });
    });
  },
});
</script>
