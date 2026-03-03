import x from "primevue/select";
import { defineComponent as b, computed as s, openBlock as d, createElementBlock as m, createVNode as p, unref as o, withCtx as u, createElementVNode as a, normalizeClass as g, toDisplayString as h, createCommentVNode as z } from "vue";
import { sortBy as S } from "lodash-es";
import { useI18n as y } from "vue-i18n";
const F = { class: "inline-flex flex-wrap" }, w = { key: 0 }, B = /* @__PURE__ */ b({
  __name: "TipTapFontControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: i } = y(), c = s(() => [
      { value: "", label: "-" },
      ...[
        "8px",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "28px",
        "32px",
        "36px",
        "40px",
        "44px",
        "48px",
        "60px",
        "72px"
      ].map((n) => ({
        label: n,
        value: n
      }))
    ]), v = s(() => [
      { value: "", label: "-" },
      ...["0.5", "0.75", "0.9", "1", "1.15", "1.25", "1.5", "1.75", "2", "2.5", "3", "4", "5"].map(
        (n) => ({
          label: n,
          value: n
        })
      )
    ]), f = s(() => [
      { value: "", label: "-" },
      ...S(
        [
          { value: "tajawal", label: "Tajawal" },
          { value: "amiri", label: "Amiri" },
          { value: "mirza", label: "Mirza" },
          { value: "times", label: "Times New Roman" },
          { value: "aref", label: "Aref Ruqaa" },
          { value: "arial", label: "Arial" }
        ],
        "label"
      )
    ]);
    return (n, l) => {
      const r = x;
      return d(), m("div", F, [
        p(r, {
          class: "w-[100px]",
          size: "small",
          variant: "filled",
          "model-value": t.editor.getAttributes("textStyle")?.fontSize || "",
          options: o(c),
          title: o(i)("Font Size"),
          "option-value": "value",
          "option-label": "label",
          placeholder: o(i)("Size"),
          onChange: l[0] || (l[0] = (e) => e.value ? t.editor.chain().focus().setFontSize(e.value).run() : t.editor.chain().focus().unsetFontSize().run())
        }, {
          dropdownicon: u(() => [...l[3] || (l[3] = [
            a("i", { class: "i-bx:font-size" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"]),
        p(r, {
          class: "w-[100px]",
          size: "small",
          variant: "filled",
          "model-value": t.editor.getAttributes("textStyle")?.lineHeight || "",
          options: o(v),
          title: o(i)("Lines Spacing"),
          "option-value": "value",
          "option-label": "label",
          placeholder: o(i)("Spacing"),
          onChange: l[1] || (l[1] = (e) => e.value ? t.editor.chain().focus().setLineHeight(e.value).run() : t.editor.chain().focus().unsetLineHeight().run())
        }, {
          dropdownicon: u(() => [...l[4] || (l[4] = [
            a("i", { class: "i-tabler:line-height" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"]),
        p(r, {
          size: "small",
          class: "w-[140px]",
          "model-value": t.editor.getAttributes("textStyle")?.fontFamily || "",
          options: o(f),
          title: o(i)("Font Type"),
          "option-value": "value",
          "option-label": "label",
          placeholder: o(i)("Font"),
          onChange: l[2] || (l[2] = (e) => e.value ? t.editor.chain().focus().setFontFamily(e.value).run() : t.editor.chain().focus().unsetFontFamily().run())
        }, {
          option: u((e) => [
            a("div", {
              class: g([[{ "font-bold": e.selected }, "font-" + e.option.value], "dir-ltr inline-block"])
            }, [
              a("span", null, h(e.option.label), 1),
              e.option.value ? (d(), m("span", w, " - ABC def 123 أبجد هوز")) : z("", !0)
            ], 2)
          ]),
          dropdownicon: u(() => [...l[5] || (l[5] = [
            a("i", { class: "i-ri:font-family" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"])
      ]);
    };
  }
});
export {
  B as _
};
