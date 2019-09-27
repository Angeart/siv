import { UAParser } from "ua-parser-js";

export default class OS {
  private static _instance: OS;
  private os: IUAParser.IOS;

  private constructor() {
    this.os = new UAParser().getOS();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new OS();
    }
    return this._instance;
  }

  public get mac() {
    if (!this.os.name) {
      return false;
    }
    return this.os.name === "Mac OS";
  }

  public get windows() {
    if (!this.os.name) {
      return false;
    }
    return this.os.name === "Windows";
  }
}
