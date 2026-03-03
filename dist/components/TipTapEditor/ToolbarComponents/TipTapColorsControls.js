import { defineComponent as H, resolveComponent as a, openBlock as y, createElementBlock as k, createElementVNode as r, createVNode as g, unref as l, withCtx as h, withModifiers as A, normalizeClass as c, normalizeStyle as d, createCommentVNode as T } from "vue";
const B = { class: "relative inline-flex flex-wrap" }, S = { class: "absolute" }, z = { class: "z-1 pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-end justify-stretch" }, p = /* @__PURE__ */ H({
  __name: "TipTapColorsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: f } = useI18n(), s = ref(null), n = ref(null);
    function m(i) {
      i ? (t.editor.chain().focus().setHighlight({ color: i }).run(), s.value = i) : s.value ? t.editor.chain().focus().toggleHighlight({ color: s.value }).run() : t.editor.chain().focus().toggleHighlight().run();
    }
    function v(i) {
      i ? (t.editor.chain().focus().setColor(i).run(), n.value = i) : n.value ? t.editor.chain().focus().setColor(n.value).run() : t.editor.chain().focus().unsetColor().run();
    }
    const w = ref([
      "var(--tt-color-highlight-dark-yellow)",
      "var(--tt-color-highlight-yellow)",
      "var(--tt-color-highlight-green)",
      "var(--tt-color-highlight-blue)",
      "var(--tt-color-highlight-purple)",
      "var(--tt-color-highlight-red)",
      "var(--tt-color-highlight-gray)"
    ]), C = useTemplateRef("highlightColorRef"), u = useTemplateRef("textColorPickerRef");
    return (i, e) => {
      const b = a("ColorPickerInput"), x = a("Button"), R = a("ButtonGroup");
      return y(), k("div", B, [
        r("div", S, [
          g(b, {
            ref_key: "highlightColorRef",
            ref: C,
            "model-value": t.editor.getAttributes("highlight")?.color,
            colors: l(w),
            "recent-colors-group-name": "highlight",
            clearable: "",
            "trigger-button-severity": "info",
            "as-popover": "",
            "with-trigger": !1,
            "auto-dismiss": "",
            onChange: e[0] || (e[0] = (o) => m(o))
          }, null, 8, ["model-value", "colors"]),
          g(b, {
            ref_key: "textColorPickerRef",
            ref: u,
            "model-value": t.editor.getAttributes("textStyle")?.color,
            "recent-colors-group-name": "text-colors",
            "trigger-button-severity": "info",
            clearable: "",
            "as-popover": "",
            "with-trigger": !1,
            "auto-dismiss": "",
            onChange: e[1] || (e[1] = (o) => v(o))
          }, null, 8, ["model-value"])
        ]),
        g(R, null, {
          default: h(() => [
            g(x, {
              size: "small",
              disabled: !t.editor.can().chain().focus().toggleHighlight().run(),
              title: l(f)("Highlight"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.isActive("highlight"),
              onClick: e[2] || (e[2] = (o) => m()),
              onContextmenu: e[3] || (e[3] = A((o) => l(C).toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                r("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  r("span", {
                    class: c(["absolute bottom-0 left-0 right-0 top-0 blur-sm", { "opacity-25": t.editor.isActive("highlight") }]),
                    style: d({
                      background: t.editor.getAttributes("highlight")?.color ?? l(s)
                    })
                  }, null, 6),
                  r("i", {
                    class: "i-material-symbols:format-ink-highlighter",
                    style: d({
                      color: t.editor.isActive("highlight") ? t.editor.getAttributes("highlight")?.color ?? l(s) : null
                    })
                  }, null, 4)
                ], 2)
              ]),
              _: 1
            }, 8, ["disabled", "title", "outlined"]),
            g(x, {
              size: "small",
              disabled: !t.editor.can().chain().focus().setColor().run(),
              title: l(f)("Text Color"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.getAttributes("textStyle")?.color,
              onClick: e[4] || (e[4] = (o) => l(n) && !t.editor.getAttributes("textStyle")?.color ? v() : l(u).toggle(o)),
              onContextmenu: e[5] || (e[5] = A((o) => l(u).toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                r("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  r("span", z, [
                    t.editor.getAttributes("textStyle")?.color ?? l(n) ? (y(), k("i", {
                      key: 0,
                      class: "i-fluent:text-color-accent-20-regular scale-x-140 mb-[-4px]",
                      style: d({ background: t.editor.getAttributes("textStyle")?.color ?? l(n) })
                    }, null, 4)) : T("", !0)
                  ]),
                  e[6] || (e[6] = r("i", { class: "i-ooui:larger-text transform-origin-top-center scale-90" }, null, -1))
                ], 2)
              ]),
              _: 1
            }, 8, ["disabled", "title", "outlined"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  p as default
};
