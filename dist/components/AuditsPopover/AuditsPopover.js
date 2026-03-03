import { defineComponent as A, useTemplateRef as D, ref as m, resolveComponent as L, resolveDirective as R, openBlock as o, createBlock as B, unref as l, withCtx as H, createElementVNode as f, toDisplayString as _, createElementBlock as i, createVNode as N, Fragment as Y, renderList as F, normalizeClass as P, withDirectives as S, createTextVNode as T, nextTick as V } from "vue";
import { useLoader as j } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as q } from "HddUiHelpers/stores/apiClient.ts";
import z from "moment";
import M from "primevue/popover";
import { useI18n as I } from "vue-i18n";
const $ = { style: { "max-height": "90vh", "overflow-y": "auto" } }, G = { class: "mb-1 font-bold text-teal-700" }, J = {
  key: 0,
  class: "text-center"
}, K = {
  key: 1,
  class: "max-h-xs list-disc overflow-y-auto ps-4"
}, O = { class: "dir-ltr inline-block text-xs" }, Q = { key: 2 }, U = { class: "text-secondary text-sm" }, se = /* @__PURE__ */ A({
  __name: "AuditsPopover",
  setup(W, { expose: g }) {
    const c = D("popoverRef"), a = m([]), x = m(), u = m(null), d = m(null), h = q(), { t: y } = I(), { startLoading: w, endLoading: k, isLoading: b } = j();
    async function C(v, t, s, n, e = null, p = null) {
      a.value = [], c.value.show(v), x.value = n, u.value = e, d.value = p, h.get("/api/audits", {
        params: {
          type: t,
          id: s,
          field: n
        }
      }).then((r) => {
        a.value = Array.isArray(r.data) ? r.data : [], a.value.length < 1 && c.value.hide();
      });
    }
    async function E(v, t, s, n = null, e = null, p = "audits") {
      x.value = s, u.value = n, d.value = e, c.value.hide(), await V(() => {
        c.value.show(v);
      }), w(), h.request({
        url: (typeof t == "object" ? t.url : t) + (p ? `/${p}` : ""),
        method: typeof t == "object" ? t.method : "get",
        params: {
          field: s
        }
      }).then((r) => {
        if (!r.data.success)
          throw new Error(r.data.message);
        a.value = r.data.data.data;
      }).catch(h.toastRequestError).finally(k);
    }
    return g({ showFor: C, showAudits: E }), (v, t) => {
      const s = L("ProgressSpinner"), n = R("tooltip");
      return o(), B(l(M), {
        ref_key: "popoverRef",
        ref: c
      }, {
        default: H(() => [
          f("div", $, [
            f("div", G, _(l(y)("Edit History")) + ":", 1),
            l(b) ? (o(), i("div", J, [
              N(s, { class: "!size-8" })
            ])) : a.value.length > 0 ? (o(), i("ul", K, [
              (o(!0), i(Y, null, F(a.value, (e) => (o(), i("li", {
                key: e.id
              }, [
                f("span", {
                  class: P(["me-2 inline-block font-bold", d.value ? d.value(e.new_value) : ""])
                }, _(u.value ? u.value(e.new_value) : e.new_value), 3),
                S((o(), i("span", O, [
                  T(" (" + _(l(z)(e.created_at).format("YYYY-MM-DD HH:mm A")) + ") ", 1)
                ])), [
                  [
                    n,
                    e.user?.name ? l(y)("By") + ": " + e.user?.name : void 0,
                    void 0,
                    { sm: !0 }
                  ]
                ])
              ]))), 128))
            ])) : (o(), i("div", Q, [
              f("span", U, _(l(y)("No Editing History")), 1)
            ]))
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});
export {
  se as default
};
