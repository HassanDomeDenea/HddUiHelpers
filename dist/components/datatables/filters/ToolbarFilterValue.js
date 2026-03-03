import Z from "primevue/selectbutton";
import ee from "primevue/button";
import { _ as te } from "../../../FilterControl.vue_vue_type_script_setup_true_lang-ptr3bjjm.js";
import oe from "primevue/select";
import le from "primevue/contextmenu";
import { defineComponent as ne, useModel as re, useTemplateRef as b, computed as m, ref as A, openBlock as u, createElementBlock as d, createBlock as D, unref as t, createCommentVNode as v, createElementVNode as f, withModifiers as _, withDirectives as ae, vShow as ie, toDisplayString as F, normalizeStyle as se, normalizeClass as ue, createVNode as h, withCtx as $, isRef as z, mergeModels as S } from "vue";
import { getColumnTitle as ce, getColumnCellFormatedText as me, getFilterMatchModesByTypeOptions as de, getColumnCanShowFilterMatchModes as fe, getColumnCanShowFilterApplyButton as pe } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as I } from "HddUiHelpers/plugins/primevue.ts";
import { useFormatters as ve } from "HddUiHelpers/utils/useFormatters.ts";
import { isBoolean as he, isNull as P, toLower as ge } from "lodash-es";
import T from "moment";
import G from "primevue/popover";
import { useI18n as ye } from "vue-i18n";
const Ce = ["data-sort-id"], be = ["title"], ke = { class: "w-[20px]" }, xe = ["title"], Me = { class: "ms-2 whitespace-pre-wrap font-bold" }, _e = { class: "mx-2" }, Fe = ["innerHTML"], Pe = { class: "flex min-w-[200px] flex-col items-stretch gap-1" }, Re = {
  key: 1,
  class: "mt-4 flex justify-end"
}, Le = /* @__PURE__ */ ne({
  __name: "ToolbarFilterValue",
  props: /* @__PURE__ */ S({
    operator: {},
    columns: {},
    isPrinting: { type: Boolean, default: !1 },
    canCreateGroup: { type: Boolean }
  }, {
    filter: {},
    filterModifiers: {}
  }),
  emits: /* @__PURE__ */ S(["remove", "isolateIntoGroup", "operatorChanged", "filterCallback"], ["update:filter"]),
  setup(a, { expose: N, emit: H }) {
    const g = H, r = re(a, "filter"), R = b("filterDivRef"), { t: l } = ye(), n = m(() => a.columns.find((e) => (e.filterField ?? e.fullFieldName) === r.value.field)), k = ve(), L = m(() => ce(n.value, l)), y = m(() => {
      let e = r.value.value;
      const o = me(e, n.value, l);
      switch (n.value.type === "date" && n.value.dateFormat && (Array.isArray(e) ? e = e.map((c) => T(c).format(n.value.dateFormat)) : e = T(e).format(n.value.dateFormat)), n.value.type) {
        case "date":
          if (Array.isArray(e))
            return `<span class="inline-block ltr">${e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${e[1]}</span>`;
          break;
        case "price":
        case "numeric":
          const c = n.value.type === "price", p = typeof n.value.currency == "string" ? n.value.currency : void 0;
          return Array.isArray(e) ? `<span class="inline-block ltr">${c ? k.formatPrice(e[0], p) : e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${c ? k.formatPrice(e[1], p) : e[1]}</span>` : P(e) ? null : k.formatPrice(o, p);
        case "select":
          return Array.isArray(o) ? o.length === 1 ? o[0] : o.join(
            r.value.matchMode === "whereIn" ? `<span class="mx-1 italic font-light"> ${l("or")} </span>` : l(",") + " "
          ) : o;
        case "boolean":
          return he(e) ? o : null;
      }
      return o || null;
    }), O = m(() => {
      if (r.value.matchMode === "whereIn")
        return "=";
      {
        const e = w.value.find(
          (o) => o.value === r.value.matchMode
        );
        return e ? e.symbol ? e.symbol : ge(e.label) : l("?");
      }
    }), i = A(), x = b("menuPopoverRef"), M = b("operatorChangerRef"), w = m(() => de(l)[n.value.type ?? "text"]);
    function U(e) {
      a.isPrinting || (i.value = {
        value: r.value.value,
        matchMode: r.value.matchMode
      }, x.value?.toggle(e));
    }
    function V() {
      r.value.value = i.value.value, r.value.matchMode = i.value.matchMode, x.value?.hide(), g("filterCallback", r.value);
    }
    function j() {
    }
    const C = A();
    function E(e) {
      a.isPrinting || (C.value = a.operator, I(), M.value.toggle(e));
    }
    function q(e) {
      e && e !== a.operator && g("operatorChanged", e), M.value.hide();
    }
    const B = b("filterDivContextMenuRef");
    function J(e) {
      a.isPrinting || (I(), a.canCreateGroup && B.value.toggle(e));
    }
    const K = m(() => [
      {
        label: l("Isolate into Group"),
        icon: "i-mdi:filter-multiple",
        command: () => {
          g("isolateIntoGroup");
        }
      }
    ]);
    function Q() {
      R.value.click();
    }
    return N({ focus: Q }), (e, o) => {
      const c = le, p = oe, W = te, X = ee, Y = Z;
      return u(), d("div", {
        "data-sort-id": r.value.id
      }, [
        a.isPrinting ? v("", !0) : (u(), D(c, {
          key: 0,
          ref_key: "filterDivContextMenuRef",
          ref: B,
          model: t(K)
        }, null, 8, ["model"])),
        f("div", {
          ref_key: "filterDivRef",
          ref: R,
          class: "border-1 py-0.25 m-1 flex select-none items-center rounded-xl border-gray-800/75 px-3 text-sm dark:border-gray-400/75",
          onClick: U,
          onContextmenu: _(J, ["prevent"])
        }, [
          a.isPrinting ? v("", !0) : ae((u(), d("i", {
            key: 0,
            class: "i-mdi-close text-danger-3 hover:text-danger-2 cursor-pointer print:hidden",
            tabindex: "-1",
            title: t(l)("Remove"),
            onClick: o[0] || (o[0] = _((s) => g("remove", r.value.field), ["stop"]))
          }, null, 8, be)), [
            [ie, !r.value.isFixed]
          ]),
          f("span", ke, [
            a.operator ? (u(), d("span", {
              key: 0,
              class: "mx-1 cursor-pointer rounded px-1 font-bold italic text-zinc-500 hover:bg-gray-200/75 dark:text-zinc-300 hover:dark:bg-gray-700/75",
              title: t(l)("Change Filtering Method"),
              onClick: _(E, ["stop"])
            }, F(t(l)(a.operator)), 9, xe)) : v("", !0)
          ]),
          f("span", Me, F(t(L)), 1),
          f("span", _e, F(t(O)), 1),
          t(n).type === "color" && !t(P)(t(y)) ? (u(), d("span", {
            key: 1,
            class: ue(["hdd-color-box inline-block !cursor-initial", ["!size-5"]]),
            style: se({ backgroundColor: t(y) })
          }, null, 4)) : (u(), d("span", {
            key: 2,
            class: "ms- 2 font-bold",
            innerHTML: t(P)(t(y)) ? t(l)("?") : t(y)
          }, null, 8, Fe))
        ], 544),
        h(t(G), {
          ref_key: "menuPopoverRef",
          ref: x,
          onHide: j
        }, {
          default: $(() => [
            f("div", Pe, [
              t(fe)(t(n)) ? (u(), D(p, {
                key: 0,
                modelValue: t(i).matchMode,
                "onUpdate:modelValue": o[1] || (o[1] = (s) => t(i).matchMode = s),
                size: "small",
                "option-label": "label",
                "option-value": "value",
                options: t(w)
              }, null, 8, ["modelValue", "options"])) : v("", !0),
              h(W, {
                "filter-model": t(i),
                "onUpdate:filterModel": o[2] || (o[2] = (s) => z(i) ? i.value = s : null),
                "filter-callback": V,
                column: t(n),
                size: "small"
              }, null, 8, ["filter-model", "column"]),
              t(pe)(t(n)) ? (u(), d("div", Re, [
                h(X, {
                  size: "small",
                  label: t(l)("Apply"),
                  icon: "i-mdi-check",
                  severity: "success",
                  onClick: V
                }, null, 8, ["label"])
              ])) : v("", !0)
            ])
          ]),
          _: 1
        }, 512),
        h(t(G), {
          ref_key: "operatorChangerRef",
          ref: M
        }, {
          default: $(() => [
            f("div", null, [
              h(Y, {
                modelValue: t(C),
                "onUpdate:modelValue": o[3] || (o[3] = (s) => z(C) ? C.value = s : null),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: t(l)("and") },
                  { value: "or", label: t(l)("or") }
                ],
                onChange: o[4] || (o[4] = (s) => q(s.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)
      ], 8, Ce);
    };
  }
});
export {
  Le as default
};
