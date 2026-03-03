import Bt from "primevue/skeleton";
import Pt from "primevue/select";
import Mt from "primevue/popover";
import Vt from "primevue/checkbox";
import At from "primevue/iconfield";
import Nt from "primevue/inputicon";
import { defineComponent as Et, useModel as ne, ref as m, computed as x, onBeforeMount as Ot, onMounted as It, watch as $t, openBlock as s, createElementBlock as f, createElementVNode as c, renderSlot as V, toDisplayString as k, normalizeClass as se, createCommentVNode as v, Fragment as w, renderList as W, unref as o, createTextVNode as Q, createVNode as C, mergeProps as ue, withCtx as h, createBlock as b, normalizeStyle as de, createSlots as zt, withDirectives as I, withKeys as fe, mergeModels as $e, nextTick as Dt } from "vue";
import P from "primevue/button";
import j from "primevue/column";
import Lt from "primevue/contextmenu";
import Tt from "primevue/datatable";
import ce from "primevue/inputtext";
import $ from "primevue/tooltip";
import { map as Ht, filter as Ut, reduce as ze, cloneDeep as qt, debounce as Kt, get as z, isBoolean as D, upperFirst as Wt, unset as jt } from "lodash-es";
import De from "moment";
import Yt from "primevue/datepicker";
import { useConfirm as Gt } from "primevue/useconfirm";
import { useToast as Jt } from "primevue/usetoast";
import Qt from "HddUiHelpers/utils/usePrimeVueServerUi";
import { printDomWithStyles as Xt } from "HddUiHelpers/utils/printDom";
import Zt from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { _ as _t } from "./MultiSelectColumnFilter.vue_vue_type_script_setup_true_lang-BlIq4xPB.js";
import { _ as el } from "./SelectColumnFilter.vue_vue_type_script_setup_true_lang-H1WVc5Dy.js";
import { FilterMatchMode as we } from "./components/primeVueServerTable/types.js";
const tl = { class: "p-server-datatable-container max-w-full px-4" }, ll = { class: "hidden" }, al = { class: "my-2 text-center text-xl font-bold" }, ol = ["dir"], rl = { class: "printable-table mx-auto mt-3" }, il = { key: 0 }, nl = { key: 0 }, sl = ["innerHTML"], ul = { class: "my-2 text-xl font-bold" }, dl = { class: "flex w-full items-end" }, fl = {
  key: 0,
  class: "justify-content-between flex flex-1 gap-1"
}, cl = { class: "flex flex-1 justify-end gap-1" }, vl = ["for"], pl = { class: "flex w-full justify-end gap-1 text-sm" }, ml = { key: 0 }, yl = { class: "flex items-center gap-1 text-sm" }, bl = { key: 0 }, hl = { class: "text-secondary-1 text-center text-sm italic" }, gl = {
  key: 0,
  class: "flex justify-end"
}, wl = ["innerHTML"], Cl = { class: "flex flex-wrap items-center gap-1" }, jl = /* @__PURE__ */ Et({
  __name: "PrimeVueServerTable",
  props: /* @__PURE__ */ $e({
    url: {},
    tableTitle: {},
    tableName: {},
    routeName: {},
    includes: {},
    infiniteScroll: { type: Boolean, default: !1 },
    itemSize: { default: 46 },
    scrollHeight: { default: "flex" },
    createRecordHeader: {},
    rowClass: {},
    isActiveRow: {},
    editRecordHeader: {},
    expandOnRowClick: { type: Boolean },
    hasRefreshButton: { type: Boolean, default: !0 },
    hasContextMenu: { type: Boolean, default: !0 },
    frozenToolsColumn: { type: Boolean },
    hasGlobalFilter: { type: Boolean, default: !0 },
    keepFormOpenAfterCreate: { type: Boolean },
    refreshAfterFormSubmit: { type: Boolean, default: !0 },
    hasReorderColumn: { type: Boolean },
    hasSequenceColumn: { type: Boolean },
    sequenceColumnProps: {},
    hasExpanderColumn: { type: Boolean },
    dataKeyId: { default: "id" },
    deleteMultiSameDeleteSingleRoute: { type: Boolean },
    fields: {},
    customService: {},
    defaultMatchMode: { default: we.CONTAINS },
    defaultDateMatchMode: { default: we.DATE_IS },
    defaultNumericMatchMode: { default: we.EQUALS },
    autoI18nColumnsHeader: { type: Boolean, default: !0 },
    sortMode: { default: "multiple" },
    toolsColumn: { type: Boolean, default: !0 },
    toolsColumnProps: {},
    columnVisibilityButton: { type: Boolean },
    deletable: { type: Boolean },
    deleteConfirmationAsPopup: { type: Boolean, default: !0 },
    editable: { type: Boolean },
    multiEditable: { type: Boolean },
    creatable: { type: Boolean },
    createButtonLabel: {},
    printDirection: {},
    compact: { type: Boolean },
    openable: { type: Boolean },
    printable: { type: Boolean },
    printAllRows: { type: Boolean },
    selectable: { type: Boolean },
    showGridLines: { type: Boolean, default: !0 },
    withPaginator: { type: Boolean, default: !0 },
    formDialogProps: {},
    showLoadingIndication: { type: Boolean, default: !0 },
    scrollable: { type: Boolean, default: !0 },
    rowHover: { type: Boolean, default: !0 },
    enableColumnFilters: { type: Boolean, default: !0 },
    enableColumnSorting: { type: Boolean, default: !0 },
    enableFilterMatchModes: { type: Boolean, default: !0 },
    enableFilterAddButton: { type: Boolean, default: !0 },
    enableFilterApplyButton: { type: Boolean, default: !0 },
    useFormForEdit: { type: Boolean },
    enableFilterClearButton: { type: Boolean, default: !0 },
    fixedFilters: {},
    groupedFilters: {},
    extraContextMenuOptions: {},
    columns: { default: () => [] },
    onRowClick: {}
  }, {
    rowsPerPage: { default: 25, required: !1 },
    rowsPerPageModifiers: {},
    sorts: {
      default: () => [],
      required: !1
    },
    sortsModifiers: {},
    isCollapsed: { type: Boolean, default: !1 },
    isCollapsedModifiers: {},
    records: { default: () => [] },
    recordsModifiers: {}
  }),
  emits: /* @__PURE__ */ $e(["rowClick", "rowOpen", "rowEdit", "multiRowsEdit", "rowCreated", "rowUpdated", "rowDeleted", "rowChanged", "refreshed", "rowExpand", "rowCollapse", "rowReorder"], ["update:rowsPerPage", "update:sorts", "update:isCollapsed", "update:records"]),
  setup(r, { expose: Le, emit: Te }) {
    const a = r, R = Te, {
      axios: ve,
      routeNameResolver: pe,
      t: i,
      dataTableRecordsService: U
    } = Qt();
    function He(e) {
      return e?.operator !== void 0;
    }
    const F = ne(r, "rowsPerPage"), Y = ne(r, "sorts"), Ue = ne(r, "isCollapsed"), X = m(), Z = {
      async getRecords(e) {
        if (a.customService?.getRecords)
          return await a.customService.getRecords(e, {
            url: a.url,
            routeName: a.routeName
          });
        if (U?.getRecords)
          return await U.getRecords(e, {
            url: a.url,
            routeName: a.routeName
          });
        let t;
        if (a.url) t = a.url;
        else if (a.routeName) t = pe(a.routeName);
        else return Promise.reject(new Error("Invalid Url or Route Name"));
        return X.value = new AbortController(), (await ve.get(t, {
          params: e,
          signal: X.value.signal
        })).data;
      },
      async deleteRecord(e) {
        if (a.customService?.deleteRecord)
          return await a.customService.deleteRecord(e, {
            url: a.url,
            routeName: a.routeName
          });
        if (U?.deleteRecord)
          return await U.deleteRecord(e, {
            url: a.url,
            routeName: a.routeName
          });
        let t;
        if (a.url) t = `${a.url}/${e}`;
        else if (a.routeName) t = pe(a.routeName, e);
        else return Promise.reject(new Error("Invalid Url or Route Name"));
        return (await ve.delete(t)).data;
      },
      async deleteRecordsMulti(e) {
        if (a.customService?.deleteRecordsMulti)
          return await a.customService.deleteRecordsMulti(e, {
            url: a.url,
            routeName: a.routeName
          });
        if (U?.deleteRecordsMulti)
          return await U.deleteRecordsMulti(e, {
            url: a.url,
            routeName: a.routeName
          });
        let t;
        const n = e[0] || 0;
        if (a.url)
          a.deleteMultiSameDeleteSingleRoute ? t = `${a.url}/${n}` : t = a.url;
        else if (a.routeName)
          t = pe(a.routeName, n);
        else
          return Promise.reject(new Error("Invalid Url or Route Name"));
        return (await ve.delete(t, { params: { ids: e } })).data;
      }
    }, A = m({ global: { value: null, matchMode: "contains" } }), _ = Jt(), qe = Gt(), Ke = m(), N = m(!1), B = m(0), ee = m(0), E = ne(r, "records"), p = m([]), q = m({}), S = m(!1), O = m(0), Ce = m(), M = m(), We = x(() => i("dir") === "rtl" ? "right" : "left"), xe = x(() => {
      for (const e in A.value) {
        if (a.fixedFilters?.[e])
          continue;
        const t = A.value[e];
        if (He(t)) {
          if (t.constraints?.findIndex((u) => u.value) > -1) return !0;
        } else if (t?.value) return !0;
      }
      return !1;
    }), je = x(() => {
      const e = [5, 10, 25, 50, 100, 500];
      return !e.includes(F.value) && F.value !== -1 && e.push(F.value), [...e.map((t) => ({ value: t, label: t })), { value: -1, label: i("All") }];
    }), ke = x(() => Ht(
      Ut(
        a.columns,
        (e) => e.global !== !1 && (e.filterable !== !1 || e.global === !0)
      ),
      (e) => e.filterField ?? e.name
    )), Ye = x(() => ze(
      a.columns,
      (e, t) => {
        if (!t.name) return e;
        const n = {
          name: t.name,
          filterField: t.filterField ?? t.name,
          sortField: t.sortField ?? t.name,
          source: t.source || "main"
        };
        return e.push(n), e;
      },
      []
    )), me = x(() => ({
      first: O.value,
      perPage: F.value,
      sorts: Y.value,
      filters: A.value,
      fixedFilters: a.fixedFilters,
      globalFilters: ke.value,
      groupedFilters: a.groupedFilters,
      fields: Ye.value,
      includes: a.includes ?? []
    })), Re = x(() => F.value === -1 ? Math.min(1, B.value) : Math.min(O.value + 1, B.value)), Fe = x(() => F.value === -1 ? B.value : Math.min(O.value + F.value, B.value)), Ge = x(() => {
      const e = [];
      return a.openable && e.push({
        label: i("Open"),
        icon: "i-mdi-open-in-app",
        command: () => M.value ? R("rowOpen", M.value) : void 0
      }), a.editable && e.push({
        label: i("Edit"),
        icon: "i-mdi-edit",
        command: () => M.value ? ye(M.value) : void 0
      }), a.deletable && e.push({
        label: i("Delete"),
        icon: "i-mdi-trash",
        command: () => M.value ? be(M.value) : void 0
      }), a.extraContextMenuOptions?.length > 0 && e.push(
        ...qt(a.extraContextMenuOptions).map((t) => (t.command && (t.command2 = t.command, t.command = () => t.command2(M.value)), typeof t.labelFn == "function" && (t.label = t.labelFn(M.value)), t))
      ), e;
    }), Je = x(() => ({
      text: [
        { label: i("startsWith"), value: "startsWith" },
        { label: i("contains"), value: "contains" },
        { label: i("containsAll"), value: "containsAll" },
        { label: i("notContains"), value: "notContains" },
        { label: i("endsWith"), value: "endsWith" },
        { label: i("equals"), value: "equals" },
        { label: i("notEquals"), value: "notEquals" }
      ],
      numeric: [
        { label: i("equals"), value: "equals" },
        { label: i("notEquals"), value: "notEquals" },
        { label: i("lt"), value: "lt" },
        { label: i("lte"), value: "lte" },
        { label: i("gt"), value: "gt" },
        { label: i("gte"), value: "gte" }
      ],
      date: [
        { label: i("dateIs"), value: "dateIs" },
        { label: i("dateIsNot"), value: "dateIsNot" },
        { label: i("dateBefore"), value: "dateBefore" },
        { label: i("dateAfter"), value: "dateAfter" }
      ]
    }));
    function Se() {
      return ze(
        a.columns,
        (e, t) => {
          let n;
          if (t.filterMatchMode)
            n = t.filterMatchMode;
          else
            switch (t.type) {
              case "date":
                n = a.defaultDateMatchMode;
                break;
              case "numeric":
                n = a.defaultNumericMatchMode;
                break;
              default:
                n = a.defaultMatchMode;
            }
          return e[t.filterField ?? t.name] = {
            operator: "and",
            constraints: [{ value: null, matchMode: n }]
          }, e;
        },
        {
          global: {
            value: "",
            matchMode: "contains"
          }
        }
      );
    }
    async function Be() {
      A.value = Se(), await L();
    }
    const Qe = Kt(() => {
      L();
    }, 500);
    async function L() {
      N.value = !0, a.url || a.routeName ? await Z.getRecords(me.value).then((e) => {
        if (e.success)
          E.value = e.data.data, B.value = e.data.total, ee.value = e.data.total_without_filters, R("refreshed", e);
        else
          throw new Error(`Unable to get records from ${a.url}`);
      }).catch((e) => {
        console.error(e);
        const t = e.response?.data?.message || i("Error Occurred");
        _.add({
          severity: "error",
          summary: t,
          life: 3e3,
          group: "notifications"
        });
      }).finally(() => {
        N.value = !1;
      }) : N.value = !1;
    }
    async function Pe(e) {
      if (a.url || a.routeName)
        try {
          const t = await Z.getRecords({
            ...me.value,
            perPage: e ?? me.value.perPage
          });
          if (t.success)
            return t.data;
        } catch (t) {
          if (t.code === "ERR_CANCELED")
            console.log("Cancelled");
          else {
            console.error(t);
            const n = t.response?.data?.message || i("Error Occurred");
            _.add({
              severity: "error",
              summary: n,
              life: 3e3,
              group: "notifications"
            });
          }
        }
      return !1;
    }
    async function Xe(e) {
      O.value = e.first, await L(), S.value = p.value.length === B.value && p.value.length !== 0;
    }
    async function Ze(e) {
      a.sortMode === "multiple" && e.multiSortMeta ? Y.value = e.multiSortMeta : Y.value = [
        { field: typeof e.sortField == "string" ? e.sortField : "", order: e.sortOrder }
      ], await L(), S.value = p.value.length === B.value && p.value.length !== 0;
    }
    async function _e() {
      await L();
    }
    function et(e) {
      E.value.length === 0 && (S.value = !1, p.value = []), S.value = e.checked, S.value ? p.value = E.value : p.value = [];
    }
    function tt(e) {
      Ce.value.show(e.originalEvent);
    }
    function lt() {
      S.value = p.value.length === B.value && p.value.length !== 0;
    }
    function at() {
      S.value = !1;
    }
    function ye(e) {
      R("rowEdit", e), (a.useFormForEdit || a.fields?.length > 0) && he(e);
    }
    function ot(e) {
      R("multiRowsEdit", e), (a.useFormForEdit || a.fields?.length > 0) && he(e);
    }
    function rt(e) {
      e.length === 1 ? ye(e[0]) : ot(e);
    }
    function be(e) {
      if (!e) return;
      let t = 1;
      Array.isArray(e) && (t = e.length), qe.require({
        message: i("Are you sure to delete n records?", { n: t }, t),
        header: i("Confirmation"),
        icon: "pi pi-info-circle",
        group: t === 1 ? "popup" : "dialog",
        rejectLabel: i("Cancel"),
        acceptLabel: i("Delete"),
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
          const n = Array.isArray(e) ? e.map((u) => u.id) : [e.id];
          try {
            a.url && (Array.isArray(e) ? await Z.deleteRecordsMulti(n) : await Z.deleteRecord(e.id)), _.add({
              severity: "success",
              summary: i("Deleted!"),
              detail: i("n Record Deleted Successfully", { n: t }, t),
              life: 3e3
            }), R("rowDeleted", Array.isArray(e) ? n : e.id), R("rowChanged", Array.isArray(e) ? n : e.id, "delete"), p.value = p.value.filter((u) => !n.includes(u.id)), te();
          } catch (u) {
            const K = u?.response?.data?.message || i("Error Occurred");
            _.add({
              severity: "error",
              summary: K,
              life: 3e3,
              group: "notifications"
            });
          }
        }
      });
    }
    async function it() {
      O.value = 0, await L();
    }
    function te() {
      a.infiniteScroll ? Ie({ first: O.value, last: F.value }) : L();
    }
    const G = m(!1), Me = m(), le = m(!1);
    async function nt() {
      if (a.printAllRows === !0) {
        le.value = [], G.value = !0;
        const t = await Pe(-1);
        le.value = t.data;
      } else
        G.value = !0, le.value = !1;
      await Dt();
      const e = Me.value;
      await Xt(e), G.value = !1;
    }
    function st(e) {
      return { onKeydown: (t) => t.key === "Enter" ? e() : null };
    }
    const ut = x(() => !!a.onRowClick);
    Ot(() => {
      A.value = Se();
    }), It(() => {
      kt(), a.infiniteScroll ? E.value = void 0 : L();
    });
    const J = m(), Ve = m({}), Ae = m([]), dt = x(() => ({
      url: a.url,
      fields: a.fields ?? [],
      keepFormOpenAfterCreate: a.keepFormOpenAfterCreate,
      onSubmitted: ft,
      createRecordHeader: a.createRecordHeader,
      editRecordHeader: a.editRecordHeader,
      ...a.formDialogProps ?? {}
    }));
    function Ne() {
      J.value?.create();
    }
    function he(e) {
      Array.isArray(e) ? J.value?.editMulti(e) : J.value?.edit(e);
    }
    function ft(e, t) {
      R(e === "create" ? "rowCreated" : "rowUpdated", t), R("rowChanged", t, e), a.refreshAfterFormSubmit && te();
    }
    function ct(e) {
      if (!window.getSelection()?.isCollapsed)
        return;
      const t = e.originalEvent.composedPath(), n = t.find((H) => H.classList?.contains("p-datatable-row-toggle-button")), u = t.find((H) => H.classList?.contains("p-editable-column")), K = t.find((H) => H.classList?.contains("p-selection-column"));
      n || u || K || (R("rowClick", e.data, e.index, e.originalEvent), a.expandOnRowClick && ht(e.data));
    }
    const vt = x(() => {
      const e = {};
      return a.columns.forEach((t) => {
        t.type === "select" && (t.selectOptionsKeyed ? e[t.name] = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? e[t.name] = t.selectOptions.reduce((n, u) => (n[u[t.selectValueProperty ?? "id"]] = u[t.selectLabelProperty ?? "name"], n), {}) : e[t.name] = t.selectOptions.object));
      }), e;
    });
    function pt() {
      S.value ? (p.value = [], S.value = !1) : (p.value = E.value, S.value = p.value.length !== 0);
    }
    function mt(e) {
      return q.value ? q.value[e[a.dataKeyId]] : !1;
    }
    function yt(e) {
      q.value[e[a.dataKeyId]] = !0;
    }
    function bt(e) {
      jt(q.value, e[a.dataKeyId]);
    }
    function ht(e) {
      mt(e) ? bt(e) : yt(e);
    }
    function gt(e) {
      R("rowExpand", e.data);
    }
    function wt(e) {
      R("rowCollapse", e.data);
    }
    function Ct(e) {
      R("rowReorder", e);
    }
    function ae(e, t) {
      let n = e.name;
      if (typeof e.formatter == "string" && (n = e.formatter), typeof e.formatter == "function")
        return e.formatter(z(t, n), t);
      if (e.type === "select") {
        let u = vt.value[n]?.[z(t, n)] || z(t, n);
        return !u && e.emptyValuePlaceholder && (e.html ? u = `<span class="italic text-muted">${e.emptyValuePlaceholder}</span>` : u = e.emptyValuePlaceholder), u;
      }
      if (e.type === "boolean") {
        const u = z(t, n);
        return u === !0 ? i("Yes") : u === !1 ? i("No") : "";
      }
      return z(t, e.name);
    }
    const xt = x(() => J.value?.form), T = m([]), Ee = m();
    function kt() {
      let e = [], t = [];
      try {
        e = JSON.parse(
          localStorage.getItem(
            "PrimeVueTableHiddenColumns_" + a.tableName || a.routeName || a.url
          ) || "[]"
        );
      } catch {
      }
      try {
        t = JSON.parse(
          localStorage.getItem(
            "PrimeVueTableVisibleColumns_" + a.tableName || a.routeName || a.url
          ) || "[]"
        );
      } catch {
      }
      T.value = a.columns.filter(
        (n) => t.indexOf(n.name) > -1 || n.visible !== !1 && e.indexOf(n.name) < 0
      ).map((n) => n.name);
    }
    function Rt() {
      const t = a.columns.filter((u) => u.visibilityControl !== !1).map((u) => u.name).filter((u) => T.value.indexOf(u) < 0), n = a.columns.filter(
        (u) => u.visibilityControl !== !1 && u.visible === !1 && T.value.indexOf(u.field) > -1
      ).map((u) => u.name);
      localStorage.setItem(
        "PrimeVueTableHiddenColumns_" + a.tableName || a.routeName || a.url,
        JSON.stringify(t)
      ), localStorage.setItem(
        "PrimeVueTableVisibleColumns_" + a.tableName || a.routeName || a.url,
        JSON.stringify(n)
      );
    }
    const Oe = m();
    $t(
      () => a.itemSize,
      (e) => {
        Oe.value = e;
      },
      {
        immediate: !0
      }
    );
    const oe = m(!1), Ft = x(() => {
      if (a.infiniteScroll)
        return {
          itemSize: Oe.value,
          delay: 50,
          lazy: !0,
          showLoader: !0,
          autoSize: !0,
          loading: oe.value,
          onLazyLoad: Ie
        };
    });
    async function Ie(e) {
      oe.value || (oe.value = !0), O.value = e.first, F.value = e.last, X.value && X.value.abort();
      const t = await Pe(e.last);
      if (t) {
        const n = Array.from({ length: t.total });
        B.value = t.total, ee.value = t.total_without_filters, Array.prototype.splice.apply(n, [
          e.first,
          e.last - e.first,
          ...t.data
        ]), E.value = n;
      }
      oe.value = !1;
    }
    function re(e) {
      return e.type !== "hidden" && !(e.visibilityControl !== !1 ? T.value.indexOf(e.name) < 0 : D(e.visible) && !e.visible);
    }
    return x(() => {
      let e = 0;
      a.hasSequenceColumn && e++, a.hasReorderColumn && e++, a.selectable && e++, a.columns.forEach((n) => {
        re(n) && (n.widthPoint !== void 0 ? e += n.widthPoint : e += 2);
      }), console.log(e);
      const t = {
        _sequence: 1 / e * 100,
        _selectable: 1 / e * 100,
        _reorder: 1 / e * 100
      };
      return a.columns.forEach((n) => {
        re(n) && (t[n.name] = (n.widthPoint ?? 2) / e * 100);
      }), t;
    }), Le({ refresh: te, showCreateDialog: Ne, showEditDialog: he, formModel: xt }), (e, t) => {
      const n = Nt, u = At, K = Vt, H = Mt, St = Pt, ie = Bt;
      return s(), f("div", tl, [
        c("div", ll, [
          G.value ? (s(), f("div", {
            key: 0,
            ref_key: "printNodeRef",
            ref: Me,
            class: "bg-white text-black"
          }, [
            V(e.$slots, "printPageHeader", {}, () => [
              c("div", al, k(r.tableTitle), 1)
            ]),
            c("div", {
              dir: r.printDirection,
              class: se({
                "ltr text-left": r.printDirection === "ltr",
                "rtl text-right": r.printDirection === "rtl"
              })
            }, [
              c("table", rl, [
                c("thead", null, [
                  c("tr", null, [
                    r.hasSequenceColumn ? (s(), f("th", il, "#")) : v("", !0),
                    (s(!0), f(w, null, W(r.columns, (l) => (s(), f(w, null, [
                      l.printable !== !1 && re(l) ? (s(), f("th", {
                        key: l.name
                      }, k(l.printHeader || l.header), 1)) : v("", !0)
                    ], 64))), 256))
                  ])
                ]),
                c("tbody", null, [
                  (s(!0), f(w, null, W(le.value || E.value, (l, d) => (s(), f("tr", {
                    key: l[r.dataKeyId]
                  }, [
                    r.hasSequenceColumn ? (s(), f("td", nl, k(d + 1), 1)) : v("", !0),
                    (s(!0), f(w, null, W(r.columns, (y) => (s(), f(w, null, [
                      y.printable !== !1 && re(y) ? (s(), f("td", {
                        key: y.name
                      }, [
                        V(e.$slots, `${y.name.replace(".", "_")}ColumnBody`, {
                          row: l,
                          data: o(z)(l, y.name)
                        }, () => [
                          c("div", {
                            class: se(
                              y.bodyClassFunction ? y.bodyClassFunction(o(z)(l, y.name)) : ""
                            )
                          }, [
                            y.html ? (s(), f("div", {
                              key: 0,
                              innerHTML: ae(y, l)
                            }, null, 8, sl)) : (s(), f(w, { key: 1 }, [
                              Q(k(ae(y, l)), 1)
                            ], 64))
                          ], 2)
                        ])
                      ])) : v("", !0)
                    ], 64))), 256))
                  ]))), 128))
                ])
              ])
            ], 10, ol),
            c("div", null, [
              V(e.$slots, "printPageFooter")
            ])
          ], 512)) : v("", !0)
        ]),
        C(Zt, ue({
          ref_key: "dialogFormWrapperRef",
          ref: J
        }, dt.value, {
          "records-list": Ae.value,
          "onUpdate:recordsList": t[0] || (t[0] = (l) => Ae.value = l),
          modelValue: Ve.value,
          "onUpdate:modelValue": t[1] || (t[1] = (l) => Ve.value = l)
        }), null, 16, ["records-list", "modelValue"]),
        C(o(Lt), {
          ref_key: "contextMenuRef",
          ref: Ce,
          model: Ge.value,
          onHide: t[2] || (t[2] = (l) => M.value = void 0)
        }, null, 8, ["model"]),
        C(o(Tt), {
          ref_key: "dtRef",
          ref: Ke,
          filters: A.value,
          "onUpdate:filters": t[15] || (t[15] = (l) => A.value = l),
          "multi-sort-meta": Y.value,
          "onUpdate:multiSortMeta": t[16] || (t[16] = (l) => Y.value = l),
          selection: p.value,
          "onUpdate:selection": t[17] || (t[17] = (l) => p.value = l),
          "expanded-rows": q.value,
          "onUpdate:expandedRows": t[18] || (t[18] = (l) => q.value = l),
          first: O.value,
          "onUpdate:first": t[19] || (t[19] = (l) => O.value = l),
          "context-menu-selection": M.value,
          "onUpdate:contextMenuSelection": t[20] || (t[20] = (l) => M.value = l),
          "context-menu": "",
          value: E.value,
          lazy: "",
          "virtual-scroller-options": Ft.value,
          paginator: r.withPaginator && !r.infiniteScroll,
          scrollable: "",
          "scroll-height": r.scrollHeight,
          "paginator-position": "top",
          rows: F.value === -1 ? B.value : F.value,
          "data-key": r.dataKeyId,
          "total-records": B.value,
          loading: r.showLoadingIndication && N.value,
          "filter-display": "menu",
          "global-filter-fields": ke.value,
          "select-all": S.value,
          "sort-mode": r.sortMode,
          "show-gridlines": r.showGridLines,
          "row-class": (l) => [
            r.isActiveRow && r.isActiveRow(l) ? "active-row" : "",
            r.rowClass ? r.rowClass(l) : "",
            { "cursor-pointer": ut.value }
          ],
          "row-hover": r.rowHover,
          class: se({ "compact-table": r.compact }),
          onRowExpand: gt,
          onRowCollapse: wt,
          onRowReorder: Ct,
          onRowContextmenu: t[21] || (t[21] = (l) => r.hasContextMenu ? tt : void 0),
          onRowClick: ct,
          onPage: Xe,
          onSort: Ze,
          onFilter: _e,
          onSelectAllChange: et,
          onRowSelect: lt,
          onRowUnselect: at
        }, {
          header: h(() => [
            V(e.$slots, "title", { records: E.value }, () => [
              c("div", ul, k(r.tableTitle), 1)
            ]),
            c("div", dl, [
              r.hasGlobalFilter ? (s(), f("div", fl, [
                C(u, null, {
                  default: h(() => [
                    C(n, { class: "pi pi-search" }),
                    C(o(ce), {
                      modelValue: A.value.global.value,
                      "onUpdate:modelValue": t[3] || (t[3] = (l) => A.value.global.value = l),
                      class: "ltr:pl-8 rtl:pr-8",
                      size: "small",
                      placeholder: o(i)("Search For"),
                      onKeydown: t[4] || (t[4] = fe((l) => Be(), ["esc"])),
                      onInput: o(Qe)
                    }, null, 8, ["modelValue", "placeholder", "onInput"]),
                    N.value ? (s(), b(n, {
                      key: 0,
                      class: "pi pi-spin pi-spinner"
                    })) : v("", !0)
                  ]),
                  _: 1
                }),
                xe.value && !Ue.value ? (s(), b(o(P), {
                  key: 0,
                  size: "small",
                  type: "button",
                  icon: "pi pi-filter-slash",
                  label: o(i)("Clear"),
                  outlined: "",
                  "icon-pos": We.value,
                  onClick: t[5] || (t[5] = (l) => Be())
                }, null, 8, ["label", "icon-pos"])) : v("", !0)
              ])) : v("", !0),
              t[22] || (t[22] = c("div", null, null, -1)),
              c("div", cl, [
                V(e.$slots, "buttonsStart"),
                r.creatable ? (s(), b(o(P), {
                  key: 0,
                  size: "small",
                  severity: "primary",
                  icon: "i-mdi-plus",
                  label: r.createButtonLabel || o(i)("New"),
                  onClick: t[6] || (t[6] = (l) => Ne())
                }, null, 8, ["label"])) : v("", !0),
                r.selectable ? (s(), b(o(P), {
                  key: 1,
                  class: "border-1 light:border-gray-300 light:text-black whitespace-pre dark:border-gray-600 dark:text-white",
                  size: "small",
                  severity: "secondary",
                  icon: S.value ? "i-mdi:square-rounded-outline" : "i-fluent:select-all-on-24-regular",
                  label: S.value ? o(i)("Deselect") : o(i)("Select All"),
                  onClick: pt
                }, null, 8, ["icon", "label"])) : v("", !0),
                r.selectable && r.deletable ? (s(), b(o(P), {
                  key: 2,
                  size: "small",
                  severity: "danger",
                  disabled: p.value.length < 1,
                  icon: "i-mdi-trash",
                  label: o(i)("Delete"),
                  onClick: t[7] || (t[7] = (l) => be(p.value))
                }, null, 8, ["disabled", "label"])) : v("", !0),
                r.selectable && r.editable ? I((s(), b(o(P), {
                  key: 3,
                  size: "small",
                  disabled: p.value.length < 1 || p.value.length !== 1 && !r.multiEditable,
                  severity: "success",
                  icon: "i-mdi-edit",
                  label: o(i)("Edit"),
                  onClick: t[8] || (t[8] = (l) => rt(p.value))
                }, null, 8, ["disabled", "label"])), [
                  [o($), {
                    class: "warn",
                    value: p.value.length > 1 && !r.multiEditable ? o(i)("You must select one item only") : null
                  }]
                ]) : v("", !0),
                r.columnVisibilityButton ? (s(), f(w, { key: 4 }, [
                  C(H, {
                    ref_key: "visibleColumnsPopoverRef",
                    ref: Ee
                  }, {
                    default: h(() => [
                      (s(!0), f(w, null, W(r.columns.filter(
                        (l) => l.visibilityControl !== !1 && l.disabled !== !0 && l.type !== "hidden"
                      ), (l) => (s(), f("div", {
                        key: l.name,
                        class: "flex items-center gap-2 pb-1"
                      }, [
                        C(K, {
                          modelValue: T.value,
                          "onUpdate:modelValue": t[9] || (t[9] = (d) => T.value = d),
                          "input-id": "ColumnVisibilityCheckbox_" + l.name,
                          value: l.name,
                          onChange: Rt
                        }, null, 8, ["modelValue", "input-id", "value"]),
                        c("label", {
                          for: "ColumnVisibilityCheckbox_" + l.name,
                          class: "px-1"
                        }, k(l.header || l.name), 9, vl)
                      ]))), 128))
                    ]),
                    _: 1
                  }, 512),
                  I(C(o(P), {
                    label: o(i)("Columns"),
                    icon: "pi pi-table",
                    severity: "help",
                    size: e.size,
                    onClick: t[10] || (t[10] = (l) => Ee.value.toggle(l))
                  }, null, 8, ["label", "size"]), [
                    [o($), o(i)("Columns Control")]
                  ])
                ], 64)) : v("", !0),
                r.printable ? I((s(), b(o(P), {
                  key: 5,
                  disabled: N.value,
                  size: "small",
                  severity: "success",
                  loading: N.value || G.value,
                  icon: "pi pi-print",
                  onClick: t[11] || (t[11] = (l) => nt())
                }, null, 8, ["disabled", "loading"])), [
                  [
                    o($),
                    o(i)("Print"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                r.hasRefreshButton ? I((s(), b(o(P), {
                  key: 6,
                  disabled: N.value,
                  size: "small",
                  severity: "info",
                  loading: N.value,
                  icon: "pi pi-refresh",
                  onClick: t[12] || (t[12] = (l) => te())
                }, null, 8, ["disabled", "loading"])), [
                  [
                    o($),
                    o(i)("Refresh Records"),
                    void 0,
                    { top: !0 }
                  ]
                ]) : v("", !0),
                V(e.$slots, "buttonsEnd")
              ])
            ])
          ]),
          paginatorstart: h(() => [
            c("div", pl, [
              c("span", null, [
                xe.value ? (s(), f(w, { key: 0 }, [
                  Q(k(o(i)("Showing start To end From filtered (Filtered From total)", {
                    start: Re.value,
                    end: Fe.value,
                    total: ee.value,
                    filtered: B.value
                  })), 1)
                ], 64)) : (s(), f(w, { key: 1 }, [
                  Q(k(o(i)("Showing start To end From total", {
                    start: Re.value,
                    end: Fe.value,
                    total: ee.value
                  })), 1)
                ], 64))
              ]),
              p.value.length ? (s(), f("span", ml, k(o(i)("(n Records selected)", { n: p.value.length }, p.value.length)), 1)) : v("", !0)
            ])
          ]),
          paginatorend: h(() => [
            c("div", yl, [
              c("span", null, k(o(i)("Show")), 1),
              C(St, {
                modelValue: F.value,
                "onUpdate:modelValue": t[13] || (t[13] = (l) => F.value = l),
                size: "small",
                options: je.value,
                "scroll-height": "360px",
                "option-label": "label",
                "option-value": "value",
                onChange: t[14] || (t[14] = (l) => it())
              }, null, 8, ["modelValue", "options"]),
              F.value !== -1 ? (s(), f("span", bl, k(o(i)("Entries")), 1)) : v("", !0)
            ])
          ]),
          empty: h(() => [
            c("div", hl, k(o(i)("No Data")), 1)
          ]),
          expansion: h(({ data: l }) => [
            V(e.$slots, "expander", { row: l })
          ]),
          default: h(() => [
            r.hasReorderColumn ? (s(), b(o(j), {
              key: 0,
              "row-reorder": "",
              style: { width: "33px", "flex-grow": "1", "flex-basis": "33px" },
              "reorderable-column": !1
            })) : v("", !0),
            r.hasExpanderColumn ? (s(), b(o(j), {
              key: 1,
              expander: "",
              style: { width: "3rem" }
            })) : v("", !0),
            r.selectable ? (s(), b(o(j), {
              key: 2,
              "selection-mode": "multiple",
              "header-style": { width: "3rem" }
            }, {
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: de({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ie, {
                    width: "60%",
                    height: "1rem"
                  })
                ], 4)
              ]),
              _: 1
            })) : v("", !0),
            r.hasSequenceColumn ? (s(), b(o(j), ue({
              key: 3,
              header: "#",
              style: { width: "3rem" }
            }, r.sequenceColumnProps), {
              body: h(({ index: l }) => [
                Q(k(l + 1), 1)
              ]),
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: de({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ie, {
                    width: "60%",
                    height: "1rem"
                  })
                ], 4)
              ]),
              _: 1
            }, 16)) : v("", !0),
            (s(!0), f(w, null, W(r.columns, (l) => (s(), f(w, {
              key: l.name
            }, [
              l.type !== "hidden" ? (s(), b(o(j), ue({
                key: 0,
                hidden: l.visibilityControl !== !1 ? T.value.indexOf(l.name) < 0 : o(D)(l.visible) ? !l.visible : !1,
                "show-filter-operator": l.multipleFilters || !1,
                field: l.name,
                header: l.header || (r.autoI18nColumnsHeader ? o(i)(o(Wt)(l.name)) : l.name),
                "show-filter-match-modes": o(D)(l.showFilterMatchModes) ? l.showFilterMatchModes : l.type === "select" ? !1 : r.enableFilterMatchModes,
                "show-add-button": o(D)(l.showFilterAddButton) ? l.showFilterAddButton : r.enableFilterAddButton,
                "show-apply-button": o(D)(l.showFilterApplyButton) ? l.showFilterApplyButton : l.type === "select" ? !1 : r.enableFilterApplyButton,
                "show-clear-button": o(D)(l.showFilterClearButton) ? l.showFilterClearButton : l.type === "select" ? !1 : r.enableFilterClearButton,
                "max-constraints": null,
                "filter-field": l.filterField || l.name,
                "sort-field": l.sortField || l.name,
                "filter-match-mode": l.filterMatchMode || "startsWith",
                "filter-match-mode-options": Je.value[l.type || "text"],
                sortable: o(D)(l.sortable) ? l.sortable : r.enableColumnSorting,
                "body-class": l.bodyClass,
                "data-type": l.type || "text",
                style: l.style
              }, { ref_for: !0 }, l.props || {}), zt({
                body: h(({ data: d }) => [
                  V(e.$slots, `${l.name.replace(".", "_")}ColumnBody`, {
                    row: d,
                    data: o(z)(d, l.name)
                  }, () => [
                    c("div", {
                      class: se(
                        l.bodyClassFunction ? l.bodyClassFunction(o(z)(d, l.name)) : ""
                      )
                    }, [
                      l.html ? (s(), f("div", {
                        key: 0,
                        innerHTML: ae(l, d)
                      }, null, 8, wl)) : (s(), f(w, { key: 1 }, [
                        Q(k(ae(l, d)), 1)
                      ], 64))
                    ], 2)
                  ])
                ]),
                loading: h(() => [
                  c("div", {
                    class: "flex items-center",
                    style: de({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(ie, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 2
              }, [
                (o(D)(l.filterable) ? l.filterable : r.enableColumnFilters) ? {
                  name: "filter",
                  fn: h(({ filterModel: d, filterCallback: y }) => [
                    V(e.$slots, `${l.name.replace(".", "_")}ColumnFilter`, {
                      slotProps: { filterModel: d, filterCallback: y }
                    }, () => [
                      l.type === "date" ? (s(), b(o(Yt), {
                        key: 0,
                        "input-props": st(y),
                        "model-value": d.value ? o(De)(d.value).toDate() : null,
                        "date-format": "yy-mm-dd",
                        placeholder: "yyyy/mm/dddd",
                        mask: "9999-99-99",
                        "onUpdate:modelValue": (g) => d.value = g ? o(De)(g).format("YYYY-MM-DD") : null
                      }, null, 8, ["input-props", "model-value", "onUpdate:modelValue"])) : l.type === "select" ? (s(), f(w, { key: 1 }, [
                        !o(D)(l.showFilterAddButton) || l.isMultiSelect === !0 ? (s(), f(w, { key: 0 }, [
                          C(_t, {
                            label: l.selectFilterHeader !== void 0 ? l.selectFilterHeader : l.header,
                            options: Array.isArray(l.selectOptions) ? l.selectOptions : l.selectOptions?.list ?? [],
                            "slot-props": { filterModel: d, filterCallback: y },
                            "option-value-property": l.selectValueProperty,
                            "option-label-property": l.selectLabelProperty
                          }, null, 8, ["label", "options", "slot-props", "option-value-property", "option-label-property"]),
                          d.value ? (s(), f("div", gl, [
                            C(o(P), {
                              size: "small",
                              type: "button",
                              icon: "pi pi-filter-slash",
                              outlined: "",
                              label: o(i)("Clear"),
                              onClick: (g) => {
                                d.value = null, y();
                              }
                            }, null, 8, ["label", "onClick"])
                          ])) : v("", !0)
                        ], 64)) : (s(), b(el, {
                          key: 1,
                          label: l.selectFilterHeader !== void 0 ? l.selectFilterHeader : l.header,
                          options: Array.isArray(l.selectOptions) ? l.selectOptions : l.selectOptions?.list ?? [],
                          "slot-props": { filterModel: d, filterCallback: y },
                          "option-value-property": l.selectValueProperty,
                          "option-label-property": l.selectLabelProperty
                        }, null, 8, ["label", "options", "slot-props", "option-value-property", "option-label-property"]))
                      ], 64)) : v("", !0),
                      !l.type || l.type === "text" ? I((s(), b(o(ce), {
                        key: 2,
                        modelValue: d.value,
                        "onUpdate:modelValue": (g) => d.value = g,
                        type: "text",
                        class: "p-column-filter",
                        placeholder: o(i)("Search For"),
                        onKeydown: fe((g) => y(), ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onKeydown"])), [
                        [
                          o($),
                          o(i)("Hit enter key to filter"),
                          void 0,
                          {
                            top: !0,
                            focus: !0
                          }
                        ]
                      ]) : v("", !0),
                      l.type === "numeric" ? (s(), f(w, { key: 3 }, [
                        ["between", "notBetween"].indexOf(d.matchMode) > -1 ? (s(), f(w, { key: 0 }, W([0, 1], (g) => c("div", { key: g }, [
                          c("span", null, k(g === 0 ? o(i)("From") : o(i)("To")), 1),
                          C(o(ce), {
                            value: (d.value || [])[g],
                            type: "number",
                            onInput: (ge) => d.value = [
                              g === 0 ? +ge.target.value : (d.value || [])[0],
                              g === 1 ? +ge.target.value : (d.value || [])[1]
                            ],
                            onKeydown: fe((ge) => y(), ["enter"])
                          }, null, 8, ["value", "onInput", "onKeydown"])
                        ])), 64)) : I((s(), b(o(ce), {
                          key: 1,
                          modelValue: d.value,
                          "onUpdate:modelValue": (g) => d.value = g,
                          type: "number",
                          class: "p-column-filter",
                          placeholder: o(i)("Search For"),
                          onKeydown: fe((g) => y(), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onKeydown"])), [
                          [
                            o($),
                            o(i)("Hit enter key to filter"),
                            void 0,
                            {
                              top: !0,
                              focus: !0
                            }
                          ]
                        ])
                      ], 64)) : v("", !0),
                      l.type === "boolean" ? (s(), f(w, { key: 4 }, [
                        C(K, {
                          modelValue: d.value,
                          "onUpdate:modelValue": (g) => d.value = g,
                          class: "mr-1",
                          "false-value": 0,
                          "true-value": 1,
                          binary: "",
                          onChange: (g) => y()
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                        c("span", null, k(l.filterCheckboxLabel || l.header), 1)
                      ], 64)) : v("", !0)
                    ])
                  ]),
                  key: "0"
                } : void 0
              ]), 1040, ["hidden", "show-filter-operator", "field", "header", "show-filter-match-modes", "show-add-button", "show-apply-button", "show-clear-button", "filter-field", "sort-field", "filter-match-mode", "filter-match-mode-options", "sortable", "body-class", "data-type", "style"])) : v("", !0)
            ], 64))), 128)),
            r.toolsColumn ? (s(), b(o(j), ue({
              key: 4,
              "body-class": "p-tools-cell",
              "align-frozen": o(i)("dir"),
              frozen: r.frozenToolsColumn
            }, r.toolsColumnProps), {
              header: h(() => [...t[23] || (t[23] = [
                c("i", { class: "i-mdi-tools mx-auto" }, null, -1)
              ])]),
              body: h((l) => [
                c("div", Cl, [
                  r.openable ? I((s(), b(o(P), {
                    key: 0,
                    severity: "info",
                    size: "small",
                    class: "rounded-md p-2",
                    onClick: (d) => R("rowOpen", l.data)
                  }, {
                    default: h(() => [...t[24] || (t[24] = [
                      c("i", { class: "i-mdi-open-in-app" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])), [
                    [o($), o(i)("Open")]
                  ]) : v("", !0),
                  r.editable ? I((s(), b(o(P), {
                    key: 1,
                    severity: "success",
                    size: "small",
                    class: "rounded-md p-2",
                    onClick: (d) => ye(l.data)
                  }, {
                    default: h(() => [...t[25] || (t[25] = [
                      c("i", { class: "i-mdi-edit" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])), [
                    [o($), o(i)("Edit")]
                  ]) : v("", !0),
                  r.deletable ? I((s(), b(o(P), {
                    key: 2,
                    severity: "danger",
                    size: "small",
                    class: "rounded-md p-2",
                    onClick: (d) => be(l.data)
                  }, {
                    default: h(() => [...t[26] || (t[26] = [
                      c("i", { class: "i-mdi-trash" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])), [
                    [o($), o(i)("Remove")]
                  ]) : v("", !0),
                  V(e.$slots, "toolsColumnExtraButton", {
                    row: l.data
                  })
                ])
              ]),
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: de({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ie, {
                    width: "60%",
                    height: "1rem"
                  })
                ], 4)
              ]),
              _: 3
            }, 16, ["align-frozen", "frozen"])) : v("", !0)
          ]),
          _: 3
        }, 8, ["filters", "multi-sort-meta", "selection", "expanded-rows", "first", "context-menu-selection", "value", "virtual-scroller-options", "paginator", "scroll-height", "rows", "data-key", "total-records", "loading", "global-filter-fields", "select-all", "sort-mode", "show-gridlines", "row-class", "row-hover", "class"])
      ]);
    };
  }
});
export {
  jl as _
};
