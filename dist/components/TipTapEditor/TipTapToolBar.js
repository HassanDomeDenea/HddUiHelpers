import { defineComponent as d, computed as i, resolveComponent as e, openBlock as f, createElementBlock as a, createElementVNode as s, renderSlot as r, createVNode as t } from "vue";
import g from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapColorsControls.vue";
import m from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapPageControls.vue";
import T from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTableControls.vue";
import u from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTextStyleControls.vue";
import { useI18n as C } from "vue-i18n";
const p = { class: "control-group text-center" }, h = { class: "button-group" }, N = /* @__PURE__ */ d({
  __name: "TipTapToolBar",
  props: {
    editor: {},
    config: {}
  },
  setup(o) {
    const { t: v } = C();
    return i(() => o.editor.can().chain().focus()), i(() => o.editor.chain().focus()), (n, B) => {
      const c = e("TipTapFontControls"), l = e("TipTapListsControls");
      return f(), a("div", p, [
        s("div", h, [
          r(n.$slots, "start"),
          t(u, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(c, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(g, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(l, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(T, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(m, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          r(n.$slots, "end")
        ])
      ]);
    };
  }
});
export {
  N as default
};
