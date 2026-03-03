import c from "primevue/button";
import { defineComponent as d, watch as m, openBlock as k, createBlock as p, unref as n } from "vue";
import { useDark as f, usePreferredDark as g, useToggle as v } from "@vueuse/core";
import { useBasicAuthStore as D } from "HddUiHelpers/stores/basicAuth";
import { useI18n as h } from "vue-i18n";
const C = /* @__PURE__ */ d({
  __name: "DarkModeButton",
  setup(_) {
    const r = D(), { t: i } = h(), e = f({
      initialValue: r.options.darkMode,
      valueLight: "light",
      valueDark: "dark"
    }), a = g({ window });
    m(
      () => r.options.darkMode,
      (t) => {
        if (console.log("Option Changed Dark Mode", t), t !== "auto") {
          const o = t === "dark";
          o !== e.value && (e.value = o);
        } else
          localStorage.removeItem("vueuse-color-scheme"), e.value !== a.value && (e.value = a.value);
      }
    );
    const l = v(e);
    function s() {
      l(), console.log("H"), r.changeOption("dark_mode", e.value ? "dark" : "light");
    }
    return (t, o) => {
      const u = c;
      return k(), p(u, {
        icon: n(e) ? "i-material-symbols:dark-mode" : "i-material-symbols:dark-mode-outline",
        severity: "secondary",
        text: "",
        title: n(i)("Dark Mode"),
        onClick: o[0] || (o[0] = (B) => s())
      }, null, 8, ["icon", "title"]);
    };
  }
});
export {
  C as default
};
