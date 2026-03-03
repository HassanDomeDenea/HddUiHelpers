import { _ as E } from "../../ColorPickerInput.vue_vue_type_script_setup_true_lang--CG2xF6W.js";
import I from "primevue/buttongroup";
import K from "primevue/button";
import { _ as N } from "../../TextAreaInput.vue_vue_type_script_setup_true_lang-BzkVktnw.js";
import { defineComponent as h, computed as y, openBlock as a, createElementBlock as c, Fragment as T, unref as e, createBlock as U, mergeProps as r, isRef as f, withKeys as F, createCommentVNode as p, createVNode as s, createElementVNode as L, withCtx as P, withModifiers as z } from "vue";
import _ from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import A from "HddUiHelpers/components/inputs/TextInput.vue";
import { useLoader as M } from "HddUiHelpers/composables/loader.ts";
import { set as $ } from "lodash-es";
import j from "lodash-es/get";
import { useI18n as D } from "vue-i18n";
const G = { key: 1 }, R = { class: "flex justify-end" }, S = {
  key: 2,
  class: "flex items-center gap-2"
}, q = {
  key: 3,
  class: "flex items-center gap-2"
}, oe = /* @__PURE__ */ h({
  __name: "InlineCellEdit",
  props: {
    row: {},
    fieldName: {},
    type: {},
    field: {},
    column: {},
    submitCallback: { type: Function },
    cancelCallback: { type: Function },
    size: {}
  },
  setup(t) {
    const { t: k } = D(), { startLoading: C, isLoading: u } = M(), d = y(() => t.type ?? "text"), n = y({
      get() {
        return j(t.row, t.fieldName);
      },
      set(i) {
        $(t.row, t.fieldName, i);
      }
    });
    function b() {
      t.submitCallback?.(new Event("submit"));
    }
    function V() {
      t.cancelCallback?.(new Event("submit"));
    }
    const g = function(i) {
      !i.ctrlKey && i.key === "Enter" && i.stopPropagation();
    }, m = y(() => ({
      ...t.column.inlineEditableBinds ?? {}
    }));
    return (i, o) => {
      const v = N, x = K, w = I, B = E;
      return a(), c(T, null, [
        e(d) === "text" ? (a(), U(A, r({
          key: 0,
          modelValue: e(n),
          "onUpdate:modelValue": o[0] || (o[0] = (l) => f(n) ? n.value = l : null),
          class: "text-red-200",
          size: t.size,
          disabled: e(u)
        }, e(m), {
          onKeydown: F(e(C), ["enter"])
        }), null, 16, ["modelValue", "size", "disabled", "onKeydown"])) : p("", !0),
        e(d) === "textarea" ? (a(), c("div", G, [
          s(v, r({
            modelValue: e(n),
            "onUpdate:modelValue": o[1] || (o[1] = (l) => f(n) ? n.value = l : null),
            class: "text-red-200",
            size: t.size,
            disabled: e(u)
          }, e(m), { onKeydown: g }), null, 16, ["modelValue", "size", "disabled"]),
          L("div", R, [
            s(w, null, {
              default: P(() => [
                s(x, {
                  icon: "i-material-symbols:close",
                  type: "button",
                  severity: "danger",
                  outlined: "",
                  size: "small",
                  title: e(k)("Cancel"),
                  onClick: z(V, ["stop"])
                }, null, 8, ["title"]),
                s(x, {
                  icon: "i-mdi-check",
                  type: "button",
                  severity: "success",
                  outlined: "",
                  size: "small",
                  title: e(k)("Save"),
                  onClick: z(b, ["stop"])
                }, null, 8, ["title"])
              ]),
              _: 1
            })
          ])
        ])) : p("", !0),
        e(d) === "boolean" ? (a(), c("div", S, [
          s(_, r({
            modelValue: e(n),
            "onUpdate:modelValue": o[2] || (o[2] = (l) => f(n) ? n.value = l : null),
            size: t.size,
            disabled: e(u)
          }, e(m), { onChange: b }), null, 16, ["modelValue", "size", "disabled"])
        ])) : p("", !0),
        e(d) === "color" ? (a(), c("div", q, [
          s(B, r({
            modelValue: e(n),
            "onUpdate:modelValue": o[3] || (o[3] = (l) => f(n) ? n.value = l : null),
            "auto-open": "",
            "append-inline": "",
            size: t.size,
            disabled: e(u)
          }, e(m), { onChange: b }), null, 16, ["modelValue", "size", "disabled"])
        ])) : p("", !0)
      ], 64);
    };
  }
});
export {
  oe as default
};
