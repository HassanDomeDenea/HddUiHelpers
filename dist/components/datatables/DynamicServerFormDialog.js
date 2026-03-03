import { defineComponent as _, ref as y, onMounted as g, onBeforeUnmount as b, openBlock as a, createElementBlock as f, Fragment as p, renderList as k, createBlock as H, mergeProps as V, unref as x, createCommentVNode as B, nextTick as l } from "vue";
import { dynamicServerFormDialogKey as h } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import F from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { uniqueId as s, last as c } from "lodash-es";
import { useTemplateRefsList as O, useEventBus as R } from "@vueuse/core";
const q = /* @__PURE__ */ _({
  __name: "DynamicServerFormDialog",
  setup(L) {
    const t = O(), n = y([]), m = R(h);
    function d({
      event: r,
      options: o,
      row: e,
      specificId: D,
      dialogRefGetter: u
    }) {
      r === "create" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.create(e, D), u.value = () => i;
      })), r === "edit" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.edit(e), u.value = () => i;
      })), r === "delete" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.delete(e), u.value = () => i;
      }));
    }
    g(() => {
      m.on(d);
    }), b(() => {
      m.off(d);
    });
    function v(r) {
      const o = n.value.findIndex((e) => e.id === r);
      n.value[o].isVisible = !1, l(() => {
        n.value.splice(o, 1);
      });
    }
    return (r, o) => (a(!0), f(p, null, k(n.value, (e) => (a(), f(p, {
      key: e.id
    }, [
      e.isVisible ? (a(), H(F, V({
        key: 0,
        ref_for: !0,
        ref: x(t).set
      }, { ref_for: !0 }, e.localOptions, {
        onHidden: () => v(e.id)
      }), null, 16, ["onHidden"])) : B("", !0)
    ], 64))), 128));
  }
});
export {
  q as default
};
