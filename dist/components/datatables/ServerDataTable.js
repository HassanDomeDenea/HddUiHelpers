import { defineComponent as Zl, computed as f, onMounted as _l, ref as g, useModel as de, watch as Ct, resolveComponent as I, resolveDirective as ea, openBlock as r, createElementBlock as F, normalizeClass as ee, createVNode as C, mergeProps as te, createSlots as Ae, withCtx as c, renderSlot as m, normalizeProps as le, guardReactiveProps as ae, renderList as Y, unref as o, createElementVNode as S, toDisplayString as O, withDirectives as A, createBlock as h, createCommentVNode as v, Fragment as $, isRef as ta, withModifiers as la, normalizeStyle as Ie, createTextVNode as $e, mergeModels as wt } from "vue";
import aa from "HddUiHelpers/components/datatables/PrintPaperForServerDataTable.vue";
import oa from "primevue/datatable";
import { isToolbarFilterValue as Ft } from "./ServerDataTableTypes.js";
import { useDebounceFn as Oe } from "@vueuse/core";
import ia from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { useServerDataTableColumnVisibility as na } from "HddUiHelpers/components/datatables/visibility.ts";
import { useApiClient as ra } from "HddUiHelpers/stores/apiClient.ts";
import { isBoolean as Ve, set as ua, cloneDeep as Le, map as sa, filter as da, reduce as St, isFunction as fe, isString as ce, find as fa, get as ve, uniqueId as Ne, unset as ca } from "lodash-es";
import Bt from "primevue/contextmenu";
import { useConfirm as va } from "primevue/useconfirm";
import { useI18n as ma } from "vue-i18n";
import ya from "HddUiHelpers/components/AuditsPopover/AuditsPopover.vue";
import ba from "HddUiHelpers/components/datatables/CellContent.vue";
import ga from "HddUiHelpers/components/datatables/InlineCellEdit.vue";
import { snakeCasePreserveDots as ha, getFilterMatchModesByTypeOptions as Ca, isToolbarFilterEmpty as xt, getFieldSlotName as J, getColumnTitle as He, getColumnName as me, localeAlignToFrozenAlign as Rt, getColumnCanShowFilterApplyButton as kt, getColumnCanShowAddButton as wa, getColumnCanShowFilterMatchModes as Fa, getColumnCanShowFilterOperator as Sa, getColumnSlotName as pt, appendToUrl as Ba } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Mt from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { useHddUiHelpers as xa } from "HddUiHelpers/plugins/HddUiHelpers.ts";
import { useStackableDialog as Ra } from "HddUiHelpers/stores/stackableDialogs.ts";
import { printDomWithStyles as ka } from "HddUiHelpers/utils/printDom.ts";
import { useFormatters as pa } from "HddUiHelpers/utils/useFormatters.ts";
import Ma from "moment";
import T from "primevue/button";
import Q from "primevue/column";
import Tt from "primevue/popover";
const Ta = ["data-name"], za = { class: "my-2 text-center text-lg font-bold" }, Da = { class: "flex justify-between" }, Pa = { class: "flex justify-between" }, Ua = { key: 0 }, Ea = {
  class: "overflow-y-auto",
  style: { "max-height": "calc(100vh - 100px)" }
}, Aa = { class: "flex max-h-screen flex-col items-center gap-y-1 py-1" }, Ia = { class: "flex justify-end gap-1 print:hidden" }, $a = { class: "max-h-screen overflow-y-auto" }, Oa = ["for"], Va = {
  key: 0,
  class: "flex justify-start"
}, La = { class: "mt-1" }, Na = { class: "flex w-full justify-end gap-1 text-sm" }, Ha = { key: 0 }, Ka = { class: "flex items-center gap-1 text-sm" }, qa = { key: 0 }, ja = ["innerHTML"], Ga = {
  key: 0,
  class: "text-secondary-1 text-center text-sm italic"
}, Ya = ["innerHTML"], Wa = ["title"], Ja = ["title"], Qa = { class: "flex flex-wrap items-center gap-1" }, Bo = /* @__PURE__ */ Zl({
  __name: "ServerDataTable",
  props: /* @__PURE__ */ wt({
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
  emits: /* @__PURE__ */ wt(["rowClick", "rowDblClick", "rowOpen", "rowEdit", "multiRowsEdit", "rowCreated", "rowUpdated", "rowDeleted", "rowExpand", "rowPrint", "rowCollapse", "rowReorder", "refreshed", "rowChanged", "dialogsVisibility"], ["update:perPage", "update:firstRowIndex", "update:currentPage", "update:extraData"]),
  setup(e, { expose: zt, emit: Dt }) {
    const x = Dt, Ke = f(
      () => "HddServerDataTable_" + (e.name ?? (typeof e.url == "object" ? e.url.url : e.url))
    ), Pt = xa(), V = f(() => Pt.commonServerDataTableProps ?? {}), B = f(() => e.size ?? V.value.size), Ut = f(
      () => Ve(e.onlyRequestedColumns) ? e.onlyRequestedColumns : Ve(V.value.onlyRequestedColumns) ? V.value.onlyRequestedColumns : !0
    ), Et = f(
      () => e.extraGetDataPayload ?? V.value.extraGetDataPayload ?? {}
    ), At = f(
      () => e.noMultiSortBadges ?? V.value.noMultiSortBadges ?? !1
    ), It = f(
      () => e.columnVisibilityButton ?? V.value.columnVisibilityButton
    ), ye = f(
      () => e.withToolbarFilters ?? V.value.withToolbarFilters
    ), $t = f(
      () => e.filterDisplayLayout ?? V.value.filterDisplayLayout ?? "menu"
    ), be = f(() => e.sortMode ?? V.value.sortMode ?? "multiple");
    onActivated(() => {
      e.refreshOnActivated && ut();
    }), _l(() => {
      e.refreshOnMount && ut();
    });
    const { t: n } = ma(), w = g(e.initialRecords || []), q = g(e.initialTotalRecords), ge = g(0), he = g(0), Ce = g(0), d = g([]), X = g(), qe = f({
      get() {
        return e.selectionMode === "multiple" ? d.value : X.value;
      },
      set(l) {
        e.selectionMode === "multiple" ? d.value = l : X.value = l;
      }
    }), H = g({}), b = g(), k = de(e, "perPage"), je = de(e, "firstRowIndex"), oe = de(e, "currentPage"), Z = de(e, "extraData"), p = g(!1), M = g(!1), Ot = pa(), j = ra(), Vt = va(), ie = useTemplateRef("wrapperRef"), Ge = useTemplateRef("headerSegmentRef"), Lt = useTemplateRef("datatableRef"), z = f(() => {
      let l;
      return Array.isArray(e.columns) ? l = e.columns : l = e.columns === "*" && w.value?.length ? Object.keys(w.value[0]) : [e.columns], l.map((t) => typeof t == "string" ? { name: t, field: t, label: t, fullFieldName: t } : (t.field || (t.field = t.name), t.relation ? (t.relation = ha(t.relation), t.fullFieldName = t.relation + "." + t.field) : t.fullFieldName = t.field, (!t.type || t.type === "select") && t.selectOptions !== void 0 && (t.type = "select", t.renderTypeProps && !t.renderType && (t.renderType = "tag")), t.hiddenButCanBeVisible === !0 && (t.visibilityControl = !0, t.visible = !1), t.type === "date" && (t.dateFormat ? t.dateFormat === "date" ? t.dateFormat = "YYYY-MM-DD" : t.dateFormat === "datetime" && (t.dateFormat = "YYYY-MM-DD hh:mmA") : t.dateFormat = "YYYY-MM-DD"), t.type || (t.type = "text"), t));
    }), Nt = f(() => z.value.filter((l) => l.filterable ?? Ze.value)), Ye = f(() => {
      const l = {};
      return z.value.forEach((t) => {
        const i = t.fullFieldName;
        t.type === "select" && (t.selectOptionsKeyed ? l[i] = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? l[i] = t.selectOptions.reduce(
          (s, y) => (s[y[t.selectValueProperty ?? "id"]] = y[t.selectLabelProperty ?? "name"], s),
          {}
        ) : l[i] = t.selectOptions.object));
      }), l;
    });
    function we(l, t) {
      const i = typeof t.showable == "function" ? t.showable : toValue(t.showable);
      if (typeof i == "function" || Ve(i)) {
        const R = typeof i == "function" ? i({ row: l }) : i;
        if (R === !1)
          return '<span class="italic text-muted">--</span>';
        if (R !== !0)
          return R;
      }
      let s = t.fullFieldName;
      typeof t.formatter == "string" && (s = t.formatter);
      const y = ve(l, s);
      if (typeof t.formatter == "function")
        return t.formatter(y, l, s);
      if (t.type === "select") {
        let R;
        return t.isMultiSelect ? R = y.map((G) => Ye.value[s]?.[G] || G) : R = Ye.value[s]?.[y] || y, !R && t.emptyValuePlaceholder && (R = `<span class="italic text-muted">${t.emptyValuePlaceholder}</span>`), R;
      }
      if (t.type === "price")
        return Ot.formatPrice(
          y,
          typeof t.currency == "string" ? t.currency : t.currency ? l : void 0
        );
      if (t.type === "date" && t.dateFormat)
        return y ? Ma(y).format(t.dateFormat) : "";
      if (t.type === "boolean") {
        if (t.renderType === "yesNoIconBadge") return y;
        let R = y === !0 ? n("Yes") : y === !1 ? n("No") : "";
        return R || (R = `<span class="italic text-muted">${t.emptyValuePlaceholder ?? "null"}</span>`), R;
      }
      return y;
    }
    function We() {
      M.value = d.value.length === q.value && d.value.length !== 0;
    }
    function Ht() {
      M.value ? (d.value = [], M.value = !1) : (d.value = w.value, M.value = d.value.length !== 0);
    }
    function Kt(l) {
      w.value?.length === 0 && (M.value = !1, d.value = []), M.value = l.checked, M.value ? d.value = w.value : d.value = [];
    }
    function qt() {
      M.value = d.value.length === q.value && d.value.length !== 0;
    }
    function jt() {
      M.value = !1;
    }
    function Gt() {
      d.value = w.value, M.value = d.value.length !== 0;
    }
    function Yt() {
      d.value = [], M.value = !1;
    }
    function Wt(l) {
      return d.value.some((t) => t[e.primaryKey] === l[e.primaryKey]);
    }
    function Jt(l) {
      e.selectionMode === "single" ? X.value = X.value === l ? void 0 : l : (Wt(l) ? d.value = d.value.filter(
        (t) => t[e.primaryKey] !== l[e.primaryKey]
      ) : d.value = [...d.value, l], M.value = d.value.length === q.value && d.value.length !== 0);
    }
    function Je(l) {
      return l === "asc" ? 1 : l === "desc" ? -1 : void 0;
    }
    const Qe = f(() => e.hasSorts ?? !0), ne = g(
      e.initialSorts?.map((l) => ({
        field: l.field,
        order: Je(l.direction)
      }))
    ), re = g(e.initialSortField), Fe = g(Je(e.initialSortDirection)), Se = f(() => be.value === "single" && re.value ? [{ field: re.value, direction: Fe.value === -1 ? "desc" : "asc" }] : be.value === "multiple" && ne.value?.length ? ne.value.map(
      (l) => ({
        field: l.field,
        direction: l.order === -1 ? "desc" : "asc"
      })
    ) : []);
    async function Qt() {
      await U(), We();
    }
    const Xt = f(() => Ca(n)), D = g(
      {}
    ), Xe = f({
      get() {
        return D.value._global?.value;
      },
      set(l) {
        ua(D.value, "_global.value", l);
      }
    }), Ze = g(!0);
    function Be(l) {
      return l?.operator !== void 0;
    }
    const _e = f(() => {
      if (at.value) return !0;
      for (const l in D.value) {
        if (e.fixedFilters?.[l])
          continue;
        const t = D.value[l];
        if (Be(t)) {
          if (t.constraints?.findIndex((s) => s.value !== null && s.value !== "") > -1) return !0;
        } else {
          if (typeof t == "string")
            return D.value[l] !== null && D.value[l] !== "";
          if (t?.value !== null && t?.value !== "") return !0;
        }
      }
      return !1;
    }), Zt = f(() => {
      const l = D.value._global;
      if (!l)
        return !1;
      if (Be(l)) {
        if (l.constraints?.findIndex((i) => i.value !== null && i.value !== "") > -1) return !0;
      } else if (l?.value !== null && l?.value !== "") return !0;
      return !1;
    });
    function _t() {
      it(!1), tt(), U();
    }
    function xe(l) {
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
    function el(l) {
      const t = typeof l == "object" ? l : z.value.find((i) => (i.filterField ?? i.field ?? i.name) === l);
      t && (D.value[t.filterField ?? t.fullFieldName] = et(t));
    }
    function et(l) {
      let t;
      return l.initialFilterMatchMode ? t = l.initialFilterMatchMode : t = xe(l.type), l.multipleFilters === !1 && !1 ? {
        value: null,
        matchMode: t
      } : {
        operator: "and",
        constraints: [{ value: null, matchMode: t }]
      };
    }
    function tt() {
      D.value = St(
        z.value,
        (l, t) => (l[t.filterField ?? t.fullFieldName] = et(t), l),
        {
          _global: {
            value: "",
            matchMode: "contains"
          }
        }
      );
    }
    Ct(
      () => z.value.map((l) => l.filterField ?? l.name ?? l.field).join(","),
      (l, t) => {
        l !== t && tt();
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const tl = f(() => {
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
        }) : Be(i) ? l.fields.push({
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
    async function ll() {
      await U();
    }
    const Re = useTemplateRef(
      "toolbarFiltersPopoverRef"
    ), lt = useTemplateRef(
      "toolbarFiltersWrapperRef"
    ), al = f(() => Nt.value), ol = f(() => P.value.fields.filter((l) => Ft(l)).map((l) => l.field));
    function ke(l) {
      return Ft(l) ? (l.id || (l.id = Ne("toolbar-filter-")), l) : (l.id || (l.id = Ne("toolbar-filter-")), l.fields = l.fields.map(ke), l);
    }
    const P = g(
      ke({
        operator: e.defaultFiltersOperator,
        fields: [...Le(e.initialToolbarFilters)]
      })
    );
    function il(l) {
      P.value.fields.push({
        id: Ne("toolbar-filter-"),
        field: l.filterField ?? l.fullFieldName,
        value: null,
        matchMode: xe(l.type)
      }), Re.value?.hide(), nextTick(() => {
        setTimeout(() => {
          lt.value?.focusLast();
        }, 50);
      });
    }
    const at = f(() => !xt(P.value)), ot = f(() => P.value.fields.length > 0);
    function it(l = !0) {
      P.value = ke({
        operator: e.defaultFiltersOperator,
        fields: []
      }), l && U();
    }
    function pe() {
      cl();
    }
    async function nl(l) {
      oe.value = l.page + 1, await U(), We();
    }
    async function rl() {
      oe.value = 1, await U();
    }
    const nt = f(
      () => e.globalFilterFields ?? sa(
        da(z.value, (l) => l.globalFilter !== !1),
        (l) => l.filterField ?? l.fullFieldName
      )
    ), ul = f(() => {
      const l = [5, 10, 15, 25, 50, 100, 500, 1e3];
      return !l.includes(k.value) && k.value !== -1 && l.push(k.value), [...l.map((t) => ({ value: t, label: t })), { value: -1, label: n("All") }];
    }), sl = f(() => St(
      z.value,
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
    )), rt = g({});
    function dl(l, t = !1) {
      return rt.value = l, t ? U() : Promise.resolve();
    }
    async function Me(l = null, t = null, i = {}) {
      const s = {
        globalFilters: Zt.value ? nt.value : [],
        page: t || oe.value,
        perPage: e.hasPagination ? l || k.value : -1,
        // perPage: specificPerPage || perPage.value,
        sorts: Se.value,
        fields: sl.value,
        filters: D.value,
        fixedFilters: e.fixedFilters,
        groupedFilters: P.value,
        fixedGroupedFilters: {
          operator: "and",
          fields: e.fixedToolbarFilters
        },
        options: {
          onlyRequestedColumns: Ut.value,
          primaryKey: e.primaryKey
        },
        ...Et.value
      }, y = typeof e.url == "object" ? e.url : { url: e.url, method: "get" };
      return j.request({
        ...y,
        params: y.method === "get" ? s : void 0,
        data: y.method === "post" ? s : void 0,
        ...i,
        ...rt.value
      });
    }
    async function U() {
      return p.value = !0, new Promise((l) => {
        e.dataProvider ? e.dataProvider({
          page: oe.value,
          perPage: k.value,
          sorts: Se.value,
          filters: tl.value
        }).then((t) => {
          w.value = t.data, q.value = t.total_records, k.value = t.per_page || k.value, je.value = (t.current_page - 1) * k.value, l();
        }) : e.url ? Me().then((t) => {
          let i = t.data.data;
          if (e.transformResponseData && (i = e.transformResponseData(i)), w.value = i.data, q.value = i.total, ge.value = i.total_without_filters, k.value = i.per_page || k.value, je.value = (i.current_page - 1) * k.value, he.value = i.from ?? 0, Ce.value = i.to ?? 0, d.value.length > 0) {
            const s = d.value.map((y) => y[e.primaryKey]);
            d.value = w.value.filter(
              (y) => s.includes(y[e.primaryKey])
            );
          }
          Z.value = i.extra;
        }).catch((t) => {
          console.error(t), j.toastRequestError(t);
        }).finally(l) : l();
      }).finally(() => {
        p.value = !1;
      });
    }
    const fl = Oe(() => {
      U();
    }, 500), cl = Oe(() => {
      U();
    }, 100), ut = Oe(() => {
      U();
    }, 10), st = g();
    Ct(
      () => e.itemSize,
      (l) => {
        st.value = l;
      },
      {
        immediate: !0
      }
    );
    const vl = g(!1), ml = f(() => {
      if (e.infiniteScroll)
        return {
          itemSize: st.value,
          delay: 50,
          lazy: !0,
          showLoader: !0,
          autoSize: !0,
          loading: vl.value,
          onLazyLoad: yl
        };
    });
    async function yl() {
    }
    const {
      checkColumnIsVisible: dt,
      visibleColumns: Te,
      visibleColumnsPopoverRef: ft,
      saveVisibleColumnsState: bl,
      toggleableColumns: gl
    } = na(Ke, z), _ = g(!1), W = g([]), { updateDialogVisibility: ue } = Ra();
    function ze(l) {
      if (!l) return;
      let t = 1;
      Array.isArray(l) && (t = l.length), ue(!0), Vt.require({
        message: n("Are you sure to delete n records?", { n: t }, t),
        header: n("Confirmation"),
        icon: "pi pi-info-circle",
        rejectLabel: n("Cancel"),
        acceptLabel: n("Delete"),
        group: "dismissable",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          _.value = !0;
          const i = Array.isArray(l) ? l.map((s) => s[e.primaryKey]) : [l[e.primaryKey]];
          try {
            if (!e.url)
              throw new Error("No Url");
            let s = typeof e.url == "object" ? e.url.url : e.url;
            t === 1 ? e.singleDeleteUrl ? s = e.singleDeleteUrl(i[0]).url : s = Ba(s, i[0]) : e.deleteUrl && (s = typeof e.deleteUrl == "object" ? e.deleteUrl.url : e.deleteUrl), W.value = i, await j.delete(s, { params: { ids: i } }), j.toastSuccess(n("Deleted!"), n("n Record Deleted Successfully", { n: t }, t)), x("rowDeleted", Array.isArray(l) ? i : l[e.primaryKey]), x("rowChanged", l, "delete"), d.value = d.value.filter(
              (y) => !i.includes(y[e.primaryKey])
            ), await U();
          } catch (s) {
            console.error(s), j.toastRequestError(s);
          }
          _.value = !1, ue(!1), W.value = [];
        },
        reject() {
          ue(!1);
        },
        onHide() {
          ue(!1);
        }
      });
    }
    const L = useTemplateRef("ServerFormDialogRef"), hl = f(() => ({
      url: e.createUrl ?? e.url,
      primaryKey: e.primaryKey,
      singleDeleteUrl: e.singleDeleteUrl,
      deleteUrl: e.deleteUrl,
      singleEditUrl: e.singleEditUrl,
      editUrl: e.editUrl,
      autoAppendIdToEditUrl: !0,
      fields: e.fields,
      size: toValue(B),
      columns: z.value.filter((l) => l.inForm === !0),
      onSubmitted: Cl,
      onVisible: (l) => x("dialogsVisibility", l),
      ...e.formProps ?? {}
    }));
    function Cl(l, t) {
      t === "create" ? x("rowCreated", l) : t === "update" ? x("rowUpdated", l) : x(
        "rowDeleted",
        l instanceof Array ? l.map((i) => i[e.primaryKey]) : l[e.primaryKey]
      ), x("rowChanged", l, t), e.refreshAfterFormSubmit && U();
    }
    function wl() {
      L.value?.create();
    }
    function De(l) {
      x("rowEdit", l), e.useFormForEdit && ct(l);
    }
    function Fl(l) {
      x("multiRowsEdit", l), e.useFormForEdit && ct(l);
    }
    function Sl(l) {
      l.length === 1 ? De(l[0]) : Fl(l);
    }
    function ct(l) {
      Array.isArray(l) ? L.value?.editMulti(l) : L.value?.edit(l);
    }
    const Bl = f(() => !!e.onRowClick || e.openOnClick && e.onRowOpen);
    function xl(l) {
      e.onRowDblClick && x("rowDblClick", l.data, l.index, l.originalEvent);
    }
    function Rl(l) {
      if (!window.getSelection()?.isCollapsed)
        return;
      const t = l.originalEvent.composedPath(), i = t.find((N) => N.classList?.contains("p-datatable-row-toggle-button")), s = t.find((N) => N?.getAttribute?.("data-p-editable-column") === "true"), y = t.find((N) => N.classList?.contains("p-selection-column")), R = t.find((N) => N.classList?.contains("p-button"));
      if (i || s || y || R)
        return;
      x("rowClick", l.data, l.index, l.originalEvent);
      const G = e.onRowClick || e.onRowOpen && e.openOnClick, Ee = l.originalEvent.target.getAttribute("data-p-selection-column") === "true";
      !G && e.withExpansion && e.expandOnRowClick ? Ml(l.data) : (Ee || !G) && e.selectable && e.selectOnRowClick ? Jt(l.data) : !e.onRowClick && e.openOnClick && e.openable && x("rowOpen", l.data);
    }
    const vt = useTemplateRef("contextMenuRef");
    function kl(l) {
      vt.value?.show(l.originalEvent);
    }
    const pl = f(() => {
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
        command: () => b.value ? De(b.value) : void 0
      }), e.deletable && (!e.rowDeletable || e.rowDeletable(b.value)) && l.push({
        label: n("Delete"),
        icon: "i-mdi-trash",
        disabled: p.value || _.value,
        command: () => b.value ? ze(b.value) : void 0
      })), e.extraToolAndContextButtons?.length && l.push(
        ...Le(e.extraToolAndContextButtons).map((t) => {
          t.command && (t.command2 = t.command, t.command = () => t.command2(b.value)), typeof t.visible == "function" && (t.visible2 = t.visible, t.visible = () => t.visible2(b.value)), typeof t.icon == "function" && (t.icon2 = t.icon, t.icon = () => t.icon2(b.value));
          const i = fe(t.badge) ? t.badge(b.value) : t.badge;
          return typeof t.label == "function" ? (t.label2 = t.label, t.label = () => t.label2(b.value) + (i ? ` (${i})` : "")) : t.label = t.label + (i ? ` (${i})` : ""), t;
        })
      ), e.extraContextMenuOptions && e.extraContextMenuOptions.length > 0 && l.push(
        ...Le(e.extraContextMenuOptions).map((t) => {
          typeof t.visible == "function" && (t.visible2 = t.visible, t.visible = () => t.visible2(b.value)), t.command && (t.command2 = t.command, t.command = () => t.command2(b.value)), typeof t.labelFn == "function" && (t.label = t.labelFn(b.value)), typeof t.icon == "function" && (t.icon2 = t.icon, t.icon = () => t.icon2(b.value));
          const i = fe(t.badge) ? t.badge(b.value) : t.badge;
          return typeof t.label == "function" ? (t.label2 = t.label, t.label = () => t.label2(b.value) + (i ? ` (${i})` : "")) : t.label = t.label + (i ? ` (${i})` : ""), t;
        })
      ), l;
    });
    function Ml(l) {
      Tl(l) ? Dl(l) : zl(l);
    }
    function Tl(l) {
      return H.value ? H.value[l[e.primaryKey]] : !1;
    }
    function zl(l) {
      e.oneExpansionAtATime ? H.value = {
        [l[e.primaryKey]]: !0
      } : H.value[l[e.primaryKey]] = !0;
    }
    function Dl(l) {
      ca(H.value, l[e.primaryKey]);
    }
    function Pl(l) {
      e.oneExpansionAtATime && (H.value = {
        [l.data[e.primaryKey]]: !0
      }), x("rowExpand", l.data);
    }
    function Ul(l) {
      x("rowCollapse", l.data);
    }
    const mt = g(!1);
    async function El(l) {
      mt.value = !0;
      let t = (typeof e.url == "object" ? e.url.url : e.url) + "/reorder", i = "put";
      return e.reorderUrl && (t = typeof e.reorderUrl == "object" ? e.reorderUrl.url : e.reorderUrl, i = typeof e.reorderUrl == "object" ? e.reorderUrl.method : "put"), j.request({
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
        j.toastRequestError(s);
      }).finally(() => {
        mt.value = !1;
      });
    }
    const yt = useTemplateRef(
      "printTableContextMenuRef"
    ), Al = f(() => [
      {
        label: n("Print Current Page"),
        icon: "i-mdi:printer-pos",
        command: () => {
          se();
        }
      },
      {
        label: n("Print All Pages"),
        icon: "i-mdi:printer-pos-star",
        command: () => {
          se(!0);
        }
      }
    ]), Il = f(() => z.value.filter((l) => l.printable !== !1)), $l = f(() => ({
      columns: Il.value,
      mappedColumns: z.value,
      sorts: Se.value,
      hasSequenceColumn: e.hasSequenceColumn,
      records: w,
      firstPageHeaderImageUrl: e.firstPageHeaderImageUrl,
      headerImageUrl: e.headerImageUrl,
      footerImageUrl: e.footerImageUrl,
      extraData: Z,
      hasSorts: Qe.value,
      getData: Me,
      toolbarFilters: xt(e.fixedToolbarFilters) ? P.value : {
        operator: "and",
        fields: [...e.fixedToolbarFilters, P.value]
      },
      filters: D.value,
      getColumnBody: we,
      checkColumnIsVisible: dt,
      showPageCounter: !0,
      showCurrentPrintTime: !0,
      ...e.printingProps ?? {}
    })), Pe = g(!1), Ue = useTemplateRef("printPaperForServerDataTableRef");
    function se(l = !1) {
      e.customPrintMethod ? e.customPrintMethod() : e.printTableAsInView ? ie.value && ka(ie.value, {
        pageCounter: !0,
        leftMargin: 8,
        rightMargin: 8,
        topMargin: 8,
        bottomMargin: 8,
        showPrintTime: !0,
        firstPageHeaderImageUrl: e.firstPageHeaderImageUrl,
        headerImageUrl: e.headerImageUrl,
        footerImageUrl: e.footerImageUrl
      }) : Ue.value?.print(l);
    }
    function Ol(l) {
      e.hasPagination && yt.value?.show(l);
    }
    function Vl(l) {
      Ue.value?.print(!0, l);
    }
    function Ll() {
      p.value = !0;
    }
    function Nl() {
      p.value = !1;
    }
    zt({
      records: w,
      selectedRecord: X,
      selectedRecords: d,
      refresh: U,
      startLoading: Ll,
      endLoading: Nl,
      isLoading: p,
      extraData: Z,
      printTable: se,
      getData: Me,
      setCustomGetDataConfig: dl,
      clearFilterFor: el,
      ServerFormDialogRef: L,
      printWithCustomConfig: Vl
    });
    const Hl = f(() => {
      const l = [];
      return e.tableSeverity && e.tableSeverity !== "none" && (l.push(`p-datatable-${e.tableSeverity}`), l.push(`p-datatable-header-${e.tableSeverity}`)), l;
    });
    function Kl(l) {
      const t = l.value, i = l.newValue;
      t !== i && L.value?.updateDirectly(l.data, [l.field, l.newValue]);
    }
    const bt = useTemplateRef("auditsPopoverRef");
    function ql(l, t, i) {
      t.auditHistory && (l.stopPropagation(), l.preventDefault(), e.url && bt.value?.showAudits(
        l,
        e.url,
        t.fullFieldName,
        (s) => typeof t.formatter == "function" ? t.formatter(s, i, t.fullFieldName) : s,
        () => t.type === "textarea" ? "whitespace-pre-wrap" : "",
        `${ve(i, e.primaryKey)}/audits`
      ));
    }
    const jl = useElementSize(ie), Gl = useElementSize(Ge), Yl = f(() => e.scrollable ? jl.height.value - Gl.height.value + "px" : void 0);
    return (l, t) => {
      const i = I("InputIcon"), s = I("InputText"), y = I("IconField"), R = I("Divider"), G = I("SelectInput"), Ee = I("InputGroup"), N = I("Checkbox"), Wl = I("Select"), gt = I("Skeleton"), Jl = I("FilterControl"), Ql = I("DataView"), E = ea("tooltip");
      return r(), F("div", {
        ref_key: "wrapperRef",
        ref: ie,
        class: ee(["HddServerDataTableWrapper h-full", { "rounded-table": e.rounded }]),
        "data-name": Ke.value
      }, [
        C(ia, te({
          ref_key: "ServerFormDialogRef",
          ref: L
        }, hl.value), Ae({
          beforeCancelButton: c((a) => [
            m(l.$slots, "beforeCancelButton", le(ae(a)))
          ]),
          afterCancel: c((a) => [
            m(l.$slots, "afterCancel", le(ae(a)))
          ]),
          beforeSubmitButton: c((a) => [
            m(l.$slots, "beforeSubmitButton", le(ae(a)))
          ]),
          afterSubmitButton: c((a) => [
            m(l.$slots, "afterSubmitButton", le(ae(a)))
          ]),
          beforeControls: c((a) => [
            m(l.$slots, "beforeFormControls", le(ae(a)))
          ]),
          _: 2
        }, [
          Y(o(L)?.mappedFormFields, (a) => ({
            name: `${o(J)(a)}BeforeControl`,
            fn: c(() => [
              m(l.$slots, `${o(J)(a)}BeforeControl`)
            ])
          })),
          Y(o(L)?.mappedFormFields, (a) => ({
            name: `${o(J)(a)}ControlBody`,
            fn: c(() => [
              m(l.$slots, `${o(J)(a)}ControlBody`)
            ])
          })),
          Y(o(L)?.mappedFormFields, (a) => ({
            name: `${o(J)(a)}AfterControl`,
            fn: c(() => [
              m(l.$slots, `${o(J)(a)}AfterControl`)
            ])
          }))
        ]), 1040),
        C(aa, te($l.value, {
          ref_key: "printPaperForServerDataTableRef",
          ref: Ue,
          "is-printing": Pe.value,
          "onUpdate:isPrinting": t[0] || (t[0] = (a) => Pe.value = a)
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
                S("div", za, O(e.printingTitle ?? e.title), 1)
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
        C(o(Bt), {
          ref_key: "contextMenuRef",
          ref: vt,
          model: pl.value,
          onHide: t[1] || (t[1] = (a) => b.value = void 0)
        }, null, 8, ["model"]),
        C(ya, {
          ref_key: "auditsPopoverRef",
          ref: bt
        }, null, 512),
        S("div", {
          ref_key: "headerSegmentRef",
          ref: Ge,
          class: "p-1"
        }, [
          m(l.$slots, "topSegment", {}, () => [
            m(l.$slots, "title", { records: w.value }, () => [
              S("div", {
                class: ee(["my-1 text-center text-xl font-bold", { ["text-" + e.tableSeverity]: e.tableSeverity && e.tableSeverity !== "none" }])
              }, O(e.title), 3)
            ]),
            m(l.$slots, "subTitle"),
            S("div", Da, [
              S("div", null, [
                S("div", Pa, [
                  e.hasGlobalFilter ? (r(), F("div", Ua, [
                    C(Ee, null, {
                      default: c(() => [
                        C(y, null, {
                          default: c(() => [
                            C(i, { class: "i-mdi:magnify !z-10" }),
                            C(s, {
                              modelValue: Xe.value,
                              "onUpdate:modelValue": t[2] || (t[2] = (a) => Xe.value = a),
                              size: B.value,
                              placeholder: o(n)("Search"),
                              name: "global-search",
                              autocomplete: "off",
                              onValueChange: o(fl)
                            }, null, 8, ["modelValue", "size", "placeholder", "onValueChange"])
                          ]),
                          _: 1
                        }),
                        _e.value ? A((r(), h(o(T), {
                          key: 0,
                          class: "print:hidden",
                          size: B.value,
                          type: "button",
                          icon: "i-mdi-filter-off w-8",
                          label: o(n)("Clear"),
                          outlined: "",
                          severity: "error",
                          onClick: t[3] || (t[3] = (a) => _t())
                        }, null, 8, ["size", "label"])), [
                          [
                            E,
                            o(n)("Clear Filters"),
                            void 0,
                            { top: !0 }
                          ]
                        ]) : v("", !0),
                        ye.value ? (r(), F($, { key: 1 }, [
                          C(o(Tt), {
                            ref_key: "toolbarFiltersPopoverRef",
                            ref: Re
                          }, {
                            default: c(() => [
                              S("div", Ea, [
                                S("div", Aa, [
                                  (r(!0), F($, null, Y(al.value, (a) => (r(), h(o(T), {
                                    key: a.field,
                                    disabled: ol.value.includes(
                                      a.filterField ?? a.field
                                    ) && !e.allowMultipleToolbarFiltersForSameField,
                                    severity: "info",
                                    outlined: "",
                                    fluid: "",
                                    size: e.toolbarButtonsSize ?? B.value,
                                    label: o(He)(a, o(n)),
                                    onClick: (u) => il(a)
                                  }, null, 8, ["disabled", "size", "label", "onClick"]))), 128))
                                ]),
                                C(R),
                                P.value.fields.length > 1 ? (r(), h(G, {
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
                                  onChange: t[5] || (t[5] = () => at.value && pe())
                                }, null, 8, ["modelValue", "label", "options"])) : v("", !0),
                                ot.value ? (r(), h(o(T), {
                                  key: 1,
                                  fluid: "",
                                  size: "small",
                                  icon: "i-mdi-filter-off",
                                  label: o(n)("Clear Filters"),
                                  severity: "secondary",
                                  onClick: t[6] || (t[6] = (a) => it())
                                }, null, 8, ["label"])) : v("", !0)
                              ])
                            ]),
                            _: 1
                          }, 512),
                          ye.value ? A((r(), h(o(T), {
                            key: 0,
                            class: "print:hidden",
                            size: e.toolbarButtonsSize ?? B.value,
                            severity: "help",
                            icon: "i-mdi-filter",
                            onClick: t[7] || (t[7] = (a) => o(Re)?.toggle(a))
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
              S("div", Ia, [
                m(l.$slots, "buttonsStart"),
                e.creatable ? A((r(), h(o(T), te({
                  key: 0,
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "primary",
                  icon: "i-mdi-plus ",
                  label: e.toolbarButtonsOnlyIcons ? null : e.createButtonLabel ?? o(n)("New")
                }, e.createButtonProps, {
                  onClick: t[8] || (t[8] = (a) => wl())
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
                e.selectable && e.selectAllToolbarButton ? A((r(), h(o(T), {
                  key: 1,
                  class: "light:border-gray-300 light:text-black border-1 whitespace-pre dark:border-gray-600 dark:text-white",
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "secondary",
                  icon: M.value ? "i-mdi:square-rounded-outline" : "i-fluent:select-all-on-24-regular",
                  label: e.toolbarButtonsOnlyIcons ? null : M.value ? o(n)("Deselect") : o(n)("Select All"),
                  onClick: Ht
                }, null, 8, ["size", "icon", "label"])), [
                  [
                    E,
                    M.value ? o(n)("Deselect") : o(n)("Select All"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.deletable ? A((r(), h(o(T), {
                  key: 2,
                  loading: _.value,
                  size: e.toolbarButtonsSize ?? B.value,
                  severity: "danger",
                  disabled: p.value || d.value.length < 1,
                  icon: "i-mdi-trash",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Delete"),
                  onClick: t[9] || (t[9] = (a) => ze(d.value))
                }, null, 8, ["loading", "size", "disabled", "label"])), [
                  [
                    E,
                    o(n)("Delete"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.editable ? A((r(), h(o(T), {
                  key: 3,
                  size: e.toolbarButtonsSize ?? B.value,
                  disabled: _.value || p.value || d.value.length < 1 || d.value.length !== 1 && !e.multiEditable,
                  severity: "success",
                  icon: "pi pi-pencil",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Edit"),
                  onClick: t[10] || (t[10] = (a) => Sl(d.value))
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
                It.value ? (r(), F($, { key: 4 }, [
                  C(o(Tt), {
                    ref_key: "visibleColumnsPopoverRef",
                    ref: ft
                  }, {
                    default: c(() => [
                      S("div", $a, [
                        (r(!0), F($, null, Y(o(gl), (a) => (r(), F("div", {
                          key: o(me)(a),
                          class: "max-h-90vh flex items-center gap-2 overflow-y-auto pb-1"
                        }, [
                          C(N, {
                            modelValue: o(Te),
                            "onUpdate:modelValue": t[11] || (t[11] = (u) => ta(Te) ? Te.value = u : null),
                            "input-id": "ColumnVisibilityCheckbox_" + o(me)(a),
                            value: o(me)(a),
                            onChange: o(bl)
                          }, null, 8, ["modelValue", "input-id", "value", "onChange"]),
                          S("label", {
                            for: "ColumnVisibilityCheckbox_" + o(me)(a),
                            class: "flex-1 px-1"
                          }, O(o(He)(a, o(n))), 9, Oa)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 512),
                  A(C(o(T), {
                    size: e.toolbarButtonsSize ?? B.value,
                    icon: "i-mdi:eye ",
                    severity: "help",
                    onClick: t[12] || (t[12] = (a) => o(ft)?.toggle(a))
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
                  C(o(Bt), {
                    ref_key: "printTableContextMenuRef",
                    ref: yt,
                    model: Al.value
                  }, null, 8, ["model"]),
                  A(C(o(T), {
                    disabled: p.value,
                    size: e.toolbarButtonsSize ?? B.value,
                    severity: "success",
                    loading: Pe.value,
                    icon: "i-mdi-printer",
                    onContextmenu: la(Ol, ["prevent"]),
                    onClick: t[13] || (t[13] = (a) => se())
                  }, null, 8, ["disabled", "size", "loading"]), [
                    [
                      E,
                      o(n)("Print"),
                      void 0,
                      { top: !0 }
                    ]
                  ])
                ], 64)) : v("", !0),
                e.hasRefreshButton ? A((r(), h(o(T), {
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
            ye.value ? (r(), F("div", Va, [
              S("div", La, [
                e.fixedToolbarFilters ? (r(), h(Mt, {
                  key: 0,
                  filters: { operator: "and", fields: e.fixedToolbarFilters },
                  "is-printing": !0,
                  "hide-operator": !0,
                  columns: z.value,
                  operator: P.value.operator,
                  onFiltersChanged: pe
                }, null, 8, ["filters", "columns", "operator"])) : v("", !0),
                e.fixedToolbarFilters && e.fixedToolbarFilters.length && ot.value ? (r(), h(R, { key: 1 })) : v("", !0),
                C(Mt, {
                  ref_key: "toolbarFiltersWrapperRef",
                  ref: lt,
                  filters: P.value,
                  "onUpdate:filters": t[15] || (t[15] = (a) => P.value = a),
                  "hide-operator": !0,
                  columns: z.value,
                  operator: P.value.operator,
                  onFiltersChanged: pe
                }, null, 8, ["filters", "columns", "operator"])
              ])
            ])) : v("", !0)
          ])
        ], 512),
        C(o(oa), {
          ref_key: "datatableRef",
          ref: Lt,
          "context-menu-selection": b.value,
          "onUpdate:contextMenuSelection": t[18] || (t[18] = (a) => b.value = a),
          filters: D.value,
          "onUpdate:filters": t[19] || (t[19] = (a) => D.value = a),
          selection: qe.value,
          "onUpdate:selection": t[20] || (t[20] = (a) => qe.value = a),
          rows: k.value,
          "onUpdate:rows": t[21] || (t[21] = (a) => k.value = a),
          "expanded-rows": H.value,
          "onUpdate:expandedRows": t[22] || (t[22] = (a) => H.value = a),
          "multi-sort-meta": ne.value,
          "onUpdate:multiSortMeta": t[23] || (t[23] = (a) => ne.value = a),
          "sort-field": re.value,
          "onUpdate:sortField": t[24] || (t[24] = (a) => re.value = a),
          "sort-order": Fe.value,
          "onUpdate:sortOrder": t[25] || (t[25] = (a) => Fe.value = a),
          style: Ie({ height: Yl.value }),
          size: B.value,
          "show-gridlines": e.showGridLines,
          "show-headers": "",
          "highlight-on-select": "",
          "edit-mode": e.editable ? e.inlineEditMode : "none",
          "context-menu": e.withContextMenu,
          value: w.value,
          "row-group-mode": e.rowGroupMode,
          "group-rows-by": e.groupRowsBy,
          "virtual-scroller-options": ml.value,
          lazy: !0,
          scrollable: e.scrollable,
          "scroll-height": e.scrollHeight,
          "scroll-direction": e.scrollDirection,
          "data-key": e.primaryKey || void 0,
          paginator: e.hasPagination,
          "paginator-position": "top",
          "total-records": q.value,
          loading: e.withLoadingMask && p.value,
          "filter-display": $t.value,
          "global-filter-fields": nt.value,
          "row-class": (a) => [
            e.isActiveRow && e.isActiveRow(a) ? "active-row" : "",
            e.rowClass ? e.rowClass(a) : "",
            { "row-open-cursor": Bl.value }
          ],
          "row-hover": e.rowHover,
          class: ee([{ "compact-table": e.isCompact }, Hl.value]),
          "select-all": M.value,
          "removable-sort": e.removableSort,
          "sort-mode": be.value,
          pt: {
            table: {
              "data-name": e.name
            }
          },
          onSelectAllChange: Kt,
          onRowSelect: qt,
          onRowUnselect: jt,
          onRowSelectAll: Gt,
          onRowUnselectAll: Yt,
          onPage: nl,
          onSort: Qt,
          onFilter: ll,
          onRowExpand: Pl,
          onRowCollapse: Ul,
          onRowReorder: El,
          onRowContextmenu: t[26] || (t[26] = (a) => e.withContextMenu ? kl(a) : void 0),
          onRowClick: Rl,
          onRowDblclick: xl,
          onCellEditComplete: Kl
        }, Ae({
          paginatorstart: c(() => [
            S("div", Na, [
              S("span", null, [
                _e.value ? (r(), F($, { key: 0 }, [
                  $e(O(o(n)("Showing start To end From filtered (Filtered From total)", {
                    start: he.value,
                    end: Ce.value,
                    total: ge.value,
                    filtered: q.value
                  })), 1)
                ], 64)) : (r(), F($, { key: 1 }, [
                  $e(O(o(n)("Showing start To end From total", {
                    start: he.value,
                    end: Ce.value,
                    total: ge.value
                  })), 1)
                ], 64))
              ]),
              d.value.length ? (r(), F("span", Ha, O(o(n)("(n Records selected)", { n: d.value.length }, d.value.length)), 1)) : v("", !0)
            ])
          ]),
          paginatorend: c(() => [
            S("div", Ka, [
              S("span", null, O(o(n)("Show")), 1),
              C(Wl, {
                modelValue: k.value,
                "onUpdate:modelValue": t[16] || (t[16] = (a) => k.value = a),
                size: "small",
                options: ul.value,
                "scroll-height": "360px",
                "option-label": "label",
                "option-value": "value",
                onChange: t[17] || (t[17] = (a) => rl())
              }, null, 8, ["modelValue", "options"]),
              k.value !== -1 ? (r(), F("span", qa, O(o(n)("Entries")), 1)) : v("", !0)
            ])
          ]),
          empty: c(() => [
            m(l.$slots, "empty", { record: w.value }, () => [
              e.noEmptyMessage ? v("", !0) : (r(), F("div", Ga, O(o(n)("No Records")), 1))
            ])
          ]),
          expansion: c(({ data: a }) => [
            m(l.$slots, "expansion", { row: a })
          ]),
          default: c(() => [
            e.noBody ? v("", !0) : (r(), F($, { key: 0 }, [
              e.reorderable ? (r(), h(o(Q), {
                key: 0,
                "row-reorder": "",
                "reorderable-column": !1,
                style: { width: "33px", "flex-grow": "1", "flex-basis": "33px" }
              })) : v("", !0),
              e.withExpansion && e.hasExpanderColumn ? (r(), h(o(Q), {
                key: 1,
                expander: "",
                "reorderable-column": !1,
                style: { width: "3rem" }
              })) : v("", !0),
              e.selectable && e.hasSelectionColumn ? (r(), h(o(Q), {
                key: 2,
                "selection-mode": e.selectionMode,
                "reorderable-column": !1,
                "header-style": "width: 3rem",
                frozen: e.frozenSelectionColumn ?? o(ce)(z.value[0]?.frozen)
              }, null, 8, ["selection-mode", "frozen"])) : v("", !0),
              e.hasSequenceColumn ? (r(), h(o(Q), te({
                key: 3,
                header: "#",
                style: { width: "3rem" }
              }, e.sequenceColumnProps), {
                body: c(({ index: a }) => [
                  $e(O(a + 1), 1)
                ]),
                loading: c(() => [
                  S("div", {
                    class: "flex items-center",
                    style: Ie({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(gt, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 1
              }, 16)) : v("", !0),
              (r(!0), F($, null, Y(z.value, (a) => (r(), h(o(Q), {
                key: a.name,
                field: a.fullFieldName,
                header: o(He)(a, o(n)),
                "sort-field": a.sortField ?? a.fullFieldName,
                "filter-field": a.filterField ?? a.fullFieldName,
                "data-type": a.type ?? "text",
                sortable: a.sortable ?? Qe.value,
                "show-filter-operator": o(Sa)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-filter-match-modes": o(Fa)(a) && (a.showFilterMatchModes ?? e.defaultShowFilterMatchModes),
                "max-constraints": Number.POSITIVE_INFINITY,
                "show-add-button": o(wa)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-apply-button": o(kt)(a) && (a.showFilterApplyButton ?? e.defaultColumnShowFilterAddButton),
                "show-clear-button": o(kt)(a) && (a.showFilterClearButton ?? e.defaultColumnShowFilterClearButton),
                "filter-match-mode": a.initialFilterMatchMode ?? xe(a.type),
                "filter-match-mode-options": Xt.value[a.type ?? "text"],
                "body-class": (a.bodyClass ?? "") + (a.inlineEditable && e.inlineEditMode === "cell" && e.editable ? " editing-cursor" : ""),
                "body-style": a.bodyStyle,
                "header-class": a.headerClass,
                "header-style": a.headerStyle,
                hidden: !o(dt)(a),
                frozen: o(ce)(a.frozen),
                "align-frozen": o(Rt)(a.frozen),
                pt: {
                  pcSortBadge: {
                    root: At.value ? "!hidden" : ""
                  }
                }
              }, Ae({
                body: c(({ data: u }) => [
                  m(l.$slots, `${o(pt)(a)}ColumnBody`, {
                    value: we(u, a),
                    row: u
                  }, () => [
                    C(ba, {
                      column: a,
                      "rendered-data": we(u, a),
                      row: u,
                      size: B.value,
                      class: ee({ "cell-has-edit-history": a.auditHistory }),
                      onContextmenu: (K) => ql(K, a, u)
                    }, null, 8, ["column", "rendered-data", "row", "size", "class", "onContextmenu"])
                  ])
                ]),
                _: 2
              }, [
                a.inlineEditable ? {
                  name: "editor",
                  fn: c(({ data: u, field: K, editorSaveCallback: ht, editorCancelCallback: Xl }) => [
                    C(ga, {
                      row: u,
                      "field-name": K ?? "text",
                      type: a.type,
                      field: o(fa)(e.fields, ["name", a.fullFieldName]),
                      column: a,
                      size: B.value,
                      "submit-callback": ht,
                      "cancel-callback": Xl
                    }, null, 8, ["row", "field-name", "type", "field", "column", "size", "submit-callback", "cancel-callback"])
                  ]),
                  key: "0"
                } : void 0,
                a.footer ? {
                  name: "footer",
                  fn: c(() => [
                    S("span", {
                      innerHTML: typeof a.footer == "string" ? a.footer : a.footer(w.value)
                    }, null, 8, Ya)
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
                      }, null, 8, Wa)) : (r(), F("i", {
                        key: 1,
                        title: o(n)("Descending"),
                        class: "i-mdi:sort-descending scale-y-[-1]"
                      }, null, 8, Ja))
                    ], 64)) : v("", !0)
                  ]),
                  key: "2"
                } : void 0,
                a.cellHeadFilterable ?? a.filterable ?? Ze.value ? {
                  name: "filter",
                  fn: c(({ filterModel: u, filterCallback: K }) => [
                    m(l.$slots, `${o(pt)(a)}ColumnFilter`, {
                      item: { filterModel: u, filterCallback: K }
                    }, () => [
                      C(Jl, {
                        column: a,
                        "filter-callback": K,
                        "filter-model": u
                      }, null, 8, ["column", "filter-callback", "filter-model"])
                    ])
                  ]),
                  key: "3"
                } : void 0
              ]), 1032, ["field", "header", "sort-field", "filter-field", "data-type", "sortable", "show-filter-operator", "show-filter-match-modes", "max-constraints", "show-add-button", "show-apply-button", "show-clear-button", "filter-match-mode", "filter-match-mode-options", "body-class", "body-style", "header-class", "header-style", "hidden", "frozen", "align-frozen", "pt"]))), 128)),
              e.hasToolsColumn ? (r(), h(o(Q), te({
                key: 4,
                "body-class": `p-tools-cell ${e.toolsColumnBodyClass ?? ""}`,
                "align-frozen": o(Rt)("end"),
                frozen: e.frozenToolsColumn
              }, e.toolsColumnProps), {
                header: c(() => [...t[27] || (t[27] = [
                  S("i", { class: "i-mdi-tools mx-auto" }, null, -1)
                ])]),
                body: c((a) => [
                  S("div", Qa, [
                    m(l.$slots, "toolsColumnExtraStartButton", {
                      row: a.data,
                      isLoading: p.value
                    }),
                    e.openable ? A((r(), h(o(T), {
                      key: 0,
                      severity: "info",
                      as: e.openButtonUrl ? "a" : void 0,
                      href: e.openButtonUrl ? e.openButtonUrl(a.data) : void 0,
                      disabled: W.value.includes(a.data[e.primaryKey]),
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
                    e.printableRows === !0 || typeof e.printableRows == "function" && e.printableRows(a.data) ? A((r(), h(o(T), {
                      key: 1,
                      severity: "success",
                      size: e.toolButtonsSize ?? B.value,
                      disabled: W.value.includes(a.data[e.primaryKey]),
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
                    e.editable && (!e.rowEditable || e.rowEditable(a.data)) ? A((r(), h(o(T), {
                      key: 2,
                      disabled: p.value || W.value.includes(a.data[e.primaryKey]),
                      severity: "success",
                      size: e.toolButtonsSize ?? B.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-edit",
                      onClick: (u) => De(a.data)
                    }, null, 8, ["disabled", "size", "onClick"])), [
                      [E, o(n)("Edit")]
                    ]) : v("", !0),
                    e.deletable && (!e.rowDeletable || e.rowDeletable(a.data)) ? A((r(), h(o(T), {
                      key: 3,
                      severity: "danger",
                      loading: W.value.includes(a.data[e.primaryKey]),
                      disabled: p.value,
                      size: e.toolButtonsSize ?? B.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-trash",
                      onClick: (u) => ze(a.data)
                    }, null, 8, ["loading", "disabled", "size", "onClick"])), [
                      [
                        E,
                        o(n)("Remove"),
                        void 0,
                        { danger: !0 }
                      ]
                    ]) : v("", !0),
                    e.extraToolAndContextButtons?.length ? (r(!0), F($, { key: 4 }, Y(e.extraToolAndContextButtons, (u, K) => A((r(), h(o(T), {
                      key: K,
                      loading: p.value,
                      hidden: !(u.visible === !0 || u.visible === !1 ? u.visible : u.visible?.(a.data) ?? !0),
                      size: e.toolButtonsSize ?? B.value,
                      label: u.onlyIconButton === !0 ? void 0 : o(ce)(u.label) ? u.label : u.label(a.data),
                      severity: u.severity,
                      badge: o(fe)(u.badge) ? u.badge(a.data) : u.badge,
                      "badge-severity": o(fe)(u.badgeSeverity) ? u.badgeSeverity(a.data) : u.badgeSeverity,
                      icon: typeof u.icon == "function" ? u.icon(a.data) : u.icon,
                      onClick: (ht) => u.command?.(a.data)
                    }, null, 8, ["loading", "hidden", "size", "label", "severity", "badge", "badge-severity", "icon", "onClick"])), [
                      [E, o(ce)(u.label) ? u.label : u.label(a.data)]
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
                    style: Ie({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(gt, {
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
                extra: Z.value
              })
            ]),
            key: "0"
          } : void 0,
          l.$slots.footer ? {
            name: "footer",
            fn: c(() => [
              m(l.$slots, "footer", {
                records: w.value,
                extra: Z.value
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
                  class: ee(["font-bold", e.rowGroupHeaderClass]),
                  innerHTML: e.rowGroupHeaderFormatter === !0 ? o(ve)(a.data, e.groupRowsBy) : e.rowGroupHeaderFormatter(o(ve)(a.data, e.groupRowsBy), a.data)
                }, null, 10, ja)) : v("", !0)
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
        e.withDataView ? (r(), h(Ql, {
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
      ], 10, Ta);
    };
  }
});
export {
  Bo as default
};
