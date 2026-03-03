import { defineComponent as I, resolveComponent as c, openBlock as u, createElementBlock as r, Fragment as E, unref as e, createBlock as K, mergeProps as p, isRef as f, withKeys as N, createCommentVNode as b, createVNode as s, createElementVNode as T, withCtx as h, withModifiers as x } from "vue";
import P from "HddUiHelpers/components/inputs/CheckboxInput.vue";
import U from "HddUiHelpers/components/inputs/TextInput.vue";
import { useLoader as A } from "HddUiHelpers/composables/loader.ts";
import { set as F } from "lodash-es";
import L from "lodash-es/get";
const G = { key: 1 }, M = { class: "flex justify-end" }, j = {
  key: 2,
  class: "flex items-center gap-2"
}, D = {
  key: 3,
  class: "flex items-center gap-2"
}, Q = /* @__PURE__ */ I({
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
    const { t: k } = useI18n(), { startLoading: z, isLoading: a } = A(), d = computed(() => t.type ?? "text"), n = computed({
      get() {
        return L(t.row, t.fieldName);
      },
      set(i) {
        F(t.row, t.fieldName, i);
      }
    });
    function y() {
      t.submitCallback?.(new Event("submit"));
    }
    function V() {
      t.cancelCallback?.(new Event("submit"));
    }
    const v = function(i) {
      !i.ctrlKey && i.key === "Enter" && i.stopPropagation();
    }, m = computed(() => ({
      ...t.column.inlineEditableBinds ?? {}
    }));
    return (i, o) => {
      const g = c("TextAreaInput"), C = c("Button"), w = c("ButtonGroup"), B = c("ColorPickerInput");
      return u(), r(E, null, [
        e(d) === "text" ? (u(), K(U, p({
          key: 0,
          modelValue: e(n),
          "onUpdate:modelValue": o[0] || (o[0] = (l) => f(n) ? n.value = l : null),
          class: "text-red-200",
          size: t.size,
          disabled: e(a)
        }, e(m), {
          onKeydown: N(e(z), ["enter"])
        }), null, 16, ["modelValue", "size", "disabled", "onKeydown"])) : b("", !0),
        e(d) === "textarea" ? (u(), r("div", G, [
          s(g, p({
            modelValue: e(n),
            "onUpdate:modelValue": o[1] || (o[1] = (l) => f(n) ? n.value = l : null),
            class: "text-red-200",
            size: t.size,
            disabled: e(a)
          }, e(m), { onKeydown: v }), null, 16, ["modelValue", "size", "disabled"]),
          T("div", M, [
            s(w, null, {
              default: h(() => [
                s(C, {
                  icon: "i-material-symbols:close",
                  type: "button",
                  severity: "danger",
                  outlined: "",
                  size: "small",
                  title: e(k)("Cancel"),
                  onClick: x(V, ["stop"])
                }, null, 8, ["title"]),
                s(C, {
                  icon: "i-mdi-check",
                  type: "button",
                  severity: "success",
                  outlined: "",
                  size: "small",
                  title: e(k)("Save"),
                  onClick: x(y, ["stop"])
                }, null, 8, ["title"])
              ]),
              _: 1
            })
          ])
        ])) : b("", !0),
        e(d) === "boolean" ? (u(), r("div", j, [
          s(P, p({
            modelValue: e(n),
            "onUpdate:modelValue": o[2] || (o[2] = (l) => f(n) ? n.value = l : null),
            size: t.size,
            disabled: e(a)
          }, e(m), { onChange: y }), null, 16, ["modelValue", "size", "disabled"])
        ])) : b("", !0),
        e(d) === "color" ? (u(), r("div", D, [
          s(B, p({
            modelValue: e(n),
            "onUpdate:modelValue": o[3] || (o[3] = (l) => f(n) ? n.value = l : null),
            "auto-open": "",
            "append-inline": "",
            size: t.size,
            disabled: e(a)
          }, e(m), { onChange: y }), null, 16, ["modelValue", "size", "disabled"])
        ])) : b("", !0)
      ], 64);
    };
  }
});
export {
  Q as default
};
