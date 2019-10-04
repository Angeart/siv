<template>
  <splitpanes watch-slots class="splitter-overlay">
    <div splitpanes-min="20" splitpanes-size="20" class="siv-nav-tree"></div>
    <div splitpanes-min="20" splitpanes-size="80" class="fit-to-parent">
      <v-btn @click="openSelectDirectoryDialog">Open</v-btn>
    </div>
  </splitpanes>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import Splitpanes from "splitpanes";
import { ipcRenderer } from "electron";

@Component({
  components: {
    Splitpanes
  }
})
export default class Viewer extends Vue {
  public openSelectDirectoryDialog() {
    ipcRenderer.send("open-directory-dialog");
  }
}
</script>
