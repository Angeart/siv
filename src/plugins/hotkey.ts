import _Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import HotkeyLabel from "../components/parts/HotkeyLabel.vue";
import OS from "@/utils/os";
import HotkeyUtils from "@/utils/hotkeyUtils";

interface BindValue {
  control: { [key: string]: boolean };
  value: string;
}

interface HotkeyHTMLElement extends HTMLElement {
  _keyMap: BindValue | null;
  _keyHandler: (e: KeyboardEvent) => void;
}

export interface HotkeyBind {
  win: string;
  mac: string;
}

class VueHotKeyController {
  constructor(vue: typeof _Vue) {
    vue.directive("hotkey", {
      bind: this.bind.bind(this),
      unbind: this.unbind.bind(this),
      componentUpdated: this.componentUpdated.bind(this)
    });
  }

  public detectOSBind(bind: HotkeyBind) {
    return HotkeyUtils.detectOSBind(bind);
  }

  private convertKeyMap(bind: HotkeyBind) {
    const bindStr = this.detectOSBind(bind);
    if (!bindStr) {
      return null;
    }
    const bindList = bindStr.toLowerCase().split("+");
    const controlKeys = ["ctrl", "shift", "meta", "alt"];
    const control: { [key: string]: boolean } = bindList
      .filter(v => controlKeys.includes(v))
      .reduce((r, c) => ({ ...r, [c]: true }), Object.create(null));
    return {
      control,
      value: bindList.filter(v => !controlKeys.includes(v))[0]
    };
  }
  private bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const element = el as HotkeyHTMLElement;
    element._keyMap = this.convertKeyMap(binding.value);
    if (element._keyMap === null) {
      return;
    }
    element._keyHandler = (e: KeyboardEvent) => {
      if (binding.modifiers.stop && document.activeElement) {
        const {
          nodeName,
          isContentEditable
        } = document.activeElement as HTMLElement;
        if (isContentEditable) {
          return;
        }
        if (["INPUT", "TEXTAREA", "SELECT"].includes(nodeName)) {
          return;
        }
      }
      if (
        element._keyMap !== null &&
        !!element._keyMap.control.ctrl === e.ctrlKey &&
        !!element._keyMap.control.alt === e.altKey &&
        !!element._keyMap.control.shift === e.shiftKey &&
        !!element._keyMap.control.meta === e.metaKey &&
        element._keyMap.value === e.key.toLowerCase()
      ) {
        if (binding.modifiers.prevent) {
          e.preventDefault();
        }
        let eventName = "hotkey";
        if (binding.modifiers.push) {
          eventName = "click";
        }
        if (vnode.componentInstance) {
          vnode.componentInstance.$emit(eventName);
        } else if (vnode.elm) {
          vnode.elm.dispatchEvent(new CustomEvent(eventName));
        }
      }
    };
    this.injectHotkeyLabel(binding, vnode);
    document.addEventListener("keydown", element._keyHandler);
  }
  private unbind(el: HTMLElement) {
    const element = el as HotkeyHTMLElement;
    document.removeEventListener("keyup", element._keyHandler);
  }
  private componentUpdated(
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ) {
    if (binding.value !== binding.oldValue) {
      this.unbind(el);
      this.bind(el, binding, vnode);
    }
    this.injectHotkeyLabel(binding, vnode);
  }
  private injectHotkeyLabel(binding: DirectiveBinding, vnode: VNode) {
    if (vnode.componentInstance) {
      vnode.componentInstance.$slots.hotkey = [
        (new HotkeyLabel({
          propsData: { bind: binding.value }
        }).$mount() as any)._vnode
      ];
      vnode.componentInstance.$forceUpdate();
    }
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $hotkey: VueHotKeyController;
  }
}

class VueHotkey {
  public install(vue: typeof _Vue): void {
    const controller = new VueHotKeyController(vue);
    vue.prototype.$hotkey = controller;
  }
}
_Vue.use(new VueHotkey());
