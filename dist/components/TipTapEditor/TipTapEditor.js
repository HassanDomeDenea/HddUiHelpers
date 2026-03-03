import { defineComponent as k, useModel as N, ref as V, watch as s, resolveComponent as w, unref as o, openBlock as i, createElementBlock as u, normalizeClass as A, createBlock as c, withCtx as d, renderSlot as g, Fragment as b, renderList as T, resolveDynamicComponent as y, mergeProps as h, createCommentVNode as a, createElementVNode as M, createVNode as x, mergeModels as F } from "vue";
import L from "@tiptap/extension-highlight";
import { ListItem as p } from "@tiptap/extension-list";
import P from "@tiptap/extension-subscript";
import z from "@tiptap/extension-superscript";
import { TableKit as H } from "@tiptap/extension-table";
import K from "@tiptap/extension-text-align";
import { LineHeight as R, Color as U, TextStyle as m, FontSize as $, FontFamily as D } from "@tiptap/extension-text-style";
import { Placeholder as I } from "@tiptap/extensions";
import j from "@tiptap/starter-kit";
import { useEditor as q, EditorContent as G } from "@tiptap/vue-3";
import { BubbleMenu as J } from "@tiptap/vue-3/menus";
import { CustomParagraph as O } from "HddUiHelpers/components/TipTapEditor/Extensions/CustomParagraphExtension.ts";
import Q from "HddUiHelpers/components/TipTapEditor/Extensions/PageBreaker/TipTapPageBreakerNodeExtension.ts";
import W from "HddUiHelpers/components/TipTapEditor/TipTapToolBar.vue";
import E from "primevue/button";
const X = {
  class: "tiptap-bubble-menu",
  dir: "ltr"
}, se = /* @__PURE__ */ k({
  __name: "TipTapEditor",
  props: /* @__PURE__ */ F({
    config: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: B }) {
    const l = N(e, "modelValue"), t = q({
      content: l.value,
      editable: !(e.config?.disabled || e.config?.readonly),
      extensions: [
        K.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: e.config?.defaultAlignment
        }),
        U.configure({ types: [m.name, p.name] }),
        m.configure({}),
        $.configure({
          types: [m.name, p.name]
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
        R,
        O,
        Q,
        I.configure({
          placeholder: e.config?.placeholder ?? "…"
        }),
        ...e.config?.extraExtensions ?? []
      ],
      onUpdate: v
    }), f = V(l.value);
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
    ), B({ editor: t }), (n, C) => {
      const S = w("TipTapTextStyleControls");
      return o(t) ? (i(), u("div", {
        key: 0,
        class: A(e.config.containerClass)
      }, [
        o(t).isEditable ? (i(), c(W, {
          key: 0,
          editor: o(t),
          config: e.config
        }, {
          start: d(() => [
            g(n.$slots, "toolbarStart", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarStartButtons ? (i(!0), u(b, { key: 0 }, T(e.config.extraToolbarStartButtons instanceof Array ? e.config.extraToolbarStartButtons : e.config.extraToolbarStartButtons({ editor: o(t), config: e.config }), (r) => (i(), c(y(r.component ?? o(E)), h({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          end: d(() => [
            g(n.$slots, "toolbarEnd", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarEndButtons ? (i(!0), u(b, { key: 0 }, T(e.config.extraToolbarEndButtons instanceof Array ? e.config.extraToolbarEndButtons : e.config.extraToolbarEndButtons({ editor: o(t), config: e.config }), (r) => (i(), c(y(r.component ?? o(E)), h({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          _: 3
        }, 8, ["editor", "config"])) : a("", !0),
        o(t).isEditable ? (i(), c(o(J), {
          key: 1,
          editor: o(t),
          options: { placement: "bottom", offset: 8 }
        }, {
          default: d(() => [
            M("div", X, [
              x(S, {
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
  se as default
};
