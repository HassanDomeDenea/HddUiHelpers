import { defineComponent as I, computed as b, resolveComponent as c, openBlock as u, createElementBlock as r, Fragment as E, createBlock as K, mergeProps as p, unref as o, withKeys as N, createCommentVNode as v, createVNode as a, createElementVNode as T, withCtx as h, withModifiers as C } from "vue";
import P from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import U from "HddUiHelpers/components/inputs/TextInput.vue";
import { useLoader as A } from "HddUiHelpers/composables/loader.ts";
import { set as F } from "lodash-es";
import L from "lodash-es/get";
import { useI18n as G } from "vue-i18n";
const M = { key: 1 }, j = { class: "flex justify-end" }, D = {
  key: 2,
  class: "flex items-center gap-2"
}, S = {
  key: 3,
  class: "flex items-center gap-2"
}, X = /* @__PURE__ */ I({
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
  setup(e) {
    const { t: y } = G(), { startLoading: x, isLoading: s } = A(), d = b(() => e.type ?? "text"), t = b({
      get() {
        return L(e.row, e.fieldName);
      },
      set(i) {
        F(e.row, e.fieldName, i);
      }
    });
    function f() {
      e.submitCallback?.(new Event("submit"));
    }
    function z() {
      e.cancelCallback?.(new Event("submit"));
    }
    const V = function(i) {
      !i.ctrlKey && i.key === "Enter" && i.stopPropagation();
    }, m = b(() => ({
      ...e.column.inlineEditableBinds ?? {}
    }));
    return (i, l) => {
      const g = c("TextAreaInput"), k = c("Button"), w = c("ButtonGroup"), B = c("ColorPickerInput");
      return u(), r(E, null, [
        d.value === "text" ? (u(), K(U, p({
          key: 0,
          modelValue: t.value,
          "onUpdate:modelValue": l[0] || (l[0] = (n) => t.value = n),
          class: "text-red-200",
          size: e.size,
          disabled: o(s)
        }, m.value, {
          onKeydown: N(o(x), ["enter"])
        }), null, 16, ["modelValue", "size", "disabled", "onKeydown"])) : v("", !0),
        d.value === "textarea" ? (u(), r("div", M, [
          a(g, p({
            modelValue: t.value,
            "onUpdate:modelValue": l[1] || (l[1] = (n) => t.value = n),
            class: "text-red-200",
            size: e.size,
            disabled: o(s)
          }, m.value, { onKeydown: V }), null, 16, ["modelValue", "size", "disabled"]),
          T("div", j, [
            a(w, null, {
              default: h(() => [
                a(k, {
                  icon: "i-material-symbols:close",
                  type: "button",
                  severity: "danger",
                  outlined: "",
                  size: "small",
                  title: o(y)("Cancel"),
                  onClick: C(z, ["stop"])
                }, null, 8, ["title"]),
                a(k, {
                  icon: "i-mdi-check",
                  type: "button",
                  severity: "success",
                  outlined: "",
                  size: "small",
                  title: o(y)("Save"),
                  onClick: C(f, ["stop"])
                }, null, 8, ["title"])
              ]),
              _: 1
            })
          ])
        ])) : v("", !0),
        d.value === "boolean" ? (u(), r("div", D, [
          a(P, p({
            modelValue: t.value,
            "onUpdate:modelValue": l[2] || (l[2] = (n) => t.value = n),
            size: e.size,
            disabled: o(s)
          }, m.value, { onChange: f }), null, 16, ["modelValue", "size", "disabled"])
        ])) : v("", !0),
        d.value === "color" ? (u(), r("div", S, [
          a(B, p({
            modelValue: t.value,
            "onUpdate:modelValue": l[3] || (l[3] = (n) => t.value = n),
            "auto-open": "",
            "append-inline": "",
            size: e.size,
            disabled: o(s)
          }, m.value, { onChange: f }), null, 16, ["modelValue", "size", "disabled"])
        ])) : v("", !0)
      ], 64);
    };
  }
});
export {
  X as default
};
