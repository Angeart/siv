import _Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

class VueFocus {
  public install(vue: typeof _Vue): void {
    vue.directive("focus", {
      inserted: function(el: HTMLElement) {
        el.focus();
      }
    });
  }
}
_Vue.use(new VueFocus());
