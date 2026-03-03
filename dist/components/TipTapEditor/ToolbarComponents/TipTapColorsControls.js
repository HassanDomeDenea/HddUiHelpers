import { defineComponent as S, ref as g, useTemplateRef as y, resolveComponent as a, openBlock as k, createElementBlock as A, createElementVNode as i, createVNode as s, withCtx as h, withModifiers as w, unref as H, normalizeClass as c, normalizeStyle as d, createCommentVNode as T } from "vue";
import { useI18n as z } from "vue-i18n";
const P = { class: "relative inline-flex flex-wrap" }, p = { class: "absolute" }, j = { class: "z-1 pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-end justify-stretch" }, V = /* @__PURE__ */ S({
  __name: "TipTapColorsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: f } = z(), n = g(null), r = g(null);
    function m(l) {
      l ? (t.editor.chain().focus().setHighlight({ color: l }).run(), n.value = l) : n.value ? t.editor.chain().focus().toggleHighlight({ color: n.value }).run() : t.editor.chain().focus().toggleHighlight().run();
    }
    function v(l) {
      l ? (t.editor.chain().focus().setColor(l).run(), r.value = l) : r.value ? t.editor.chain().focus().setColor(r.value).run() : t.editor.chain().focus().unsetColor().run();
    }
    const R = g([
      "var(--tt-color-highlight-dark-yellow)",
      "var(--tt-color-highlight-yellow)",
      "var(--tt-color-highlight-green)",
      "var(--tt-color-highlight-blue)",
      "var(--tt-color-highlight-purple)",
      "var(--tt-color-highlight-red)",
      "var(--tt-color-highlight-gray)"
    ]), C = y("highlightColorRef"), u = y("textColorPickerRef");
    return (l, e) => {
      const b = a("ColorPickerInput"), x = a("Button"), B = a("ButtonGroup");
      return k(), A("div", P, [
        i("div", p, [
          s(b, {
            ref_key: "highlightColorRef",
            ref: C,
            "model-value": t.editor.getAttributes("highlight")?.color,
            colors: R.value,
            "recent-colors-group-name": "highlight",
            clearable: "",
            "trigger-button-severity": "info",
            "as-popover": "",
            "with-trigger": !1,
            "auto-dismiss": "",
            onChange: e[0] || (e[0] = (o) => m(o))
          }, null, 8, ["model-value", "colors"]),
          s(b, {
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
        s(B, null, {
          default: h(() => [
            s(x, {
              size: "small",
              disabled: !t.editor.can().chain().focus().toggleHighlight().run(),
              title: H(f)("Highlight"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.isActive("highlight"),
              onClick: e[2] || (e[2] = (o) => m()),
              onContextmenu: e[3] || (e[3] = w((o) => C.value.toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                i("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  i("span", {
                    class: c(["absolute bottom-0 left-0 right-0 top-0 blur-sm", { "opacity-25": t.editor.isActive("highlight") }]),
                    style: d({
                      background: t.editor.getAttributes("highlight")?.color ?? n.value
                    })
                  }, null, 6),
                  i("i", {
                    class: "i-material-symbols:format-ink-highlighter",
                    style: d({
                      color: t.editor.isActive("highlight") ? t.editor.getAttributes("highlight")?.color ?? n.value : null
                    })
                  }, null, 4)
                ], 2)
              ]),
              _: 1
            }, 8, ["disabled", "title", "outlined"]),
            s(x, {
              size: "small",
              disabled: !t.editor.can().chain().focus().setColor("").run(),
              title: H(f)("Text Color"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.getAttributes("textStyle")?.color,
              onClick: e[4] || (e[4] = (o) => r.value && !t.editor.getAttributes("textStyle")?.color ? v() : u.value.toggle(o)),
              onContextmenu: e[5] || (e[5] = w((o) => u.value.toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                i("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  i("span", j, [
                    t.editor.getAttributes("textStyle")?.color ?? r.value ? (k(), A("i", {
                      key: 0,
                      class: "i-fluent:text-color-accent-20-regular scale-x-140 mb-[-4px]",
                      style: d({ background: t.editor.getAttributes("textStyle")?.color ?? r.value })
                    }, null, 4)) : T("", !0)
                  ]),
                  e[6] || (e[6] = i("i", { class: "i-ooui:larger-text transform-origin-top-center scale-90" }, null, -1))
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
  V as default
};
