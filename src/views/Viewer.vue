<template>
  <splitpanes watch-slots class="splitter-overlay">
    <div splitpanes-min="20" splitpanes-size="20" class="siv-nav-tree">
      <viewer-sidebar></viewer-sidebar>
    </div>
    <div splitpanes-min="20" splitpanes-size="80" class="fit-to-parent">
      <v-container>
        <div class="d-flex">
          <v-btn @click="openSelectDirectoryDialog" icon>
            <v-icon>mdi-folder</v-icon>
          </v-btn>
          <v-breadcrumbs
            class="pr px-2"
            :items="breadcrumbPathList"
            divider=">"
          ></v-breadcrumbs>
        </div>
        <v-divider></v-divider>
      </v-container>
    </div>
  </splitpanes>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import Splitpanes from "splitpanes";
import { ipcRenderer, IpcMessageEvent } from "electron";
import ViewerSidebar from "@/components/ViewerSidebar.vue";
import { IpcRendererSend } from "vue-ipc-decorator";

@Component({
  components: {
    Splitpanes,
    ViewerSidebar
  }
})
export default class Viewer extends Vue {
  private breadcrumbPathList: any[] = [];
  @IpcRendererSend()
  private openDirectory(): any {}
  public async openSelectDirectoryDialog() {
    const filepaths = (await this.openDirectory()) as string[];
    console.log("get responded");
    if (!filepaths || filepaths.length === 0) {
      return;
    }
    let targetURI = filepaths[0];
    this.breadcrumbPathList = [
      ...targetURI
        .split("/")
        .filter(v => v.length > 0)
        .map(p => {
          return { text: p };
        })
    ];
  }
}
</script>
