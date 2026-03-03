import { defineComponent as Pt, useModel as se, ref as m, computed as x, onBeforeMount as Mt, onMounted as Vt, watch as At, resolveComponent as W, openBlock as s, createElementBlock as f, createElementVNode as c, renderSlot as V, toDisplayString as k, normalizeClass as ue, createCommentVNode as v, Fragment as w, renderList as j, unref as o, createTextVNode as X, createVNode as C, mergeProps as de, withCtx as h, createBlock as b, normalizeStyle as fe, createSlots as Nt, withDirectives as I, withKeys as ce, mergeModels as De, nextTick as Et } from "vue";
import P from "primevue/button";
import Y from "primevue/column";
import Ot from "primevue/contextmenu";
import It from "primevue/datatable";
import ve from "primevue/inputtext";
import z from "primevue/tooltip";
import { map as zt, filter as Dt, reduce as $e, cloneDeep as $t, debounce as Lt, get as D, isBoolean as $, upperFirst as Tt, unset as Ht } from "lodash-es";
import Le from "moment";
import Ut from "primevue/datepicker";
import { useConfirm as qt } from "primevue/useconfirm";
import { useToast as Kt } from "primevue/usetoast";
import Wt from "HddUiHelpers/utils/usePrimeVueServerUi";
import { printDomWithStyles as jt } from "HddUiHelpers/utils/printDom";
import Yt from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { _ as Gt } from "../../MultiSelectColumnFilter.vue_vue_type_script_setup_true_lang-Bb-QCZM0.js";
import { _ as Jt } from "../../SelectColumnFilter.vue_vue_type_script_setup_true_lang-DqfZQBqH.js";
import { FilterMatchMode as Ce } from "./types.js";
const Qt = { class: "p-server-datatable-container max-w-full px-4" }, Xt = { class: "hidden" }, Zt = { class: "my-2 text-center text-xl font-bold" }, _t = ["dir"], el = { class: "printable-table mx-auto mt-3" }, tl = { key: 0 }, ll = { key: 0 }, al = ["innerHTML"], ol = { class: "my-2 text-xl font-bold" }, rl = { class: "flex w-full items-end" }, il = {
  key: 0,
  class: "justify-content-between flex flex-1 gap-1"
}, nl = { class: "flex flex-1 justify-end gap-1" }, sl = ["for"], ul = { class: "flex w-full justify-end gap-1 text-sm" }, dl = { key: 0 }, fl = { class: "flex items-center gap-1 text-sm" }, cl = { key: 0 }, vl = { class: "text-secondary-1 text-center text-sm italic" }, pl = {
  key: 0,
  class: "flex justify-end"
}, ml = ["innerHTML"], yl = { class: "flex flex-wrap items-center gap-1" }, Il = /* @__PURE__ */ Pt({
  __name: "PrimeVueServerTable",
  props: /* @__PURE__ */ De({
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
    defaultMatchMode: { default: Ce.CONTAINS },
    defaultDateMatchMode: { default: Ce.DATE_IS },
    defaultNumericMatchMode: { default: Ce.EQUALS },
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
  emits: /* @__PURE__ */ De(["rowClick", "rowOpen", "rowEdit", "multiRowsEdit", "rowCreated", "rowUpdated", "rowDeleted", "rowChanged", "refreshed", "rowExpand", "rowCollapse", "rowReorder"], ["update:rowsPerPage", "update:sorts", "update:isCollapsed", "update:records"]),
  setup(r, { expose: Te, emit: He }) {
    const a = r, R = He, {
      axios: pe,
      routeNameResolver: me,
      t: i,
      dataTableRecordsService: U
    } = Wt();
    function Ue(e) {
      return e?.operator !== void 0;
    }
    const F = se(r, "rowsPerPage"), G = se(r, "sorts"), qe = se(r, "isCollapsed"), Z = m(), _ = {
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
        else if (a.routeName) t = me(a.routeName);
        else return Promise.reject(new Error("Invalid Url or Route Name"));
        return Z.value = new AbortController(), (await pe.get(t, {
          params: e,
          signal: Z.value.signal
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
        else if (a.routeName) t = me(a.routeName, e);
        else return Promise.reject(new Error("Invalid Url or Route Name"));
        return (await pe.delete(t)).data;
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
          t = me(a.routeName, n);
        else
          return Promise.reject(new Error("Invalid Url or Route Name"));
        return (await pe.delete(t, { params: { ids: e } })).data;
      }
    }, A = m({ global: { value: null, matchMode: "contains" } }), ee = Kt(), Ke = qt(), We = m(), N = m(!1), B = m(0), te = m(0), E = se(r, "records"), p = m([]), q = m({}), S = m(!1), O = m(0), xe = m(), M = m(), je = x(() => i("dir") === "rtl" ? "right" : "left"), ke = x(() => {
      for (const e in A.value) {
        if (a.fixedFilters?.[e])
          continue;
        const t = A.value[e];
        if (Ue(t)) {
          if (t.constraints?.findIndex((u) => u.value) > -1) return !0;
        } else if (t?.value) return !0;
      }
      return !1;
    }), Ye = x(() => {
      const e = [5, 10, 25, 50, 100, 500];
      return !e.includes(F.value) && F.value !== -1 && e.push(F.value), [...e.map((t) => ({ value: t, label: t })), { value: -1, label: i("All") }];
    }), Re = x(() => zt(
      Dt(
        a.columns,
        (e) => e.global !== !1 && (e.filterable !== !1 || e.global === !0)
      ),
      (e) => e.filterField ?? e.name
    )), Ge = x(() => $e(
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
    )), ye = x(() => ({
      first: O.value,
      perPage: F.value,
      sorts: G.value,
      filters: A.value,
      fixedFilters: a.fixedFilters,
      globalFilters: Re.value,
      groupedFilters: a.groupedFilters,
      fields: Ge.value,
      includes: a.includes ?? []
    })), Fe = x(() => F.value === -1 ? Math.min(1, B.value) : Math.min(O.value + 1, B.value)), Se = x(() => F.value === -1 ? B.value : Math.min(O.value + F.value, B.value)), Je = x(() => {
      const e = [];
      return a.openable && e.push({
        label: i("Open"),
        icon: "i-mdi-open-in-app",
        command: () => M.value ? R("rowOpen", M.value) : void 0
      }), a.editable && e.push({
        label: i("Edit"),
        icon: "i-mdi-edit",
        command: () => M.value ? be(M.value) : void 0
      }), a.deletable && e.push({
        label: i("Delete"),
        icon: "i-mdi-trash",
        command: () => M.value ? he(M.value) : void 0
      }), a.extraContextMenuOptions?.length > 0 && e.push(
        ...$t(a.extraContextMenuOptions).map((t) => (t.command && (t.command2 = t.command, t.command = () => t.command2(M.value)), typeof t.labelFn == "function" && (t.label = t.labelFn(M.value)), t))
      ), e;
    }), Qe = x(() => ({
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
    function Be() {
      return $e(
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
    async function Pe() {
      A.value = Be(), await L();
    }
    const Xe = Lt(() => {
      L();
    }, 500);
    async function L() {
      N.value = !0, a.url || a.routeName ? await _.getRecords(ye.value).then((e) => {
        if (e.success)
          E.value = e.data.data, B.value = e.data.total, te.value = e.data.total_without_filters, R("refreshed", e);
        else
          throw new Error(`Unable to get records from ${a.url}`);
      }).catch((e) => {
        console.error(e);
        const t = e.response?.data?.message || i("Error Occurred");
        ee.add({
          severity: "error",
          summary: t,
          life: 3e3,
          group: "notifications"
        });
      }).finally(() => {
        N.value = !1;
      }) : N.value = !1;
    }
    async function Me(e) {
      if (a.url || a.routeName)
        try {
          const t = await _.getRecords({
            ...ye.value,
            perPage: e ?? ye.value.perPage
          });
          if (t.success)
            return t.data;
        } catch (t) {
          if (t.code === "ERR_CANCELED")
            console.log("Cancelled");
          else {
            console.error(t);
            const n = t.response?.data?.message || i("Error Occurred");
            ee.add({
              severity: "error",
              summary: n,
              life: 3e3,
              group: "notifications"
            });
          }
        }
      return !1;
    }
    async function Ze(e) {
      O.value = e.first, await L(), S.value = p.value.length === B.value && p.value.length !== 0;
    }
    async function _e(e) {
      a.sortMode === "multiple" && e.multiSortMeta ? G.value = e.multiSortMeta : G.value = [
        { field: typeof e.sortField == "string" ? e.sortField : "", order: e.sortOrder }
      ], await L(), S.value = p.value.length === B.value && p.value.length !== 0;
    }
    async function et() {
      await L();
    }
    function tt(e) {
      E.value.length === 0 && (S.value = !1, p.value = []), S.value = e.checked, S.value ? p.value = E.value : p.value = [];
    }
    function lt(e) {
      xe.value.show(e.originalEvent);
    }
    function at() {
      S.value = p.value.length === B.value && p.value.length !== 0;
    }
    function ot() {
      S.value = !1;
    }
    function be(e) {
      R("rowEdit", e), (a.useFormForEdit || a.fields?.length > 0) && ge(e);
    }
    function rt(e) {
      R("multiRowsEdit", e), (a.useFormForEdit || a.fields?.length > 0) && ge(e);
    }
    function it(e) {
      e.length === 1 ? be(e[0]) : rt(e);
    }
    function he(e) {
      if (!e) return;
      let t = 1;
      Array.isArray(e) && (t = e.length), Ke.require({
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
            a.url && (Array.isArray(e) ? await _.deleteRecordsMulti(n) : await _.deleteRecord(e.id)), ee.add({
              severity: "success",
              summary: i("Deleted!"),
              detail: i("n Record Deleted Successfully", { n: t }, t),
              life: 3e3
            }), R("rowDeleted", Array.isArray(e) ? n : e.id), R("rowChanged", Array.isArray(e) ? n : e.id, "delete"), p.value = p.value.filter((u) => !n.includes(u.id)), le();
          } catch (u) {
            const K = u?.response?.data?.message || i("Error Occurred");
            ee.add({
              severity: "error",
              summary: K,
              life: 3e3,
              group: "notifications"
            });
          }
        }
      });
    }
    async function nt() {
      O.value = 0, await L();
    }
    function le() {
      a.infiniteScroll ? ze({ first: O.value, last: F.value }) : L();
    }
    const J = m(!1), Ve = m(), ae = m(!1);
    async function st() {
      if (a.printAllRows === !0) {
        ae.value = [], J.value = !0;
        const t = await Me(-1);
        ae.value = t.data;
      } else
        J.value = !0, ae.value = !1;
      await Et();
      const e = Ve.value;
      await jt(e), J.value = !1;
    }
    function ut(e) {
      return { onKeydown: (t) => t.key === "Enter" ? e() : null };
    }
    const dt = x(() => !!a.onRowClick);
    Mt(() => {
      A.value = Be();
    }), Vt(() => {
      Rt(), a.infiniteScroll ? E.value = void 0 : L();
    });
    const Q = m(), Ae = m({}), Ne = m([]), ft = x(() => ({
      url: a.url,
      fields: a.fields ?? [],
      keepFormOpenAfterCreate: a.keepFormOpenAfterCreate,
      onSubmitted: ct,
      createRecordHeader: a.createRecordHeader,
      editRecordHeader: a.editRecordHeader,
      ...a.formDialogProps ?? {}
    }));
    function Ee() {
      Q.value?.create();
    }
    function ge(e) {
      Array.isArray(e) ? Q.value?.editMulti(e) : Q.value?.edit(e);
    }
    function ct(e, t) {
      R(e === "create" ? "rowCreated" : "rowUpdated", t), R("rowChanged", t, e), a.refreshAfterFormSubmit && le();
    }
    function vt(e) {
      if (!window.getSelection()?.isCollapsed)
        return;
      const t = e.originalEvent.composedPath(), n = t.find((H) => H.classList?.contains("p-datatable-row-toggle-button")), u = t.find((H) => H.classList?.contains("p-editable-column")), K = t.find((H) => H.classList?.contains("p-selection-column"));
      n || u || K || (R("rowClick", e.data, e.index, e.originalEvent), a.expandOnRowClick && gt(e.data));
    }
    const pt = x(() => {
      const e = {};
      return a.columns.forEach((t) => {
        t.type === "select" && (t.selectOptionsKeyed ? e[t.name] = t.selectOptionsKeyed : t.selectOptions && (Array.isArray(t.selectOptions) ? e[t.name] = t.selectOptions.reduce((n, u) => (n[u[t.selectValueProperty ?? "id"]] = u[t.selectLabelProperty ?? "name"], n), {}) : e[t.name] = t.selectOptions.object));
      }), e;
    });
    function mt() {
      S.value ? (p.value = [], S.value = !1) : (p.value = E.value, S.value = p.value.length !== 0);
    }
    function yt(e) {
      return q.value ? q.value[e[a.dataKeyId]] : !1;
    }
    function bt(e) {
      q.value[e[a.dataKeyId]] = !0;
    }
    function ht(e) {
      Ht(q.value, e[a.dataKeyId]);
    }
    function gt(e) {
      yt(e) ? ht(e) : bt(e);
    }
    function wt(e) {
      R("rowExpand", e.data);
    }
    function Ct(e) {
      R("rowCollapse", e.data);
    }
    function xt(e) {
      R("rowReorder", e);
    }
    function oe(e, t) {
      let n = e.name;
      if (typeof e.formatter == "string" && (n = e.formatter), typeof e.formatter == "function")
        return e.formatter(D(t, n), t);
      if (e.type === "select") {
        let u = pt.value[n]?.[D(t, n)] || D(t, n);
        return !u && e.emptyValuePlaceholder && (e.html ? u = `<span class="italic text-muted">${e.emptyValuePlaceholder}</span>` : u = e.emptyValuePlaceholder), u;
      }
      if (e.type === "boolean") {
        const u = D(t, n);
        return u === !0 ? i("Yes") : u === !1 ? i("No") : "";
      }
      return D(t, e.name);
    }
    const kt = x(() => Q.value?.form), T = m([]), Oe = m();
    function Rt() {
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
    function Ft() {
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
    const Ie = m();
    At(
      () => a.itemSize,
      (e) => {
        Ie.value = e;
      },
      {
        immediate: !0
      }
    );
    const re = m(!1), St = x(() => {
      if (a.infiniteScroll)
        return {
          itemSize: Ie.value,
          delay: 50,
          lazy: !0,
          showLoader: !0,
          autoSize: !0,
          loading: re.value,
          onLazyLoad: ze
        };
    });
    async function ze(e) {
      re.value || (re.value = !0), O.value = e.first, F.value = e.last, Z.value && Z.value.abort();
      const t = await Me(e.last);
      if (t) {
        const n = Array.from({ length: t.total });
        B.value = t.total, te.value = t.total_without_filters, Array.prototype.splice.apply(n, [
          e.first,
          e.last - e.first,
          ...t.data
        ]), E.value = n;
      }
      re.value = !1;
    }
    function ie(e) {
      return e.type !== "hidden" && !(e.visibilityControl !== !1 ? T.value.indexOf(e.name) < 0 : $(e.visible) && !e.visible);
    }
    return x(() => {
      let e = 0;
      a.hasSequenceColumn && e++, a.hasReorderColumn && e++, a.selectable && e++, a.columns.forEach((n) => {
        ie(n) && (n.widthPoint !== void 0 ? e += n.widthPoint : e += 2);
      }), console.log(e);
      const t = {
        _sequence: 1 / e * 100,
        _selectable: 1 / e * 100,
        _reorder: 1 / e * 100
      };
      return a.columns.forEach((n) => {
        ie(n) && (t[n.name] = (n.widthPoint ?? 2) / e * 100);
      }), t;
    }), Te({ refresh: le, showCreateDialog: Ee, showEditDialog: ge, formModel: kt }), (e, t) => {
      const n = W("InputIcon"), u = W("IconField"), K = W("Checkbox"), H = W("Popover"), Bt = W("Select"), ne = W("Skeleton");
      return s(), f("div", Qt, [
        c("div", Xt, [
          J.value ? (s(), f("div", {
            key: 0,
            ref_key: "printNodeRef",
            ref: Ve,
            class: "bg-white text-black"
          }, [
            V(e.$slots, "printPageHeader", {}, () => [
              c("div", Zt, k(r.tableTitle), 1)
            ]),
            c("div", {
              dir: r.printDirection,
              class: ue({
                "ltr text-left": r.printDirection === "ltr",
                "rtl text-right": r.printDirection === "rtl"
              })
            }, [
              c("table", el, [
                c("thead", null, [
                  c("tr", null, [
                    r.hasSequenceColumn ? (s(), f("th", tl, "#")) : v("", !0),
                    (s(!0), f(w, null, j(r.columns, (l) => (s(), f(w, null, [
                      l.printable !== !1 && ie(l) ? (s(), f("th", {
                        key: l.name
                      }, k(l.printHeader || l.header), 1)) : v("", !0)
                    ], 64))), 256))
                  ])
                ]),
                c("tbody", null, [
                  (s(!0), f(w, null, j(ae.value || E.value, (l, d) => (s(), f("tr", {
                    key: l[r.dataKeyId]
                  }, [
                    r.hasSequenceColumn ? (s(), f("td", ll, k(d + 1), 1)) : v("", !0),
                    (s(!0), f(w, null, j(r.columns, (y) => (s(), f(w, null, [
                      y.printable !== !1 && ie(y) ? (s(), f("td", {
                        key: y.name
                      }, [
                        V(e.$slots, `${y.name.replace(".", "_")}ColumnBody`, {
                          row: l,
                          data: o(D)(l, y.name)
                        }, () => [
                          c("div", {
                            class: ue(
                              y.bodyClassFunction ? y.bodyClassFunction(o(D)(l, y.name)) : ""
                            )
                          }, [
                            y.html ? (s(), f("div", {
                              key: 0,
                              innerHTML: oe(y, l)
                            }, null, 8, al)) : (s(), f(w, { key: 1 }, [
                              X(k(oe(y, l)), 1)
                            ], 64))
                          ], 2)
                        ])
                      ])) : v("", !0)
                    ], 64))), 256))
                  ]))), 128))
                ])
              ])
            ], 10, _t),
            c("div", null, [
              V(e.$slots, "printPageFooter")
            ])
          ], 512)) : v("", !0)
        ]),
        C(Yt, de({
          ref_key: "dialogFormWrapperRef",
          ref: Q
        }, ft.value, {
          "records-list": Ne.value,
          "onUpdate:recordsList": t[0] || (t[0] = (l) => Ne.value = l),
          modelValue: Ae.value,
          "onUpdate:modelValue": t[1] || (t[1] = (l) => Ae.value = l)
        }), null, 16, ["records-list", "modelValue"]),
        C(o(Ot), {
          ref_key: "contextMenuRef",
          ref: xe,
          model: Je.value,
          onHide: t[2] || (t[2] = (l) => M.value = void 0)
        }, null, 8, ["model"]),
        C(o(It), {
          ref_key: "dtRef",
          ref: We,
          filters: A.value,
          "onUpdate:filters": t[15] || (t[15] = (l) => A.value = l),
          "multi-sort-meta": G.value,
          "onUpdate:multiSortMeta": t[16] || (t[16] = (l) => G.value = l),
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
          "virtual-scroller-options": St.value,
          paginator: r.withPaginator && !r.infiniteScroll,
          scrollable: "",
          "scroll-height": r.scrollHeight,
          "paginator-position": "top",
          rows: F.value === -1 ? B.value : F.value,
          "data-key": r.dataKeyId,
          "total-records": B.value,
          loading: r.showLoadingIndication && N.value,
          "filter-display": "menu",
          "global-filter-fields": Re.value,
          "select-all": S.value,
          "sort-mode": r.sortMode,
          "show-gridlines": r.showGridLines,
          "row-class": (l) => [
            r.isActiveRow && r.isActiveRow(l) ? "active-row" : "",
            r.rowClass ? r.rowClass(l) : "",
            { "cursor-pointer": dt.value }
          ],
          "row-hover": r.rowHover,
          class: ue({ "compact-table": r.compact }),
          onRowExpand: wt,
          onRowCollapse: Ct,
          onRowReorder: xt,
          onRowContextmenu: t[21] || (t[21] = (l) => r.hasContextMenu ? lt : void 0),
          onRowClick: vt,
          onPage: Ze,
          onSort: _e,
          onFilter: et,
          onSelectAllChange: tt,
          onRowSelect: at,
          onRowUnselect: ot
        }, {
          header: h(() => [
            V(e.$slots, "title", { records: E.value }, () => [
              c("div", ol, k(r.tableTitle), 1)
            ]),
            c("div", rl, [
              r.hasGlobalFilter ? (s(), f("div", il, [
                C(u, null, {
                  default: h(() => [
                    C(n, { class: "pi pi-search" }),
                    C(o(ve), {
                      modelValue: A.value.global.value,
                      "onUpdate:modelValue": t[3] || (t[3] = (l) => A.value.global.value = l),
                      class: "ltr:pl-8 rtl:pr-8",
                      size: "small",
                      placeholder: o(i)("Search For"),
                      onKeydown: t[4] || (t[4] = ce((l) => Pe(), ["esc"])),
                      onInput: o(Xe)
                    }, null, 8, ["modelValue", "placeholder", "onInput"]),
                    N.value ? (s(), b(n, {
                      key: 0,
                      class: "pi pi-spin pi-spinner"
                    })) : v("", !0)
                  ]),
                  _: 1
                }),
                ke.value && !qe.value ? (s(), b(o(P), {
                  key: 0,
                  size: "small",
                  type: "button",
                  icon: "pi pi-filter-slash",
                  label: o(i)("Clear"),
                  outlined: "",
                  "icon-pos": je.value,
                  onClick: t[5] || (t[5] = (l) => Pe())
                }, null, 8, ["label", "icon-pos"])) : v("", !0)
              ])) : v("", !0),
              t[22] || (t[22] = c("div", null, null, -1)),
              c("div", nl, [
                V(e.$slots, "buttonsStart"),
                r.creatable ? (s(), b(o(P), {
                  key: 0,
                  size: "small",
                  severity: "primary",
                  icon: "i-mdi-plus",
                  label: r.createButtonLabel || o(i)("New"),
                  onClick: t[6] || (t[6] = (l) => Ee())
                }, null, 8, ["label"])) : v("", !0),
                r.selectable ? (s(), b(o(P), {
                  key: 1,
                  class: "border-1 light:border-gray-300 light:text-black whitespace-pre dark:border-gray-600 dark:text-white",
                  size: "small",
                  severity: "secondary",
                  icon: S.value ? "i-mdi:square-rounded-outline" : "i-fluent:select-all-on-24-regular",
                  label: S.value ? o(i)("Deselect") : o(i)("Select All"),
                  onClick: mt
                }, null, 8, ["icon", "label"])) : v("", !0),
                r.selectable && r.deletable ? (s(), b(o(P), {
                  key: 2,
                  size: "small",
                  severity: "danger",
                  disabled: p.value.length < 1,
                  icon: "i-mdi-trash",
                  label: o(i)("Delete"),
                  onClick: t[7] || (t[7] = (l) => he(p.value))
                }, null, 8, ["disabled", "label"])) : v("", !0),
                r.selectable && r.editable ? I((s(), b(o(P), {
                  key: 3,
                  size: "small",
                  disabled: p.value.length < 1 || p.value.length !== 1 && !r.multiEditable,
                  severity: "success",
                  icon: "i-mdi-edit",
                  label: o(i)("Edit"),
                  onClick: t[8] || (t[8] = (l) => it(p.value))
                }, null, 8, ["disabled", "label"])), [
                  [o(z), {
                    class: "warn",
                    value: p.value.length > 1 && !r.multiEditable ? o(i)("You must select one item only") : null
                  }]
                ]) : v("", !0),
                r.columnVisibilityButton ? (s(), f(w, { key: 4 }, [
                  C(H, {
                    ref_key: "visibleColumnsPopoverRef",
                    ref: Oe
                  }, {
                    default: h(() => [
                      (s(!0), f(w, null, j(r.columns.filter(
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
                          onChange: Ft
                        }, null, 8, ["modelValue", "input-id", "value"]),
                        c("label", {
                          for: "ColumnVisibilityCheckbox_" + l.name,
                          class: "px-1"
                        }, k(l.header || l.name), 9, sl)
                      ]))), 128))
                    ]),
                    _: 1
                  }, 512),
                  I(C(o(P), {
                    label: o(i)("Columns"),
                    icon: "pi pi-table",
                    severity: "help",
                    size: e.size,
                    onClick: t[10] || (t[10] = (l) => Oe.value.toggle(l))
                  }, null, 8, ["label", "size"]), [
                    [o(z), o(i)("Columns Control")]
                  ])
                ], 64)) : v("", !0),
                r.printable ? I((s(), b(o(P), {
                  key: 5,
                  disabled: N.value,
                  size: "small",
                  severity: "success",
                  loading: N.value || J.value,
                  icon: "pi pi-print",
                  onClick: t[11] || (t[11] = (l) => st())
                }, null, 8, ["disabled", "loading"])), [
                  [
                    o(z),
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
                  onClick: t[12] || (t[12] = (l) => le())
                }, null, 8, ["disabled", "loading"])), [
                  [
                    o(z),
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
            c("div", ul, [
              c("span", null, [
                ke.value ? (s(), f(w, { key: 0 }, [
                  X(k(o(i)("Showing start To end From filtered (Filtered From total)", {
                    start: Fe.value,
                    end: Se.value,
                    total: te.value,
                    filtered: B.value
                  })), 1)
                ], 64)) : (s(), f(w, { key: 1 }, [
                  X(k(o(i)("Showing start To end From total", {
                    start: Fe.value,
                    end: Se.value,
                    total: te.value
                  })), 1)
                ], 64))
              ]),
              p.value.length ? (s(), f("span", dl, k(o(i)("(n Records selected)", { n: p.value.length }, p.value.length)), 1)) : v("", !0)
            ])
          ]),
          paginatorend: h(() => [
            c("div", fl, [
              c("span", null, k(o(i)("Show")), 1),
              C(Bt, {
                modelValue: F.value,
                "onUpdate:modelValue": t[13] || (t[13] = (l) => F.value = l),
                size: "small",
                options: Ye.value,
                "scroll-height": "360px",
                "option-label": "label",
                "option-value": "value",
                onChange: t[14] || (t[14] = (l) => nt())
              }, null, 8, ["modelValue", "options"]),
              F.value !== -1 ? (s(), f("span", cl, k(o(i)("Entries")), 1)) : v("", !0)
            ])
          ]),
          empty: h(() => [
            c("div", vl, k(o(i)("No Data")), 1)
          ]),
          expansion: h(({ data: l }) => [
            V(e.$slots, "expander", { row: l })
          ]),
          default: h(() => [
            r.hasReorderColumn ? (s(), b(o(Y), {
              key: 0,
              "row-reorder": "",
              style: { width: "33px", "flex-grow": "1", "flex-basis": "33px" },
              "reorderable-column": !1
            })) : v("", !0),
            r.hasExpanderColumn ? (s(), b(o(Y), {
              key: 1,
              expander: "",
              style: { width: "3rem" }
            })) : v("", !0),
            r.selectable ? (s(), b(o(Y), {
              key: 2,
              "selection-mode": "multiple",
              "header-style": { width: "3rem" }
            }, {
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: fe({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ne, {
                    width: "60%",
                    height: "1rem"
                  })
                ], 4)
              ]),
              _: 1
            })) : v("", !0),
            r.hasSequenceColumn ? (s(), b(o(Y), de({
              key: 3,
              header: "#",
              style: { width: "3rem" }
            }, r.sequenceColumnProps), {
              body: h(({ index: l }) => [
                X(k(l + 1), 1)
              ]),
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: fe({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ne, {
                    width: "60%",
                    height: "1rem"
                  })
                ], 4)
              ]),
              _: 1
            }, 16)) : v("", !0),
            (s(!0), f(w, null, j(r.columns, (l) => (s(), f(w, {
              key: l.name
            }, [
              l.type !== "hidden" ? (s(), b(o(Y), de({
                key: 0,
                hidden: l.visibilityControl !== !1 ? T.value.indexOf(l.name) < 0 : o($)(l.visible) ? !l.visible : !1,
                "show-filter-operator": l.multipleFilters || !1,
                field: l.name,
                header: l.header || (r.autoI18nColumnsHeader ? o(i)(o(Tt)(l.name)) : l.name),
                "show-filter-match-modes": o($)(l.showFilterMatchModes) ? l.showFilterMatchModes : l.type === "select" ? !1 : r.enableFilterMatchModes,
                "show-add-button": o($)(l.showFilterAddButton) ? l.showFilterAddButton : r.enableFilterAddButton,
                "show-apply-button": o($)(l.showFilterApplyButton) ? l.showFilterApplyButton : l.type === "select" ? !1 : r.enableFilterApplyButton,
                "show-clear-button": o($)(l.showFilterClearButton) ? l.showFilterClearButton : l.type === "select" ? !1 : r.enableFilterClearButton,
                "max-constraints": null,
                "filter-field": l.filterField || l.name,
                "sort-field": l.sortField || l.name,
                "filter-match-mode": l.filterMatchMode || "startsWith",
                "filter-match-mode-options": Qe.value[l.type || "text"],
                sortable: o($)(l.sortable) ? l.sortable : r.enableColumnSorting,
                "body-class": l.bodyClass,
                "data-type": l.type || "text",
                style: l.style
              }, { ref_for: !0 }, l.props || {}), Nt({
                body: h(({ data: d }) => [
                  V(e.$slots, `${l.name.replace(".", "_")}ColumnBody`, {
                    row: d,
                    data: o(D)(d, l.name)
                  }, () => [
                    c("div", {
                      class: ue(
                        l.bodyClassFunction ? l.bodyClassFunction(o(D)(d, l.name)) : ""
                      )
                    }, [
                      l.html ? (s(), f("div", {
                        key: 0,
                        innerHTML: oe(l, d)
                      }, null, 8, ml)) : (s(), f(w, { key: 1 }, [
                        X(k(oe(l, d)), 1)
                      ], 64))
                    ], 2)
                  ])
                ]),
                loading: h(() => [
                  c("div", {
                    class: "flex items-center",
                    style: fe({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                  }, [
                    C(ne, {
                      width: "60%",
                      height: "1rem"
                    })
                  ], 4)
                ]),
                _: 2
              }, [
                (o($)(l.filterable) ? l.filterable : r.enableColumnFilters) ? {
                  name: "filter",
                  fn: h(({ filterModel: d, filterCallback: y }) => [
                    V(e.$slots, `${l.name.replace(".", "_")}ColumnFilter`, {
                      slotProps: { filterModel: d, filterCallback: y }
                    }, () => [
                      l.type === "date" ? (s(), b(o(Ut), {
                        key: 0,
                        "input-props": ut(y),
                        "model-value": d.value ? o(Le)(d.value).toDate() : null,
                        "date-format": "yy-mm-dd",
                        placeholder: "yyyy/mm/dddd",
                        mask: "9999-99-99",
                        "onUpdate:modelValue": (g) => d.value = g ? o(Le)(g).format("YYYY-MM-DD") : null
                      }, null, 8, ["input-props", "model-value", "onUpdate:modelValue"])) : l.type === "select" ? (s(), f(w, { key: 1 }, [
                        !o($)(l.showFilterAddButton) || l.isMultiSelect === !0 ? (s(), f(w, { key: 0 }, [
                          C(Gt, {
                            label: l.selectFilterHeader !== void 0 ? l.selectFilterHeader : l.header,
                            options: Array.isArray(l.selectOptions) ? l.selectOptions : l.selectOptions?.list ?? [],
                            "slot-props": { filterModel: d, filterCallback: y },
                            "option-value-property": l.selectValueProperty,
                            "option-label-property": l.selectLabelProperty
                          }, null, 8, ["label", "options", "slot-props", "option-value-property", "option-label-property"]),
                          d.value ? (s(), f("div", pl, [
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
                        ], 64)) : (s(), b(Jt, {
                          key: 1,
                          label: l.selectFilterHeader !== void 0 ? l.selectFilterHeader : l.header,
                          options: Array.isArray(l.selectOptions) ? l.selectOptions : l.selectOptions?.list ?? [],
                          "slot-props": { filterModel: d, filterCallback: y },
                          "option-value-property": l.selectValueProperty,
                          "option-label-property": l.selectLabelProperty
                        }, null, 8, ["label", "options", "slot-props", "option-value-property", "option-label-property"]))
                      ], 64)) : v("", !0),
                      !l.type || l.type === "text" ? I((s(), b(o(ve), {
                        key: 2,
                        modelValue: d.value,
                        "onUpdate:modelValue": (g) => d.value = g,
                        type: "text",
                        class: "p-column-filter",
                        placeholder: o(i)("Search For"),
                        onKeydown: ce((g) => y(), ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onKeydown"])), [
                        [
                          o(z),
                          o(i)("Hit enter key to filter"),
                          void 0,
                          {
                            top: !0,
                            focus: !0
                          }
                        ]
                      ]) : v("", !0),
                      l.type === "numeric" ? (s(), f(w, { key: 3 }, [
                        ["between", "notBetween"].indexOf(d.matchMode) > -1 ? (s(), f(w, { key: 0 }, j([0, 1], (g) => c("div", { key: g }, [
                          c("span", null, k(g === 0 ? o(i)("From") : o(i)("To")), 1),
                          C(o(ve), {
                            value: (d.value || [])[g],
                            type: "number",
                            onInput: (we) => d.value = [
                              g === 0 ? +we.target.value : (d.value || [])[0],
                              g === 1 ? +we.target.value : (d.value || [])[1]
                            ],
                            onKeydown: ce((we) => y(), ["enter"])
                          }, null, 8, ["value", "onInput", "onKeydown"])
                        ])), 64)) : I((s(), b(o(ve), {
                          key: 1,
                          modelValue: d.value,
                          "onUpdate:modelValue": (g) => d.value = g,
                          type: "number",
                          class: "p-column-filter",
                          placeholder: o(i)("Search For"),
                          onKeydown: ce((g) => y(), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onKeydown"])), [
                          [
                            o(z),
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
            r.toolsColumn ? (s(), b(o(Y), de({
              key: 4,
              "body-class": "p-tools-cell",
              "align-frozen": o(i)("dir"),
              frozen: r.frozenToolsColumn
            }, r.toolsColumnProps), {
              header: h(() => [...t[23] || (t[23] = [
                c("i", { class: "i-mdi-tools mx-auto" }, null, -1)
              ])]),
              body: h((l) => [
                c("div", yl, [
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
                    [o(z), o(i)("Open")]
                  ]) : v("", !0),
                  r.editable ? I((s(), b(o(P), {
                    key: 1,
                    severity: "success",
                    size: "small",
                    class: "rounded-md p-2",
                    onClick: (d) => be(l.data)
                  }, {
                    default: h(() => [...t[25] || (t[25] = [
                      c("i", { class: "i-mdi-edit" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])), [
                    [o(z), o(i)("Edit")]
                  ]) : v("", !0),
                  r.deletable ? I((s(), b(o(P), {
                    key: 2,
                    severity: "danger",
                    size: "small",
                    class: "rounded-md p-2",
                    onClick: (d) => he(l.data)
                  }, {
                    default: h(() => [...t[26] || (t[26] = [
                      c("i", { class: "i-mdi-trash" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])), [
                    [o(z), o(i)("Remove")]
                  ]) : v("", !0),
                  V(e.$slots, "toolsColumnExtraButton", {
                    row: l.data
                  })
                ])
              ]),
              loading: h(() => [
                c("div", {
                  class: "flex items-center",
                  style: fe({ height: r.itemSize + "px", "flex-grow": "1", overflow: "hidden" })
                }, [
                  C(ne, {
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
  Il as default
};
