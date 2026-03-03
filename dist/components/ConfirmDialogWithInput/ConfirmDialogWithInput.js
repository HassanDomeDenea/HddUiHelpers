import { defineComponent as ae, resolveComponent as v, openBlock as n, createBlock as i, unref as o, isRef as te, createSlots as P, withCtx as b, createElementBlock as k, Fragment as g, renderSlot as _, resolveDynamicComponent as M, normalizeClass as T, createCommentVNode as $, createElementVNode as j, toDisplayString as ne, renderList as ue, mergeProps as m, withKeys as w, withModifiers as C, createVNode as F } from "vue";
import { usePrimeVue as ce } from "primevue";
import { ConfirmDialogWithInputKey as se } from "./confirmDialogWithInputUtilities.js";
const re = { class: "mt-3 space-y-3" }, pe = ["innerHTML"], ve = /* @__PURE__ */ ae({
  __name: "ConfirmDialogWithInput",
  props: {
    draggable: { type: Boolean },
    breakpoints: {}
  },
  setup(U) {
    const h = useEventBus(se), r = ref(!1), t = ref([]), V = ce(), f = useTemplateRef("inputRef"), e = ref(null);
    function K({ event: a, options: u }) {
      a === "show" ? (window.document.addEventListener("keydown", E, { capture: !0 }), e.value = u, t.value = Array.isArray(u.initialValue) ? u.initialValue : [u.initialValue], r.value = !0, setTimeout(() => {
        f.value?.[0]?.focus?.(), u.autoSelectText && f.value?.[0]?.select?.();
      }, 250)) : a === "hide" && (r.value = !1);
    }
    onMounted(() => {
      h.on(K);
    }), onBeforeUnmount(() => {
      h.off(K);
    });
    const S = computed(() => e.value ? e.value.appendTo : "body"), H = computed(
      () => e.value ? e.value.modal == null ? !0 : e.value.modal : !0
    ), N = computed(() => e.value ? e.value.header : null), O = computed(() => e.value ? e.value.message : null), W = computed(() => e.value ? e.value.blockScroll : !0), z = computed(() => e.value ? e.value.position : null), q = computed(
      () => e.value && (e.value.acceptLabel || e.value.acceptProps?.label) || V.config.locale.accept
    ), G = computed(
      () => e.value && (e.value.rejectLabel || e.value.rejectProps?.label) || V.config.locale.reject
    ), L = computed(
      () => e.value ? e.value.acceptIcon : e.value?.acceptProps ? e.value.acceptProps.icon : null
    ), R = computed(
      () => e.value ? e.value.rejectIcon : e.value?.rejectProps ? e.value.rejectProps.icon : null
    ), J = computed(
      () => e.value?.defaultFocus === void 0 || e.value?.defaultFocus === "accept"
    ), Q = computed(() => e.value?.defaultFocus === "reject"), A = computed(() => e.value?.closeOnEscape ?? !0);
    function y() {
      e.value.accept && e.value.accept(
        Y.value ? t.value : t.value[0]
      ), r.value = !1;
    }
    function D() {
      e.value.reject && e.value.reject(), r.value = !1;
    }
    function X() {
      window.document.removeEventListener("keydown", E, { capture: !0 }), e.value.onHide && e.value.onHide();
    }
    function E(a) {
      a.code === "Escape" && (a.stopImmediatePropagation(), a.preventDefault(), A.value && (r.value = !1));
    }
    const Y = computed(() => e.value?.inputsCount > 1), p = computed(() => Array.isArray(e.value.inputProps) ? e.value.inputProps : [e.value.inputProps]), d = computed(() => Array.isArray(e.value.inputType) ? e.value.inputType : [e.value.inputType]);
    return (a, u) => {
      const Z = v("TextInput"), x = v("NumberInput"), I = v("MathInput"), ee = v("TextAreaInput"), oe = v("DatePickerInput"), B = v("Button"), le = v("Dialog");
      return n(), i(le, {
        visible: o(r),
        "onUpdate:visible": u[2] || (u[2] = (c) => te(r) ? r.value = c : null),
        modal: o(H),
        header: o(N),
        "block-scroll": o(W),
        "append-to": o(S),
        position: o(z),
        breakpoints: U.breakpoints,
        "close-on-escape": o(A),
        draggable: U.draggable,
        "dismissable-mask": "",
        onHide: X
      }, P({
        default: b(() => [
          a.$slots.container ? $("", !0) : (n(), k(g, { key: 0 }, [
            a.$slots.message ? (n(), i(M(a.$slots.message), {
              key: 1,
              message: o(e)
            }, null, 8, ["message"])) : (n(), k(g, { key: 0 }, [
              _(a.$slots, "icon", {}, () => [
                a.$slots.icon ? (n(), i(M(a.$slots.icon), { key: 0 })) : o(e).icon ? (n(), k("span", {
                  key: 1,
                  class: T([o(e).icon])
                }, null, 2)) : $("", !0)
              ]),
              j("span", null, ne(o(O)), 1)
            ], 64))
          ], 64)),
          j("div", re, [
            (n(!0), k(g, null, ue(o(e).inputsCount ?? 1, (c, l) => (n(), k(g, { key: l }, [
              !o(d)[l] || o(d)[l] === "text" ? (n(), i(Z, m({
                key: 0,
                ref_for: !0,
                ref_key: "inputRef",
                ref: f,
                modelValue: o(t)[l],
                "onUpdate:modelValue": (s) => o(t)[l] = s
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: w(C(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(d)[l] === "number" ? (n(), i(x, m({
                key: 1,
                ref_for: !0,
                ref_key: "inputRef",
                ref: f,
                modelValue: o(t)[l],
                "onUpdate:modelValue": (s) => o(t)[l] = s
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: w(C(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(d)[l] === "math" ? (n(), i(I, m({
                key: 2,
                ref_for: !0,
                ref_key: "inputRef",
                ref: f,
                modelValue: o(t)[l],
                "onUpdate:modelValue": (s) => o(t)[l] = s
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: w(C(y, ["prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(d)[l] === "textarea" ? (n(), i(ee, m({
                key: 3,
                ref_for: !0,
                ref_key: "inputRef",
                ref: f,
                modelValue: o(t)[l],
                "onUpdate:modelValue": (s) => o(t)[l] = s
              }, { ref_for: !0 }, o(p)[l], {
                onKeydown: w(C(y, ["ctrl", "prevent"]), ["enter"])
              }), null, 16, ["modelValue", "onUpdate:modelValue", "onKeydown"])) : o(d)[l] === "date" ? (n(), i(oe, m({
                key: 4,
                ref_for: !0,
                ref_key: "inputRef",
                ref: f,
                modelValue: o(t)[l],
                "onUpdate:modelValue": (s) => o(t)[l] = s
              }, { ref_for: !0 }, o(p)[l]), null, 16, ["modelValue", "onUpdate:modelValue"])) : o(d)[l] === "text_only" ? (n(), k("div", {
                key: 5,
                innerHTML: typeof o(p)[l]?.formatter == "function" ? o(p)[l]?.formatter(o(t)) : o(p)[l]?.value ?? null
              }, null, 8, pe)) : $("", !0)
            ], 64))), 128))
          ])
        ]),
        _: 2
      }, [
        a.$slots.container ? {
          name: "container",
          fn: b((c) => [
            _(a.$slots, "container", {
              message: o(e),
              closeCallback: c.closeCallback,
              acceptCallback: y,
              rejectCallback: D
            })
          ]),
          key: "0"
        } : void 0,
        a.$slots.container ? void 0 : {
          name: "footer",
          fn: b(() => [
            F(B, m({
              class: [o(e).rejectClass],
              autofocus: o(Q),
              text: o(e).rejectProps?.text || !1,
              severity: "secondary"
            }, o(e).rejectProps, {
              label: o(G),
              onClick: u[0] || (u[0] = (c) => D())
            }), P({ _: 2 }, [
              o(R) || a.$slots.rejecticon ? {
                name: "icon",
                fn: b((c) => [
                  _(a.$slots, "rejecticon", {}, () => [
                    j("span", {
                      class: T([o(R), c.class])
                    }, null, 2)
                  ])
                ]),
                key: "0"
              } : void 0
            ]), 1040, ["class", "autofocus", "text", "label"]),
            F(B, m({
              label: o(q),
              class: [o(e).acceptClass],
              autofocus: o(J)
            }, o(e).acceptProps, {
              onClick: u[1] || (u[1] = (c) => y())
            }), P({ _: 2 }, [
              o(L) || a.$slots.accepticon ? {
                name: "icon",
                fn: b((c) => [
                  _(a.$slots, "accepticon", {}, () => [
                    j("span", {
                      class: T([o(L), c.class]),
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
  ve as default
};
