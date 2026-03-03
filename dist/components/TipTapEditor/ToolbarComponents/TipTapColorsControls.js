import p from "primevue/buttongroup";
import S from "primevue/button";
import { _ as T } from "../../../ColorPickerInput.vue_vue_type_script_setup_true_lang--CG2xF6W.js";
import { defineComponent as z, ref as u, useTemplateRef as y, openBlock as k, createElementBlock as A, createElementVNode as r, createVNode as g, unref as i, withCtx as h, withModifiers as w, normalizeClass as c, normalizeStyle as d, createCommentVNode as B } from "vue";
import { useI18n as P } from "vue-i18n";
const j = { class: "relative inline-flex flex-wrap" }, N = { class: "absolute" }, V = { class: "z-1 pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-end justify-stretch" }, M = /* @__PURE__ */ z({
  __name: "TipTapColorsControls",
  props: {
    editor: {},
    config: {}
  },
  setup(t) {
    const { t: f } = P(), s = u(null), n = u(null);
    function m(l) {
      l ? (t.editor.chain().focus().setHighlight({ color: l }).run(), s.value = l) : s.value ? t.editor.chain().focus().toggleHighlight({ color: s.value }).run() : t.editor.chain().focus().toggleHighlight().run();
    }
    function v(l) {
      l ? (t.editor.chain().focus().setColor(l).run(), n.value = l) : n.value ? t.editor.chain().focus().setColor(n.value).run() : t.editor.chain().focus().unsetColor().run();
    }
    const H = u([
      "var(--tt-color-highlight-dark-yellow)",
      "var(--tt-color-highlight-yellow)",
      "var(--tt-color-highlight-green)",
      "var(--tt-color-highlight-blue)",
      "var(--tt-color-highlight-purple)",
      "var(--tt-color-highlight-red)",
      "var(--tt-color-highlight-gray)"
    ]), b = y("highlightColorRef"), a = y("textColorPickerRef");
    return (l, e) => {
      const C = T, x = S, R = p;
      return k(), A("div", j, [
        r("div", N, [
          g(C, {
            ref_key: "highlightColorRef",
            ref: b,
            "model-value": t.editor.getAttributes("highlight")?.color,
            colors: i(H),
            "recent-colors-group-name": "highlight",
            clearable: "",
            "trigger-button-severity": "info",
            "as-popover": "",
            "with-trigger": !1,
            "auto-dismiss": "",
            onChange: e[0] || (e[0] = (o) => m(o))
          }, null, 8, ["model-value", "colors"]),
          g(C, {
            ref_key: "textColorPickerRef",
            ref: a,
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
              title: i(f)("Highlight"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.isActive("highlight"),
              onClick: e[2] || (e[2] = (o) => m()),
              onContextmenu: e[3] || (e[3] = w((o) => i(b).toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                r("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  r("span", {
                    class: c(["absolute bottom-0 left-0 right-0 top-0 blur-sm", { "opacity-25": t.editor.isActive("highlight") }]),
                    style: d({
                      background: t.editor.getAttributes("highlight")?.color ?? i(s)
                    })
                  }, null, 6),
                  r("i", {
                    class: "i-material-symbols:format-ink-highlighter",
                    style: d({
                      color: t.editor.isActive("highlight") ? t.editor.getAttributes("highlight")?.color ?? i(s) : null
                    })
                  }, null, 4)
                ], 2)
              ]),
              _: 1
            }, 8, ["disabled", "title", "outlined"]),
            g(x, {
              size: "small",
              disabled: !t.editor.can().chain().focus().setColor().run(),
              title: i(f)("Text Color"),
              icon: "i-material-symbols:format-ink-highlighter",
              severity: "info",
              outlined: !t.editor.getAttributes("textStyle")?.color,
              onClick: e[4] || (e[4] = (o) => i(n) && !t.editor.getAttributes("textStyle")?.color ? v() : i(a).toggle(o)),
              onContextmenu: e[5] || (e[5] = w((o) => i(a).toggle(o), ["prevent"]))
            }, {
              icon: h((o) => [
                r("span", {
                  class: c([o.class, "relative flex items-center justify-center overflow-hidden rounded"])
                }, [
                  r("span", V, [
                    t.editor.getAttributes("textStyle")?.color ?? i(n) ? (k(), A("i", {
                      key: 0,
                      class: "i-fluent:text-color-accent-20-regular scale-x-140 mb-[-4px]",
                      style: d({ background: t.editor.getAttributes("textStyle")?.color ?? i(n) })
                    }, null, 4)) : B("", !0)
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
  M as default
};
