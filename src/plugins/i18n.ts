import Vue from "vue";
import VueI18n from "vue-i18n";

import LocaleJA from "@/configs/locales/ja";
import LocaleEN from "@/configs/locales/en";

Vue.use(VueI18n);

interface I18nDictionary {
  [key: string]: I18nDictionary | string;
}
const isI18nDictionary = (x: string | I18nDictionary): x is I18nDictionary =>
  x instanceof Object;

////////////////////////////////////////////////////////////
// Local Assertion
// has to derived local keys exists in fallbackLocale transitions
////////////////////////////////////////////////////////////
type fallbackLocale = typeof LocaleEN;
type AssertIsExtendedLocalEN<B, T> = B extends T ? boolean : never;
const _LocalJAisExntendedLocalEN: AssertIsExtendedLocalEN<
  fallbackLocale,
  typeof LocaleJA
> = true;
////////////////////////////////////////////////////////////

function generatePathMap<T extends string | I18nDictionary>(
  obj: T,
  basePath = ""
) {
  return Object.keys(obj).reduce((result, key) => {
    const path = basePath === "" ? key : `${basePath}.${key}`;
    if (isI18nDictionary(obj) && isI18nDictionary(obj[key])) {
      result[key] = generatePathMap(obj[key], path);
    } else {
      result[key] = path;
    }
    return result;
  }, Object.create(null)) as T;
}

const vueI18nHint = generatePathMap(LocaleEN);

Vue.use((vue: typeof Vue): void => {
  vue.prototype.$i18nHint = vueI18nHint;
});

declare module "vue/types/vue" {
  interface Vue {
    $i18nHint: typeof vueI18nHint;
  }
}

export default new VueI18n({
  locale: navigator.language,
  fallbackLocale: "en",
  messages: {
    ja: LocaleJA,
    en: LocaleEN
  },
  silentFallbackWarn: true
});
