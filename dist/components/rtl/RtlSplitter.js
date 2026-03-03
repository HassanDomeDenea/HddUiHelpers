import { getWidth as f, getHeight as g, getOuterWidth as u, getOuterHeight as p } from "@primeuix/utils/dom";
import { isArray as S } from "@primeuix/utils/object";
import { getVNodeProp as d } from "@primevue/core/utils";
import v from "./RtlBaseSplitter.js";
import { openBlock as o, createElementBlock as m, mergeProps as c, Fragment as z, renderList as E, createBlock as P, resolveDynamicComponent as L, createElementVNode as x, createCommentVNode as y } from "vue";
import { _ as T } from "../../_plugin-vue_export-helper-CHgC5LLL.js";
const b = {
  name: "RtlSplitter",
  extends: v,
  inheritAttrs: !1,
  emits: ["resizestart", "resizeend", "resize"],
  dragging: !1,
  mouseMoveListener: null,
  mouseUpListener: null,
  touchMoveListener: null,
  touchEndListener: null,
  size: null,
  gutterElement: null,
  startPos: null,
  prevPanelElement: null,
  nextPanelElement: null,
  nextPanelSize: null,
  prevPanelSize: null,
  panelSizes: null,
  prevPanelIndex: null,
  timer: null,
  data() {
    return {
      prevSize: null
    };
  },
  computed: {
    panels() {
      const e = [];
      return this.$slots.default().forEach((t) => {
        this.isSplitterPanel(t) ? e.push(t) : Array.isArray(t.children) && t.children.forEach((s) => {
          this.isSplitterPanel(s) && e.push(s);
        });
      }), e;
    },
    gutterStyle() {
      return this.horizontal ? { width: `${this.gutterSize}px` } : { height: `${this.gutterSize}px` };
    },
    horizontal() {
      return this.layout === "horizontal";
    },
    getPTOptions() {
      return {
        context: {
          nested: this.$parentInstance?.nestedState
        }
      };
    }
  },
  mounted() {
    if (this.panels && this.panels.length) {
      let e = !1;
      if (this.isStateful() && (e = this.restoreState()), !e) {
        const t = [...this.$el.children].filter(
          (i) => i.getAttribute("data-pc-name") === "splitterpanel"
        ), s = [];
        this.panels.map((i, r) => {
          const h = (i.props && i.props.computedSize ? i.props.computedSize : null) || 100 / this.panels.length;
          s[r] = h, t[r].style.flexBasis = `calc(${h}% - ${(this.panels.length - 1) * this.gutterSize}px)`;
        }), this.panelSizes = s, this.prevSize = Number.parseFloat(s[0]).toFixed(4);
      }
    }
  },
  beforeUnmount() {
    this.clear(), this.unbindMouseListeners();
  },
  methods: {
    isSplitterPanel(e) {
      return e.type.name === "SplitterPanel";
    },
    onResizeStart(e, t, s) {
      this.gutterElement = e.currentTarget || e.target.parentElement, this.computedSize = this.horizontal ? f(this.$el) : g(this.$el), s || (this.dragging = !0, this.startPos = this.layout === "horizontal" ? e.pageX || e.changedTouches[0].pageX : e.pageY || e.changedTouches[0].pageY), this.prevPanelElement = this.gutterElement.previousElementSibling, this.nextPanelElement = this.gutterElement.nextElementSibling, s ? (this.prevPanelSize = this.horizontal ? u(this.prevPanelElement, !0) : p(this.prevPanelElement, !0), this.nextPanelSize = this.horizontal ? u(this.nextPanelElement, !0) : p(this.nextPanelElement, !0)) : (this.prevPanelSize = 100 * (this.horizontal ? u(this.prevPanelElement, !0) : p(this.prevPanelElement, !0)) / this.size, this.nextPanelSize = 100 * (this.horizontal ? u(this.nextPanelElement, !0) : p(this.nextPanelElement, !0)) / this.size), this.prevPanelIndex = t, this.$emit("resizestart", { originalEvent: e, sizes: this.panelSizes }), this.$refs.gutter[t].setAttribute("data-p-gutter-resizing", !0), this.$el.setAttribute("data-p-resizing", !0);
    },
    onResize(e, t, s) {
      let i, r, n;
      s ? this.horizontal ? (r = 100 * (this.prevPanelSize + t) / this.size, n = 100 * (this.nextPanelSize - t) / this.size) : (r = 100 * (this.prevPanelSize - t) / this.size, n = 100 * (this.nextPanelSize + t) / this.size) : (this.horizontal ? i = e.pageX * 100 / this.size - this.startPos * 100 / this.size : i = e.pageY * 100 / this.size - this.startPos * 100 / this.size, this.horizontal && window.getComputedStyle(this.$refs.root).direction === "rtl" && (i = -i), r = this.prevPanelSize + i, n = this.nextPanelSize - i), this.validateResize(r, n) && (this.prevPanelElement.style.flexBasis = `calc(${r}% - ${(this.panels.length - 1) * this.gutterSize}px)`, this.nextPanelElement.style.flexBasis = `calc(${n}% - ${(this.panels.length - 1) * this.gutterSize}px)`, this.panelSizes[this.prevPanelIndex] = r, this.panelSizes[this.prevPanelIndex + 1] = n, this.prevSize = Number.parseFloat(r).toFixed(4)), this.$emit("resize", { originalEvent: e, sizes: this.panelSizes });
    },
    onResizeEnd(e) {
      this.isStateful() && this.saveState(), this.$emit("resizeend", { originalEvent: e, sizes: this.panelSizes }), this.$refs.gutter.forEach((t) => t.setAttribute("data-p-gutter-resizing", !1)), this.$el.setAttribute("data-p-resizing", !1), this.clear();
    },
    repeat(e, t, s) {
      this.onResizeStart(e, t, !0), this.onResize(e, s, !0);
    },
    setTimer(e, t, s) {
      this.timer || (this.timer = setInterval(() => {
        this.repeat(e, t, s);
      }, 40));
    },
    clearTimer() {
      this.timer && (clearInterval(this.timer), this.timer = null);
    },
    onGutterKeyUp() {
      this.clearTimer(), this.onResizeEnd();
    },
    onGutterKeyDown(e, t) {
      switch (e.code) {
        case "ArrowLeft": {
          this.layout === "horizontal" && this.setTimer(e, t, this.step * -1), e.preventDefault();
          break;
        }
        case "ArrowRight": {
          this.layout === "horizontal" && this.setTimer(e, t, this.step), e.preventDefault();
          break;
        }
        case "ArrowDown": {
          this.layout === "vertical" && this.setTimer(e, t, this.step * -1), e.preventDefault();
          break;
        }
        case "ArrowUp": {
          this.layout === "vertical" && this.setTimer(e, t, this.step), e.preventDefault();
          break;
        }
      }
    },
    onGutterMouseDown(e, t) {
      this.onResizeStart(e, t), this.bindMouseListeners();
    },
    onGutterTouchStart(e, t) {
      this.onResizeStart(e, t), this.bindTouchListeners(), e.preventDefault();
    },
    onGutterTouchMove(e) {
      this.onResize(e), e.preventDefault();
    },
    onGutterTouchEnd(e) {
      this.onResizeEnd(e), this.unbindTouchListeners(), e.preventDefault();
    },
    bindMouseListeners() {
      this.mouseMoveListener || (this.mouseMoveListener = (e) => this.onResize(e), document.addEventListener("mousemove", this.mouseMoveListener)), this.mouseUpListener || (this.mouseUpListener = (e) => {
        this.onResizeEnd(e), this.unbindMouseListeners();
      }, document.addEventListener("mouseup", this.mouseUpListener));
    },
    bindTouchListeners() {
      this.touchMoveListener || (this.touchMoveListener = (e) => this.onResize(e.changedTouches[0]), document.addEventListener("touchmove", this.touchMoveListener)), this.touchEndListener || (this.touchEndListener = (e) => {
        this.resizeEnd(e), this.unbindTouchListeners();
      }, document.addEventListener("touchend", this.touchEndListener));
    },
    validateResize(e, t) {
      if (e > 100 || e < 0 || t > 100 || t < 0) return !1;
      const s = d(this.panels[this.prevPanelIndex], "minSize");
      if (this.panels[this.prevPanelIndex].props && s && s > e)
        return !1;
      const i = d(this.panels[this.prevPanelIndex + 1], "minSize");
      return !(this.panels[this.prevPanelIndex + 1].props && i && i > t);
    },
    unbindMouseListeners() {
      this.mouseMoveListener && (document.removeEventListener("mousemove", this.mouseMoveListener), this.mouseMoveListener = null), this.mouseUpListener && (document.removeEventListener("mouseup", this.mouseUpListener), this.mouseUpListener = null);
    },
    unbindTouchListeners() {
      this.touchMoveListener && (document.removeEventListener("touchmove", this.touchMoveListener), this.touchMoveListener = null), this.touchEndListener && (document.removeEventListener("touchend", this.touchEndListener), this.touchEndListener = null);
    },
    clear() {
      this.dragging = !1, this.computedSize = null, this.startPos = null, this.prevPanelElement = null, this.nextPanelElement = null, this.prevPanelSize = null, this.nextPanelSize = null, this.gutterElement = null, this.prevPanelIndex = null;
    },
    isStateful() {
      return this.stateKey != null;
    },
    getStorage() {
      switch (this.stateStorage) {
        case "local":
          return window.localStorage;
        case "session":
          return window.sessionStorage;
        default:
          throw new Error(
            `${this.stateStorage} is not a valid value for the state storage, supported values are "local" and "session".`
          );
      }
    },
    saveState() {
      S(this.panelSizes) && this.getStorage().setItem(this.stateKey, JSON.stringify(this.panelSizes));
    },
    restoreState() {
      const t = this.getStorage().getItem(this.stateKey);
      return t ? (this.panelSizes = JSON.parse(t), [...this.$el.children].filter(
        (i) => i.getAttribute("data-pc-name") === "splitterpanel"
      ).forEach((i, r) => {
        i.style.flexBasis = `calc(${this.panelSizes[r]}% - ${(this.panels.length - 1) * this.gutterSize}px)`;
      }), !0) : !1;
    }
  }
}, M = ["onMousedown", "onTouchstart", "onTouchmove", "onTouchend"], w = ["aria-orientation", "aria-valuenow", "onKeydown"];
function R(e, t, s, i, r, n) {
  return o(), m("div", c({
    ref: "root",
    class: e.cx("root"),
    style: e.sx("root"),
    "data-p-resizing": !1
  }, e.ptmi("root", n.getPTOptions)), [
    (o(!0), m(z, null, E(n.panels, (h, a) => (o(), m(z, { key: a }, [
      (o(), P(L(h), { tabindex: "-1" })),
      a !== n.panels.length - 1 ? (o(), m("div", c({
        key: 0,
        ref_for: !0,
        ref: "gutter",
        class: e.cx("gutter"),
        role: "separator",
        tabindex: "-1",
        "data-p-gutter-resizing": !1
      }, { ref_for: !0 }, e.ptm("gutter"), {
        onMousedown: (l) => n.onGutterMouseDown(l, a),
        onTouchstart: (l) => n.onGutterTouchStart(l, a),
        onTouchmove: (l) => n.onGutterTouchMove(l, a),
        onTouchend: (l) => n.onGutterTouchEnd(l, a)
      }), [
        x("div", c({
          class: e.cx("gutterHandle"),
          tabindex: "0",
          style: [n.gutterStyle],
          "aria-orientation": e.layout,
          "aria-valuenow": r.prevSize
        }, { ref_for: !0 }, e.ptm("gutterHandle"), {
          onKeyup: t[0] || (t[0] = (...l) => n.onGutterKeyUp && n.onGutterKeyUp(...l)),
          onKeydown: (l) => n.onGutterKeyDown(l, a)
        }), null, 16, w)
      ], 16, M)) : y("", !0)
    ], 64))), 128))
  ], 16);
}
const K = /* @__PURE__ */ T(b, [["render", R]]);
export {
  K as default
};
