import { defineComponent as c, resolveComponent as d, openBlock as k, createBlock as m, unref as n } from "vue";
import { useDark as p, useToggle as g } from "@vueuse/core";
import { useBasicAuthStore as f } from "HddUiHelpers/stores/basicAuth";
const M = /* @__PURE__ */ c({
  __name: "DarkModeButton",
  setup(v) {
    const r = f(), { t: l } = useI18n(), e = p({
      initialValue: r.options.darkMode,
      valueLight: "light",
      valueDark: "dark"
    }), a = usePreferredDark({ window });
    watch(
      () => r.options.darkMode,
      (t) => {
        if (console.log("Option Changed Dark Mode", t), t !== "auto") {
          const o = t === "dark";
          o !== e.value && (e.value = o);
        } else
          localStorage.removeItem("vueuse-color-scheme"), e.value !== a.value && (e.value = a.value);
      }
    );
    const i = g(e);
    function s() {
      i(), console.log("H"), r.changeOption("dark_mode", e.value ? "dark" : "light");
    }
    return (t, o) => {
      const u = d("Button");
      return k(), m(u, {
        icon: n(e) ? "i-material-symbols:dark-mode" : "i-material-symbols:dark-mode-outline",
        severity: "secondary",
        text: "",
        title: n(l)("Dark Mode"),
        onClick: o[0] || (o[0] = (D) => s())
      }, null, 8, ["icon", "title"]);
    };
  }
});
export {
  M as default
};
