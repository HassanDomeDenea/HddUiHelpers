import { defineComponent as I, ref as P, useTemplateRef as ee, onMounted as le, onBeforeUnmount as ae, computed as o, resolveComponent as F, openBlock as t, createBlock as v, createSlots as $, withCtx as k, createElementBlock as y, Fragment as V, renderSlot as g, resolveDynamicComponent as M, normalizeClass as T, createCommentVNode as U, createElementVNode as j, toDisplayString as oe, renderList as ue, mergeProps as d, withKeys as w, withModifiers as C, createVNode as S } from "vue";
import { usePrimeVue as te } from "primevue";
import { ConfirmDialogWithInputKey as ne } from "./confirmDialogWithInputUtilities.js";
import { useEventBus as re } from "@vueuse/core";
import se from "HddUiHelpers/components/inputs/NumberInput.vue";
import ce from "HddUiHelpers/components/inputs/MathInput.vue";
import ve from "HddUiHelpers/components/inputs/TextAreaInput.vue";
import ie from "HddUiHelpers/components/inputs/DatePickerInput.vue";
import pe from "HddUiHelpers/components/inputs/TextInput.vue";
const fe = { class: "mt-3 space-y-3" }, de = ["innerHTML"], Pe = /* @__PURE__ */ I({
  __name: "ConfirmDialogWithInput",
  props: {
    draggable: { type: Boolean },
    breakpoints: {}
  },
  setup(_) {
    const K = re(ne), i = P(!1), u = P([]), b = te(), p = ee("inputRef"), e = P(null);
    function h({ event: a, options: n }) {
      a === "show" ? (window.document.addEventListener("keydown", B, { capture: !0 }), e.value = n, u.value = Array.isArray(n.initialValue) ? n.initialValue : [n.initialValue], i.value = !0, setTimeout(() => {
        p.value?.[0]?.focus?.(), n.autoSelectText && p.value?.[0]?.select?.();
      }, 250)) : a === "hide" && (i.value = !1);
    }
    le(() => {
      K.on(h);
    }), ae(() => {
      K.off(h);
    });
    const H = o(() => e.value ? e.value.appendTo : "body"), N = o(
      () => e.value ? e.value.modal == null ? !0 : e.value.modal : !0
    ), O = o(() => e.value ? e.value.header : null), W = o(() => e.value ? e.value.message : null), z = o(() => e.value ? e.value.blockScroll : !0), q = o(() => e.value ? e.value.position : null), G = o(
      () => e.value && (e.value.acceptLabel || e.value.acceptProps?.label) || b.config.locale.accept
    ), J = o(
      () => e.value && (e.value.rejectLabel || e.value.rejectProps?.label) || b.config.locale.reject
    ), L = o(
      () => e.value ? e.value.acceptIcon : e.value?.acceptProps ? e.value.acceptProps.icon : null
    ), E = o(
      () => e.value ? e.value.rejectIcon : e.value?.rejectProps ? e.value.rejectProps.icon : null
    ), Q = o(
      () => e.value?.defaultFocus === void 0 || e.value?.defaultFocus === "accept"
    ), X = o(() => e.value?.defaultFocus === "reject"), R = o(() => e.value?.closeOnEscape ?? !0);
    function m() {
      e.value.accept && e.value.accept(
        Z.value ? u.value : u.value[0]
      ), i.value = !1;
    }
    function A() {
      e.value.reject && e.value.reject(), i.value = !1;
    }
    function Y() {
      window.document.removeEventListener("keydown", B, { capture: !0 }), e.value.onHide && e.value.onHide();
    }
    function B(a) {
      a.code === "Escape" && (a.stopImmediatePropagation(), a.preventDefault(), R.value && (i.value = !1));
    }
    const Z = o(() => e.value?.inputsCount > 1), c = o(() => Array.isArray(e.value.inputProps) ? e.value.inputProps : [e.value.inputProps]), f = o(() => Array.isArray(e.value.inputType) ? e.value.inputType : [e.value.inputType]);
    return (a, n) => {
      const D = F("Button"), x = F("Dialog");
      return t(), v(x, {
        visible: i.value,
        "onUpdate:visible": n[2] || (n[2] = (r) => i.value = r),
        modal: N.value,
        header: O.value,
        "block-scroll": z.value,
        "append-to": H.value,
        position: q.value,
        breakpoints: _.breakpoints,
        "close-on-escape": R.value,
        draggable: _.draggable,
        "dismissable-mask": "",
        onHide: Y
      }, $({
        default: k(() => [
          a.$slots.container ? U("", !0) : (t(), y(V, { key: 0 }, [
            a.$slots.message ? (t(), v(M(a.$slots.message), {
              key: 1,
              message: e.value
            }, null, 8, ["message"])) : (t(), y(V, { key: 0 }, [
              g(a.$slots, "icon", {}, () => [
                a.$slots.icon ? (t(), v(M(a.$slots.icon), { key: 0 })) : e.value.icon ? (t(), y("span", {
                  key: 1,
                  class: T([e.value.icon])
                }, null, 2)) : U("", !0)
              ]),
              j("span", null, oe(W.value), 1)
            ], 64))
          ], 64)),
          j("div", fe, [
            (t(!0), y(V, null, ue(e.value.inputsCount ?? 1, (r, l) => (t(), y(V, { key: l }, [
              !f.value[l] || f.value[l] === "text" ? (t(), v(pe, d({
                key: 0,
                ref_for: !0,
                ref_key: "inputRef",
                ref: p,
                modelValue: u.value[l],
                "onUpdate:modelValue": (s) => u.value[l] = s
              }, { ref_for: !0 }, c.value[l], {
                onKeydown: w(C(m, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : f.value[l] === "number" ? (t(), v(se, d({
                key: 1,
                ref_for: !0,
                ref_key: "inputRef",
                ref: p,
                modelValue: u.value[l],
                "onUpdate:modelValue": (s) => u.value[l] = s
              }, { ref_for: !0 }, c.value[l], {
                onKeydown: w(C(m, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : f.value[l] === "math" ? (t(), v(ce, d({
                key: 2,
                ref_for: !0,
                ref_key: "inputRef",
                ref: p,
                modelValue: u.value[l],
                "onUpdate:modelValue": (s) => u.value[l] = s
              }, { ref_for: !0 }, c.value[l], {
                onKeydown: w(C(m, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : f.value[l] === "textarea" ? (t(), v(ve, d({
                key: 3,
                ref_for: !0,
                ref_key: "inputRef",
                ref: p,
                modelValue: u.value[l],
                "onUpdate:modelValue": (s) => u.value[l] = s
              }, { ref_for: !0 }, c.value[l], {
                onKeydown: w(C(m, ["ctrl", "prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : f.value[l] === "date" ? (t(), v(ie, d({
                key: 4,
                ref_for: !0,
                ref_key: "inputRef",
                ref: p,
                modelValue: u.value[l],
                "onUpdate:modelValue": (s) => u.value[l] = s
              }, { ref_for: !0 }, c.value[l]), null, 16, ["modelValue", "onUpdate:modelValue"])) : f.value[l] === "text_only" ? (t(), y("div", {
                key: 5,
                innerHTML: typeof c.value[l]?.formatter == "function" ? c.value[l]?.formatter(u.value) : c.value[l]?.value ?? null
              }, null, 8, de)) : U("", !0)
            ], 64))), 128))
          ])
        ]),
        _: 2
      }, [
        a.$slots.container ? {
          name: "container",
          fn: k((r) => [
            g(a.$slots, "container", {
              message: e.value,
              closeCallback: r.closeCallback,
              acceptCallback: m,
              rejectCallback: A
            })
          ]),
          key: "0"
        } : void 0,
        a.$slots.container ? void 0 : {
          name: "footer",
          fn: k(() => [
            S(D, d({
              class: [e.value.rejectClass],
              autofocus: X.value,
              text: e.value.rejectProps?.text || !1,
              severity: "secondary"
            }, e.value.rejectProps, {
              label: J.value,
              onClick: n[0] || (n[0] = (r) => A())
            }), $({ _: 2 }, [
              E.value || a.$slots.rejecticon ? {
                name: "icon",
                fn: k((r) => [
                  g(a.$slots, "rejecticon", {}, () => [
                    j("span", {
                      class: T([E.value, r.class])
                    }, null, 2)
                  ])
                ]),
                key: "0"
              } : void 0
            ]), 1040, ["class", "autofocus", "text", "label"]),
            S(D, d({
              label: G.value,
              class: [e.value.acceptClass],
              autofocus: Q.value
            }, e.value.acceptProps, {
              onClick: n[1] || (n[1] = (r) => m())
            }), $({ _: 2 }, [
              L.value || a.$slots.accepticon ? {
                name: "icon",
                fn: k((r) => [
                  g(a.$slots, "accepticon", {}, () => [
                    j("span", {
                      class: T([L.value, r.class]),
                      "data-pc-section": "acceptbuttonicon"
                    }, null, 2)
                  ])
                ]),
                key: "0"
              } : void 0
            ]), 1040, ["label", "class", "autofocus"])
          ]),
          key: "1"
        }
      ]), 1032, ["visible", "modal", "header", "block-scroll", "append-to", "position", "breakpoints", "close-on-escape", "draggable"]);
    };
  }
});
export {
  Pe as default
};
