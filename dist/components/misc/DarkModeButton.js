import { defineComponent as m, watch as c, resolveComponent as d, openBlock as k, createBlock as p, unref as n } from "vue";
import { useDark as f, usePreferredDark as g, useToggle as v } from "@vueuse/core";
import { useI18n as D } from "vue-i18n";
import { useBasicAuthStore as _ } from "HddUiHelpers/stores/basicAuth";
const x = /* @__PURE__ */ m({
  __name: "DarkModeButton",
  setup(h) {
    const r = _(), { t: i } = D(), e = f({
      initialValue: r.options.dark_mode,
      valueLight: "light",
      valueDark: "dark"
    }), a = g({ window });
    c(
      () => r.options.dark_mode,
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
      l(), r.changeOption("dark_mode", e.value ? "dark" : "light");
    }
    return (t, o) => {
      const u = d("Button");
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
  x as default
};
