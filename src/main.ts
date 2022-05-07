import Vue from 'vue'
import { client } from "./server";

import Framework7 from 'framework7/framework7.esm.bundle.js'
import 'framework7/css/framework7.bundle.css';

import "./css/icons.css";
import "./css/app.less";
import "./css/fonts.css";

import VueCompositionApi, { provide } from '@vue/composition-api';

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'

import { f7 } from "framework7-vue";

import firebase from "firebase/app";
import "firebase/auth";

import electron from "electron";
import remote from "@electron/remote";

// Init F7-Vue Plugin
Framework7.use(Framework7Vue);

Vue.use(VueCompositionApi);
Vue.config.productionTip = false

new Vue({
  setup() {
    provide(DefaultApolloClient, client)
  },
  render: h => h(App),
  data: () => ({
    user: false,
    email: "",
    password: "",
    isMac: process.platform == "darwin",
  }),
  mounted() {
    // Close popups on escape
    window.addEventListener("keydown", (e) => {
      //Input guard
      if (
        document.activeElement!.tagName != "INPUT" &&
        document.activeElement!.tagName != "TEXTAREA"
      ) {
        //Navigate to page depending on key
        if (e.key == "Escape") {
          f7.popup.close();
          f7.popover.close();
        }
      }
    });
  },
  methods: {
    initialize() {
      this.user = true;
      f7.loginScreen.close();

      //Electron menu initialization
      if (this.isMac) {
        (remote.Menu.getApplicationMenu() as any).getMenuItemById(
          "preferences"
        ).enabled = true;
      }

      //Setup recivers
      electron.ipcRenderer.on("preferences", (event, message) => {
        f7.popup.open(".popup-user");
      });
    },
    login() {
      return {
        signIn: () => {
          //Firebase sign in
          if (this.email != "" && this.password != "") {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => {
                return firebase
                  .auth()
                  .signInWithEmailAndPassword(this.email, this.password)
                  .then((user) => {
                    console.log(user);

                    this.initialize();
                    f7.loginScreen.close();
                  })
                  .catch((error) => {
                    console.log(error.message);

                    const options = {
                      buttons: ["Try Again", "I forgot my password", "Cancel"],
                      message: "Sign In",
                      detail:
                        "Incorrect email or password. You can reset your password by contacting your administrator",
                      defaultId: 0,
                    };
                  });
              })
              .catch(function (error) {
                // Handle Errors here.
                console.log(error.message);
              });
          } else {
            const options = {
              buttons: ["OK"],
              message: "Sign In",
              detail: "Please enter a valid email and password",
              defaultId: 0,
            };
          }
        },
        signOut: () => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              f7.popup.close();
              this.user = false;
              f7.loginScreen.open(".login-screen");
            })
            .catch(function (error) {
              console.log(error.message);
            });
        },
      };
    },
  },
}).$mount('#app')
