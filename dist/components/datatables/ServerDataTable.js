import ea from "primevue/tooltip";
import ta from "primevue/dataview";
import { _ as la } from "../../FilterControl.vue_vue_type_script_setup_true_lang-ptr3bjjm.js";
import aa from "primevue/skeleton";
import oa from "primevue/select";
import ia from "primevue/checkbox";
import na from "primevue/inputgroup";
import { _ as ra } from "../../SelectInput.vue_vue_type_script_setup_true_lang-Ck-rW3-O.js";
import ua from "primevue/divider";
import sa from "primevue/iconfield";
import da from "primevue/inputtext";
import fa from "primevue/inputicon";
import { defineComponent as ca, computed as f, onActivated as va, onMounted as ma, ref as g, useModel as de, useTemplateRef as O, watch as Ct, toValue as wt, openBlock as r, createElementBlock as F, normalizeClass as ee, createVNode as C, mergeProps as te, createSlots as Ee, withCtx as c, renderSlot as m, normalizeProps as le, guardReactiveProps as ae, renderList as Y, unref as o, createElementVNode as B, toDisplayString as I, withDirectives as E, createBlock as h, createCommentVNode as v, Fragment as A, isRef as ya, withModifiers as ba, normalizeStyle as Ae, createTextVNode as Oe, mergeModels as Ft, nextTick as ga } from "vue";
import ha from "HddUiHelpers/components/datatables/PrintPaperForServerDataTable.vue";
import Ca from "primevue/datatable";
import { isToolbarFilterValue as Bt } from "./ServerDataTableTypes.js";
import { useDebounceFn as Ie, useElementSize as pt } from "@vueuse/core";
import wa from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { useServerDataTableColumnVisibility as Fa } from "HddUiHelpers/components/datatables/visibility.ts";
import { useApiClient as Ba } from "HddUiHelpers/stores/apiClient.ts";
import { isBoolean as Ve, set as pa, cloneDeep as Le, map as Sa, filter as xa, reduce as St, isFunction as fe, isString as ce, find as Ra, get as ve, uniqueId as Ne, unset as ka } from "lodash-es";
import xt from "primevue/contextmenu";
import { useConfirm as Ma } from "primevue/useconfirm";
import { useI18n as za } from "vue-i18n";
import Ta from "HddUiHelpers/components/AuditsPopover/AuditsPopover.vue";
import Da from "HddUiHelpers/components/datatables/CellContent.vue";
import Pa from "HddUiHelpers/components/datatables/InlineCellEdit.vue";
import { snakeCasePreserveDots as Ua, getFilterMatchModesByTypeOptions as $a, isToolbarFilterEmpty as Rt, getFieldSlotName as J, getColumnTitle as He, getColumnName as me, localeAlignToFrozenAlign as kt, getColumnCanShowFilterApplyButton as Mt, getColumnCanShowAddButton as Ea, getColumnCanShowFilterMatchModes as Aa, getColumnCanShowFilterOperator as Oa, getColumnSlotName as zt, appendToUrl as Ia } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import Tt from "HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue";
import { useHddUiHelpers as Va } from "HddUiHelpers/plugins/HddUiHelpers.ts";
import { useStackableDialog as La } from "HddUiHelpers/stores/stackableDialogs.ts";
import { printDomWithStyles as Na } from "HddUiHelpers/utils/printDom.ts";
import { useFormatters as Ha } from "HddUiHelpers/utils/useFormatters.ts";
import Ka from "moment";
import z from "primevue/button";
import Q from "primevue/column";
import Dt from "primevue/popover";
const qa = ["data-name"], ja = { class: "my-2 text-center text-lg font-bold" }, Ga = { class: "flex justify-between" }, Ya = { class: "flex justify-between" }, Wa = { key: 0 }, Ja = {
  class: "overflow-y-auto",
  style: { "max-height": "calc(100vh - 100px)" }
}, Qa = { class: "flex max-h-screen flex-col items-center gap-y-1 py-1" }, Xa = { class: "flex justify-end gap-1 print:hidden" }, Za = { class: "max-h-screen overflow-y-auto" }, _a = ["for"], eo = {
  key: 0,
  class: "flex justify-start"
}, to = { class: "mt-1" }, lo = { class: "flex w-full justify-end gap-1 text-sm" }, ao = { key: 0 }, oo = { class: "flex items-center gap-1 text-sm" }, io = { key: 0 }, no = ["innerHTML"], ro = {
  key: 0,
  class: "text-secondary-1 text-center text-sm italic"
}, uo = ["innerHTML"], so = ["title"], fo = ["title"], co = { class: "flex flex-wrap items-center gap-1" }, Qo = /* @__PURE__ */ ca({
  __name: "ServerDataTable",
  props: /* @__PURE__ */ Ft({
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
  emits: /* @__PURE__ */ Ft(["rowClick", "rowDblClick", "rowOpen", "rowEdit", "multiRowsEdit", "rowCreated", "rowUpdated", "rowDeleted", "rowExpand", "rowPrint", "rowCollapse", "rowReorder", "refreshed", "rowChanged", "dialogsVisibility"], ["update:perPage", "update:firstRowIndex", "update:currentPage", "update:extraData"]),
  setup(e, { expose: Pt, emit: Ut }) {
    const S = Ut, Ke = f(
      () => "HddServerDataTable_" + (e.name ?? (typeof e.url == "object" ? e.url.url : e.url))
    ), $t = Va(), V = f(() => $t.commonServerDataTableProps ?? {}), p = f(() => e.size ?? V.value.size), Et = f(
      () => Ve(e.onlyRequestedColumns) ? e.onlyRequestedColumns : Ve(V.value.onlyRequestedColumns) ? V.value.onlyRequestedColumns : !0
    ), At = f(
      () => e.extraGetDataPayload ?? V.value.extraGetDataPayload ?? {}
    ), Ot = f(
      () => e.noMultiSortBadges ?? V.value.noMultiSortBadges ?? !1
    ), It = f(
      () => e.columnVisibilityButton ?? V.value.columnVisibilityButton
    ), ye = f(
      () => e.withToolbarFilters ?? V.value.withToolbarFilters
    ), Vt = f(
      () => e.filterDisplayLayout ?? V.value.filterDisplayLayout ?? "menu"
    ), be = f(() => e.sortMode ?? V.value.sortMode ?? "multiple");
    va(() => {
      e.refreshOnActivated && ut();
    }), ma(() => {
      e.refreshOnMount && ut();
    });
    const { t: n } = za(), w = g(e.initialRecords || []), q = g(e.initialTotalRecords), ge = g(0), he = g(0), Ce = g(0), d = g([]), X = g(), qe = f({
      get() {
        return e.selectionMode === "multiple" ? d.value : X.value;
      },
      set(l) {
        e.selectionMode === "multiple" ? d.value = l : X.value = l;
      }
    }), H = g({}), b = g(), R = de(e, "perPage"), je = de(e, "firstRowIndex"), oe = de(e, "currentPage"), Z = de(e, "extraData"), k = g(!1), M = g(!1), Lt = Ha(), j = Ba(), Nt = Ma(), ie = O("wrapperRef"), Ge = O("headerSegmentRef"), Ht = O("datatableRef"), T = f(() => {
      let l;
      return Array.isArray(e.columns) ? l = e.columns : l = e.columns === "*" && w.value?.length ? Object.keys(w.value[0]) : [e.columns], l.map((t) => typeof t == "string" ? { name: t, field: t, label: t, fullFieldName: t } : (t.field || (t.field = t.name), t.relation ? (t.relation = Ua(t.relation), t.fullFieldName = t.relation + "." + t.field) : t.fullFieldName = t.field, (!t.type || t.type === "select") && t.selectOptions !== void 0 && (t.type = "select", t.renderTypeProps && !t.renderType && (t.renderType = "tag")), t.hiddenButCanBeVisible === !0 && (t.visibilityControl = !0, t.visible = !1), t.type === "date" && (t.dateFormat ? t.dateFormat === "date" ? t.dateFormat = "YYYY-MM-DD" : t.dateFormat === "datetime" && (t.dateFormat = "YYYY-MM-DD hh:mmA") : t.dateFormat = "YYYY-MM-DD"), t.type || (t.type = "text"), t));
    }), Kt = f(() => T.value.filter((l) => l.filterable ?? Ze.value)), Ye = f(() => {
      const l = {};
      return T.value.forEach((t) => {
        const i = t.fullFieldName;
        t.type === "select" && (t.selectOptionsKeyed ? l[i] = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? l[i] = t.selectOptions.reduce(
          (s, y) => (s[y[t.selectValueProperty ?? "id"]] = y[t.selectLabelProperty ?? "name"], s),
          {}
        ) : l[i] = t.selectOptions.object));
      }), l;
    });
    function we(l, t) {
      const i = typeof t.showable == "function" ? t.showable : wt(t.showable);
      if (typeof i == "function" || Ve(i)) {
        const x = typeof i == "function" ? i({ row: l }) : i;
        if (x === !1)
          return '<span class="italic text-muted">--</span>';
        if (x !== !0)
          return x;
      }
      let s = t.fullFieldName;
      typeof t.formatter == "string" && (s = t.formatter);
      const y = ve(l, s);
      if (typeof t.formatter == "function")
        return t.formatter(y, l, s);
      if (t.type === "select") {
        let x;
        return t.isMultiSelect ? x = y.map((G) => Ye.value[s]?.[G] || G) : x = Ye.value[s]?.[y] || y, !x && t.emptyValuePlaceholder && (x = `<span class="italic text-muted">${t.emptyValuePlaceholder}</span>`), x;
      }
      if (t.type === "price")
        return Lt.formatPrice(
          y,
          typeof t.currency == "string" ? t.currency : t.currency ? l : void 0
        );
      if (t.type === "date" && t.dateFormat)
        return y ? Ka(y).format(t.dateFormat) : "";
      if (t.type === "boolean") {
        if (t.renderType === "yesNoIconBadge") return y;
        let x = y === !0 ? n("Yes") : y === !1 ? n("No") : "";
        return x || (x = `<span class="italic text-muted">${t.emptyValuePlaceholder ?? "null"}</span>`), x;
      }
      return y;
    }
    function We() {
      M.value = d.value.length === q.value && d.value.length !== 0;
    }
    function qt() {
      M.value ? (d.value = [], M.value = !1) : (d.value = w.value, M.value = d.value.length !== 0);
    }
    function jt(l) {
      w.value?.length === 0 && (M.value = !1, d.value = []), M.value = l.checked, M.value ? d.value = w.value : d.value = [];
    }
    function Gt() {
      M.value = d.value.length === q.value && d.value.length !== 0;
    }
    function Yt() {
      M.value = !1;
    }
    function Wt() {
      d.value = w.value, M.value = d.value.length !== 0;
    }
    function Jt() {
      d.value = [], M.value = !1;
    }
    function Qt(l) {
      return d.value.some((t) => t[e.primaryKey] === l[e.primaryKey]);
    }
    function Xt(l) {
      e.selectionMode === "single" ? X.value = X.value === l ? void 0 : l : (Qt(l) ? d.value = d.value.filter(
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
    ), re = g(e.initialSortField), Fe = g(Je(e.initialSortDirection)), Be = f(() => be.value === "single" && re.value ? [{ field: re.value, direction: Fe.value === -1 ? "desc" : "asc" }] : be.value === "multiple" && ne.value?.length ? ne.value.map(
      (l) => ({
        field: l.field,
        direction: l.order === -1 ? "desc" : "asc"
      })
    ) : []);
    async function Zt() {
      await U(), We();
    }
    const _t = f(() => $a(n)), D = g(
      {}
    ), Xe = f({
      get() {
        return D.value._global?.value;
      },
      set(l) {
        pa(D.value, "_global.value", l);
      }
    }), Ze = g(!0);
    function pe(l) {
      return l?.operator !== void 0;
    }
    const _e = f(() => {
      if (at.value) return !0;
      for (const l in D.value) {
        if (e.fixedFilters?.[l])
          continue;
        const t = D.value[l];
        if (pe(t)) {
          if (t.constraints?.findIndex((s) => s.value !== null && s.value !== "") > -1) return !0;
        } else {
          if (typeof t == "string")
            return D.value[l] !== null && D.value[l] !== "";
          if (t?.value !== null && t?.value !== "") return !0;
        }
      }
      return !1;
    }), el = f(() => {
      const l = D.value._global;
      if (!l)
        return !1;
      if (pe(l)) {
        if (l.constraints?.findIndex((i) => i.value !== null && i.value !== "") > -1) return !0;
      } else if (l?.value !== null && l?.value !== "") return !0;
      return !1;
    });
    function tl() {
      it(!1), tt(), U();
    }
    function Se(l) {
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
    function ll(l) {
      const t = typeof l == "object" ? l : T.value.find((i) => (i.filterField ?? i.field ?? i.name) === l);
      t && (D.value[t.filterField ?? t.fullFieldName] = et(t));
    }
    function et(l) {
      let t;
      return l.initialFilterMatchMode ? t = l.initialFilterMatchMode : t = Se(l.type), l.multipleFilters === !1 && !1 ? {
        value: null,
        matchMode: t
      } : {
        operator: "and",
        constraints: [{ value: null, matchMode: t }]
      };
    }
    function tt() {
      D.value = St(
        T.value,
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
      () => T.value.map((l) => l.filterField ?? l.name ?? l.field).join(","),
      (l, t) => {
        l !== t && tt();
      },
      {
        immediate: !0,
        deep: !0
      }
    );
    const al = f(() => {
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
        }) : pe(i) ? l.fields.push({
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
    async function ol() {
      await U();
    }
    const xe = O(
      "toolbarFiltersPopoverRef"
    ), lt = O(
      "toolbarFiltersWrapperRef"
    ), il = f(() => Kt.value), nl = f(() => P.value.fields.filter((l) => Bt(l)).map((l) => l.field));
    function Re(l) {
      return Bt(l) ? (l.id || (l.id = Ne("toolbar-filter-")), l) : (l.id || (l.id = Ne("toolbar-filter-")), l.fields = l.fields.map(Re), l);
    }
    const P = g(
      Re({
        operator: e.defaultFiltersOperator,
        fields: [...Le(e.initialToolbarFilters)]
      })
    );
    function rl(l) {
      P.value.fields.push({
        id: Ne("toolbar-filter-"),
        field: l.filterField ?? l.fullFieldName,
        value: null,
        matchMode: Se(l.type)
      }), xe.value?.hide(), ga(() => {
        setTimeout(() => {
          lt.value?.focusLast();
        }, 50);
      });
    }
    const at = f(() => !Rt(P.value)), ot = f(() => P.value.fields.length > 0);
    function it(l = !0) {
      P.value = Re({
        operator: e.defaultFiltersOperator,
        fields: []
      }), l && U();
    }
    function ke() {
      ml();
    }
    async function ul(l) {
      oe.value = l.page + 1, await U(), We();
    }
    async function sl() {
      oe.value = 1, await U();
    }
    const nt = f(
      () => e.globalFilterFields ?? Sa(
        xa(T.value, (l) => l.globalFilter !== !1),
        (l) => l.filterField ?? l.fullFieldName
      )
    ), dl = f(() => {
      const l = [5, 10, 15, 25, 50, 100, 500, 1e3];
      return !l.includes(R.value) && R.value !== -1 && l.push(R.value), [...l.map((t) => ({ value: t, label: t })), { value: -1, label: n("All") }];
    }), fl = f(() => St(
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
    )), rt = g({});
    function cl(l, t = !1) {
      return rt.value = l, t ? U() : Promise.resolve();
    }
    async function Me(l = null, t = null, i = {}) {
      const s = {
        globalFilters: el.value ? nt.value : [],
        page: t || oe.value,
        perPage: e.hasPagination ? l || R.value : -1,
        // perPage: specificPerPage || perPage.value,
        sorts: Be.value,
        fields: fl.value,
        filters: D.value,
        fixedFilters: e.fixedFilters,
        groupedFilters: P.value,
        fixedGroupedFilters: {
          operator: "and",
          fields: e.fixedToolbarFilters
        },
        options: {
          onlyRequestedColumns: Et.value,
          primaryKey: e.primaryKey
        },
        ...At.value
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
      return k.value = !0, new Promise((l) => {
        e.dataProvider ? e.dataProvider({
          page: oe.value,
          perPage: R.value,
          sorts: Be.value,
          filters: al.value
        }).then((t) => {
          w.value = t.data, q.value = t.total_records, R.value = t.per_page || R.value, je.value = (t.current_page - 1) * R.value, l();
        }) : e.url ? Me().then((t) => {
          let i = t.data.data;
          if (e.transformResponseData && (i = e.transformResponseData(i)), w.value = i.data, q.value = i.total, ge.value = i.total_without_filters, R.value = i.per_page || R.value, je.value = (i.current_page - 1) * R.value, he.value = i.from ?? 0, Ce.value = i.to ?? 0, d.value.length > 0) {
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
        k.value = !1;
      });
    }
    const vl = Ie(() => {
      U();
    }, 500), ml = Ie(() => {
      U();
    }, 100), ut = Ie(() => {
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
    const yl = g(!1), bl = f(() => {
      if (e.infiniteScroll)
        return {
          itemSize: st.value,
          delay: 50,
          lazy: !0,
          showLoader: !0,
          autoSize: !0,
          loading: yl.value,
          onLazyLoad: gl
        };
    });
    async function gl() {
    }
    const {
      checkColumnIsVisible: dt,
      visibleColumns: ze,
      visibleColumnsPopoverRef: ft,
      saveVisibleColumnsState: hl,
      toggleableColumns: Cl
    } = Fa(Ke, T), _ = g(!1), W = g([]), { updateDialogVisibility: ue } = La();
    function Te(l) {
      if (!l) return;
      let t = 1;
      Array.isArray(l) && (t = l.length), ue(!0), Nt.require({
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
            t === 1 ? e.singleDeleteUrl ? s = e.singleDeleteUrl(i[0]).url : s = Ia(s, i[0]) : e.deleteUrl && (s = typeof e.deleteUrl == "object" ? e.deleteUrl.url : e.deleteUrl), W.value = i, await j.delete(s, { params: { ids: i } }), j.toastSuccess(n("Deleted!"), n("n Record Deleted Successfully", { n: t }, t)), S("rowDeleted", Array.isArray(l) ? i : l[e.primaryKey]), S("rowChanged", l, "delete"), d.value = d.value.filter(
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
    const L = O("ServerFormDialogRef"), wl = f(() => ({
      url: e.createUrl ?? e.url,
      primaryKey: e.primaryKey,
      singleDeleteUrl: e.singleDeleteUrl,
      deleteUrl: e.deleteUrl,
      singleEditUrl: e.singleEditUrl,
      editUrl: e.editUrl,
      autoAppendIdToEditUrl: !0,
      fields: e.fields,
      size: wt(p),
      columns: T.value.filter((l) => l.inForm === !0),
      onSubmitted: Fl,
      onVisible: (l) => S("dialogsVisibility", l),
      ...e.formProps ?? {}
    }));
    function Fl(l, t) {
      t === "create" ? S("rowCreated", l) : t === "update" ? S("rowUpdated", l) : S(
        "rowDeleted",
        l instanceof Array ? l.map((i) => i[e.primaryKey]) : l[e.primaryKey]
      ), S("rowChanged", l, t), e.refreshAfterFormSubmit && U();
    }
    function Bl() {
      L.value?.create();
    }
    function De(l) {
      S("rowEdit", l), e.useFormForEdit && ct(l);
    }
    function pl(l) {
      S("multiRowsEdit", l), e.useFormForEdit && ct(l);
    }
    function Sl(l) {
      l.length === 1 ? De(l[0]) : pl(l);
    }
    function ct(l) {
      Array.isArray(l) ? L.value?.editMulti(l) : L.value?.edit(l);
    }
    const xl = f(() => !!e.onRowClick || e.openOnClick && e.onRowOpen);
    function Rl(l) {
      e.onRowDblClick && S("rowDblClick", l.data, l.index, l.originalEvent);
    }
    function kl(l) {
      if (!window.getSelection()?.isCollapsed)
        return;
      const t = l.originalEvent.composedPath(), i = t.find((N) => N.classList?.contains("p-datatable-row-toggle-button")), s = t.find((N) => N?.getAttribute?.("data-p-editable-column") === "true"), y = t.find((N) => N.classList?.contains("p-selection-column")), x = t.find((N) => N.classList?.contains("p-button"));
      if (i || s || y || x)
        return;
      S("rowClick", l.data, l.index, l.originalEvent);
      const G = e.onRowClick || e.onRowOpen && e.openOnClick, $e = l.originalEvent.target.getAttribute("data-p-selection-column") === "true";
      !G && e.withExpansion && e.expandOnRowClick ? Tl(l.data) : ($e || !G) && e.selectable && e.selectOnRowClick ? Xt(l.data) : !e.onRowClick && e.openOnClick && e.openable && S("rowOpen", l.data);
    }
    const vt = O("contextMenuRef");
    function Ml(l) {
      vt.value?.show(l.originalEvent);
    }
    const zl = f(() => {
      const l = [];
      return b.value && (e.openable && l.push({
        label: e.openButtonLabel ?? e.openButtonTitle ?? n("Open"),
        icon: e.openButtonIcon ?? "i-material-symbols:open-jam-outline-rounded",
        url: e.openButtonUrl ? e.openButtonUrl(b.value) : void 0,
        command: () => b.value ? S("rowOpen", b.value) : void 0
      }), (e.printableRows == !0 || typeof e.printableRows == "function" && e.printableRows(b.value)) && l.push({
        label: n("Print"),
        icon: "i-mdi-printer",
        command: () => b.value ? S("rowPrint", b.value) : void 0
      }), e.editable && (!e.rowEditable || e.rowEditable(b.value)) && l.push({
        label: n("Edit"),
        icon: "i-mdi-edit",
        command: () => b.value ? De(b.value) : void 0
      }), e.deletable && (!e.rowDeletable || e.rowDeletable(b.value)) && l.push({
        label: n("Delete"),
        icon: "i-mdi-trash",
        disabled: k.value || _.value,
        command: () => b.value ? Te(b.value) : void 0
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
    function Tl(l) {
      Dl(l) ? Ul(l) : Pl(l);
    }
    function Dl(l) {
      return H.value ? H.value[l[e.primaryKey]] : !1;
    }
    function Pl(l) {
      e.oneExpansionAtATime ? H.value = {
        [l[e.primaryKey]]: !0
      } : H.value[l[e.primaryKey]] = !0;
    }
    function Ul(l) {
      ka(H.value, l[e.primaryKey]);
    }
    function $l(l) {
      e.oneExpansionAtATime && (H.value = {
        [l.data[e.primaryKey]]: !0
      }), S("rowExpand", l.data);
    }
    function El(l) {
      S("rowCollapse", l.data);
    }
    const mt = g(!1);
    async function Al(l) {
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
    const yt = O(
      "printTableContextMenuRef"
    ), Ol = f(() => [
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
    ]), Il = f(() => T.value.filter((l) => l.printable !== !1)), Vl = f(() => ({
      columns: Il.value,
      mappedColumns: T.value,
      sorts: Be.value,
      hasSequenceColumn: e.hasSequenceColumn,
      records: w,
      firstPageHeaderImageUrl: e.firstPageHeaderImageUrl,
      headerImageUrl: e.headerImageUrl,
      footerImageUrl: e.footerImageUrl,
      extraData: Z,
      hasSorts: Qe.value,
      getData: Me,
      toolbarFilters: Rt(e.fixedToolbarFilters) ? P.value : {
        operator: "and",
        fields: [...e.fixedToolbarFilters, P.value]
      },
      filters: D.value,
      getColumnBody: we,
      checkColumnIsVisible: dt,
      showPageCounter: !0,
      showCurrentPrintTime: !0,
      ...e.printingProps ?? {}
    })), Pe = g(!1), Ue = O("printPaperForServerDataTableRef");
    function se(l = !1) {
      e.customPrintMethod ? e.customPrintMethod() : e.printTableAsInView ? ie.value && Na(ie.value, {
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
    function Ll(l) {
      e.hasPagination && yt.value?.show(l);
    }
    function Nl(l) {
      Ue.value?.print(!0, l);
    }
    function Hl() {
      k.value = !0;
    }
    function Kl() {
      k.value = !1;
    }
    Pt({
      records: w,
      selectedRecord: X,
      selectedRecords: d,
      refresh: U,
      startLoading: Hl,
      endLoading: Kl,
      isLoading: k,
      extraData: Z,
      printTable: se,
      getData: Me,
      setCustomGetDataConfig: cl,
      clearFilterFor: ll,
      ServerFormDialogRef: L,
      printWithCustomConfig: Nl
    });
    const ql = f(() => {
      const l = [];
      return e.tableSeverity && e.tableSeverity !== "none" && (l.push(`p-datatable-${e.tableSeverity}`), l.push(`p-datatable-header-${e.tableSeverity}`)), l;
    });
    function jl(l) {
      const t = l.value, i = l.newValue;
      t !== i && L.value?.updateDirectly(l.data, [l.field, l.newValue]);
    }
    const bt = O("auditsPopoverRef");
    function Gl(l, t, i) {
      t.auditHistory && (l.stopPropagation(), l.preventDefault(), e.url && bt.value?.showAudits(
        l,
        e.url,
        t.fullFieldName,
        (s) => typeof t.formatter == "function" ? t.formatter(s, i, t.fullFieldName) : s,
        () => t.type === "textarea" ? "whitespace-pre-wrap" : "",
        `${ve(i, e.primaryKey)}/audits`
      ));
    }
    const Yl = pt(ie), Wl = pt(Ge), Jl = f(() => e.scrollable ? Yl.height.value - Wl.height.value + "px" : void 0);
    return (l, t) => {
      const i = fa, s = da, y = sa, x = ua, G = ra, $e = na, N = ia, Ql = oa, gt = aa, Xl = la, Zl = ta, $ = ea;
      return r(), F("div", {
        ref_key: "wrapperRef",
        ref: ie,
        class: ee(["HddServerDataTableWrapper h-full", { "rounded-table": e.rounded }]),
        "data-name": Ke.value
      }, [
        C(wa, te({
          ref_key: "ServerFormDialogRef",
          ref: L
        }, wl.value), Ee({
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
        C(ha, te(Vl.value, {
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
                B("div", ja, I(e.printingTitle ?? e.title), 1)
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
        C(o(xt), {
          ref_key: "contextMenuRef",
          ref: vt,
          model: zl.value,
          onHide: t[1] || (t[1] = (a) => b.value = void 0)
        }, null, 8, ["model"]),
        C(Ta, {
          ref_key: "auditsPopoverRef",
          ref: bt
        }, null, 512),
        B("div", {
          ref_key: "headerSegmentRef",
          ref: Ge,
          class: "p-1"
        }, [
          m(l.$slots, "topSegment", {}, () => [
            m(l.$slots, "title", { records: w.value }, () => [
              B("div", {
                class: ee(["my-1 text-center text-xl font-bold", { ["text-" + e.tableSeverity]: e.tableSeverity && e.tableSeverity !== "none" }])
              }, I(e.title), 3)
            ]),
            m(l.$slots, "subTitle"),
            B("div", Ga, [
              B("div", null, [
                B("div", Ya, [
                  e.hasGlobalFilter ? (r(), F("div", Wa, [
                    C($e, null, {
                      default: c(() => [
                        C(y, null, {
                          default: c(() => [
                            C(i, { class: "i-mdi:magnify !z-10" }),
                            C(s, {
                              modelValue: Xe.value,
                              "onUpdate:modelValue": t[2] || (t[2] = (a) => Xe.value = a),
                              size: p.value,
                              placeholder: o(n)("Search"),
                              name: "global-search",
                              autocomplete: "off",
                              onValueChange: o(vl)
                            }, null, 8, ["modelValue", "size", "placeholder", "onValueChange"])
                          ]),
                          _: 1
                        }),
                        _e.value ? E((r(), h(o(z), {
                          key: 0,
                          class: "print:hidden",
                          size: p.value,
                          type: "button",
                          icon: "i-mdi-filter-off w-8",
                          label: o(n)("Clear"),
                          outlined: "",
                          severity: "error",
                          onClick: t[3] || (t[3] = (a) => tl())
                        }, null, 8, ["size", "label"])), [
                          [
                            $,
                            o(n)("Clear Filters"),
                            void 0,
                            { top: !0 }
                          ]
                        ]) : v("", !0),
                        ye.value ? (r(), F(A, { key: 1 }, [
                          C(o(Dt), {
                            ref_key: "toolbarFiltersPopoverRef",
                            ref: xe
                          }, {
                            default: c(() => [
                              B("div", Ja, [
                                B("div", Qa, [
                                  (r(!0), F(A, null, Y(il.value, (a) => (r(), h(o(z), {
                                    key: a.field,
                                    disabled: nl.value.includes(
                                      a.filterField ?? a.field
                                    ) && !e.allowMultipleToolbarFiltersForSameField,
                                    severity: "info",
                                    outlined: "",
                                    fluid: "",
                                    size: e.toolbarButtonsSize ?? p.value,
                                    label: o(He)(a, o(n)),
                                    onClick: (u) => rl(a)
                                  }, null, 8, ["disabled", "size", "label", "onClick"]))), 128))
                                ]),
                                C(x),
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
                                  onChange: t[5] || (t[5] = () => at.value && ke())
                                }, null, 8, ["modelValue", "label", "options"])) : v("", !0),
                                ot.value ? (r(), h(o(z), {
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
                          ye.value ? E((r(), h(o(z), {
                            key: 0,
                            class: "print:hidden",
                            size: e.toolbarButtonsSize ?? p.value,
                            severity: "help",
                            icon: "i-mdi-filter",
                            onClick: t[7] || (t[7] = (a) => o(xe)?.toggle(a))
                          }, null, 8, ["size"])), [
                            [
                              $,
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
              B("div", Xa, [
                m(l.$slots, "buttonsStart"),
                e.creatable ? E((r(), h(o(z), te({
                  key: 0,
                  size: e.toolbarButtonsSize ?? p.value,
                  severity: "primary",
                  icon: "i-mdi-plus ",
                  label: e.toolbarButtonsOnlyIcons ? null : e.createButtonLabel ?? o(n)("New")
                }, e.createButtonProps, {
                  onClick: t[8] || (t[8] = (a) => Bl())
                }), null, 16, ["size", "label"])), [
                  [
                    $,
                    e.createButtonLabel ?? o(n)("New"),
                    void 0,
                    {
                      success: !0,
                      top: !0
                    }
                  ]
                ]) : v("", !0),
                e.selectable && e.selectAllToolbarButton ? E((r(), h(o(z), {
                  key: 1,
                  class: "light:border-gray-300 light:text-black border-1 whitespace-pre dark:border-gray-600 dark:text-white",
                  size: e.toolbarButtonsSize ?? p.value,
                  severity: "secondary",
                  icon: M.value ? "i-mdi:square-rounded-outline" : "i-fluent:select-all-on-24-regular",
                  label: e.toolbarButtonsOnlyIcons ? null : M.value ? o(n)("Deselect") : o(n)("Select All"),
                  onClick: qt
                }, null, 8, ["size", "icon", "label"])), [
                  [
                    $,
                    M.value ? o(n)("Deselect") : o(n)("Select All"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.deletable ? E((r(), h(o(z), {
                  key: 2,
                  loading: _.value,
                  size: e.toolbarButtonsSize ?? p.value,
                  severity: "danger",
                  disabled: k.value || d.value.length < 1,
                  icon: "i-mdi-trash",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Delete"),
                  onClick: t[9] || (t[9] = (a) => Te(d.value))
                }, null, 8, ["loading", "size", "disabled", "label"])), [
                  [
                    $,
                    o(n)("Delete"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                e.selectable && e.editable ? E((r(), h(o(z), {
                  key: 3,
                  size: e.toolbarButtonsSize ?? p.value,
                  disabled: _.value || k.value || d.value.length < 1 || d.value.length !== 1 && !e.multiEditable,
                  severity: "success",
                  icon: "pi pi-pencil",
                  label: e.toolbarButtonsOnlyIcons ? null : o(n)("Edit"),
                  onClick: t[10] || (t[10] = (a) => Sl(d.value))
                }, null, 8, ["size", "disabled", "label"])), [
                  [
                    $,
                    {
                      class: "warn",
                      value: d.value.length > 1 && !e.multiEditable ? o(n)("You must select one item only") : o(n)("Edit")
                    },
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                It.value ? (r(), F(A, { key: 4 }, [
                  C(o(Dt), {
                    ref_key: "visibleColumnsPopoverRef",
                    ref: ft
                  }, {
                    default: c(() => [
                      B("div", Za, [
                        (r(!0), F(A, null, Y(o(Cl), (a) => (r(), F("div", {
                          key: o(me)(a),
                          class: "max-h-90vh flex items-center gap-2 overflow-y-auto pb-1"
                        }, [
                          C(N, {
                            modelValue: o(ze),
                            "onUpdate:modelValue": t[11] || (t[11] = (u) => ya(ze) ? ze.value = u : null),
                            "input-id": "ColumnVisibilityCheckbox_" + o(me)(a),
                            value: o(me)(a),
                            onChange: o(hl)
                          }, null, 8, ["modelValue", "input-id", "value", "onChange"]),
                          B("label", {
                            for: "ColumnVisibilityCheckbox_" + o(me)(a),
                            class: "flex-1 px-1"
                          }, I(o(He)(a, o(n))), 9, _a)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 512),
                  E(C(o(z), {
                    size: e.toolbarButtonsSize ?? p.value,
                    icon: "i-mdi:eye ",
                    severity: "help",
                    onClick: t[12] || (t[12] = (a) => o(ft)?.toggle(a))
                  }, null, 8, ["size"]), [
                    [
                      $,
                      o(n)("Columns Control"),
                      void 0,
                      { top: !0 }
                    ]
                  ])
                ], 64)) : v("", !0),
                e.printable ? (r(), F(A, { key: 5 }, [
                  C(o(xt), {
                    ref_key: "printTableContextMenuRef",
                    ref: yt,
                    model: Ol.value
                  }, null, 8, ["model"]),
                  E(C(o(z), {
                    disabled: k.value,
                    size: e.toolbarButtonsSize ?? p.value,
                    severity: "success",
                    loading: Pe.value,
                    icon: "i-mdi-printer",
                    onContextmenu: ba(Ll, ["prevent"]),
                    onClick: t[13] || (t[13] = (a) => se())
                  }, null, 8, ["disabled", "size", "loading"]), [
                    [
                      $,
                      o(n)("Print"),
                      void 0,
                      { top: !0 }
                    ]
                  ])
                ], 64)) : v("", !0),
                e.hasRefreshButton ? E((r(), h(o(z), {
                  key: 6,
                  severity: "info",
                  size: e.toolbarButtonsSize ?? p.value,
                  loading: k.value,
                  type: "button",
                  icon: "i-fluent:arrow-counterclockwise-12-regular",
                  outlined: "",
                  onClick: t[14] || (t[14] = (a) => U())
                }, null, 8, ["size", "loading"])), [
                  [
                    $,
                    o(n)("Refresh"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                m(l.$slots, "buttonsEnd")
              ])
            ]),
            ye.value ? (r(), F("div", eo, [
              B("div", to, [
                e.fixedToolbarFilters ? (r(), h(Tt, {
                  key: 0,
                  filters: { operator: "and", fields: e.fixedToolbarFilters },
                  "is-printing": !0,
                  "hide-operator": !0,
                  columns: T.value,
                  operator: P.value.operator,
                  onFiltersChanged: ke
                }, null, 8, ["filters", "columns", "operator"])) : v("", !0),
                e.fixedToolbarFilters && e.fixedToolbarFilters.length && ot.value ? (r(), h(x, { key: 1 })) : v("", !0),
                C(Tt, {
                  ref_key: "toolbarFiltersWrapperRef",
                  ref: lt,
                  filters: P.value,
                  "onUpdate:filters": t[15] || (t[15] = (a) => P.value = a),
                  "hide-operator": !0,
                  columns: T.value,
                  operator: P.value.operator,
                  onFiltersChanged: ke
                }, null, 8, ["filters", "columns", "operator"])
              ])
            ])) : v("", !0)
          ])
        ], 512),
        C(o(Ca), {
          ref_key: "datatableRef",
          ref: Ht,
          "context-menu-selection": b.value,
          "onUpdate:contextMenuSelection": t[18] || (t[18] = (a) => b.value = a),
          filters: D.value,
          "onUpdate:filters": t[19] || (t[19] = (a) => D.value = a),
          selection: qe.value,
          "onUpdate:selection": t[20] || (t[20] = (a) => qe.value = a),
          rows: R.value,
          "onUpdate:rows": t[21] || (t[21] = (a) => R.value = a),
          "expanded-rows": H.value,
          "onUpdate:expandedRows": t[22] || (t[22] = (a) => H.value = a),
          "multi-sort-meta": ne.value,
          "onUpdate:multiSortMeta": t[23] || (t[23] = (a) => ne.value = a),
          "sort-field": re.value,
          "onUpdate:sortField": t[24] || (t[24] = (a) => re.value = a),
          "sort-order": Fe.value,
          "onUpdate:sortOrder": t[25] || (t[25] = (a) => Fe.value = a),
          style: Ae({ height: Jl.value }),
          size: p.value,
          "show-gridlines": e.showGridLines,
          "show-headers": "",
          "highlight-on-select": "",
          "edit-mode": e.editable ? e.inlineEditMode : "none",
          "context-menu": e.withContextMenu,
          value: w.value,
          "row-group-mode": e.rowGroupMode,
          "group-rows-by": e.groupRowsBy,
          "virtual-scroller-options": bl.value,
          lazy: !0,
          scrollable: e.scrollable,
          "scroll-height": e.scrollHeight,
          "scroll-direction": e.scrollDirection,
          "data-key": e.primaryKey || void 0,
          paginator: e.hasPagination,
          "paginator-position": "top",
          "total-records": q.value,
          loading: e.withLoadingMask && k.value,
          "filter-display": Vt.value,
          "global-filter-fields": nt.value,
          "row-class": (a) => [
            e.isActiveRow && e.isActiveRow(a) ? "active-row" : "",
            e.rowClass ? e.rowClass(a) : "",
            { "row-open-cursor": xl.value }
          ],
          "row-hover": e.rowHover,
          class: ee([{ "compact-table": e.isCompact }, ql.value]),
          "select-all": M.value,
          "removable-sort": e.removableSort,
          "sort-mode": be.value,
          pt: {
            table: {
              "data-name": e.name
            }
          },
          onSelectAllChange: jt,
          onRowSelect: Gt,
          onRowUnselect: Yt,
          onRowSelectAll: Wt,
          onRowUnselectAll: Jt,
          onPage: ul,
          onSort: Zt,
          onFilter: ol,
          onRowExpand: $l,
          onRowCollapse: El,
          onRowReorder: Al,
          onRowContextmenu: t[26] || (t[26] = (a) => e.withContextMenu ? Ml(a) : void 0),
          onRowClick: kl,
          onRowDblclick: Rl,
          onCellEditComplete: jl
        }, Ee({
          paginatorstart: c(() => [
            B("div", lo, [
              B("span", null, [
                _e.value ? (r(), F(A, { key: 0 }, [
                  Oe(I(o(n)("Showing start To end From filtered (Filtered From total)", {
                    start: he.value,
                    end: Ce.value,
                    total: ge.value,
                    filtered: q.value
                  })), 1)
                ], 64)) : (r(), F(A, { key: 1 }, [
                  Oe(I(o(n)("Showing start To end From total", {
                    start: he.value,
                    end: Ce.value,
                    total: ge.value
                  })), 1)
                ], 64))
              ]),
              d.value.length ? (r(), F("span", ao, I(o(n)("(n Records selected)", { n: d.value.length }, d.value.length)), 1)) : v("", !0)
            ])
          ]),
          paginatorend: c(() => [
            B("div", oo, [
              B("span", null, I(o(n)("Show")), 1),
              C(Ql, {
                modelValue: R.value,
                "onUpdate:modelValue": t[16] || (t[16] = (a) => R.value = a),
                size: "small",
                options: dl.value,
                "scroll-height": "360px",
                "option-label": "label",
                "option-value": "value",
                onChange: t[17] || (t[17] = (a) => sl())
              }, null, 8, ["modelValue", "options"]),
              R.value !== -1 ? (r(), F("span", io, I(o(n)("Entries")), 1)) : v("", !0)
            ])
          ]),
          empty: c(() => [
            m(l.$slots, "empty", { record: w.value }, () => [
              e.noEmptyMessage ? v("", !0) : (r(), F("div", ro, I(o(n)("No Records")), 1))
            ])
          ]),
          expansion: c(({ data: a }) => [
            m(l.$slots, "expansion", { row: a })
          ]),
          default: c(() => [
            e.noBody ? v("", !0) : (r(), F(A, { key: 0 }, [
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
                frozen: e.frozenSelectionColumn ?? o(ce)(T.value[0]?.frozen)
              }, null, 8, ["selection-mode", "frozen"])) : v("", !0),
              e.hasSequenceColumn ? (r(), h(o(Q), te({
                key: 3,
                header: "#",
                style: { width: "3rem" }
              }, e.sequenceColumnProps), {
                body: c(({ index: a }) => [
                  Oe(I(a + 1), 1)
                ]),
                loading: c(() => [
                  B("div", {
                    class: "flex items-center",
                    style: Ae({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(gt, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 1
              }, 16)) : v("", !0),
              (r(!0), F(A, null, Y(T.value, (a) => (r(), h(o(Q), {
                key: a.name,
                field: a.fullFieldName,
                header: o(He)(a, o(n)),
                "sort-field": a.sortField ?? a.fullFieldName,
                "filter-field": a.filterField ?? a.fullFieldName,
                "data-type": a.type ?? "text",
                sortable: a.sortable ?? Qe.value,
                "show-filter-operator": o(Oa)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-filter-match-modes": o(Aa)(a) && (a.showFilterMatchModes ?? e.defaultShowFilterMatchModes),
                "max-constraints": Number.POSITIVE_INFINITY,
                "show-add-button": o(Ea)(a) && (a.multipleFilters ?? e.defaultColumnMultipleFilters),
                "show-apply-button": o(Mt)(a) && (a.showFilterApplyButton ?? e.defaultColumnShowFilterAddButton),
                "show-clear-button": o(Mt)(a) && (a.showFilterClearButton ?? e.defaultColumnShowFilterClearButton),
                "filter-match-mode": a.initialFilterMatchMode ?? Se(a.type),
                "filter-match-mode-options": _t.value[a.type ?? "text"],
                "body-class": (a.bodyClass ?? "") + (a.inlineEditable && e.inlineEditMode === "cell" && e.editable ? " editing-cursor" : ""),
                "body-style": a.bodyStyle,
                "header-class": a.headerClass,
                "header-style": a.headerStyle,
                hidden: !o(dt)(a),
                frozen: o(ce)(a.frozen),
                "align-frozen": o(kt)(a.frozen),
                pt: {
                  pcSortBadge: {
                    root: Ot.value ? "!hidden" : ""
                  }
                }
              }, Ee({
                body: c(({ data: u }) => [
                  m(l.$slots, `${o(zt)(a)}ColumnBody`, {
                    value: we(u, a),
                    row: u
                  }, () => [
                    C(Da, {
                      column: a,
                      "rendered-data": we(u, a),
                      row: u,
                      size: p.value,
                      class: ee({ "cell-has-edit-history": a.auditHistory }),
                      onContextmenu: (K) => Gl(K, a, u)
                    }, null, 8, ["column", "rendered-data", "row", "size", "class", "onContextmenu"])
                  ])
                ]),
                _: 2
              }, [
                a.inlineEditable ? {
                  name: "editor",
                  fn: c(({ data: u, field: K, editorSaveCallback: ht, editorCancelCallback: _l }) => [
                    C(Pa, {
                      row: u,
                      "field-name": K ?? "text",
                      type: a.type,
                      field: o(Ra)(e.fields, ["name", a.fullFieldName]),
                      column: a,
                      size: p.value,
                      "submit-callback": ht,
                      "cancel-callback": _l
                    }, null, 8, ["row", "field-name", "type", "field", "column", "size", "submit-callback", "cancel-callback"])
                  ]),
                  key: "0"
                } : void 0,
                a.footer ? {
                  name: "footer",
                  fn: c(() => [
                    B("span", {
                      innerHTML: typeof a.footer == "string" ? a.footer : a.footer(w.value)
                    }, null, 8, uo)
                  ]),
                  key: "1"
                } : void 0,
                e.showOnlySortedIcon ? {
                  name: "sorticon",
                  fn: c((u) => [
                    u.sorted ? (r(), F(A, { key: 0 }, [
                      u.sortOrder === 1 ? (r(), F("i", {
                        key: 0,
                        title: o(n)("Ascending"),
                        class: "i-mdi:sort-ascending scale-y-[-1]"
                      }, null, 8, so)) : (r(), F("i", {
                        key: 1,
                        title: o(n)("Descending"),
                        class: "i-mdi:sort-descending scale-y-[-1]"
                      }, null, 8, fo))
                    ], 64)) : v("", !0)
                  ]),
                  key: "2"
                } : void 0,
                a.cellHeadFilterable ?? a.filterable ?? Ze.value ? {
                  name: "filter",
                  fn: c(({ filterModel: u, filterCallback: K }) => [
                    m(l.$slots, `${o(zt)(a)}ColumnFilter`, {
                      item: { filterModel: u, filterCallback: K }
                    }, () => [
                      C(Xl, {
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
                "align-frozen": o(kt)("end"),
                frozen: e.frozenToolsColumn
              }, e.toolsColumnProps), {
                header: c(() => [...t[27] || (t[27] = [
                  B("i", { class: "i-mdi-tools mx-auto" }, null, -1)
                ])]),
                body: c((a) => [
                  B("div", co, [
                    m(l.$slots, "toolsColumnExtraStartButton", {
                      row: a.data,
                      isLoading: k.value
                    }),
                    e.openable ? E((r(), h(o(z), {
                      key: 0,
                      severity: "info",
                      as: e.openButtonUrl ? "a" : void 0,
                      href: e.openButtonUrl ? e.openButtonUrl(a.data) : void 0,
                      disabled: W.value.includes(a.data[e.primaryKey]),
                      size: e.toolButtonsSize ?? p.value,
                      class: "rounded-md p-2",
                      label: e.openButtonLabel,
                      icon: e.openButtonIcon ?? "i-material-symbols:open-jam-outline-rounded",
                      onClick: (u) => S("rowOpen", a.data)
                    }, null, 8, ["as", "href", "disabled", "size", "label", "icon", "onClick"])), [
                      [
                        $,
                        e.openButtonTitle ?? o(n)("Open"),
                        void 0,
                        { danger: !0 }
                      ]
                    ]) : v("", !0),
                    e.printableRows === !0 || typeof e.printableRows == "function" && e.printableRows(a.data) ? E((r(), h(o(z), {
                      key: 1,
                      severity: "success",
                      size: e.toolButtonsSize ?? p.value,
                      disabled: W.value.includes(a.data[e.primaryKey]),
                      class: "rounded-md p-2",
                      icon: "i-mdi-printer",
                      onClick: (u) => S("rowPrint", a.data)
                    }, null, 8, ["size", "disabled", "onClick"])), [
                      [
                        $,
                        o(n)("Print"),
                        void 0,
                        { success: !0 }
                      ]
                    ]) : v("", !0),
                    e.editable && (!e.rowEditable || e.rowEditable(a.data)) ? E((r(), h(o(z), {
                      key: 2,
                      disabled: k.value || W.value.includes(a.data[e.primaryKey]),
                      severity: "success",
                      size: e.toolButtonsSize ?? p.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-edit",
                      onClick: (u) => De(a.data)
                    }, null, 8, ["disabled", "size", "onClick"])), [
                      [$, o(n)("Edit")]
                    ]) : v("", !0),
                    e.deletable && (!e.rowDeletable || e.rowDeletable(a.data)) ? E((r(), h(o(z), {
                      key: 3,
                      severity: "danger",
                      loading: W.value.includes(a.data[e.primaryKey]),
                      disabled: k.value,
                      size: e.toolButtonsSize ?? p.value,
                      class: "rounded-md p-2",
                      icon: "i-mdi-trash",
                      onClick: (u) => Te(a.data)
                    }, null, 8, ["loading", "disabled", "size", "onClick"])), [
                      [
                        $,
                        o(n)("Remove"),
                        void 0,
                        { danger: !0 }
                      ]
                    ]) : v("", !0),
                    e.extraToolAndContextButtons?.length ? (r(!0), F(A, { key: 4 }, Y(e.extraToolAndContextButtons, (u, K) => E((r(), h(o(z), {
                      key: K,
                      loading: k.value,
                      hidden: !(u.visible === !0 || u.visible === !1 ? u.visible : u.visible?.(a.data) ?? !0),
                      size: e.toolButtonsSize ?? p.value,
                      label: u.onlyIconButton === !0 ? void 0 : o(ce)(u.label) ? u.label : u.label(a.data),
                      severity: u.severity,
                      badge: o(fe)(u.badge) ? u.badge(a.data) : u.badge,
                      "badge-severity": o(fe)(u.badgeSeverity) ? u.badgeSeverity(a.data) : u.badgeSeverity,
                      icon: typeof u.icon == "function" ? u.icon(a.data) : u.icon,
                      onClick: (ht) => u.command?.(a.data)
                    }, null, 8, ["loading", "hidden", "size", "label", "severity", "badge", "badge-severity", "icon", "onClick"])), [
                      [$, o(ce)(u.label) ? u.label : u.label(a.data)]
                    ])), 128)) : v("", !0),
                    m(l.$slots, "toolsColumnExtraButton", {
                      row: a.data,
                      isLoading: k.value
                    })
                  ])
                ]),
                loading: c(() => [
                  B("div", {
                    class: "flex items-center",
                    style: Ae({ height: e.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
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
                }, null, 10, no)) : v("", !0)
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
        e.withDataView ? (r(), h(Zl, {
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
      ], 10, qa);
    };
  }
});
export {
  Qo as default
};
