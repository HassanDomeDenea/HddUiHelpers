import { defineComponent as x, computed as s, resolveComponent as b, openBlock as d, createElementBlock as m, createVNode as p, unref as a, withCtx as u, createElementVNode as n, normalizeClass as g, toDisplayString as S, createCommentVNode as h } from "vue";
import { sortBy as z } from "lodash-es";
import { useI18n as y } from "vue-i18n";
const F = { class: "inline-flex flex-wrap" }, w = { key: 0 }, k = /* @__PURE__ */ x({
  __name: "TipTapFontControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: o } = y(), v = s(() => [
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
      ].map((i) => ({
        label: i,
        value: i
      }))
    ]), c = s(() => [
      { value: "", label: "-" },
      ...["0.5", "0.75", "0.9", "1", "1.15", "1.25", "1.5", "1.75", "2", "2.5", "3", "4", "5"].map(
        (i) => ({
          label: i,
          value: i
        })
      )
    ]), f = s(() => [
      { value: "", label: "-" },
      ...z(
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
    return (i, l) => {
      const r = b("Select");
      return d(), m("div", F, [
        p(r, {
          class: "w-[100px]",
          size: "small",
          variant: "filled",
          "model-value": t.editor.getAttributes("textStyle")?.fontSize || "",
          options: v.value,
          title: a(o)("Font Size"),
          "option-value": "value",
          "option-label": "label",
          placeholder: a(o)("Size"),
          onChange: l[0] || (l[0] = (e) => e.value ? t.editor.chain().focus().setFontSize(e.value).run() : t.editor.chain().focus().unsetFontSize().run())
        }, {
          dropdownicon: u(() => [...l[3] || (l[3] = [
            n("i", { class: "i-bx:font-size" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"]),
        p(r, {
          class: "w-[100px]",
          size: "small",
          variant: "filled",
          "model-value": t.editor.getAttributes("textStyle")?.lineHeight || "",
          options: c.value,
          title: a(o)("Lines Spacing"),
          "option-value": "value",
          "option-label": "label",
          placeholder: a(o)("Spacing"),
          onChange: l[1] || (l[1] = (e) => e.value ? t.editor.chain().focus().setLineHeight(e.value).run() : t.editor.chain().focus().unsetLineHeight().run())
        }, {
          dropdownicon: u(() => [...l[4] || (l[4] = [
            n("i", { class: "i-tabler:line-height" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"]),
        p(r, {
          size: "small",
          class: "w-[140px]",
          "model-value": t.editor.getAttributes("textStyle")?.fontFamily || "",
          options: f.value,
          title: a(o)("Font Type"),
          "option-value": "value",
          "option-label": "label",
          placeholder: a(o)("Font"),
          onChange: l[2] || (l[2] = (e) => e.value ? t.editor.chain().focus().setFontFamily(e.value).run() : t.editor.chain().focus().unsetFontFamily().run())
        }, {
          option: u((e) => [
            n("div", {
              class: g([[{ "font-bold": e.selected }, "font-" + e.option.value], "dir-ltr inline-block"])
            }, [
              n("span", null, S(e.option.label), 1),
              e.option.value ? (d(), m("span", w, " - ABC def 123 أبجد هوز")) : h("", !0)
            ], 2)
          ]),
          dropdownicon: u(() => [...l[5] || (l[5] = [
            n("i", { class: "i-ri:font-family" }, null, -1)
          ])]),
          _: 1
        }, 8, ["model-value", "options", "title", "placeholder"])
      ]);
    };
  }
});
export {
  k as default
};
