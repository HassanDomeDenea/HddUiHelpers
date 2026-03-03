import { defineComponent as ta, computed as f, onActivated as la, onMounted as aa, ref as g, useModel as fe, useTemplateRef as O, watch as wt, toValue as Ft, resolveComponent as I, resolveDirective as oa, openBlock as r, createElementBlock as F, normalizeClass as te, createVNode as C, mergeProps as le, createSlots as Ie, withCtx as c, renderSlot as m, normalizeProps as ae, guardReactiveProps as oe, renderList as W, unref as o, createElementVNode as S, toDisplayString as V, withDirectives as A, createBlock as h, createCommentVNode as v, Fragment as $, isRef as ia, withModifiers as na, normalizeStyle as $e, createTextVNode as Oe, mergeModels as St, nextTick as ra } from "vue";
import ua from "HddUiHelpers/components/datatables/PrintPaperForServerDataTable.vue";
import sa from "primevue/datatable";
import { isToolbarFilterValue as Bt } from "./ServerDataTableTypes.js";
import { useDebounceFn as Ve, useElementSize as xt } from "@vueuse/core";
import da from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { useServerDataTableColumnVisibility as fa } from "HddUiHelpers/components/datatables/visibility.ts";
import { useApiClient as ca } from "HddUiHelpers/stores/apiClient.ts";
import { isBoolean as Le, set as va, cloneDeep as Ne, map as ma, filter as ya, reduce as kt, isFunction as ce, isString as ve, find as ba, get as me, uniqueId as He, unset as ga } from "lodash-es";
import Rt from "primevue/contextmenu";
import { useConfirm as ha } from "primevue/useconfirm";
import { useI18n as Ca } from "vue-i18n";
import wa from "HddUiHelpers/components/AuditsPopover/AuditsPopover.vue";
import Fa from "HddUiHelpers/components/datatables/CellContent.vue";
import Sa from "HddUiHelpers/components/datatables/InlineCellEdit.vue";
import { snakeCasePreserveDots as Ba, getFilterMatchModesByTypeOptions as xa, isToolbarFilterEmpty as pt, getFieldSlotName as Q, getColumnTitle as Ke, getColumnName as ye, localeAlignToFrozenAlign as Mt, getColumnCanShowFilterApplyButton as zt, getColumnCanShowAddButton as ka, getColumnCanShowFilterMatchModes as Ra, getColumnCanShowFilterOperator as pa, getColumnSlotName as Tt, appendToUrl as Ma } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Dt from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { useHddUiHelpers as za } from "HddUiHelpers/plugins/HddUiHelpers.ts";
import { useStackableDialog as Ta } from "HddUiHelpers/stores/stackableDialogs.ts";
import { printDomWithStyles as Da } from "HddUiHelpers/utils/printDom.ts";
import { useFormatters as Pa } from "HddUiHelpers/utils/useFormatters.ts";
import Ua from "moment";
import z from "primevue/button";
import X from "primevue/column";
import Pt from "primevue/popover";
const Ea = ["data-name"], Aa = { class: "my-2 text-center text-lg font-bold" }, Ia = { class: "flex justify-between" }, $a = { class: "flex justify-between" }, Oa = { key: 0 }, Va = {
  class: "overflow-y-auto",
  style: { "max-height": "calc(100vh - 100px)" }
}, La = { class: "flex max-h-screen flex-col items-center gap-y-1 py-1" }, Na = { class: "flex justify-end gap-1 print:hidden" }, Ha = { class: "max-h-screen overflow-y-auto" }, Ka = ["for"], qa = {
  key: 0,
  class: "flex justify-start"
}, ja = { class: "mt-1" }, Ga = { class: "flex w-full justify-end gap-1 text-sm" }, Ya = { key: 0 }, Wa = { class: "flex items-center gap-1 text-sm" }, Ja = { key: 0 }, Qa = ["innerHTML"], Xa = {
  key: 0,
  class: "text-secondary-1 text-center text-sm italic"
}, Za = ["innerHTML"], _a = ["title"], eo = ["title"], to = { class: "flex flex-wrap items-center gap-1" }, Mo = /* @__PURE__ */ ta({
  __name: "ServerDataTable",
  props: /* @__PURE__ */ St({
    columns: { default: () => [] },
    fields: { default: () => [] },
    name: {},
    printingTitle: {},
    title: {},
    hasToolsColumn: { type: Boolean },
    inlineEditMode: { default: "none" },
    columnVisibilityButton: { type: Boolean, default: () => {
    } },
    withLoadingMask: { type: Boolean, default: !0 },
    printable: { type: Boolean },
    printTableAsInView: { type: Boolean, default: !1 },
    customPrintMethod: { type: Function },
    firstPageHeaderImageUrl: {},
    headerImageUrl: {},
    footerImageUrl: {},
    printableRows: { type: [Boolean, Function] },
    noMultiSortBadges: { type: Boolean },
    refreshOnActivated: { type: Boolean, default: !1 },
    noBody: { type: Boolean, default: !1 },
    noEmptyMessage: { type: Boolean, default: !1 },
    showOnlySortedIcon: { type: Boolean, default: !0 },
    withDataView: { type: Boolean, default: !1 },
    frozenToolsColumn: { type: Boolean },
    allowMultipleToolbarFiltersForSameField: { type: Boolean, default: !1 },
    frozenSelectionColumn: { type: Boolean, default: () => {
    } },
    toolsColumnProps: {},
    toolsColumnBodyClass: {},
    openOnClick: { type: Boolean },
    withToolbarFilters: { type: Boolean, default: () => {
    } },
    fixedToolbarFilters: { default: () => [] },
    initialToolbarFilters: { default: () => [] },
    expandOnRowClick: { type: Boolean, default: !0 },
    selectOnRowClick: { type: Boolean, default: !0 },
    multiEditable: { type: Boolean, default: !1 },
    hasPagination: { type: Boolean, default: !0 },
    hasSorts: { type: Boolean, default: () => {
    } },
    primaryKey: { default: "id" },
    scrollHeight: { default: "flex" },
    scrollable: { type: Boolean },
    scrollDirection: {},
    toolButtonsSize: {},
    size: {},
    hasRefreshButton: { type: Boolean, default: !0 },
    editable: { type: Boolean },
    creatable: { type: Boolean },
    createButtonLabel: {},
    createButtonProps: {},
    deletable: { type: Boolean },
    openable: { type: Boolean },
    openButtonTitle: {},
    openButtonLabel: {},
    openButtonIcon: {},
    infiniteScroll: { type: Boolean },
    itemSize: { default: 46 },
    rowHover: { type: Boolean, default: !0 },
    rowClass: { type: Function },
    isActiveRow: { type: Function },
    isCompact: { type: Boolean, default: !1 },
    useFormForEdit: { type: Boolean, default: !0 },
    refreshAfterFormSubmit: { type: Boolean, default: !0 },
    formProps: { default: () => ({}) },
    extraContextMenuOptions: {},
    extraToolAndContextButtons: {},
    toolbarButtonsSize: {},
    showGridLines: { type: Boolean, default: !0 },
    singleDeleteUrl: { type: Function },
    deleteUrl: {},
    reorderUrl: {},
    getReorderScopedValues: { type: Function },
    singleEditUrl: { type: Function },
    editUrl: {},
    url: {},
    createUrl: {},
    reorderable: { type: Boolean },
    orderableColumnName: { default: "order_sequence" },
    withExpansion: { type: Boolean, default: !1 },
    hasExpanderColumn: { type: Boolean, default: !0 },
    oneExpansionAtATime: { type: Boolean, default: !1 },
    hasSequenceColumn: { type: Boolean, default: !1 },
    sequenceColumnProps: {},
    printingProps: {},
    selectable: { type: Boolean },
    selectAllToolbarButton: { type: Boolean, default: !0 },
    toolbarButtonsOnlyIcons: { type: Boolean, default: !1 },
    withContextMenu: { type: Boolean, default: !0 },
    hasGlobalFilter: { type: Boolean, default: !0 },
    defaultFiltersOperator: { default: "and" },
    defaultShowFilterMatchModes: { type: Boolean, default: !0 },
    defaultColumnMultipleFilters: { type: Boolean, default: !0 },
    selectionMode: { default: "multiple" },
    hasSelectionColumn: { type: Boolean, default: !0 },
    filterDisplayLayout: {},
    globalFilterFields: {},
    initialRecords: { default: null },
    removableSort: { type: Boolean, default: !0 },
    refreshOnMount: { type: Boolean, default: !0 },
    sortMode: {},
    initialSortDirection: { default: "asc" },
    initialSortField: {},
    initialSorts: {},
    dataProvider: { type: Function },
    extraGetDataPayload: {},
    initialTotalRecords: { default: 0 },
    initialTotalRecordsWithoutFilters: {},
    defaultDateMatchMode: { default: "dateBetween" },
    defaultNumericMatchMode: { default: "equals" },
    defaultMatchMode: { default: "contains" },
    fixedFilters: {},
    defaultColumnShowFilterAddButton: { type: Boolean, default: !0 },
    defaultColumnShowFilterClearButton: { type: Boolean, default: !0 },
    onRowClick: { type: Function },
    onRowDblClick: { type: Function },
    onRowOpen: { type: Function },
    rowDeletable: { type: Function },
    rowEditable: { type: Function },
    rounded: { type: Boolean, default: !0 },
    tableSeverity: { default: "info" },
    headerSeverity: {},
    transformResponseData: { type: Function },
    openButtonUrl: { type: Function },
    rowGroupMode: { default: "subheader" },
    groupRowsBy: {},
    rowGroupHeaderFormatter: { type: [Boolean, Function] },
    rowGroupHeaderClass: {},
    onlyRequestedColumns: { type: Boolean, default: () => {
    } }
  }, {
    perPage: { default: 25 },
    perPageModifiers: {},
    firstRowIndex: { default: 0 },
    firstRowIndexModifiers: {},
    currentPage: { default: 1 },
    currentPageModifiers: {},
    extraData: {},
    extraDataModifiers: {}
  }),
  emits: /* @__PURE__ */ St(["rowClick", "rowDblClick", "rowOpen", "rowEdit", "multiRowsEdit", "rowCreated", "rowUpdated", "rowDeleted", "rowExpand", "rowPrint", "rowCollapse", "rowReorder", "refreshed", "rowChanged", "dialogsVisibility"], ["update:perPage", "update:firstRowIndex", "update:currentPage", "update:extraData"]),
  setup(e, { expose: Ut, emit: Et }) {
    const x = Et, qe = f(
      () => "HddServerDataTable_" + (e.name ?? (typeof e.url == "object" ? e.url.url : e.url))
    ), At = za(), L = f(() => At.commonServerDataTableProps ?? {}), B = f(() => e.size ?? L.value.size), It = f(
      () => Le(e.onlyRequestedColumns) ? e.onlyRequestedColumns : Le(L.value.onlyRequestedColumns) ? L.value.onlyRequestedColumns : !0
    ), $t = f(
      () => e.extraGetDataPayload ?? L.value.extraGetDataPayload ?? {}
    ), Ot = f(
      () => e.noMultiSortBadges ?? L.value.noMultiSortBadges ?? !1
    ), Vt = f(
      () => e.columnVisibilityButton ?? L.value.columnVisibilityButton
    ), be = f(
      () => e.withToolbarFilters ?? L.value.withToolbarFilters
    ), Lt = f(
      () => e.filterDisplayLayout ?? L.value.filterDisplayLayout ?? "menu"
    ), ge = f(() => e.sortMode ?? L.value.sortMode ?? "multiple");
    la(() => {
      e.refreshOnActivated && st();
    }), aa(() => {
      e.refreshOnMount && st();
    });
    const { t: n } = Ca(), w = g(e.initialRecords || []), j = g(e.initialTotalRecords), he = g(0), Ce = g(0), we = g(0), d = g([]), Z = g(), je = f({
      get() {
        return e.selectionMode === "multiple" ? d.value : Z.value;
      },
      set(l) {
        e.selectionMode === "multiple" ? d.value = l : Z.value = l;
      }
    }), K = g({}), b = g(), R = fe(e, "perPage"), Ge = fe(e, "firstRowIndex"), ie = fe(e, "currentPage"), _ = fe(e, "extraData"), p = g(!1), M = g(!1), Nt = Pa(), G = ca(), Ht = ha(), ne = O("wrapperRef"), Ye = O("headerSegmentRef"), Kt = O("datatableRef"), T = f(() => {
      let l;
      return Array.isArray(e.columns) ? l = e.columns : l = e.columns === "*" && w.value?.length ? Object.keys(w.value[0]) : [e.columns], l.map((t) => typeof t == "string" ? { name: t, field: t, label: t, fullFieldName: t } : (t.field || (t.field = t.name), t.relation ? (t.relation = Ba(t.relation), t.fullFieldName = t.relation + "." + t.field) : t.fullFieldName = t.field, (!t.type || t.type === "select") && t.selectOptions !== void 0 && (t.type = "select", t.renderTypeProps && !t.renderType && (t.renderType = "tag")), t.hiddenButCanBeVisible === !0 && (t.visibilityControl = !0, t.visible = !1), t.type === "date" && (t.dateFormat ? t.dateFormat === "date" ? t.dateFormat = "YYYY-MM-DD" : t.dateFormat === "datetime" && (t.dateFormat = "YYYY-MM-DD hh:mmA") : t.dateFormat = "YYYY-MM-DD"), t.type || (t.type = "text"), t));
    }), qt = f(() => T.value.filter((l) => l.filterable ?? _e.value)), We = f(() => {
      const l = {};
      return T.value.forEach((t) => {
        const i = t.fullFieldName;
        t.type === "select" && (t.selectOptionsKeyed ? l[i] = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? l[i] = t.selectOptions.reduce(
          (s, y) => (s[y[t.selectValueProperty ?? "id"]] = y[t.selectLabelProperty ?? "name"], s),
          {}
        ) : l[i] = t.selectOptions.object));
      }), l;
    });
    function Fe(l, t) {
      const i = typeof t.showable == "function" ? t.showable : Ft(t.showable);
      if (typeof i == "function" || Le(i)) {
        const k = typeof i == "function" ? i({ row: l }) : i;
        if (k === !1)
          return '<span class="italic text-muted">--</span>';
        if (k !== !0)
          return k;
      }
      let s = t.fullFieldName;
      typeof t.formatter == "string" && (s = t.formatter);
      const y = me(l, s);
      if (typeof t.formatter == "function")
        return t.formatter(y, l, s);
      if (t.type === "select") {
        let k;
        return t.isMultiSelect ? k = y.map((Y) => We.value[s]?.[Y] || Y) : k = We.value[s]?.[y] || y, !k && t.emptyValuePlaceholder && (k = `<span class="italic text-muted">${t.emptyValuePlaceholder}</span>`), k;
      }
      if (t.type === "price")
        return Nt.formatPrice(
          y,
          typeof t.currency == "string" ? t.currency : t.currency ? l : void 0
        );
      if (t.type === "date" && t.dateFormat)
        return y ? Ua(y).format(t.dateFormat) : "";
      if (t.type === "boolean") {
        if (t.renderType === "yesNoIconBadge") return y;
        let k = y === !0 ? n("Yes") : y === !1 ? n("No") : "";
        return k || (k = `<span class="italic text-muted">${t.emptyValuePlaceholder ?? "null"}</span>`), k;
      }
      return y;
    }
    function Je() {
      M.value = d.value.length === j.value && d.value.length !== 0;
    }
    function jt() {
      M.value ? (d.value = [], M.value = !1) : (d.value = w.value, M.value = d.value.length !== 0);
    }
    function Gt(l) {
      w.value?.length === 0 && (M.value = !1, d.value = []), M.value = l.checked, M.value ? d.value = w.value : d.value = [];
    }
    function Yt() {
      M.value = d.value.length === j.value && d.value.length !== 0;
    }
    function Wt() {
      M.value = !1;
    }
    function Jt() {
      d.value = w.value, M.value = d.value.length !== 0;
    }
    function Qt() {
      d.value = [], M.value = !1;
    }
    function Xt(l) {
      return d.value.some((t) => t[e.primaryKey] === l[e.primaryKey]);
    }
    function Zt(l) {
      e.selectionMode === "single" ? Z.value = Z.value === l ? void 0 : l : (Xt(l) ? d.value = d.value.filter(
        (t) => t[e.primaryKey] !== l[e.primaryKey]
      ) : d.value = [...d.value, l], M.value = d.value.length === j.value && d.value.length !== 0);
    }
    function Qe(l) {
      return l === "asc" ? 1 : l === "desc" ? -1 : void 0;
    }
    const Xe = f(() => e.hasSorts ?? !0), re = g(
      e.initialSorts?.map((l) => ({
        field: l.field,
        order: Qe(l.direction)
      }))
    ), ue = g(e.initialSortField), Se = g(Qe(e.initialSortDirection)), Be = f(() => ge.value === "single" && ue.value ? [{ field: ue.value, direction: Se.value === -1 ? "desc" : "asc" }] : ge.value === "multiple" && re.value?.length ? re.value.map(
      (l) => ({
        field: l.field,
        direction: l.order === -1 ? "desc" : "asc"
      })
    ) : []);
    async function _t() {
      await U(), Je();
    }
    const el = f(() => xa(n)), D = g(
      {}
    ), Ze = f({
      get() {
        return D.value._global?.value;
      },
      set(l) {
        va(D.value, "_global.value", l);
      }
    }), _e = g(!0);
    function xe(l) {
      return l?.operator !== void 0;
    }
    const et = f(() => {
      if (ot.value) return !0;
      for (const l in D.value) {
        if (e.fixedFilters?.[l])
          continue;
        const t = D.value[l];
        if (xe(t)) {
          if (t.constraints?.findIndex((s) => s.value !== null && s.value !== "") > -1) return !0;
        } else {
          if (typeof t == "string")
            return D.value[l] !== null && D.value[l] !== "";
          if (t?.value !== null && t?.value !== "") return !0;
        }
      }
      return !1;
    }), tl = f(() => {
      const l = D.value._global;
      if (!l)
        return !1;
      if (xe(l)) {
        if (l.constraints?.findIndex((i) => i.value !== null && i.value !== "") > -1) return !0;
      } else if (l?.value !== null && l?.value !== "") return !0;
      return !1;
    });
    function ll() {
      nt(!1), lt(), U();
    }
    function ke(l) {
      let t;
      switch (l) {
        case "date":
          t = e.defaultDateMatchMode;
          break;
        case "price":
        case "numeric":
          t = e.defaultNumericMatchMode;
          break;
        case "boolean":
          t = "equals";
          break;
        default:
          t = e.defaultMatchMode;
      }
      return t;
    }
    function al(l) {
      const t = typeof l == "object" ? l : T.value.find((i) => (i.filterField ?? i.field ?? i.name) === l);
      t && (D.value[t.filterField ?? t.fullFieldName] = tt(t));
    }
    function tt(l) {
      let t;
      return l.initialFilterMatchMode ? t = l.initialFilterMatchMode : t = ke(l.type), l.multipleFilters === !1 && !1 ? {
        value: null,
        matchMode: t
      } : {
        operator: "and",
        constraints: [{ value: null, matchMode: t }]
      };
    }
    function lt() {
      D.value = kt(
        T.value,
        (l, t) => (l[t.filterField ?? t.fullFieldName] = tt(t), l),
        {
          _global: {
            value: "",
            matchMode: "contains"
          }
        }
      );
    }
    wt(
      () => T.value.map((l) => l.filterField ?? l.name ?? l.field).join(","),
      (l, t) => {
        l !== t && lt();
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const ol = f(() => {
      const l = {
        operator: e.defaultFiltersOperator,
        fields: []
      };
      for (const t in D.value) {
        const i = D.value[t];
        typeof i == "string" ? l.fields.push({
          field: t,
          value: i,
          matchMode: e.defaultMatchMode
        }) : xe(i) ? l.fields.push({
          operator: i.operator,
          fields: i.constraints.map((s) => ({
            field: t,
            value: s.value,
            matchMode: s.matchMode
          }))
        }) : l.fields.push({
          field: t,
          value: i.value,
          matchMode: i.matchMode
        });
      }
      return l;
    });
    async function il() {
      await U();
    }
    const Re = O(
      "toolbarFiltersPopoverRef"
    ), at = O(
      "toolbarFiltersWrapperRef"
    ), nl = f(() => qt.value), rl = f(() => P.value.fields.filter((l) => Bt(l)).map((l) => l.field));
    function pe(l) {
      return Bt(l) ? (l.id || (l.id = He("toolbar-filter-")), l) : (l.id || (l.id = He("toolbar-filter-")), l.fields = l.fields.map(pe), l);
    }
    const P = g(
      pe({
        operator: e.defaultFiltersOperator,
        fields: [...Ne(e.initialToolbarFilters)]
      })
    );
    function ul(l) {
      P.value.fields.push({
        id: He("toolbar-filter-"),
        field: l.filterField ?? l.fullFieldName,
        value: null,
        matchMode: ke(l.type)
      }), Re.value?.hide(), ra(() => {
        setTimeout(() => {
          at.value?.focusLast();
        }, 50);
      });
    }
    const ot = f(() => !pt(P.value)), it = f(() => P.value.fields.length > 0);
    function nt(l = !0) {
      P.value = pe({
        operator: e.defaultFiltersOperator,
        fields: []
      }), l && U();
    }
    function Me() {
      yl();
    }
    async function sl(l) {
      ie.value = l.page + 1, await U(), Je();
    }
    async function dl() {
      ie.value = 1, await U();
    }
    const rt = f(
      () => e.globalFilterFields ?? ma(
        ya(T.value, (l) => l.globalFilter !== !1),
        (l) => l.filterField ?? l.fullFieldName
      )
    ), fl = f(() => {
      const l = [5, 10, 15, 25, 50, 100, 500, 1e3];
      return !l.includes(R.value) && R.value !== -1 && l.push(R.value), [...l.map((t) => ({ value: t, label: t })), { value: -1, label: n("All") }];
    }), cl = f(() => kt(
      T.value,
      (l, t) => {
        const i = t.field ?? t.name;
        if (!i) return l;
        const s = {
          name: i,
          relation: t.relation,
          filterField: t.filterField,
          sortField: t.sortField,
          source: t.source,
          filterSource: t.filterSource,
          sortSource: t.sortSource,
          morphableTo: t.morphableTo
        };
        return l.push(s), l;
      },
      []
    )), ut = g({});
    function vl(l, t = !1) {
      return ut.value = l, t ? U() : Promise.resolve();
    }
    async function ze(l = null, t = null, i = {}) {
      const s = {
        globalFilters: tl.value ? rt.value : [],
        page: t || ie.value,
        perPage: e.hasPagination ? l || R.value : -1,
        // perPage: specificPerPage || perPage.value,
        sorts: Be.value,
        fields: cl.value,
        filters: D.value,
        fixedFilters: e.fixedFilters,
        groupedFilters: P.value,
        fixedGroupedFilters: {
          operator: "and",
          fields: e.fixedToolbarFilters
        },
        options: {
          onlyRequestedColumns: It.value,
          primaryKey: e.primaryKey
        },
        ...$t.value
      }, y = typeof e.url == "object" ? e.url : { url: e.url, method: "get" };
      return G.request({
        ...y,
        params: y.method === "get" ? s : void 0,
        data: y.method === "post" ? s : void 0,
        ...i,
        ...ut.value
      });
    }
    async function U() {
      return p.value = !0, new Promise((l) => {
        e.dataProvider ? e.dataProvider({
          page: ie.value,
          perPage: R.value,
          sorts: Be.value,
          filters: ol.value
        }).then((t) => {
          w.value = t.data, j.value = t.total_records, R.value = t.per_page || R.value, Ge.value = (t.current_page - 1) * R.value, l();
        }) : e.url ? ze().then((t) => {
          let i = t.data.data;
          if (e.transformResponseData && (i = e.transformResponseData(i)), w.value = i.data, j.value = i.total, he.value = i.total_without_filters, R.value = i.per_page || R.value, Ge.value = (i.current_page - 1) * R.value, Ce.value = i.from ?? 0, we.value = i.to ?? 0, d.value.length > 0) {
            const s = d.value.map((y) => y[e.primaryKey]);
            d.value = w.value.filter(
              (y) => s.includes(y[e.primaryKey])
            );
          }
          _.value = i.extra;
        }).catch((t) => {
          console.error(t), G.toastRequestError(t);
        }).finally(l) : l();
      }).finally(() => {
        p.value = !1;
      });
    }
    const ml = Ve(() => {
      U();
    }, 500), yl = Ve(() => {
      U();
    }, 100), st = Ve(() => {
      U();
    }, 10), dt = g();
    wt(
      () => e.itemSize,
      (l) => {
        dt.value = l;
      },
      {
        immediate: !0
      }
    );
    const bl = g(!1), gl = f(() => {
      if (e.infiniteScroll)
        return {
          itemSize: dt.value,
          delay: 50,
          lazy: !0,
          showLoader: !0,
          autoSize: !0,
          loading: bl.value,
          onLazyLoad: hl
        };
    });
    async function hl() {
    }
    const {
      checkColumnIsVisible: ft,
      visibleColumns: Te,
      visibleColumnsPopoverRef: ct,
      saveVisibleColumnsState: Cl,
      toggleableColumns: wl
    } = fa(qe, T), ee = g(!1), J = g([]), { updateDialogVisibility: se } = Ta();
    function De(l) {
      if (!l) return;
      let t = 1;
      Array.isArray(l) && (t = l.length), se(!0), Ht.require({
        message: n("Are you sure to delete n records?", { n: t }, t),
        header: n("Confirmation"),
        icon: "pi pi-info-circle",
        rejectLabel: n("Cancel"),
        acceptLabel: n("Delete"),
        group: "dismissable",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          ee.value = !0;
          const i = Array.isArray(l) ? l.map((s) => s[e.primaryKey]) : [l[e.primaryKey]];
          try {
            if (!e.url)
              throw new Error("No Url");
            let s = typeof e.url == "object" ? e.url.url : e.url;
            t === 1 ? e.singleDeleteUrl ? s = e.singleDeleteUrl(i[0]).url : s = Ma(s, i[0]) : e.deleteUrl && (s = typeof e.deleteUrl == "object" ? e.deleteUrl.url : e.deleteUrl), J.value = i, await G.delete(s, { params: { ids: i } }), G.toastSuccess(n("Deleted!"), n("n Record Deleted Successfully", { n: t }, t)), x("rowDeleted", Array.isArray(l) ? i : l[e.primaryKey]), x("rowChanged", l, "delete"), d.value = d.value.filter(
              (y) => !i.includes(y[e.primaryKey])
            ), await U();
          } catch (s) {
            console.error(s), G.toastRequestError(s);
          }
          ee.value = !1, se(!1), J.value = [];
        },
        reject() {
          se(!1);
        },
        onHide() {
          se(!1);
        }
      });
    }
    const N = O("ServerFormDialogRef"), Fl = f(() => ({
      url: e.createUrl ?? e.url,
      primaryKey: e.primaryKey,
      singleDeleteUrl: e.singleDeleteUrl,
      deleteUrl: e.deleteUrl,
      singleEditUrl: e.singleEditUrl,
      editUrl: e.editUrl,
      autoAppendIdToEditUrl: !0,
      fields: e.fields,
      size: Ft(B),
      columns: T.value.filter((l) => l.inForm === !0),
      onSubmitted: Sl,
      onVisible: (l) => x("dialogsVisibility", l),
      ...e.formProps ?? {}
    }));
    function Sl(l, t) {
      t === "create" ? x("rowCreated", l) : t === "update" ? x("rowUpdated", l) : x(
        "rowDeleted",
        l instanceof Array ? l.map((i) => i[e.primaryKey]) : l[e.primaryKey]
      ), x("rowChanged", l, t), e.refreshAfterFormSubmit && U();
    }
    function Bl() {
      N.value?.create();
    }
    function Pe(l) {
      x("rowEdit", l), e.useFormForEdit && vt(l);
    }
    function xl(l) {
      x("multiRowsEdit", l), e.useFormForEdit && vt(l);
    }
    function kl(l) {
      l.length === 1 ? Pe(l[0]) : xl(l);
    }
    function vt(l) {
      Array.isArray(l) ? N.value?.editMulti(l) : N.value?.edit(l);
    }
    const Rl = f(() => !!e.onRowClick || e.openOnClick && e.onRowOpen);
    function pl(l) {
      e.onRowDblClick && x("rowDblClick", l.data, l.index, l.originalEvent);
    }
    function Ml(l) {
      if (!window.getSelection()?.isCollapsed)
        return;
      const t = l.originalEvent.composedPath(), i = t.find((H) => H.classList?.contains("p-datatable-row-toggle-button")), s = t.find((H) => H?.getAttribute?.("data-p-editable-column") === "true"), y = t.find((H) => H.classList?.contains("p-selection-column")), k = t.find((H) => H.classList?.contains("p-button"));
      if (i || s || y || k)
        return;
      x("rowClick", l.data, l.index, l.originalEvent);
      const Y = e.onRowClick || e.onRowOpen && e.openOnClick, Ae = l.originalEvent.target.getAttribute("data-p-selection-column") === "true";
      !Y && e.withExpansion && e.expandOnRowClick ? Dl(l.data) : (Ae || !Y) && e.selectable && e.selectOnRowClick ? Zt(l.data) : !e.onRowClick && e.openOnClick && e.openable && x("rowOpen", l.data);
    }
    const mt = O("contextMenuRef");
    function zl(l) {
      mt.value?.show(l.originalEvent);
    }
    const Tl = f(() => {
      const l = [];
      return b.value && (e.openable && l.push({
        label: e.openButtonLabel ?? e.openButtonTitle ?? n("Open"),
        icon: e.openButtonIcon ?? "i-material-symbols:open-jam-outline-rounded",
        url: e.openButtonUrl ? e.openButtonUrl(b.value) : void 0,
        command: () => b.value ? x("rowOpen", b.value) : void 0
      }), (e.printableRows == !0 || typeof e.printableRows == "function" && e.printableRows(b.value)) && l.push({
        label: n("Print"),
        icon: "i-mdi-printer",
        command: () => b.value ? x("rowPrint", b.value) : void 0
      }), e.editable && (!e.rowEditable || e.rowEditable(b.value)) && l.push({
        label: n("Edit"),
        icon: "i-mdi-edit",
        command: () => b.value ? Pe(b.value) : void 0
      }), e.deletable && (!e.rowDeletable || e.rowDeletable(b.value)) && l.push({
        label: n("Delete"),
        icon: "i-mdi-trash",
        disabled: p.value || ee.value,
        command: () => b.value ? De(b.value) : void 0
      })), e.extraToolAndContextButtons?.length && l.push(
        ...Ne(e.extraToolAndContextButtons).map((t) => {
          t.command && (t.command2 = t.command, t.command = () => t.command2(b.value)), typeof t.visible == "function" && (t.visible2 = t.visible, t.visible = () => t.visible2(b.value)), typeof t.icon == "function" && (t.icon2 = t.icon, t.icon = () => t.icon2(b.value));
          const i = ce(t.badge) ? t.badge(b.value) : t.badge;
          return typeof t.label == "function" ? (t.label2 = t.label, t.label = () => t.label2(b.value) + (i ? ` (${i})` : "")) : t.label = t.label + (i ? ` (${i})` : ""), t;
        })
      ), e.extraContextMenuOptions && e.extraContextMenuOptions.length > 0 && l.push(
        ...Ne(e.extraContextMenuOptions).map((t) => {
          typeof t.visible == "function" && (t.visible2 = t.visible, t.visible = () => t.visible2(b.value)), t.command && (t.command2 = t.command, t.command = () => t.command2(b.value)), typeof t.labelFn == "function" && (t.label = t.labelFn(b.value)), typeof t.icon == "function" && (t.icon2 = t.icon, t.icon = () => t.icon2(b.value));
          const i = ce(t.badge) ? t.badge(b.value) : t.badge;
          return typeof t.label == "function" ? (t.label2 = t.label, t.label = () => t.label2(b.value) + (i ? ` (${i})` : "")) : t.label = t.label + (i ? ` (${i})` : ""), t;
        })
      ), l;
    });
    function Dl(l) {
      Pl(l) ? El(l) : Ul(l);
    }
    function Pl(l) {
      return K.value ? K.value[l[e.primaryKey]] : !1;
    }
    function Ul(l) {
      e.oneExpansionAtATime ? K.value = {
        [l[e.primaryKey]]: !0
      } : K.value[l[e.primaryKey]] = !0;
    }
    function El(l) {
      ga(K.value, l[e.primaryKey]);
    }
    function Al(l) {
      e.oneExpansionAtATime && (K.value = {
        [l.data[e.primaryKey]]: !0
      }), x("rowExpand", l.data);
    }
    function Il(l) {
      x("rowCollapse", l.data);
    }
    const yt = g(!1);
    async function $l(l) {
      yt.value = !0;
      let t = (typeof e.url == "object" ? e.url.url : e.url) + "/reorder", i = "put";
      return e.reorderUrl && (t = typeof e.reorderUrl == "object" ? e.reorderUrl.url : e.reorderUrl, i = typeof e.reorderUrl == "object" ? e.reorderUrl.method : "put"), G.request({
        url: t,
        method: i,
        data: {
          from_order: w.value[l.dragIndex][e.orderableColumnName],
          to_order: w.value[l.dropIndex][e.orderableColumnName],
          scoped_values: e.getReorderScopedValues ? e.getReorderScopedValues(l) : {}
        }
      }).then(() => {
        U();
      }).catch((s) => {
        G.toastRequestError(s);
      }).finally(() => {
        yt.value = !1;
      });
    }
    const bt = O(
      "printTableContextMenuRef"
    ), Ol = f(() => [
      {
        label: n("Print Current Page"),
        icon: "i-mdi:printer-pos",
        command: () => {
          de();
        }
      },
      {
        label: n("Print All Pages"),
        icon: "i-mdi:printer-pos-star",
        command: () => {
          de(!0);
        }
      }
    ]), Vl = f(() => T.value.filter((l) => l.printable !== !1)), Ll = f(() => ({
      columns: Vl.value,
      mappedColumns: T.value,
      sorts: Be.value,
      hasSequenceColumn: e.hasSequenceColumn,
      records: w,
      firstPageHeaderImageUrl: e.firstPageHeaderImageUrl,
      headerImageUrl: e.headerImageUrl,
      footerImageUrl: e.footerImageUrl,
      extraData: _,
      hasSorts: Xe.value,
      getData: ze,
      toolbarFilters: pt(e.fixedToolbarFilters) ? P.value : {
        operator: "and",
        fields: [...e.fixedToolbarFilters, P.value]
      },
      filters: D.value,
      getColumnBody: Fe,
      checkColumnIsVisible: ft,
      showPageCounter: !0,
      showCurrentPrintTime: !0,
      ...e.printingProps ?? {}
    })), Ue = g(!1), Ee = O("printPaperForServerDataTableRef");
    function de(l = !1) {
      e.customPrintMethod ? e.customPrintMethod() : e.printTableAsInView ? ne.value && Da(ne.value, {
        pageCounter: !0,
        leftMargin: 8,
        rightMargin: 8,
        topMargin: 8,
        bottomMargin: 8,
        showPrintTime: !0,
        firstPageHeaderImageUrl: e.firstPageHeaderImageUrl,
        headerImageUrl: e.headerImageUrl,
        footerImageUrl: e.footerImageUrl
      }) : Ee.value?.print(l);
    }
    function Nl(l) {
      e.hasPagination && bt.value?.show(l);
    }
    function Hl(l) {
      Ee.value?.print(!0, l);
    }
    function Kl() {
      p.value = !0;
    }
    function ql() {
      p.value = !1;
    }
    Ut({
      records: w,
      selectedRecord: Z,
      selectedRecords: d,
      refresh: U,
      startLoading: Kl,
      endLoading: ql,
      isLoading: p,
      extraData: _,
      printTable: de,
      getData: ze,
      setCustomGetDataConfig: vl,
      clearFilterFor: al,
      ServerFormDialogRef: N,
      printWithCustomConfig: Hl
    });
    const jl = f(() => {
      const l = [];
      return e.tableSeverity && e.tableSeverity !== "none" && (l.push(`p-datatable-${e.tableSeverity}`), l.push(`p-datatable-header-${e.tableSeverity}`)), l;
    });
    function Gl(l) {
      const t = l.value, i = l.newValue;
      t !== i && N.value?.updateDirectly(l.data, [l.field, l.newValue]);
    }
    const gt = O("auditsPopoverRef");
    function Yl(l, t, i) {
      t.auditHistory && (l.stopPropagation(), l.preventDefault(), e.url && gt.value?.showAudits(
        l,
        e.url,
        t.fullFieldName,
        (s) => typeof t.formatter == "function" ? t.formatter(s, i, t.fullFieldName) : s,
        () => t.type === "textarea" ? "whitespace-pre-wrap" : "",
        `${me(i, e.primaryKey)}/audits`
      ));
    }
    const Wl = xt(ne), Jl = xt(Ye), Ql = f(() => e.scrollable ? Wl.height.value - Jl.height.value + "px" : void 0);
    return (l, t) => {
      const i = I("InputIcon"), s = I("InputText"), y = I("IconField"), k = I("Divider"), Y = I("SelectInput"), Ae = I("InputGroup"), H = I("Checkbox"), Xl = I("Select"), ht = I("Skeleton"), Zl = I("FilterControl"), _l = I("DataView"), E = oa("tooltip");
      return r(), F("div", {
        ref_key: "wrapperRef",
        ref: ne,
        class: te(["HddServerDataTableWrapper h-full", { "rounded-table": e.rounded }]),
        "data-name": qe.value
      }, [
        C(da, le({
          ref_key: "ServerFormDialogRef",
          ref: N
        }, Fl.value), Ie({
          beforeCancelButton: c((a) => [
            m(l.$slots, "beforeCancelButton", ae(oe(a)))
          ]),
          afterCancel: c((a) => [
            m(l.$slots, "afterCancel", ae(oe(a)))
          ]),
          beforeSubmitButton: c((a) => [
            m(l.$slots, "beforeSubmitButton", ae(oe(a)))
          ]),
          afterSubmitButton: c((a) => [
            m(l.$slots, "afterSubmitButton", ae(oe(a)))
          ]),
          beforeControls: c((a) => [
            m(l.$slots, "beforeFormControls", ae(oe(a)))
          ]),
          _: 2
        }, [
          W(N.value?.mappedFormFields, (a) => ({
            name: `${o(Q)(a)}BeforeControl`,
            fn: c(() => [
              m(l.$slots, `${o(Q)(a)}BeforeControl`)
            ])
          })),
          W(N.value?.mappedFormFields, (a) => ({
            name: `${o(Q)(a)}ControlBody`,
            fn: c(() => [
              m(l.$slots, `${o(Q)(a)}ControlBody`)
            ])
          })),
          W(N.value?.mappedFormFields, (a) => ({
            name: `${o(Q)(a)}AfterControl`,
            fn: c(() => [
              m(l.$slots, `${o(Q)(a)}AfterControl`)
            ])
          }))
        ]), 1040),
        C(ua, le(Ll.value, {
          ref_key: "printPaperForServerDataTableRef",
          ref: Ee,
          "is-printing": Ue.value,
          "onUpdate:isPrinting": t[0] || (t[0] = (a) => Ue.value = a)
        }), {
          printPageHeader: c((a) => [
            m(l.$slots, "printPageHeader", {
              records: a.records,
              extra: a.extra
            }, () => [
              m(l.$slots, "title", {
                records: a.records,
                extra: a.extra
              }, () => [
                S("div", Aa, V(e.printingTitle ?? e.title), 1)
              ]),
              m(l.$slots, "subTitle")
            ])
          ]),
          printPageFooter: c((a) => [
            m(l.$slots, "printPageFooter", {
              records: a.records,
              extra: a.extra
            }, () => [
              m(l.$slots, "footer", {
                records: a.records,
                extra: a.extra
              })
            ])
          ]),
          _: 3
        }, 16, ["is-printing"]),
        C(o(Rt), {
          ref_key: "contextMenuRef",
          ref: mt,
          model: Tl.value,
          onHide: t[1] || (t[1] = (a) => b.value = void 0)
        }, null, 8, ["model"]),
        C(wa, {
          ref_key: "auditsPopoverRef",
          ref: gt
        }, null, 512),
        S("div", {
          ref_key: "headerSegmentRef",
          ref: Ye,
          class: "p-1"
        }, [
          m(l.$slots, "topSegment", {}, () => [
            m(l.$slots, "title", { records: w.value }, () => [
              S("div", {
                class: te(["my-1 text-center text-xl font-bold", { ["text-" + e.tableSeverity]: e.tableSeverity && e.tableSeverity !== "none" }])
              }, V(e.title), 3)
            ]),
            m(l.$slots, "subTitle"),
            S("div", Ia, [
              S("div", null, [
                S("div", $a, [
                  e.hasGlobalFilter ? (r(), F("div", Oa, [
                    C(Ae, null, {
                      default: c(() => [
                        C(y, null, {
                          default: c(() => [
                            C(i, { class: "i-mdi:magnify !z-10" }),
                            C(s, {
                              modelValue: Ze.value,
                              "onUpdate:modelValue": t[2] || (t[2] = (a) => Ze.value = a),
                              size: B.value,
                              placeholder: o(n)("Search"),
                              name: "global-search",
                              autocomplete: "off",
                              onValueChange: o(ml)
                            }, null, 8, ["modelValue", "size", "placeholder", "onValueChange"])
                          ]),
                          _: 1
                        }),
                        et.value ? A((r(), h(o(z), {
                          key: 0,
                          class: "print:hidden",
                          size: B.value,
                          type: "button",
                          icon: "i-mdi-filter-off w-8",
                          label: o(n)("Clear"),
                          outlined: "",
                          severity: "error",
                          onClick: t[3] || (t[3] = (a) => ll())
                        }, null, 8, ["size", "label"])), [
                          [
                            E,
                            o(n)("Clear Filters"),
                            void 0,
                            { top: !0 }
                          ]
                        ]) : v("", !0),
                        be.value ? (r(), F($, { key: 1 }, [
                          C(o(Pt), {
                            ref_key: "toolbarFiltersPopoverRef",
                            ref: Re
                          }, {
                            default: c(() => [
                              S("div", Va, [
                                S("div", La, [
                                  (r(!0), F($, null, W(nl.value, (a) => (r(), h(o(z), {
                                    key: a.field,
                                    disabled: rl.value.includes(
                                      a.filterField ?? a.field
                                    ) && !e.allowMultipleToolbarFiltersForSameField,
                                    severity: "info",
                                    outlined: "",
                                    fluid: "",
                                    size: e.toolbarButtonsSize ?? B.value,
                                    label: o(Ke)(a, o(n)),
                                    onClick: (u) => ul(a)
                                  }, null, 8, ["disabled", "size", "label", "onClick"]))), 128))
                                ]),
                                C(k),
                                P.value.fields.length > 1 ? (r(), h(Y, {
                                  key: 0,
                                  modelValue: P.value.operator,
                                  "onUpdate:modelValue": t[4] || (t[4] = (a) => P.value.operator = a),
                                  class: "mb-2",
                                  size: "small",
                                  "has-filter": !1,
                                  label: o(n)("Filtering Method"),
                                  "option-label-property": "label",
                                  "option-value-property": "value",
                                  options: [
                                    { value: "and", label: o(n)("All Conditions") },
                                    { value: "or", label: o(n)("Any Condition") }
                                  ],
                                  onChange: t[5] || (t[5] = () => ot.value && Me())
                                }, null, 8, ["modelValue", "label", "options"])) : v("", !0),
                                it.value ? (r(), h(o(z), {
                                  key: 1,
                                  fluid: "",
                                  size: "small",
                                  icon: "i-mdi-filter-off",
                                  label: o(n)("Clear Filters"),
                                  severity: "secondary",
                                  onClick: t[6] || (t[6] = (a) => nt())
                                }, null, 8, ["label"])) : v("", !0)
                              ])
                            ]),
                            _: 1
                          }, 512),
                          be.value ? A((r(), h(o(z), {
                            key: 0,
                            class: "print:hidden",
                            size: e.toolbarButtonsSize ?? B.value,
                            severity: "help",
                            icon: "i-mdi-filter",
                            onClick: t[7] || (t[7] = (a) => Re.value?.toggle(a))
                          }, null, 8, ["size"])), [
                            [
                              E,
                              o(n)("Filter"),
                              void 0,
                              { top: !0 }
                            ]
                          ]) : v("", !0)
                        ], 64)) : v("", !0)
                      ]),
                      _: 1
                    })
                  ])) : v("", !0)
                ])
              ]),
              S("div", Na, [
                m(l.$slots, "buttonsStart"),
                e.creatable ? A((r(), h(o(z), le({
                  key: 0,
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "primary",
                  icon: "i-mdi-plus ",
                  label: e.toolbarButtonsOnlyIcons ? null : e.createButtonLabel ?? o(n)("New")
                }, e.createButtonProps, {
                  onClick: t[8] || (t[8] = (a) => Bl())
                }), null, 16, ["size", "label"])), [
                  [
                    E,
                    e.createButtonLabel ?? o(n)("New"),
                    void 0,
                    {
                      success: !0,
                      top: !0
                    }
                  ]
                ]) : v("", !0),
                e.selectable && e.selectAllToolbarButton ? A((r(), h(o(z), {
                  key: 1,
                  class: "light:border-gray-300 light:text-black border-1 whitespace-pre dark:border-gray-600 dark:text-white",
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "secondary",
                  icon: M.value ? "i-mdi:square-rounded-outline" : "i-fluent:select-all-on-24-regular",
                  label: e.toolbarButtonsOnlyIcons ? null : M.value ? o(n)("Deselect") : o(n)("Select All"),
                  onClick: jt
                }, null, 8, ["size", "icon", "label"])), [
                  [
                    E,
                    M.value ? o(n)("Deselect") : o(n)("Select All"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.deletable ? A((r(), h(o(z), {
                  key: 2,
                  loading: ee.value,
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "danger",
                  disabled: p.value || d.value.length < 1,
                  icon: "i-mdi-trash",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Delete"),
                  onClick: t[9] || (t[9] = (a) => De(d.value))
                }, null, 8, ["loading", "size", "disabled", "label"])), [
                  [
                    E,
                    o(n)("Delete"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.editable ? A((r(), h(o(z), {
                  key: 3,
                  size: e.toolbarButtonsSize ?? B.value,
                  disabled: ee.value || p.value || d.value.length < 1 || d.value.length !== 1 && !e.multiEditable,
                  severity: "success",
                  icon: "pi pi-pencil",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Edit"),
                  onClick: t[10] || (t[10] = (a) => kl(d.value))
                }, null, 8, ["size", "disabled", "label"])), [
                  [
                    E,
                    {
                      class: "warn",
                      value: d.value.length > 1 && !e.multiEditable ? o(n)("You must select one item only") : o(n)("Edit")
                    },
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                Vt.value ? (r(), F($, { key: 4 }, [
                  C(o(Pt), {
                    ref_key: "visibleColumnsPopoverRef",
                    ref: ct
                  }, {
                    default: c(() => [
                      S("div", Ha, [
                        (r(!0), F($, null, W(o(wl), (a) => (r(), F("div", {
                          key: o(ye)(a),
                          class: "max-h-90vh flex items-center gap-2 overflow-y-auto pb-1"
                        }, [
                          C(H, {
                            modelValue: o(Te),
                            "onUpdate:modelValue": t[11] || (t[11] = (u) => ia(Te) ? Te.value = u : null),
                            "input-id": "ColumnVisibilityCheckbox_" + o(ye)(a),
                            value: o(ye)(a),
                            onChange: o(Cl)
                          }, null, 8, ["modelValue", "input-id", "value", "onChange"]),
                          S("label", {
                            for: "ColumnVisibilityCheckbox_" + o(ye)(a),
                            class: "flex-1 px-1"
                          }, V(o(Ke)(a, o(n))), 9, Ka)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 512),
                  A(C(o(z), {
                    size: e.toolbarButtonsSize ?? B.value,
                    icon: "i-mdi:eye ",
                    severity: "help",
                    onClick: t[12] || (t[12] = (a) => o(ct)?.toggle(a))
                  }, null, 8, ["size"]), [
                    [
                      E,
                      o(n)("Columns Control"),
                      void 0,
                      { top: !0 }
                    ]
                  ])
                ], 64)) : v("", !0),
                e.printable ? (r(), F($, { key: 5 }, [
                  C(o(Rt), {
                    ref_key: "printTableContextMenuRef",
                    ref: bt,
                    model: Ol.value
                  }, null, 8, ["model"]),
                  A(C(o(z), {
                    disabled: p.value,
                    size: e.toolbarButtonsSize ?? B.value,
                    severity: "success",
                    loading: Ue.value,
                    icon: "i-mdi-printer",
                    onContextmenu: na(Nl, ["prevent"]),
                    onClick: t[13] || (t[13] = (a) => de())
                  }, null, 8, ["disabled", "size", "loading"]), [
                    [
                      E,
                      o(n)("Print"),
                      void 0,
                      { top: !0 }
                    ]
                  ])
                ], 64)) : v("", !0),
                e.hasRefreshButton ? A((r(), h(o(z), {
                  key: 6,
                  severity: "info",
                  size: e.toolbarButtonsSize ?? B.value,
                  loading: p.value,
                  type: "button",
                  icon: "i-fluent:arrow-counterclockwise-12-regular",
                  outlined: "",
                  onClick: t[14] || (t[14] = (a) => U())
                }, null, 8, ["size", "loading"])), [
                  [
                    E,
                    o(n)("Refresh"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                m(l.$slots, "buttonsEnd")
              ])
            ]),
            be.value ? (r(), F("div", qa, [
              S("div", ja, [
                e.fixedToolbarFilters ? (r(), h(Dt, {
                  key: 0,
                  filters: { operator: "and", fields: e.fixedToolbarFilters },
                  "is-printing": !0,
                  "hide-operator": !0,
                  columns: T.value,
                  operator: P.value.operator,
                  onFiltersChanged: Me
                }, null, 8, ["filters", "columns", "operator"])) : v("", !0),
                e.fixedToolbarFilters && e.fixedToolbarFilters.length && it.value ? (r(), h(k, { key: 1 })) : v("", !0),
                C(Dt, {
                  ref_key: "toolbarFiltersWrapperRef",
                  ref: at,
                  filters: P.value,
                  "onUpdate:filters": t[15] || (t[15] = (a) => P.value = a),
                  "hide-operator": !0,
                  columns: T.value,
                  operator: P.value.operator,
                  onFiltersChanged: Me
                }, null, 8, ["filters", "columns", "operator"])
              ])
            ])) : v("", !0)
          ])
        ], 512),
        C(o(sa), {
          ref_key: "datatableRef",
          ref: Kt,
          "context-menu-selection": b.value,
          "onUpdate:contextMenuSelection": t[18] || (t[18] = (a) => b.value = a),
          filters: D.value,
          "onUpdate:filters": t[19] || (t[19] = (a) => D.value = a),
          selection: je.value,
          "onUpdate:selection": t[20] || (t[20] = (a) => je.value = a),
          rows: R.value,
          "onUpdate:rows": t[21] || (t[21] = (a) => R.value = a),
          "expanded-rows": K.value,
          "onUpdate:expandedRows": t[22] || (t[22] = (a) => K.value = a),
          "multi-sort-meta": re.value,
          "onUpdate:multiSortMeta": t[23] || (t[23] = (a) => re.value = a),
          "sort-field": ue.value,
          "onUpdate:sortField": t[24] || (t[24] = (a) => ue.value = a),
          "sort-order": Se.value,
          "onUpdate:sortOrder": t[25] || (t[25] = (a) => Se.value = a),
          style: $e({ height: Ql.value }),
          size: B.value,
          "show-gridlines": e.showGridLines,
          "show-headers": "",
          "highlight-on-select": "",
          "edit-mode": e.editable ? e.inlineEditMode : "none",
          "context-menu": e.withContextMenu,
          value: w.value,
          "row-group-mode": e.rowGroupMode,
          "group-rows-by": e.groupRowsBy,
          "virtual-scroller-options": gl.value,
          lazy: !0,
          scrollable: e.scrollable,
          "scroll-height": e.scrollHeight,
          "scroll-direction": e.scrollDirection,
          "data-key": e.primaryKey || void 0,
          paginator: e.hasPagination,
          "paginator-position": "top",
          "total-records": j.value,
          loading: e.withLoadingMask && p.value,
          "filter-display": Lt.value,
          "global-filter-fields": rt.value,
          "row-class": (a) => [
            e.isActiveRow && e.isActiveRow(a) ? "active-row" : "",
            e.rowClass ? e.rowClass(a) : "",
            { "row-open-cursor": Rl.value }
          ],
          "row-hover": e.rowHover,
          class: te([{ "compact-table": e.isCompact }, jl.value]),
          "select-all": M.value,
          "removable-sort": e.removableSort,
          "sort-mode": ge.value,
          pt: {
            table: {
              "data-name": e.name
            }
          },
          onSelectAllChange: Gt,
          onRowSelect: Yt,
          onRowUnselect: Wt,
          onRowSelectAll: Jt,
          onRowUnselectAll: Qt,
          onPage: sl,
          onSort: _t,
          onFilter: il,
          onRowExpand: Al,
          onRowCollapse: Il,
          onRowReorder: $l,
          onRowContextmenu: t[26] || (t[26] = (a) => e.withContextMenu ? zl(a) : void 0),
          onRowClick: Ml,
          onRowDblclick: pl,
          onCellEditComplete: Gl
        }, Ie({
          paginatorstart: c(() => [
            S("div", Ga, [
              S("span", null, [
                et.value ? (r(), F($, { key: 0 }, [
                  Oe(V(o(n)("Showing start To end From filtered (Filtered From total)", {
                    start: Ce.value,
                    end: we.value,
                    total: he.value,
                    filtered: j.value
                  })), 1)
                ], 64)) : (r(), F($, { key: 1 }, [
                  Oe(V(o(n)("Showing start To end From total", {
                    start: Ce.value,
                    end: we.value,
                    total: he.value
                  })), 1)
                ], 64))
              ]),
              d.value.length ? (r(), F("span", Ya, V(o(n)("(n Records selected)", { n: d.value.length }, d.value.length)), 1)) : v("", !0)
            ])
          ]),
          paginatorend: c(() => [
            S("div", Wa, [
              S("span", null, V(o(n)("Show")), 1),
              C(Xl, {
                modelValue: R.value,
                "onUpdate:modelValue": t[16] || (t[16] = (a) => R.value = a),
                size: "small",
                options: fl.value,
                "scroll-height": "360px",
                "option-label": "label",
                "option-value": "value",
                onChange: t[17] || (t[17] = (a) => dl())
              }, null, 8, ["modelValue", "options"]),
              R.value !== -1 ? (r(), F("span", Ja, V(o(n)("Entries")), 1)) : v("", !0)
            ])
          ]),
          empty: c(() => [
            m(l.$slots, "empty", { record: w.value }, () => [
              e.noEmptyMessage ? v("", !0) : (r(), F("div", Xa, V(o(n)("No Records")), 1))
            ])
          ]),
          expansion: c(({ data: a }) => [
            m(l.$slots, "expansion", { row: a })
          ]),
          default: c(() => [
            e.noBody ? v("", !0) : (r(), F($, { key: 0 }, [
              e.reorderable ? (r(), h(o(X), {
                key: 0,
                "row-reorder": "",
                "reorderable-column": !1,
                style: { width: "33px", "flex-grow": "1", "flex-basis": "33px" }
              })) : v("", !0),
              e.withExpansion && e.hasExpanderColumn ? (r(), h(o(X), {
                key: 1,
                expander: "",
                "reorderable-column": !1,
                style: { width: "3rem" }
              })) : v("", !0),
              e.selectable && e.hasSelectionColumn ? (r(), h(o(X), {
                key: 2,
                "selection-mode": e.selectionMode,
                "reorderable-column": !1,
                "header-style": "width: 3rem",
                frozen: e.frozenSelectionColumn ?? o(ve)(T.value[0]?.frozen)
              }, null, 8, ["selection-mode", "frozen"])) : v("", !0),
              e.hasSequenceColumn ? (r(), h(o(X), le({
                key: 3,
                header: "#",
                style: { width: "3rem" }
              }, e.sequenceColumnProps), {
                body: c(({ index: a }) => [
                  Oe(V(a + 1), 1)
                ]),
                loading: c(() => [
                  S("div", {
                    class: "flex items-center",
                    style: $e({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(ht, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 1
              }, 16)) : v("", !0),
              (r(!0), F($, null, W(T.value, (a) => (r(), h(o(X), {
                key: a.name,
                field: a.fullFieldName,
                header: o(Ke)(a, o(n)),
                "sort-field": a.sortField ?? a.fullFieldName,
                "filter-field": a.filterField ?? a.fullFieldName,
                "data-type": a.type ?? "text",
                sortable: a.sortable ?? Xe.value,
                "show-filter-operator": o(pa)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-filter-match-modes": o(Ra)(a) && (a.showFilterMatchModes ?? e.defaultShowFilterMatchModes),
                "max-constraints": Number.POSITIVE_INFINITY,
                "show-add-button": o(ka)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-apply-button": o(zt)(a) && (a.showFilterApplyButton ?? e.defaultColumnShowFilterAddButton),
                "show-clear-button": o(zt)(a) && (a.showFilterClearButton ?? e.defaultColumnShowFilterClearButton),
                "filter-match-mode": a.initialFilterMatchMode ?? ke(a.type),
                "filter-match-mode-options": el.value[a.type ?? "text"],
                "body-class": (a.bodyClass ?? "") + (a.inlineEditable && e.inlineEditMode === "cell" && e.editable ? " editing-cursor" : ""),
                "body-style": a.bodyStyle,
                "header-class": a.headerClass,
                "header-style": a.headerStyle,
                hidden: !o(ft)(a),
                frozen: o(ve)(a.frozen),
                "align-frozen": o(Mt)(a.frozen),
                pt: {
                  pcSortBadge: {
                    root: Ot.value ? "!hidden" : ""
                  }
                }
              }, Ie({
                body: c(({ data: u }) => [
                  m(l.$slots, `${o(Tt)(a)}ColumnBody`, {
                    value: Fe(u, a),
                    row: u
                  }, () => [
                    C(Fa, {
                      column: a,
                      "rendered-data": Fe(u, a),
                      row: u,
                      size: B.value,
                      class: te({ "cell-has-edit-history": a.auditHistory }),
                      onContextmenu: (q) => Yl(q, a, u)
                    }, null, 8, ["column", "rendered-data", "row", "size", "class", "onContextmenu"])
                  ])
                ]),
                _: 2
              }, [
                a.inlineEditable ? {
                  name: "editor",
                  fn: c(({ data: u, field: q, editorSaveCallback: Ct, editorCancelCallback: ea }) => [
                    C(Sa, {
                      row: u,
                      "field-name": q ?? "text",
                      type: a.type,
                      field: o(ba)(e.fields, ["name", a.fullFieldName]),
                      column: a,
                      size: B.value,
                      "submit-callback": Ct,
                      "cancel-callback": ea
                    }, null, 8, ["row", "field-name", "type", "field", "column", "size", "submit-callback", "cancel-callback"])
                  ]),
                  key: "0"
                } : void 0,
                a.footer ? {
                  name: "footer",
                  fn: c(() => [
                    S("span", {
                      innerHTML: typeof a.footer == "string" ? a.footer : a.footer(w.value)
                    }, null, 8, Za)
                  ]),
                  key: "1"
                } : void 0,
                e.showOnlySortedIcon ? {
                  name: "sorticon",
                  fn: c((u) => [
                    u.sorted ? (r(), F($, { key: 0 }, [
                      u.sortOrder === 1 ? (r(), F("i", {
                        key: 0,
                        title: o(n)("Ascending"),
                        class: "i-mdi:sort-ascending scale-y-[-1]"
                      }, null, 8, _a)) : (r(), F("i", {
                        key: 1,
                        title: o(n)("Descending"),
                        class: "i-mdi:sort-descending scale-y-[-1]"
                      }, null, 8, eo))
                    ], 64)) : v("", !0)
                  ]),
                  key: "2"
                } : void 0,
                a.cellHeadFilterable ?? a.filterable ?? _e.value ? {
                  name: "filter",
                  fn: c(({ filterModel: u, filterCallback: q }) => [
                    m(l.$slots, `${o(Tt)(a)}ColumnFilter`, {
                      item: { filterModel: u, filterCallback: q }
                    }, () => [
                      C(Zl, {
                        column: a,
                        "filter-callback": q,
                        "filter-model": u
                      }, null, 8, ["column", "filter-callback", "filter-model"])
                    ])
                  ]),
                  key: "3"
                } : void 0
              ]), 1032, ["field", "header", "sort-field", "filter-field", "data-type", "sortable", "show-filter-operator", "show-filter-match-modes", "max-constraints", "show-add-button", "show-apply-button", "show-clear-button", "filter-match-mode", "filter-match-mode-options", "body-class", "body-style", "header-class", "header-style", "hidden", "frozen", "align-frozen", "pt"]))), 128)),
              e.hasToolsColumn ? (r(), h(o(X), le({
                key: 4,
                "body-class": `p-tools-cell ${e.toolsColumnBodyClass ?? ""}`,
                "align-frozen": o(Mt)("end"),
                frozen: e.frozenToolsColumn
              }, e.toolsColumnProps), {
                header: c(() => [...t[27] || (t[27] = [
                  S("i", { class: "i-mdi-tools mx-auto" }, null, -1)
                ])]),
                body: c((a) => [
                  S("div", to, [
                    m(l.$slots, "toolsColumnExtraStartButton", {
                      row: a.data,
                      isLoading: p.value
                    }),
                    e.openable ? A((r(), h(o(z), {
                      key: 0,
                      severity: "info",
                      as: e.openButtonUrl ? "a" : void 0,
                      href: e.openButtonUrl ? e.openButtonUrl(a.data) : void 0,
                      disabled: J.value.includes(a.data[e.primaryKey]),
                      size: e.toolButtonsSize ?? B.value,
                      class: "rounded-md p-2",
                      label: e.openButtonLabel,
                      icon: e.openButtonIcon ?? "i-material-symbols:open-jam-outline-rounded",
                      onClick: (u) => x("rowOpen", a.data)
                    }, null, 8, ["as", "href", "disabled", "size", "label", "icon", "onClick"])), [
                      [
                        E,
                        e.openButtonTitle ?? o(n)("Open"),
                        void 0,
                        { danger: !0 }
                      ]
                    ]) : v("", !0),
                    e.printableRows === !0 || typeof e.printableRows == "function" && e.printableRows(a.data) ? A((r(), h(o(z), {
                      key: 1,
                      severity: "success",
                      size: e.toolButtonsSize ?? B.value,
                      disabled: J.value.includes(a.data[e.primaryKey]),
                      class: "rounded-md p-2",
                      icon: "i-mdi-printer",
                      onClick: (u) => x("rowPrint", a.data)
                    }, null, 8, ["size", "disabled", "onClick"])), [
                      [
                        E,
                        o(n)("Print"),
                        void 0,
                        { success: !0 }
                      ]
                    ]) : v("", !0),
                    e.editable && (!e.rowEditable || e.rowEditable(a.data)) ? A((r(), h(o(z), {
                      key: 2,
                      disabled: p.value || J.value.includes(a.data[e.primaryKey]),
                      severity: "success",
                      size: e.toolButtonsSize ?? B.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-edit",
                      onClick: (u) => Pe(a.data)
                    }, null, 8, ["disabled", "size", "onClick"])), [
                      [E, o(n)("Edit")]
                    ]) : v("", !0),
                    e.deletable && (!e.rowDeletable || e.rowDeletable(a.data)) ? A((r(), h(o(z), {
                      key: 3,
                      severity: "danger",
                      loading: J.value.includes(a.data[e.primaryKey]),
                      disabled: p.value,
                      size: e.toolButtonsSize ?? B.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-trash",
                      onClick: (u) => De(a.data)
                    }, null, 8, ["loading", "disabled", "size", "onClick"])), [
                      [
                        E,
                        o(n)("Remove"),
                        void 0,
                        { danger: !0 }
                      ]
                    ]) : v("", !0),
                    e.extraToolAndContextButtons?.length ? (r(!0), F($, { key: 4 }, W(e.extraToolAndContextButtons, (u, q) => A((r(), h(o(z), {
                      key: q,
                      loading: p.value,
                      hidden: !(u.visible === !0 || u.visible === !1 ? u.visible : u.visible?.(a.data) ?? !0),
                      size: e.toolButtonsSize ?? B.value,
                      label: u.onlyIconButton === !0 ? void 0 : o(ve)(u.label) ? u.label : u.label(a.data),
                      severity: u.severity,
                      badge: o(ce)(u.badge) ? u.badge(a.data) : u.badge,
                      "badge-severity": o(ce)(u.badgeSeverity) ? u.badgeSeverity(a.data) : u.badgeSeverity,
                      icon: typeof u.icon == "function" ? u.icon(a.data) : u.icon,
                      onClick: (Ct) => u.command?.(a.data)
                    }, null, 8, ["loading", "hidden", "size", "label", "severity", "badge", "badge-severity", "icon", "onClick"])), [
                      [E, o(ve)(u.label) ? u.label : u.label(a.data)]
                    ])), 128)) : v("", !0),
                    m(l.$slots, "toolsColumnExtraButton", {
                      row: a.data,
                      isLoading: p.value
                    })
                  ])
                ]),
                loading: c(() => [
                  S("div", {
                    class: "flex items-center",
                    style: $e({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(ht, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 3
              }, 16, ["body-class", "align-frozen", "frozen"])) : v("", !0)
            ], 64))
          ]),
          _: 2
        }, [
          l.$slots.header ? {
            name: "header",
            fn: c(() => [
              m(l.$slots, "header", {
                records: w.value,
                extra: _.value
              })
            ]),
            key: "0"
          } : void 0,
          l.$slots.footer ? {
            name: "footer",
            fn: c(() => [
              m(l.$slots, "footer", {
                records: w.value,
                extra: _.value
              })
            ]),
            key: "1"
          } : void 0,
          l.$slots.groupheader || e.rowGroupHeaderFormatter ? {
            name: "groupheader",
            fn: c((a) => [
              m(l.$slots, "groupheader", {
                data: a.data,
                index: a.index
              }, () => [
                e.rowGroupHeaderFormatter && e.groupRowsBy ? (r(), F("span", {
                  key: 0,
                  class: te(["font-bold", e.rowGroupHeaderClass]),
                  innerHTML: e.rowGroupHeaderFormatter === !0 ? o(me)(a.data, e.groupRowsBy) : e.rowGroupHeaderFormatter(o(me)(a.data, e.groupRowsBy), a.data)
                }, null, 10, Qa)) : v("", !0)
              ])
            ]),
            key: "2"
          } : void 0,
          l.$slots.groupfooter ? {
            name: "groupfooter",
            fn: c((a) => [
              m(l.$slots, "groupfooter", {
                data: a.data,
                index: a.index
              })
            ]),
            key: "3"
          } : void 0
        ]), 1032, ["context-menu-selection", "filters", "selection", "rows", "expanded-rows", "multi-sort-meta", "sort-field", "sort-order", "style", "size", "show-gridlines", "edit-mode", "context-menu", "value", "row-group-mode", "group-rows-by", "virtual-scroller-options", "scrollable", "scroll-height", "scroll-direction", "data-key", "paginator", "total-records", "loading", "filter-display", "global-filter-fields", "row-class", "row-hover", "class", "select-all", "removable-sort", "sort-mode", "pt"]),
        e.withDataView ? (r(), h(_l, {
          key: 0,
          value: w.value
        }, {
          list: c((a) => [
            m(l.$slots, "dataViewBody", {
              items: a.items,
              records: w.value
            })
          ]),
          _: 3
        }, 8, ["value"])) : v("", !0)
      ], 10, Ea);
    };
  }
});
export {
  Mo as default
};
