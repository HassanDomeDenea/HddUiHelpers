import { defineComponent as R, resolveComponent as r, openBlock as C, createElementBlock as x, createVNode as s, unref as e, withCtx as w, createElementVNode as a, toDisplayString as u } from "vue";
import { uniqueId as m } from "lodash-es";
import { Menu as A } from "primevue";
import V from "primevue/popover";
const H = { class: "inline-flex flex-wrap" }, k = { class: "space-y-2 p-1" }, M = { class: "text-lg font-bold" }, B = { class: "flex items-center gap-1" }, y = ["for"], O = { class: "flex items-center gap-1" }, _ = ["for"], z = { class: "flex items-center gap-1" }, P = ["for"], D = { class: "flex justify-end" }, j = /* @__PURE__ */ R({
  __name: "TipTapTableControls",
  props: {
    editor: {},
    config: {}
  },
  setup(l) {
    const { t } = useI18n(), o = ref({
      rows: 2,
      cols: 2,
      withHeader: !0,
      rowsId: m("insert-table-rows-input"),
      colsId: m("insert-table-cols-input"),
      withHeaderId: m("insert-table-with-headers-input")
    }), c = useTemplateRef("insertTablePopoverRef");
    function h(i) {
      o.value.rows = 2, o.value.cols = 2, o.value.withHeader = !0, c.value.toggle(i);
    }
    function v() {
      l.editor.chain().focus().insertTable({
        rows: o.value.rows,
        cols: o.value.cols,
        withHeaderRow: o.value.withHeader
      }).run(), c.value.hide();
    }
    const f = useTemplateRef("tableOptionsMenuRef"), g = computed(() => {
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
      const b = r("Button"), I = r("Message"), p = r("InputNumber"), T = r("Checkbox");
      return C(), x("div", H, [
        s(b, {
          size: "small",
          disabled: !l.editor.can().chain().focus().insertTable().run(),
          title: e(t)("Table Options"),
          severity: "info",
          outlined: !l.editor.isActive("table"),
          icon: "i-flowbite:insert-table-outline",
          onClick: n[0] || (n[0] = (d) => e(f).toggle(d))
        }, null, 8, ["disabled", "title", "outlined"]),
        s(e(A), {
          ref_key: "tableOptionsMenuRef",
          ref: f,
          model: e(g),
          popup: ""
        }, null, 8, ["model"]),
        s(e(V), {
          ref_key: "insertTablePopoverRef",
          ref: c
        }, {
          default: w(() => [
            a("div", k, [
              s(I, { variant: "simple" }, {
                default: w(() => [
                  a("span", M, u(e(t)("Insert Table")) + ":", 1)
                ]),
                _: 1
              }),
              a("div", B, [
                a("label", {
                  for: e(o).rowsId,
                  class: "w-24"
                }, u(e(t)("Columns")) + ": ", 9, y),
                s(p, {
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
              a("div", O, [
                a("label", {
                  for: e(o).colsId,
                  class: "w-24"
                }, u(e(t)("Rows")) + ": ", 9, _),
                s(p, {
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
              a("div", z, [
                a("label", {
                  for: e(o).withHeaderId
                }, u(e(t)("With Header Row")) + ": ", 9, P),
                s(T, {
                  modelValue: e(o).withHeader,
                  "onUpdate:modelValue": n[3] || (n[3] = (d) => e(o).withHeader = d),
                  size: "small",
                  "input-id": e(o).withHeaderId,
                  binary: ""
                }, null, 8, ["modelValue", "input-id"])
              ]),
              a("div", D, [
                s(b, {
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
  j as default
};
