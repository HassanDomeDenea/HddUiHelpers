import _ from "primevue/checkbox";
import R from "primevue/inputnumber";
import C from "primevue/message";
import x from "primevue/button";
import { defineComponent as A, ref as V, useTemplateRef as p, computed as H, openBlock as k, createElementBlock as B, createVNode as s, unref as e, withCtx as w, createElementVNode as a, toDisplayString as r } from "vue";
import { uniqueId as c } from "lodash-es";
import { Menu as M } from "primevue";
import y from "primevue/popover";
import { useI18n as O } from "vue-i18n";
const z = { class: "inline-flex flex-wrap" }, P = { class: "space-y-2 p-1" }, D = { class: "text-lg font-bold" }, E = { class: "flex items-center gap-1" }, N = ["for"], S = { class: "flex items-center gap-1" }, U = ["for"], $ = { class: "flex items-center gap-1" }, j = ["for"], q = { class: "flex justify-end" }, Z = /* @__PURE__ */ A({
  __name: "TipTapTableControls",
  props: {
    editor: {},
    config: {}
  },
  setup(l) {
    const { t } = O(), o = V({
      rows: 2,
      cols: 2,
      withHeader: !0,
      rowsId: c("insert-table-rows-input"),
      colsId: c("insert-table-cols-input"),
      withHeaderId: c("insert-table-with-headers-input")
    }), u = p("insertTablePopoverRef");
    function h(i) {
      o.value.rows = 2, o.value.cols = 2, o.value.withHeader = !0, u.value.toggle(i);
    }
    function v() {
      l.editor.chain().focus().insertTable({
        rows: o.value.rows,
        cols: o.value.cols,
        withHeaderRow: o.value.withHeader
      }).run(), u.value.hide();
    }
    const m = p("tableOptionsMenuRef"), g = H(() => {
      const i = l.editor.isActive("table");
      return [
        {
          label: t("Insert Table"),
          disabled: !l.editor.can().chain().focus().insertTable().run(),
          icon: "i-mdi:table-large-plus",
          command: (n) => {
            h(n.originalEvent);
          }
        },
        { separator: !0 },
        {
          label: t("Add Column Before"),
          disabled: !i,
          icon: "i-mdi:table-column-plus-before",
          command: () => {
            l.editor.chain().focus().addColumnBefore().run();
          }
        },
        {
          label: t("Add Column After"),
          disabled: !i,
          icon: "i-mdi:table-column-plus-after",
          command: () => {
            l.editor.chain().focus().addColumnAfter().run();
          }
        },
        {
          label: t("Add Row Before"),
          disabled: !i,
          icon: "i-mdi:table-row-plus-before",
          command: () => {
            l.editor.chain().focus().addRowBefore().run();
          }
        },
        {
          label: t("Add Row After"),
          disabled: !i,
          icon: "i-mdi:table-row-plus-after",
          command: () => {
            l.editor.chain().focus().addRowAfter().run();
          }
        },
        { separator: !0 },
        {
          label: t("Delete Column"),
          disabled: !i,
          icon: "i-mdi:table-column-remove",
          command: () => {
            l.editor.chain().focus().deleteColumn().run();
          }
        },
        {
          label: t("Delete Row"),
          disabled: !i,
          icon: "i-mdi:table-row-remove",
          command: () => {
            l.editor.chain().focus().deleteRow().run();
          }
        },
        {
          label: t("Delete Table"),
          disabled: !i,
          icon: "i-mdi:table-large-remove",
          command: () => {
            l.editor.chain().focus().deleteTable().run();
          }
        },
        { separator: !0 },
        {
          label: t("Split/Merge Cells"),
          disabled: !i,
          icon: "i-mdi:table-merge-cells",
          command: () => {
            l.editor.chain().focus().mergeOrSplit().run();
          }
        }
        /*{
          label: t('Split Cell'),
          disabled: !tableIsActive,
          icon: 'i-mdi:table-split-cell',
          command: () => {
            console.log(editor.state.selection);
            // editor.state.selection
            editor.chain().focus().splitCell().run();
          },
        },*/
      ];
    });
    return (i, n) => {
      const f = x, I = C, b = R, T = _;
      return k(), B("div", z, [
        s(f, {
          size: "small",
          disabled: !l.editor.can().chain().focus().insertTable().run(),
          title: e(t)("Table Options"),
          severity: "info",
          outlined: !l.editor.isActive("table"),
          icon: "i-flowbite:insert-table-outline",
          onClick: n[0] || (n[0] = (d) => e(m).toggle(d))
        }, null, 8, ["disabled", "title", "outlined"]),
        s(e(M), {
          ref_key: "tableOptionsMenuRef",
          ref: m,
          model: e(g),
          popup: ""
        }, null, 8, ["model"]),
        s(e(y), {
          ref_key: "insertTablePopoverRef",
          ref: u
        }, {
          default: w(() => [
            a("div", P, [
              s(I, { variant: "simple" }, {
                default: w(() => [
                  a("span", D, r(e(t)("Insert Table")) + ":", 1)
                ]),
                _: 1
              }),
              a("div", E, [
                a("label", {
                  for: e(o).rowsId,
                  class: "w-24"
                }, r(e(t)("Columns")) + ": ", 9, N),
                s(b, {
                  modelValue: e(o).cols,
                  "onUpdate:modelValue": n[1] || (n[1] = (d) => e(o).cols = d),
                  "input-id": e(o).colsId,
                  size: "small",
                  fluid: "",
                  "show-buttons": "",
                  min: 1,
                  "max-fraction-digits": 0,
                  "min-fraction-digits": 0,
                  step: 1
                }, null, 8, ["modelValue", "input-id"])
              ]),
              a("div", S, [
                a("label", {
                  for: e(o).colsId,
                  class: "w-24"
                }, r(e(t)("Rows")) + ": ", 9, U),
                s(b, {
                  modelValue: e(o).rows,
                  "onUpdate:modelValue": n[2] || (n[2] = (d) => e(o).rows = d),
                  "input-id": e(o).rowsId,
                  size: "small",
                  fluid: "",
                  "show-buttons": "",
                  min: 1,
                  "max-fraction-digits": 0,
                  "min-fraction-digits": 0,
                  step: 1
                }, null, 8, ["modelValue", "input-id"])
              ]),
              a("div", $, [
                a("label", {
                  for: e(o).withHeaderId
                }, r(e(t)("With Header Row")) + ": ", 9, j),
                s(T, {
                  modelValue: e(o).withHeader,
                  "onUpdate:modelValue": n[3] || (n[3] = (d) => e(o).withHeader = d),
                  size: "small",
                  "input-id": e(o).withHeaderId,
                  binary: ""
                }, null, 8, ["modelValue", "input-id"])
              ]),
              a("div", q, [
                s(f, {
                  label: e(t)("Insert"),
                  icon: "i-mdi-check",
                  size: "small",
                  autofocus: "",
                  onClick: v
                }, null, 8, ["label"])
              ])
            ])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
export {
  Z as default
};
