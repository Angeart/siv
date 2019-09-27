import { HotkeyBind } from "@/plugins/hotkey";
import OS from "@/utils/os";
export default class HotkeyUtils {
  public static detectOSBind(bind: HotkeyBind) {
    let bindStr = "";
    const os = OS.instance;
    if (os.mac) {
      bindStr = bind.mac;
    } else if (os.windows) {
      bindStr = bind.win;
    }

    return bindStr;
  }

  public static format(bind: HotkeyBind) {
    if (bind === undefined) {
      console.error("bind string is undefined");
      return "";
    }
    const combination = HotkeyUtils.detectOSBind(bind);
    if (!combination) {
      return "";
    }
    const baseConvert = (v: string): string => {
      switch (v) {
        case "enter":
          return "⏎";
      }
      return v;
    };
    const macConvert = (v: string): string => {
      switch (v) {
        case "ctrl":
          return "⌃";
        case "shift":
          return "⇧";
        case "meta":
          return "⌘";
        case "alt":
          return "⌥";
      }
      return v;
    };
    return combination
      .split("+")
      .map(v => {
        v = baseConvert(v);
        return (OS.instance.mac ? macConvert(v) : v).toUpperCase();
      })
      .join("");
  }
}
