import C from "primevue/tooltip";
import L from "primevue/progressspinner";
import { defineComponent as R, useTemplateRef as B, ref as p, openBlock as o, createBlock as D, unref as l, withCtx as H, createElementVNode as _, toDisplayString as f, createElementBlock as i, createVNode as N, Fragment as Y, renderList as F, normalizeClass as T, withDirectives as V, createTextVNode as j, nextTick as q } from "vue";
import { useLoader as z } from "HddUiHelpers/composables/loader.ts";
import { useApiClient as M } from "HddUiHelpers/stores/apiClient.ts";
import P from "moment";
import S from "primevue/popover";
import { useI18n as I } from "vue-i18n";
const $ = { style: { "max-height": "90vh", "overflow-y": "auto" } }, G = { class: "mb-1 font-bold text-teal-700" }, J = {
  key: 0,
  class: "text-center"
}, K = {
  key: 1,
  class: "max-h-xs list-disc overflow-y-auto ps-4"
}, O = { class: "dir-ltr inline-block text-xs" }, Q = { key: 2 }, U = { class: "text-secondary text-sm" }, re = /* @__PURE__ */ R({
  __name: "AuditsPopover",
  setup(W, { expose: x }) {
    const c = B("popoverRef"), a = p([]), g = p(), u = p(null), d = p(null), h = M(), { t: y } = I(), { startLoading: w, endLoading: k, isLoading: b } = z();
    async function E(m, t, s, n, e = null, v = null) {
      a.value = [], c.value.show(m), g.value = n, u.value = e, d.value = v, h.get("/api/audits", {
        params: {
          type: t,
          id: s,
          field: n
        }
      }).then((r) => {
        a.value = Array.isArray(r.data) ? r.data : [], a.value.length < 1 && c.value.hide();
      });
    }
    async function A(m, t, s, n = null, e = null, v = "audits") {
      g.value = s, u.value = n, d.value = e, c.value.hide(), await q(() => {
        c.value.show(m);
      }), w(), h.request({
        url: (typeof t == "object" ? t.url : t) + (v ? `/${v}` : ""),
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
    return x({ showFor: E, showAudits: A }), (m, t) => {
      const s = L, n = C;
      return o(), D(l(S), {
        ref_key: "popoverRef",
        ref: c
      }, {
        default: H(() => [
          _("div", $, [
            _("div", G, f(l(y)("Edit History")) + ":", 1),
            l(b) ? (o(), i("div", J, [
              N(s, { class: "!size-8" })
            ])) : a.value.length > 0 ? (o(), i("ul", K, [
              (o(!0), i(Y, null, F(a.value, (e) => (o(), i("li", {
                key: e.id
              }, [
                _("span", {
                  class: T(["me-2 inline-block font-bold", d.value ? d.value(e.new_value) : ""])
                }, f(u.value ? u.value(e.new_value) : e.new_value), 3),
                V((o(), i("span", O, [
                  j(" (" + f(l(P)(e.created_at).format("YYYY-MM-DD HH:mm A")) + ") ", 1)
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
              _("span", U, f(l(y)("No Editing History")), 1)
            ]))
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});
export {
  re as default
};
