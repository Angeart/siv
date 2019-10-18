<template>
  <v-dialog
    v-hotkey.prevent.stop="hotkeys.shortcutViewer"
    @hotkey="toggleDialog"
    max-width="80vw"
    width="auto"
    v-model="dialog"
  >
    <v-card>
      <v-card-title>Shortcut keys</v-card-title>
      <v-card-text>
        <v-list
          class="okita-shorcut-viewer-list"
          v-for="(group, key) in keymap"
          :key="key"
        >
          <span class="subtitle-1">{{ startCase(key) }}</span>
          <v-row dense v-for="(item, key) in group" :key="key">
            <v-col class="col-4">
              <hotkey-label :bind="item" :with-bracket="false"></hotkey-label>
            </v-col>
            <v-col class="col-8">
              {{ item.desc || startCase(key) }}
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import keymap from "@/configs/keymap";
import HotkeyUtils from "@/utils/hotkeyUtils";
import startCase from "lodash/startCase";
import HotkeyLabel from "@/components/parts/HotkeyLabel.vue";
@Component({
  components: {
    HotkeyLabel
  }
})
export default class ShortcutViewer extends Vue {
  @Model("input", { type: Boolean, default: false })
  private readonly active!: boolean;
  get dialog() {
    return this.active;
  }
  set dialog(v: boolean) {
    this.$emit("input", v);
  }
  private hotkeys = keymap.general;
  private keymap = keymap;
  private utils = HotkeyUtils;
  private toggleDialog() {
    this.dialog = !this.dialog;
  }
  private startCase = startCase;
}
</script>

<style lang="scss">
@import "@/sass/main.scss";
.okita-shorcut-viewer-list:not(:last-child) {
  border-bottom: 1px solid;
  border-color: var(--color-level-3);
}
</style>
