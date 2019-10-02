<template>
  <v-app :class="{ 'theme-changing': themeChanging }">
    <side-navigation-drawer />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNavigationDrawer from "./components/SideNavigationDrawer/index.vue";
import GlobalEvent from "@/utils/globalevent";

@Component({
  components: {
    SideNavigationDrawer
  }
})
export default class App extends Vue {
  private themeChanging = false;
  private created() {
    GlobalEvent.$on("start-theme-change", () => (this.themeChanging = true));
    GlobalEvent.$on("end-theme-change", () => (this.themeChanging = false));
  }
}
</script>
