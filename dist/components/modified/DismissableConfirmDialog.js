import y from "primevue/dialog";
import v from "primevue/button";
import a from "primevue/confirmationeventbus";
import L from "primevue/confirmdialog";
import { openBlock as c, createBlock as m, normalizeClass as d, createSlots as f, withCtx as r, createElementBlock as u, Fragment as b, renderSlot as l, resolveDynamicComponent as g, mergeProps as s, createCommentVNode as j, createElementVNode as p, toDisplayString as B, createVNode as k } from "vue";
import { _ as P } from "../../_plugin-vue_export-helper-CHgC5LLL.js";
const D = {
  name: "DismissableConfirmDialog",
  components: {
    Dialog: y,
    Button: v
  },
  extends: L,
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
function F(e, i, I, S, n, o) {
  const h = v, C = y;
  return c(), m(C, {
    visible: n.visible,
    "onUpdate:visible": [
      i[2] || (i[2] = (t) => n.visible = t),
      o.onHide
    ],
    role: "alertdialog",
    class: d(e.cx("root")),
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
      e.$slots.container ? j("", !0) : (c(), u(b, { key: 0 }, [
        e.$slots.message ? (c(), m(g(e.$slots.message), {
          key: 1,
          message: n.confirmation
        }, null, 8, ["message"])) : (c(), u(b, { key: 0 }, [
          l(e.$slots, "icon", {}, () => [
            e.$slots.icon ? (c(), m(g(e.$slots.icon), {
              key: 0,
              class: d(e.cx("icon"))
            }, null, 8, ["class"])) : n.confirmation.icon ? (c(), u("span", s({
              key: 1,
              class: [n.confirmation.icon, e.cx("icon")]
            }, e.ptm("icon")), null, 16)) : j("", !0)
          ]),
          p("span", s({
            class: e.cx("message")
          }, e.ptm("message")), B(o.message), 17)
        ], 64))
      ], 64))
    ]),
    _: 2
  }, [
    e.$slots.container ? {
      name: "container",
      fn: r((t) => [
        l(e.$slots, "container", {
          message: n.confirmation,
          closeCallback: t.onclose,
          acceptCallback: o.accept,
          rejectCallback: o.reject
        })
      ]),
      key: "0"
    } : void 0,
    e.$slots.container ? void 0 : {
      name: "footer",
      fn: r(() => [
        k(h, s({
          class: [e.cx("pcRejectButton"), n.confirmation.rejectClass],
          autofocus: o.autoFocusReject,
          unstyled: e.unstyled,
          text: n.confirmation.rejectProps?.text || !1
        }, n.confirmation.rejectProps, {
          label: o.rejectLabel,
          pt: e.ptm("pcRejectButton"),
          onClick: i[0] || (i[0] = (t) => o.reject())
        }), f({ _: 2 }, [
          o.rejectIcon || e.$slots.rejecticon ? {
            name: "icon",
            fn: r((t) => [
              l(e.$slots, "rejecticon", {}, () => [
                p("span", s({
                  class: [o.rejectIcon, t.class]
                }, e.ptm("pcRejectButton").icon, { "data-pc-section": "rejectbuttonicon" }), null, 16)
              ])
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["class", "autofocus", "unstyled", "text", "label", "pt"]),
        k(h, s({
          label: o.acceptLabel,
          class: [e.cx("pcAcceptButton"), n.confirmation.acceptClass],
          autofocus: o.autoFocusAccept,
          unstyled: e.unstyled
        }, n.confirmation.acceptProps, {
          pt: e.ptm("pcAcceptButton"),
          onClick: i[1] || (i[1] = (t) => o.accept())
        }), f({ _: 2 }, [
          o.acceptIcon || e.$slots.accepticon ? {
            name: "icon",
            fn: r((t) => [
              l(e.$slots, "accepticon", {}, () => [
                p("span", s({
                  class: [o.acceptIcon, t.class]
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
const O = /* @__PURE__ */ P(D, [["render", F]]);
export {
  O as default
};
