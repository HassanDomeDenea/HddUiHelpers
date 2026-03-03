import C from "primevue/button";
import a from "primevue/confirmationeventbus";
import B from "primevue/confirmdialog";
import L from "primevue/dialog";
import { resolveComponent as d, openBlock as c, createBlock as m, normalizeClass as b, createSlots as f, withCtx as r, createElementBlock as u, Fragment as g, renderSlot as l, resolveDynamicComponent as j, mergeProps as s, createCommentVNode as k, createElementVNode as p, toDisplayString as D, createVNode as v } from "vue";
import { _ as P } from "../../_plugin-vue_export-helper-CHgC5LLL.js";
const F = {
  name: "DismissableConfirmDialog",
  components: {
    Dialog: L,
    Button: C
  },
  extends: B,
  confirmListener: null,
  closeListener: null,
  data() {
    return {
      visible: !1,
      confirmation: null
    };
  },
  computed: {
    appendTo() {
      return this.confirmation ? this.confirmation.appendTo : "body";
    },
    target() {
      return this.confirmation ? this.confirmation.target : null;
    },
    modal() {
      return this.confirmation ? this.confirmation.modal == null ? !0 : this.confirmation.modal : !0;
    },
    header() {
      return this.confirmation ? this.confirmation.header : null;
    },
    message() {
      return this.confirmation ? this.confirmation.message : null;
    },
    blockScroll() {
      return this.confirmation ? this.confirmation.blockScroll : !0;
    },
    position() {
      return this.confirmation ? this.confirmation.position : null;
    },
    acceptLabel() {
      if (this.confirmation) {
        const e = this.confirmation;
        return e.acceptLabel || e.acceptProps?.label || this.$primevue.config.locale.accept;
      }
      return this.$primevue.config.locale.accept;
    },
    rejectLabel() {
      if (this.confirmation) {
        const e = this.confirmation;
        return e.rejectLabel || e.rejectProps?.label || this.$primevue.config.locale.reject;
      }
      return this.$primevue.config.locale.reject;
    },
    acceptIcon() {
      return this.confirmation ? this.confirmation.acceptIcon : this.confirmation?.acceptProps ? this.confirmation.acceptProps.icon : null;
    },
    rejectIcon() {
      return this.confirmation ? this.confirmation.rejectIcon : this.confirmation?.rejectProps ? this.confirmation.rejectProps.icon : null;
    },
    autoFocusAccept() {
      return this.confirmation.defaultFocus === void 0 || this.confirmation.defaultFocus === "accept";
    },
    autoFocusReject() {
      return this.confirmation.defaultFocus === "reject";
    },
    closeOnEscape() {
      return this.confirmation ? this.confirmation.closeOnEscape : !0;
    }
  },
  mounted() {
    this.confirmListener = (e) => {
      e && e.group === this.group && (this.confirmation = e, this.confirmation.onShow && this.confirmation.onShow(), this.visible = !0);
    }, this.closeListener = () => {
      this.visible = !1, this.confirmation = null;
    }, a.on("confirm", this.confirmListener), a.on("close", this.closeListener);
  },
  beforeUnmount() {
    a.off("confirm", this.confirmListener), a.off("close", this.closeListener);
  },
  methods: {
    accept() {
      this.confirmation.accept && this.confirmation.accept(), this.visible = !1;
    },
    reject() {
      this.confirmation.reject && this.confirmation.reject(), this.visible = !1;
    },
    onHide() {
      this.confirmation.onHide && this.confirmation.onHide(), this.visible = !1;
    }
  }
};
function I(e, i, S, E, t, o) {
  const h = d("Button"), y = d("Dialog");
  return c(), m(y, {
    visible: t.visible,
    "onUpdate:visible": [
      i[2] || (i[2] = (n) => t.visible = n),
      o.onHide
    ],
    role: "alertdialog",
    class: b(e.cx("root")),
    modal: o.modal,
    header: o.header,
    "block-scroll": o.blockScroll,
    "append-to": o.appendTo,
    position: o.position,
    breakpoints: e.breakpoints,
    "close-on-escape": o.closeOnEscape,
    draggable: e.draggable,
    "dismissable-mask": "",
    pt: e.pt,
    unstyled: e.unstyled
  }, f({
    default: r(() => [
      e.$slots.container ? k("", !0) : (c(), u(g, { key: 0 }, [
        e.$slots.message ? (c(), m(j(e.$slots.message), {
          key: 1,
          message: t.confirmation
        }, null, 8, ["message"])) : (c(), u(g, { key: 0 }, [
          l(e.$slots, "icon", {}, () => [
            e.$slots.icon ? (c(), m(j(e.$slots.icon), {
              key: 0,
              class: b(e.cx("icon"))
            }, null, 8, ["class"])) : t.confirmation.icon ? (c(), u("span", s({
              key: 1,
              class: [t.confirmation.icon, e.cx("icon")]
            }, e.ptm("icon")), null, 16)) : k("", !0)
          ]),
          p("span", s({
            class: e.cx("message")
          }, e.ptm("message")), D(o.message), 17)
        ], 64))
      ], 64))
    ]),
    _: 2
  }, [
    e.$slots.container ? {
      name: "container",
      fn: r((n) => [
        l(e.$slots, "container", {
          message: t.confirmation,
          closeCallback: n.onclose,
          acceptCallback: o.accept,
          rejectCallback: o.reject
        })
      ]),
      key: "0"
    } : void 0,
    e.$slots.container ? void 0 : {
      name: "footer",
      fn: r(() => [
        v(h, s({
          class: [e.cx("pcRejectButton"), t.confirmation.rejectClass],
          autofocus: o.autoFocusReject,
          unstyled: e.unstyled,
          text: t.confirmation.rejectProps?.text || !1
        }, t.confirmation.rejectProps, {
          label: o.rejectLabel,
          pt: e.ptm("pcRejectButton"),
          onClick: i[0] || (i[0] = (n) => o.reject())
        }), f({ _: 2 }, [
          o.rejectIcon || e.$slots.rejecticon ? {
            name: "icon",
            fn: r((n) => [
              l(e.$slots, "rejecticon", {}, () => [
                p("span", s({
                  class: [o.rejectIcon, n.class]
                }, e.ptm("pcRejectButton").icon, { "data-pc-section": "rejectbuttonicon" }), null, 16)
              ])
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["class", "autofocus", "unstyled", "text", "label", "pt"]),
        v(h, s({
          label: o.acceptLabel,
          class: [e.cx("pcAcceptButton"), t.confirmation.acceptClass],
          autofocus: o.autoFocusAccept,
          unstyled: e.unstyled
        }, t.confirmation.acceptProps, {
          pt: e.ptm("pcAcceptButton"),
          onClick: i[1] || (i[1] = (n) => o.accept())
        }), f({ _: 2 }, [
          o.acceptIcon || e.$slots.accepticon ? {
            name: "icon",
            fn: r((n) => [
              l(e.$slots, "accepticon", {}, () => [
                p("span", s({
                  class: [o.acceptIcon, n.class]
                }, e.ptm("pcAcceptButton").icon, { "data-pc-section": "acceptbuttonicon" }), null, 16)
              ])
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["label", "class", "autofocus", "unstyled", "pt"])
      ]),
      key: "1"
    }
  ]), 1032, ["visible", "class", "modal", "header", "block-scroll", "append-to", "position", "breakpoints", "close-on-escape", "draggable", "pt", "unstyled", "onUpdate:visible"]);
}
const T = /* @__PURE__ */ P(F, [["render", I]]);
export {
  T as default
};
