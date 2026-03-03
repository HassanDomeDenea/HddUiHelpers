import { defineComponent as Z, useModel as ee, useTemplateRef as b, computed as m, ref as D, resolveComponent as p, openBlock as s, createElementBlock as d, createBlock as z, createCommentVNode as h, createElementVNode as f, withModifiers as P, withDirectives as te, unref as a, vShow as le, toDisplayString as R, normalizeStyle as oe, normalizeClass as ne, createVNode as y, withCtx as _, mergeModels as $ } from "vue";
import { getColumnTitle as ae, getColumnCellFormatedText as re, getFilterMatchModesByTypeOptions as ie, getColumnCanShowFilterMatchModes as se, getColumnCanShowFilterApplyButton as ue } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { hidePrimevuePopovers as I } from "HddUiHelpers/plugins/primevue.ts";
import { useFormatters as ce } from "HddUiHelpers/utils/useFormatters.ts";
import { isBoolean as me, isNull as w, toLower as de } from "lodash-es";
import T from "moment";
import G from "primevue/popover";
import { useI18n as fe } from "vue-i18n";
const ve = ["data-sort-id"], pe = ["title"], he = { class: "w-[20px]" }, ye = ["title"], ge = { class: "ms-2 whitespace-pre-wrap font-bold" }, Ce = { class: "mx-2" }, be = ["innerHTML"], ke = { class: "flex min-w-[200px] flex-col items-stretch gap-1" }, xe = {
  key: 1,
  class: "mt-4 flex justify-end"
}, Ae = /* @__PURE__ */ Z({
  __name: "ToolbarFilterValue",
  props: /* @__PURE__ */ $({
    operator: {},
    columns: {},
    isPrinting: { type: Boolean, default: !1 },
    canCreateGroup: { type: Boolean }
  }, {
    filter: {},
    filterModifiers: {}
  }),
  emits: /* @__PURE__ */ $(["remove", "isolateIntoGroup", "operatorChanged", "filterCallback"], ["update:filter"]),
  setup(r, { expose: N, emit: H }) {
    const g = H, n = ee(r, "filter"), V = b("filterDivRef"), { t: l } = fe(), o = m(() => r.columns.find((e) => (e.filterField ?? e.fullFieldName) === n.value.field)), k = ce(), L = m(() => ae(o.value, l)), C = m(() => {
      let e = n.value.value;
      const t = re(e, o.value, l);
      switch (o.value.type === "date" && o.value.dateFormat && (Array.isArray(e) ? e = e.map((c) => T(c).format(o.value.dateFormat)) : e = T(e).format(o.value.dateFormat)), o.value.type) {
        case "date":
          if (Array.isArray(e))
            return `<span class="inline-block ltr">${e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${e[1]}</span>`;
          break;
        case "price":
        case "numeric":
          const c = o.value.type === "price", v = typeof o.value.currency == "string" ? o.value.currency : void 0;
          return Array.isArray(e) ? `<span class="inline-block ltr">${c ? k.formatPrice(e[0], v) : e[0]}</span> <span class="mx-1 italic font-light"> ${l("and")} </span> <span class="inline-block ltr">${c ? k.formatPrice(e[1], v) : e[1]}</span>` : w(e) ? null : k.formatPrice(+t, v);
        case "select":
          return Array.isArray(t) ? t.length === 1 ? t[0] : t.join(
            n.value.matchMode === "whereIn" ? `<span class="mx-1 italic font-light"> ${l("or")} </span>` : l(",") + " "
          ) : t;
        case "boolean":
          return me(e) ? t : null;
      }
      return t || null;
    }), O = m(() => {
      if (n.value.matchMode === "whereIn")
        return "=";
      {
        const e = B.value.find(
          (t) => t.value === n.value.matchMode
        );
        return e ? e.symbol ? e.symbol : de(e.label) : l("?");
      }
    }), u = D(), x = b("menuPopoverRef"), M = b("operatorChangerRef"), B = m(() => ie(l)[o.value.type ?? "text"]);
    function U(e) {
      r.isPrinting || (u.value = {
        value: n.value.value,
        matchMode: n.value.matchMode
      }, x.value?.toggle(e));
    }
    function S() {
      n.value.value = u.value.value, n.value.matchMode = u.value.matchMode, x.value?.hide(), g("filterCallback", n.value);
    }
    function j() {
    }
    const F = D();
    function E(e) {
      r.isPrinting || (F.value = r.operator, I(), M.value.toggle(e));
    }
    function q(e) {
      e && e !== r.operator && g("operatorChanged", e), M.value.hide();
    }
    const A = b("filterDivContextMenuRef");
    function J(e) {
      r.isPrinting || (I(), r.canCreateGroup && A.value.toggle(e));
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
      V.value.click();
    }
    return N({ focus: Q }), (e, t) => {
      const c = p("ContextMenu"), v = p("Select"), W = p("FilterControl"), X = p("Button"), Y = p("SelectButton");
      return s(), d("div", {
        "data-sort-id": n.value.id
      }, [
        r.isPrinting ? h("", !0) : (s(), z(c, {
          key: 0,
          ref_key: "filterDivContextMenuRef",
          ref: A,
          model: K.value
        }, null, 8, ["model"])),
        f("div", {
          ref_key: "filterDivRef",
          ref: V,
          class: "border-1 py-0.25 m-1 flex select-none items-center rounded-xl border-gray-800/75 px-3 text-sm dark:border-gray-400/75",
          onClick: U,
          onContextmenu: P(J, ["prevent"])
        }, [
          r.isPrinting ? h("", !0) : te((s(), d("i", {
            key: 0,
            class: "i-mdi-close text-danger-3 hover:text-danger-2 cursor-pointer print:hidden",
            tabindex: "-1",
            title: a(l)("Remove"),
            onClick: t[0] || (t[0] = P((i) => g("remove", n.value.field), ["stop"]))
          }, null, 8, pe)), [
            [le, !n.value.isFixed]
          ]),
          f("span", he, [
            r.operator ? (s(), d("span", {
              key: 0,
              class: "mx-1 cursor-pointer rounded px-1 font-bold italic text-zinc-500 hover:bg-gray-200/75 dark:text-zinc-300 hover:dark:bg-gray-700/75",
              title: a(l)("Change Filtering Method"),
              onClick: P(E, ["stop"])
            }, R(a(l)(r.operator)), 9, ye)) : h("", !0)
          ]),
          f("span", ge, R(L.value), 1),
          f("span", Ce, R(O.value), 1),
          o.value.type === "color" && !a(w)(C.value) ? (s(), d("span", {
            key: 1,
            class: ne(["hdd-color-box inline-block cursor-initial!", ["size-5!"]]),
            style: oe({ backgroundColor: C.value })
          }, null, 4)) : (s(), d("span", {
            key: 2,
            class: "ms- 2 font-bold",
            innerHTML: a(w)(C.value) ? a(l)("?") : C.value
          }, null, 8, be))
        ], 544),
        y(a(G), {
          ref_key: "menuPopoverRef",
          ref: x,
          onHide: j
        }, {
          default: _(() => [
            f("div", ke, [
              a(se)(o.value) ? (s(), z(v, {
                key: 0,
                modelValue: u.value.matchMode,
                "onUpdate:modelValue": t[1] || (t[1] = (i) => u.value.matchMode = i),
                size: "small",
                "option-label": "label",
                "option-value": "value",
                options: B.value
              }, null, 8, ["modelValue", "options"])) : h("", !0),
              y(W, {
                "filter-model": u.value,
                "onUpdate:filterModel": t[2] || (t[2] = (i) => u.value = i),
                "filter-callback": S,
                column: o.value,
                size: "small"
              }, null, 8, ["filter-model", "column"]),
              a(ue)(o.value) ? (s(), d("div", xe, [
                y(X, {
                  size: "small",
                  label: a(l)("Apply"),
                  icon: "i-mdi-check",
                  severity: "success",
                  onClick: S
                }, null, 8, ["label"])
              ])) : h("", !0)
            ])
          ]),
          _: 1
        }, 512),
        y(a(G), {
          ref_key: "operatorChangerRef",
          ref: M
        }, {
          default: _(() => [
            f("div", null, [
              y(Y, {
                modelValue: F.value,
                "onUpdate:modelValue": t[3] || (t[3] = (i) => F.value = i),
                "option-label": "label",
                "option-value": "value",
                size: "small",
                fluid: "",
                options: [
                  { value: "and", label: a(l)("and") },
                  { value: "or", label: a(l)("or") }
                ],
                onChange: t[4] || (t[4] = (i) => q(i.value))
              }, null, 8, ["modelValue", "options"])
            ])
          ]),
          _: 1
        }, 512)
      ], 8, ve);
    };
  }
});
export {
  Ae as default
};
