import te from "primevue/dialog";
import ne from "primevue/button";
import { _ as se } from "../../DatePickerInput.vue_vue_type_script_setup_true_lang-D6B1ypZM.js";
import { _ as re } from "../../TextAreaInput.vue_vue_type_script_setup_true_lang-BzkVktnw.js";
import { _ as ce } from "../../MathInput.vue_vue_type_script_setup_true_lang-PPEyYQy7.js";
import { _ as ue } from "../../NumberInput.vue_vue_type_script_setup_true_lang-RdKVNSfW.js";
import { _ as ie } from "../../TextInput.vue_vue_type_script_setup_true_lang-CDqh5_am.js";
import { defineComponent as pe, ref as C, useTemplateRef as fe, onMounted as me, onBeforeUnmount as ve, computed as t, openBlock as s, createBlock as f, unref as o, isRef as de, createSlots as P, withCtx as _, createElementBlock as k, Fragment as V, renderSlot as g, resolveDynamicComponent as M, normalizeClass as T, createCommentVNode as U, createElementVNode as j, toDisplayString as ye, renderList as ke, mergeProps as d, withKeys as $, withModifiers as w, createVNode as S } from "vue";
import { usePrimeVue as _e } from "primevue";
import { ConfirmDialogWithInputKey as be } from "./confirmDialogWithInputUtilities.js";
import { useEventBus as Ve } from "@vueuse/core";
const ge = { class: "mt-3 space-y-3" }, je = ["innerHTML"], Ae = /* @__PURE__ */ pe({
  __name: "ConfirmDialogWithInput",
  props: {
    draggable: { type: Boolean },
    breakpoints: {}
  },
  setup(K) {
    const h = Ve(be), i = C(!1), n = C([]), b = _e(), m = fe("inputRef"), e = C(null);
    function L({ event: a, options: r }) {
      a === "show" ? (window.document.addEventListener("keydown", D, { capture: !0 }), e.value = r, n.value = Array.isArray(r.initialValue) ? r.initialValue : [r.initialValue], i.value = !0, setTimeout(() => {
        m.value?.[0]?.focus?.(), r.autoSelectText && m.value?.[0]?.select?.();
      }, 250)) : a === "hide" && (i.value = !1);
    }
    me(() => {
      h.on(L);
    }), ve(() => {
      h.off(L);
    });
    const H = t(() => e.value ? e.value.appendTo : "body"), N = t(
      () => e.value ? e.value.modal == null ? !0 : e.value.modal : !0
    ), O = t(() => e.value ? e.value.header : null), W = t(() => e.value ? e.value.message : null), z = t(() => e.value ? e.value.blockScroll : !0), q = t(() => e.value ? e.value.position : null), G = t(
      () => e.value && (e.value.acceptLabel || e.value.acceptProps?.label) || b.config.locale.accept
    ), J = t(
      () => e.value && (e.value.rejectLabel || e.value.rejectProps?.label) || b.config.locale.reject
    ), R = t(
      () => e.value ? e.value.acceptIcon : e.value?.acceptProps ? e.value.acceptProps.icon : null
    ), E = t(
      () => e.value ? e.value.rejectIcon : e.value?.rejectProps ? e.value.rejectProps.icon : null
    ), Q = t(
      () => e.value?.defaultFocus === void 0 || e.value?.defaultFocus === "accept"
    ), X = t(() => e.value?.defaultFocus === "reject"), A = t(() => e.value?.closeOnEscape ?? !0);
    function y() {
      e.value.accept && e.value.accept(
        Z.value ? n.value : n.value[0]
      ), i.value = !1;
    }
    function B() {
      e.value.reject && e.value.reject(), i.value = !1;
    }
    function Y() {
      window.document.removeEventListener("keydown", D, { capture: !0 }), e.value.onHide && e.value.onHide();
    }
    function D(a) {
      a.code === "Escape" && (a.stopImmediatePropagation(), a.preventDefault(), A.value && (i.value = !1));
    }
    const Z = t(() => e.value?.inputsCount > 1), p = t(() => Array.isArray(e.value.inputProps) ? e.value.inputProps : [e.value.inputProps]), v = t(() => Array.isArray(e.value.inputType) ? e.value.inputType : [e.value.inputType]);
    return (a, r) => {
      const x = ie, I = ue, ee = ce, oe = re, le = se, F = ne, ae = te;
      return s(), f(ae, {
        visible: o(i),
        "onUpdate:visible": r[2] || (r[2] = (c) => de(i) ? i.value = c : null),
        modal: o(N),
        header: o(O),
        "block-scroll": o(z),
        "append-to": o(H),
        position: o(q),
        breakpoints: K.breakpoints,
        "close-on-escape": o(A),
        draggable: K.draggable,
        "dismissable-mask": "",
        onHide: Y
      }, P({
        default: _(() => [
          a.$slots.container ? U("", !0) : (s(), k(V, { key: 0 }, [
            a.$slots.message ? (s(), f(M(a.$slots.message), {
              key: 1,
              message: o(e)
            }, null, 8, ["message"])) : (s(), k(V, { key: 0 }, [
              g(a.$slots, "icon", {}, () => [
                a.$slots.icon ? (s(), f(M(a.$slots.icon), { key: 0 })) : o(e).icon ? (s(), k("span", {
                  key: 1,
                  class: T([o(e).icon])
                }, null, 2)) : U("", !0)
              ]),
              j("span", null, ye(o(W)), 1)
            ], 64))
          ], 64)),
          j("div", ge, [
            (s(!0), k(V, null, ke(o(e).inputsCount ?? 1, (c, l) => (s(), k(V, { key: l }, [
              !o(v)[l] || o(v)[l] === "text" ? (s(), f(x, d({
                key: 0,
                ref_for: !0,
                ref_key: "inputRef",
                ref: m,
                modelValue: o(n)[l],
                "onUpdate:modelValue": (u) => o(n)[l] = u
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: $(w(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(v)[l] === "number" ? (s(), f(I, d({
                key: 1,
                ref_for: !0,
                ref_key: "inputRef",
                ref: m,
                modelValue: o(n)[l],
                "onUpdate:modelValue": (u) => o(n)[l] = u
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: $(w(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(v)[l] === "math" ? (s(), f(ee, d({
                key: 2,
                ref_for: !0,
                ref_key: "inputRef",
                ref: m,
                modelValue: o(n)[l],
                "onUpdate:modelValue": (u) => o(n)[l] = u
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: $(w(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(v)[l] === "textarea" ? (s(), f(oe, d({
                key: 3,
                ref_for: !0,
                ref_key: "inputRef",
                ref: m,
                modelValue: o(n)[l],
                "onUpdate:modelValue": (u) => o(n)[l] = u
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: $(w(y, ["ctrl", "prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(v)[l] === "date" ? (s(), f(le, d({
                key: 4,
                ref_for: !0,
                ref_key: "inputRef",
                ref: m,
                modelValue: o(n)[l],
                "onUpdate:modelValue": (u) => o(n)[l] = u
              }, { ref_for: !0 }, o(p)[l]), null, 16, ["modelValue", "onUpdate:modelValue"])) : o(v)[l] === "text_only" ? (s(), k("div", {
                key: 5,
                innerHTML: typeof o(p)[l]?.formatter == "function" ? o(p)[l]?.formatter(o(n)) : o(p)[l]?.value ?? null
              }, null, 8, je)) : U("", !0)
            ], 64))), 128))
          ])
        ]),
        _: 2
      }, [
        a.$slots.container ? {
          name: "container",
          fn: _((c) => [
            g(a.$slots, "container", {
              message: o(e),
              closeCallback: c.closeCallback,
              acceptCallback: y,
              rejectCallback: B
            })
          ]),
          key: "0"
        } : void 0,
        a.$slots.container ? void 0 : {
          name: "footer",
          fn: _(() => [
            S(F, d({
              class: [o(e).rejectClass],
              autofocus: o(X),
              text: o(e).rejectProps?.text || !1,
              severity: "secondary"
            }, o(e).rejectProps, {
              label: o(J),
              onClick: r[0] || (r[0] = (c) => B())
            }), P({ _: 2 }, [
              o(E) || a.$slots.rejecticon ? {
                name: "icon",
                fn: _((c) => [
                  g(a.$slots, "rejecticon", {}, () => [
                    j("span", {
                      class: T([o(E), c.class])
                    }, null, 2)
                  ])
                ]),
                key: "0"
              } : void 0
            ]), 1040, ["class", "autofocus", "text", "label"]),
            S(F, d({
              label: o(G),
              class: [o(e).acceptClass],
              autofocus: o(Q)
            }, o(e).acceptProps, {
              onClick: r[1] || (r[1] = (c) => y())
            }), P({ _: 2 }, [
              o(R) || a.$slots.accepticon ? {
                name: "icon",
                fn: _((c) => [
                  g(a.$slots, "accepticon", {}, () => [
                    j("span", {
                      class: T([o(R), c.class]),
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
  Ae as default
};
