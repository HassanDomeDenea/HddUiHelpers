import { defineComponent as R, ref as x, useTemplateRef as v, computed as A, resolveComponent as r, openBlock as V, createElementBlock as H, createVNode as a, unref as s, withCtx as w, createElementVNode as n, toDisplayString as u } from "vue";
import { uniqueId as m } from "lodash-es";
import { Menu as k } from "primevue";
import M from "primevue/popover";
import { useI18n as B } from "vue-i18n";
const y = { class: "inline-flex flex-wrap" }, O = { class: "space-y-2 p-1" }, _ = { class: "text-lg font-bold" }, z = { class: "flex items-center gap-1" }, P = ["for"], D = { class: "flex items-center gap-1" }, N = ["for"], E = { class: "flex items-center gap-1" }, S = ["for"], U = { class: "flex justify-end" }, J = /* @__PURE__ */ R({
  __name: "TipTapTableControls",
  props: {
    editor: {},
    config: {}
  },
  setup(o) {
    const { t: l } = B(), e = x({
      rows: 2,
      cols: 2,
      withHeader: !0,
      rowsId: m("insert-table-rows-input"),
      colsId: m("insert-table-cols-input"),
      withHeaderId: m("insert-table-with-headers-input")
    }), c = v("insertTablePopoverRef");
    function h(t) {
      e.value.rows = 2, e.value.cols = 2, e.value.withHeader = !0, c.value.toggle(t);
    }
    function g() {
      o.editor.chain().focus().insertTable({
        rows: e.value.rows,
        cols: e.value.cols,
        withHeaderRow: e.value.withHeader
      }).run(), c.value.hide();
    }
    const f = v("tableOptionsMenuRef"), I = A(() => {
      const t = o.editor.isActive("table");
      return [
        {
          label: l("Insert Table"),
          disabled: !o.editor.can().chain().focus().insertTable().run(),
          icon: "i-mdi:table-large-plus",
          command: (i) => {
            h(i.originalEvent);
          }
        },
        { separator: !0 },
        {
          label: l("Add Column Before"),
          disabled: !t,
          icon: "i-mdi:table-column-plus-before",
          command: () => {
            o.editor.chain().focus().addColumnBefore().run();
          }
        },
        {
          label: l("Add Column After"),
          disabled: !t,
          icon: "i-mdi:table-column-plus-after",
          command: () => {
            o.editor.chain().focus().addColumnAfter().run();
          }
        },
        {
          label: l("Add Row Before"),
          disabled: !t,
          icon: "i-mdi:table-row-plus-before",
          command: () => {
            o.editor.chain().focus().addRowBefore().run();
          }
        },
        {
          label: l("Add Row After"),
          disabled: !t,
          icon: "i-mdi:table-row-plus-after",
          command: () => {
            o.editor.chain().focus().addRowAfter().run();
          }
        },
        { separator: !0 },
        {
          label: l("Delete Column"),
          disabled: !t,
          icon: "i-mdi:table-column-remove",
          command: () => {
            o.editor.chain().focus().deleteColumn().run();
          }
        },
        {
          label: l("Delete Row"),
          disabled: !t,
          icon: "i-mdi:table-row-remove",
          command: () => {
            o.editor.chain().focus().deleteRow().run();
          }
        },
        {
          label: l("Delete Table"),
          disabled: !t,
          icon: "i-mdi:table-large-remove",
          command: () => {
            o.editor.chain().focus().deleteTable().run();
          }
        },
        { separator: !0 },
        {
          label: l("Split/Merge Cells"),
          disabled: !t,
          icon: "i-mdi:table-merge-cells",
          command: () => {
            o.editor.chain().focus().mergeOrSplit().run();
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
    return (t, i) => {
      const b = r("Button"), T = r("Message"), p = r("InputNumber"), C = r("Checkbox");
      return V(), H("div", y, [
        a(b, {
          size: "small",
          disabled: !o.editor.can().chain().focus().insertTable().run(),
          title: s(l)("Table Options"),
          severity: "info",
          outlined: !o.editor.isActive("table"),
          icon: "i-flowbite:insert-table-outline",
          onClick: i[0] || (i[0] = (d) => f.value.toggle(d))
        }, null, 8, ["disabled", "title", "outlined"]),
        a(s(k), {
          ref_key: "tableOptionsMenuRef",
          ref: f,
          model: I.value,
          popup: ""
        }, null, 8, ["model"]),
        a(s(M), {
          ref_key: "insertTablePopoverRef",
          ref: c
        }, {
          default: w(() => [
            n("div", O, [
              a(T, { variant: "simple" }, {
                default: w(() => [
                  n("span", _, u(s(l)("Insert Table")) + ":", 1)
                ]),
                _: 1
              }),
              n("div", z, [
                n("label", {
                  for: e.value.rowsId,
                  class: "w-24"
                }, u(s(l)("Columns")) + ": ", 9, P),
                a(p, {
                  modelValue: e.value.cols,
                  "onUpdate:modelValue": i[1] || (i[1] = (d) => e.value.cols = d),
                  "input-id": e.value.colsId,
                  size: "small",
                  fluid: "",
                  "show-buttons": "",
                  min: 1,
                  "max-fraction-digits": 0,
                  "min-fraction-digits": 0,
                  step: 1
                }, null, 8, ["modelValue", "input-id"])
              ]),
              n("div", D, [
                n("label", {
                  for: e.value.colsId,
                  class: "w-24"
                }, u(s(l)("Rows")) + ": ", 9, N),
                a(p, {
                  modelValue: e.value.rows,
                  "onUpdate:modelValue": i[2] || (i[2] = (d) => e.value.rows = d),
                  "input-id": e.value.rowsId,
                  size: "small",
                  fluid: "",
                  "show-buttons": "",
                  min: 1,
                  "max-fraction-digits": 0,
                  "min-fraction-digits": 0,
                  step: 1
                }, null, 8, ["modelValue", "input-id"])
              ]),
              n("div", E, [
                n("label", {
                  for: e.value.withHeaderId
                }, u(s(l)("With Header Row")) + ": ", 9, S),
                a(C, {
                  modelValue: e.value.withHeader,
                  "onUpdate:modelValue": i[3] || (i[3] = (d) => e.value.withHeader = d),
                  size: "small",
                  "input-id": e.value.withHeaderId,
                  binary: ""
                }, null, 8, ["modelValue", "input-id"])
              ]),
              n("div", U, [
                a(b, {
                  label: s(l)("Insert"),
                  icon: "i-mdi-check",
                  size: "small",
                  autofocus: "",
                  onClick: g
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
  J as default
};
