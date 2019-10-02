<template>
  <span class="system">{{ label }}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { HotkeyBind } from "@/plugins/hotkey";
import HotkeyUtils from "@/utils/hotkeyUtils";
@Component
export default class HotkeyLabel extends Vue {
  @Prop({ type: Object }) private bind!: HotkeyBind;
  @Prop({ type: Boolean, default: true }) private withBracket!: boolean;
  get label() {
    const label = HotkeyUtils.format(this.bind);
    if (this.withBracket) {
      return "(" + label + ")";
    }
    return label;
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: ".SF NS Symbols";
  src: url("~@/assets/fonts/SFNSSymbols-Thin.otf") format("opentype");
}
.mac .system {
  font-family: ".SF NS Symbols";
}
.system {
  margin-left: 1em;
}
</style>
