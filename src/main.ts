import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/utils/css_browser_selector.js";
import "@/plugins/hotkey";
import i18n from "@/plugins/i18n";
import "@/plugins/focus";
import "@/plugins/virtualScroller";
import "@/plugins/liquortree.js";

import "@/sass/main.scss";
import "splitpanes/dist/splitpanes.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
