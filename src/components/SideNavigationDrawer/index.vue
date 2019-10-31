<template>
  <v-navigation-drawer
    :mini-variant="minified"
    :mini-variant-width="56"
    app
    clipped
    permanent
    floating
  >
    <v-list nav dense>
      <side-navigation-drawer-item
        v-hotkey.prevent.push="hotkeys.project"
        :item-class="calculatedClass('home')"
        @click="$router.push('/').catch(err => {})"
        :disabled="!minified"
        icon="home"
      >
        {{ $tc($i18nHint.sideNavigationDrawer.project) }}
      </side-navigation-drawer-item>
      <side-navigation-drawer-item
        v-hotkey.prevent.push="hotkeys.view"
        :item-class="calculatedClass('view')"
        @click="$router.push('/view').catch(err => {})"
        :disabled="!minified"
        icon="photo"
      >
        {{ $tc($i18nHint.sideNavigationDrawer.view) }}
      </side-navigation-drawer-item>
    </v-list>
    <template v-slot:append>
      <v-list nav dense>
        <v-list-item link>
          <v-checkbox v-model="testTheme" />
        </v-list-item>
        <side-navigation-drawer-item
          icon="help"
          @click="showShortcutViewer = true"
          :disabled="!minified"
        >
          {{ $tc($i18nHint.sideNavigationDrawer.shortcutsHelp) }}
        </side-navigation-drawer-item>
        <side-navigation-drawer-item
          v-hotkey.prevent.push="hotkeys.toggleExpand"
          :icon="minified ? 'arrow_forward_ios' : 'arrow_back_ios'"
          @click="minified = !minified"
          :disabled="!minified"
        >
          {{
            minified
              ? $tc($i18nHint.sideNavigationDrawer.expand)
              : $tc($i18nHint.sideNavigationDrawer.collapse)
          }}
        </side-navigation-drawer-item>
      </v-list>
      <shortcut-viewer v-model="showShortcutViewer"></shortcut-viewer>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SideNavigationDrawerItem from "@/components/SideNavigationDrawer/item.vue";
import keymap from "@/configs/keymap";
import HotkeyLabel from "@/components/parts/HotkeyLabel.vue";
import colors from "vuetify/lib/util/colors";
import GlobalEvent from "@/utils/globalevent";
import { setTimeout } from "timers";
import ShortcutViewer from "@/components/dialogs/ShortcutViewer.vue";

@Component({
  components: {
    SideNavigationDrawerItem,
    HotkeyLabel,
    ShortcutViewer
  }
})
export default class SideNavigationDrawer extends Vue {
  public minified = true;
  private hotkeys = keymap.sideNavigationDrawer;
  private testTheme = false;
  private showShortcutViewer = false;
  private showSystemStatusViewer = false;
  @Watch("testTheme")
  private changeTheme() {
    GlobalEvent.$emit("start-theme-change");
    this.$nextTick(() => {
      this.$vuetify.theme.dark = this.testTheme;
      setTimeout(() => GlobalEvent.$emit("end-theme-change"), 300);
    });
  }

  private calculatedClass(path: string) {
    return {
      current: this.$route.name === path
    };
  }
}
</script>
