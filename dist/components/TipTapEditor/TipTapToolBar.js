import { _ as f } from "../../TipTapListsControls.vue_vue_type_script_setup_true_lang-qvKHcyHe.js";
import { _ as l } from "../../TipTapFontControls.vue_vue_type_script_setup_true_lang-DeyVKOKJ.js";
import { defineComponent as d, computed as n, openBlock as a, createElementBlock as m, createElementVNode as s, renderSlot as e, createVNode as t } from "vue";
import g from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapColorsControls.vue";
import u from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapPageControls.vue";
import T from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTableControls.vue";
import C from "HddUiHelpers/components/TipTapEditor/ToolbarComponents/TipTapTextStyleControls.vue";
import { useI18n as p } from "vue-i18n";
const h = { class: "control-group text-center" }, $ = { class: "button-group" }, F = /* @__PURE__ */ d({
  __name: "TipTapToolBar",
  props: {
    editor: {},
    config: {}
  },
  setup(o) {
    const { t: B } = p();
    return n(() => o.editor.can().chain().focus()), n(() => o.editor.chain().focus()), (i, b) => {
      const r = l, c = f;
      return a(), m("div", h, [
        s("div", $, [
          e(i.$slots, "start"),
          t(C, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(r, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(g, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(c, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(T, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          t(u, {
            editor: o.editor,
            config: o.config
          }, null, 8, ["editor", "config"]),
          e(i.$slots, "end")
        ])
      ]);
    };
  }
});
export {
  F as default
};
