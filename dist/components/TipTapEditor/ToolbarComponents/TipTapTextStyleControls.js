import { defineComponent as g, resolveComponent as c, openBlock as r, createElementBlock as m, createVNode as e, withCtx as s, unref as o, createBlock as a, createCommentVNode as f } from "vue";
import { useI18n as v } from "vue-i18n";
const b = { class: "inline-flex flex-wrap gap-x-1" }, C = /* @__PURE__ */ g({
  __name: "TipTapTextStyleControls",
  props: {
    editor: {},
    config: {},
    withAlignments: { type: Boolean, default: !0 },
    withScripts: { type: Boolean, default: !0 }
  },
  setup(i) {
    const { t: l } = v();
    return (A, t) => {
      const n = c("Button"), u = c("ButtonGroup");
      return r(), m("div", b, [
        e(u, null, {
          default: s(() => [
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleBold().run(),
              title: o(l)("Bold"),
              icon: "i-fe:bold",
              severity: "info",
              outlined: !i.editor.isActive("bold"),
              onClick: t[0] || (t[0] = (d) => i.editor.chain().focus().toggleBold().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleItalic().run(),
              title: o(l)("Italic"),
              icon: "i-mi:italic",
              severity: "info",
              outlined: !i.editor.isActive("italic"),
              onClick: t[1] || (t[1] = (d) => i.editor.chain().focus().toggleItalic().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleUnderline().run(),
              title: o(l)("Underline"),
              icon: "i-ri:underline",
              severity: "info",
              outlined: !i.editor.isActive("underline"),
              onClick: t[2] || (t[2] = (d) => i.editor.chain().focus().toggleUnderline().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleStrike().run(),
              title: o(l)("Strike Through"),
              icon: "i-tabler:strikethrough",
              severity: "info",
              outlined: !i.editor.isActive("strike"),
              onClick: t[3] || (t[3] = (d) => i.editor.chain().focus().toggleStrike().run())
            }, null, 8, ["disabled", "title", "outlined"])
          ]),
          _: 1
        }),
        i.withScripts ? (r(), a(u, { key: 0 }, {
          default: s(() => [
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleSubscript().run(),
              title: o(l)("Subscript"),
              icon: "i-mdi:format-subscript",
              severity: "info",
              outlined: !i.editor.isActive("subscript"),
              onClick: t[4] || (t[4] = (d) => i.editor.chain().focus().toggleSubscript().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleSuperscript().run(),
              title: o(l)("Superscript"),
              icon: "i-mdi:format-superscript",
              severity: "info",
              outlined: !i.editor.isActive("superscript"),
              onClick: t[5] || (t[5] = (d) => i.editor.chain().focus().toggleSuperscript().run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleCode().run(),
              title: o(l)("Code"),
              icon: "i-material-symbols:code",
              severity: "info",
              outlined: !i.editor.isActive("code"),
              onClick: t[6] || (t[6] = (d) => i.editor.chain().focus().toggleCode().run())
            }, null, 8, ["disabled", "title", "outlined"])
          ]),
          _: 1
        })) : f("", !0),
        i.withAlignments ? (r(), a(u, {
          key: 1,
          style: { display: "inline-block", direction: "ltr" }
        }, {
          default: s(() => [
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleTextAlign("left").run(),
              title: o(l)("Align to Left"),
              icon: "i-mdi:format-align-left",
              severity: "info",
              outlined: !i.editor.isActive({ textAlign: "left" }),
              onClick: t[7] || (t[7] = (d) => i.editor.chain().focus().setTextAlign("left").run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleTextAlign("center").run(),
              title: o(l)("Align to Center"),
              icon: "i-mdi:format-align-center",
              severity: "info",
              outlined: !i.editor.isActive({ textAlign: "center" }),
              onClick: t[8] || (t[8] = (d) => i.editor.chain().focus().setTextAlign("center").run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().toggleTextAlign("right").run(),
              title: o(l)("Align to Right"),
              icon: "i-mdi:format-align-right",
              severity: "info",
              outlined: !i.editor.isActive({ textAlign: "right" }),
              onClick: t[9] || (t[9] = (d) => i.editor.chain().focus().setTextAlign("right").run())
            }, null, 8, ["disabled", "title", "outlined"]),
            e(n, {
              size: "small",
              disabled: !i.editor.can().chain().focus().setTextAlign("justify").run(),
              title: o(l)("Justify"),
              icon: "i-mdi:format-align-justify",
              severity: "info",
              outlined: !i.editor.isActive({ textAlign: "justify" }),
              onClick: t[10] || (t[10] = (d) => i.editor.chain().focus().setTextAlign("justify").run())
            }, null, 8, ["disabled", "title", "outlined"])
          ]),
          _: 1
        })) : f("", !0)
      ]);
    };
  }
});
export {
  C as default
};
