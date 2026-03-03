import { defineComponent as l, resolveComponent as e, openBlock as d, createElementBlock as f, createElementVNode as a, renderSlot as i, createVNode as t } from "vue";
import s from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapColorsControls.vue";
import g from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapPageControls.vue";
import T from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTableControls.vue";
import m from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTextStyleControls.vue";
const u = { class: "control-group text-center" }, C = { class: "button-group" }, E = /* @__PURE__ */ l({
  __name: "TipTapToolBar",
  props: {
    editor: {},
    config: {}
  },
  setup(o) {
    const { t: p } = useI18n();
    return computed(() => o.editor.can().chain().focus()), computed(() => o.editor.chain().focus()), (n, h) => {
      const c = e("TipTapFontControls"), r = e("TipTapListsControls");
      return d(), f("div", u, [
        a("div", C, [
          i(n.$slots, "start"),
          t(m, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(c, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(s, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(r, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(T, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(g, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          i(n.$slots, "end")
        ])
      ]);
    };
  }
});
export {
  E as default
};
