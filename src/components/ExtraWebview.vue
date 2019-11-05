<template>
  <div class="webview-wrapper">
    <!--toolbar-->
    <v-toolbar dark flat dense fixed class="webview-toolbar" height="50">
      <v-btn @click="goBack" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn @click="goForward" icon>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
      <v-btn @click="reload" icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn @click="goHome" icon>
        <v-icon>home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        dark
        hide-details
        single-line
        solo
        flat
        v-model="url"
        @keypress.enter="loadUrl"
      ></v-text-field>
    </v-toolbar>

    <!--loadingbar-->
    <v-progress-linear
      :indeterminate="loading"
      class="webview-progress-bar"
    ></v-progress-linear>

    <!--webview-->
    <webview
      class="webview-container"
      ref="webview"
      :src="currentUrl"
    ></webview>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import { WebviewTag } from "electron";
@Component
export default class ExtraWebview extends Vue {
  @Prop({ type: String, default: "https://pixiv.net" }) home!: string;
  private currentUrl: string = "";
  private loading: boolean = false;
  private url: string = "";
  get webview() {
    return this.$refs.webview as WebviewTag;
  }
  public goBack() {
    this.webview.canGoBack() && this.webview.goBack();
  }
  public goForward() {
    this.webview.canGoForward() && this.webview.goForward();
  }
  public goHome() {
    this.currentUrl = this.url;
  }
  public reload() {
    this.webview.reload();
  }
  public load() {
    if (!this.webview) {
      return;
    }
    const result = this.url.match(/^([a-zA-Z]+)?:\/\//);
    const protocol = result && result[0];
    if (protocol) {
      if (protocol.match(/^https?/)) {
        this.webview.loadURL(this.url);
      } else {
        console.error("Not supported protocol except for http/https");
      }
    } else {
      const currentProtocol = this.webview.getURL().match(/^(https?:\/\/)/);
      if (currentProtocol) {
        this.webview.loadURL(`${currentProtocol}${this.url}`);
      }
    }
  }
  private setUrlBar(event: Electron.LoadCommitEvent) {
    if (event.isMainFrame) {
      this.url = event.url;
    }
  }
  public mounted() {
    this.currentUrl = this.home;
    if (!this.webview) {
      console.warn("cannot get webview");
      return;
    }
    // loading eventの付与
    this.webview.addEventListener("did-start-loading", () => {
      this.loading = true;
    });
    this.webview.addEventListener("did-stop-loading", () => {
      this.loading = false;
    });

    // commit eventの付与
    this.webview.addEventListener("load-commit", e => {
      this.setUrlBar(e);
    });
  }
}
</script>

<style scoped lang="scss">
.webview-progress-bar {
  margin: 0;
  z-index: 999999;
}

.webview-container {
  display: inline-flex;
  width: 100%;
  height: 100%;
}

.webview-toolbar {
  background-color: var(--nav-color);
}

.webview-wrapper {
  width: 100%;
  height: 100%;
}
</style>
