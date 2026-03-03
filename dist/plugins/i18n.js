import a from "@intlify/unplugin-vue-i18n/messages";
import { createI18n as n } from "vue-i18n";
const o = document?.body.parentElement?.getAttribute("lang") || void 0 || "ar", e = n({
  legacy: !1,
  locale: o,
  // Default locale
  fallbackLocale: "en",
  // Fallback locale
  messages: a,
  missingWarn: !1,
  fallbackWarn: !1
  // missing: (locale, key, instance) => {},
}), r = Object.keys(a || {}), d = {
  install(t) {
    t.use(e);
  }
};
function c() {
  try {
    const t = e.global.t("dir") || "ltr", l = e.global.t("textStart") || "left";
    document.body.style.direction = t, document.body.style.textAlign = l, document.body.dir = t;
  } catch {
  }
}
c();
const b = e.global.t;
export {
  b as __,
  r as availableLocales,
  d as default,
  e as i18n,
  c as setPageDirection
};
