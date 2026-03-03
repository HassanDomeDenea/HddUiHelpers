import { defineComponent as S, useModel as k, resolveComponent as w, unref as o, openBlock as i, createElementBlock as u, normalizeClass as N, createBlock as c, withCtx as d, renderSlot as s, Fragment as g, renderList as b, resolveDynamicComponent as T, mergeProps as y, createCommentVNode as a, createElementVNode as V, createVNode as h, mergeModels as A } from "vue";
import M from "@tiptap/extension-highlight";
import { ListItem as x } from "@tiptap/extension-list";
import F from "@tiptap/extension-subscript";
import L from "@tiptap/extension-superscript";
import { TableKit as P } from "@tiptap/extension-table";
import z from "@tiptap/extension-text-align";
import { LineHeight as H, Color as K, TextStyle as m, FontSize as R, FontFamily as U } from "@tiptap/extension-text-style";
import { Placeholder as $ } from "@tiptap/extensions";
import D from "@tiptap/starter-kit";
import { useEditor as I, EditorContent as j } from "@tiptap/vue-3";
import { BubbleMenu as q } from "@tiptap/vue-3/menus";
import { CustomParagraph as G } from "HddUiHelpers/components/TipTapEditor/Extensions/CustomParagraphExtension.ts";
import J from "HddUiHelpers/components/TipTapEditor/Extensions/PageBreaker/TipTapPageBreakerNodeExtension.ts";
import O from "HddUiHelpers/components/TipTapEditor/TipTapToolBar.vue";
import p from "primevue/button";
const Q = {
  class: "tiptap-bubble-menu",
  dir: "ltr"
}, de = /* @__PURE__ */ S({
  __name: "TipTapEditor",
  props: /* @__PURE__ */ A({
    config: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: E }) {
    const l = k(e, "modelValue"), t = I({
      content: l.value,
      editable: !(e.config?.disabled || e.config?.readonly),
      extensions: [
        z.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: e.config?.defaultAlignment
        }),
        K.configure({ types: [m.name, x.name] }),
        m.configure({}),
        R.configure({
          types: [m.name, x.name]
        }),
        U.configure({}),
        L,
        F,
        M.configure({
          multicolor: !0
        }),
        P.configure({
          table: { resizable: !0 }
        }),
        D.configure({
          paragraph: !1
        }),
        H,
        G,
        J,
        $.configure({
          placeholder: e.config?.placeholder ?? "…"
        }),
        ...e.config?.extraExtensions ?? []
      ],
      onUpdate: B
    }), f = ref(l.value);
    function B() {
      f.value = t.value.getHTML(), l.value = f.value;
    }
    return watch(l, (n) => {
      n !== f.value && t.value.chain().focus().setContent(n).run();
    }), watch(
      () => !(e.config?.disabled || e.config?.readonly),
      (n) => {
        t.value.setEditable(n);
      }
    ), E({ editor: t }), (n, v) => {
      const C = w("TipTapTextStyleControls");
      return o(t) ? (i(), u("div", {
        key: 0,
        class: N(e.config.containerClass)
      }, [
        o(t).isEditable ? (i(), c(O, {
          key: 0,
          editor: o(t),
          config: e.config
        }, {
          start: d(() => [
            s(n.$slots, "toolbarStart", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarStartButtons ? (i(!0), u(g, { key: 0 }, b(e.config.extraToolbarStartButtons instanceof Array ? e.config.extraToolbarStartButtons : e.config.extraToolbarStartButtons({ editor: o(t), config: e.config }), (r) => (i(), c(T(r.component ?? o(p)), y({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          end: d(() => [
            s(n.$slots, "toolbarEnd", {
              editor: o(t),
              config: e.config
            }, () => [
              e.config?.extraToolbarEndButtons ? (i(!0), u(g, { key: 0 }, b(e.config.extraToolbarEndButtons instanceof Array ? e.config.extraToolbarEndButtons : e.config.extraToolbarEndButtons({ editor: o(t), config: e.config }), (r) => (i(), c(T(r.component ?? o(p)), y({ key: r }, { ref_for: !0 }, r.binds), null, 16))), 128)) : a("", !0)
            ])
          ]),
          _: 3
        }, 8, ["editor", "config"])) : a("", !0),
        o(t).isEditable ? (i(), c(o(q), {
          key: 1,
          editor: o(t),
          options: { placement: "bottom", offset: 8 }
        }, {
          default: d(() => [
            V("div", Q, [
              h(C, {
                editor: o(t),
                config: e.config,
                "with-alignments": !1,
                "with-scripts": !1
              }, null, 8, ["editor", "config"])
            ])
          ]),
          _: 1
        }, 8, ["editor"])) : a("", !0),
        h(o(j), { editor: o(t) }, null, 8, ["editor"]),
        a("", !0)
      ], 2)) : a("", !0);
    };
  }
});
export {
  de as default
};
