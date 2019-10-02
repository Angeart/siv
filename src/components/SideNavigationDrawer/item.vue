<template>
  <v-tooltip :disabled="disabled" right>
    <template v-slot:activator="{ on }">
      <v-list-item :class="itemClass" link @click="onClick" v-on="on">
        <v-list-item-icon class="activator">
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <slot />
        </v-list-item-title>
      </v-list-item>
    </template>
    <span>
      <slot />
      <slot name="hotkey" />
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class SideNavigationDrawerItem extends Vue {
  @Prop({ type: Object }) private readonly itemClass!: any;
  @Prop({ type: String, required: true }) private readonly icon!: string;
  @Prop({ type: Boolean, default: false }) private readonly disabled!: boolean;
  private onClick(ev: MouseEvent | KeyboardEvent) {
    this.$emit("click", ev);
  }
}
</script>
