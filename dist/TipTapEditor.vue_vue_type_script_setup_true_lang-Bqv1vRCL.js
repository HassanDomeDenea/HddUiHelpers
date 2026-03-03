import { _ as C } from "./TipTapTextStyleControls.vue_vue_type_script_setup_true_lang-OwrJTqtV.js";
import { defineComponent as N, useModel as V, ref as w, watch as s, unref as o, openBlock as i, createElementBlock as u, normalizeClass as A, createBlock as c, withCtx as m, renderSlot as g, Fragment as b, renderList as T, resolveDynamicComponent as y, mergeProps as h, createCommentVNode as a, createElementVNode as M, createVNode as x, mergeModels as F } from "vue";
import L from "@tiptap/extension-highlight";
import { ListItem as E } from "@tiptap/extension-list";
import P from "@tiptap/extension-subscript";
import z from "@tiptap/extension-superscript";
import { TableKit as H } from "@tiptap/extension-table";
import $ from "@tiptap/extension-text-align";
import { LineHeight as K, Color as R, TextStyle as d, FontSize as U, FontFamily as D } from "@tiptap/extension-text-style";
import { Placeholder as I } from "@tiptap/extensions";
import j from "@tiptap/starter-kit";
import { useEditor as q, EditorContent as G } from "@tiptap/vue-3";
import { BubbleMenu as J } from "@tiptap/vue-3/menus";
import { CustomParagraph as O } from "HddUiHelpers/components/TipTapEditor/Extensions/CustomParagraphExtension.ts";
import Q from "HddUiHelpers/components/TipTapEditor/Extensions/PageBreaker/TipTapPageBreakerNodeExtension.ts";
import W from "HddUiHelpers/components/TipTapEditor/TipTapToolBar.vue";
import B from "primevue/button";
const X = {
  class: "tiptap-bubble-menu",
  dir: "ltr"
}, ge = /* @__PURE__ */ N({
  __name: "TipTapEditor",
  props: /* @__PURE__ */ F({
    config: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: p }) {
    const l = V(e, "modelValue"), t = q({
      content: l.value,
      editable: !(e.config?.disabled || e.config?.readonly),
      extensions: [
        $.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: e.config?.defaultAlignment
        }),
        R.configure({ types: [d.name, E.name] }),
        d.configure({}),
        U.configure({
          types: [d.name, E.name]
        }),
        D.configure({}),
        z,
        P,
        L.configure({
          multicolor: !0
        }),
        H.configure({
          table: { resizable: !0 }
        }),
        j.configure({
          paragraph: !1
        }),
        K,
        O,
        Q,
        I.configure({
          placeholder: e.config?.placeholder ?? "…"
        }),
        ...e.config?.extraExtensions ?? []
      ],
      onUpdate: v
    }), f = w(l.value);
    function v() {
      f.value = t.value.getHTML(), l.value = f.value;
    }
    return s(l, (n) => {
      n !== f.value && t.value.chain().focus().setContent(n).run();
    }), s(
      () => !(e.config?.disabled || e.config?.readonly),
      (n) => {
        t.value.setEditable(n);
      }
    ), p({ editor: t }), (n, S) => {
      const k = C;
      return o(t) ? (i(), u("div", {
        key: 0,
        class: A(e.config.containerClass)
      }, [
        o(t).isEditable ? (i(), c(W, {
          key: 0,
          editor: o(t),
          config: e.config
        }, {
          start: m(() => [
            g(n.$slots, "toolbarStart", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarStartButtons ? (i(!0), u(b, { key: 0 }, T(e.config.extraToolbarStartButtons instanceof Array ? e.config.extraToolbarStartButtons : e.config.extraToolbarStartButtons({ editor: o(t), config: e.config }), (r) => (i(), c(y(r.component ?? o(B)), h({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          end: m(() => [
            g(n.$slots, "toolbarEnd", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarEndButtons ? (i(!0), u(b, { key: 0 }, T(e.config.extraToolbarEndButtons instanceof Array ? e.config.extraToolbarEndButtons : e.config.extraToolbarEndButtons({ editor: o(t), config: e.config }), (r) => (i(), c(y(r.component ?? o(B)), h({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          _: 3
        }, 8, ["editor", "config"])) : a("", !0),
        o(t).isEditable ? (i(), c(o(J), {
          key: 1,
          editor: o(t),
          options: { placement: "bottom", offset: 8 }
        }, {
          default: m(() => [
            M("div", X, [
              x(k, {
                editor: o(t),
                config: e.config,
                "with-alignments": !1,
                "with-scripts": !1
              }, null, 8, ["editor", "config"])
            ])
          ]),
          _: 1
        }, 8, ["editor"])) : a("", !0),
        x(o(G), { editor: o(t) }, null, 8, ["editor"]),
        a("", !0)
      ], 2)) : a("", !0);
    };
  }
});
export {
  ge as _
};
