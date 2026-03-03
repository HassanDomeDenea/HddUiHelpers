import { defineComponent as y, ref as g, onMounted as b, onBeforeUnmount as k, openBlock as s, createElementBlock as f, Fragment as p, renderList as H, unref as v, createBlock as V, mergeProps as x, createCommentVNode as B, nextTick as l } from "vue";
import { dynamicServerFormDialogKey as h } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import F from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { uniqueId as a, last as c } from "lodash-es";
import { useTemplateRefsList as O, useEventBus as R } from "@vueuse/core";
const q = /* @__PURE__ */ y({
  __name: "DynamicServerFormDialog",
  setup(L) {
    const t = O(), n = g([]), m = R(h);
    function d({
      event: r,
      options: o,
      row: e,
      specificId: _,
      dialogRefGetter: u
    }) {
      r === "create" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: a("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.create(e, _), u.value = () => i;
      })), r === "edit" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: a("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.edit(e), u.value = () => i;
      })), r === "delete" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: a("HddDynamicDialog-")
      }), l(() => {
        const i = c(t.value);
        i.delete(e), u.value = () => i;
      }));
    }
    b(() => {
      m.on(d);
    }), k(() => {
      m.off(d);
    });
    function D(r) {
      const o = n.value.findIndex((e) => e.id === r);
      n.value[o].isVisible = !1, l(() => {
        n.value.splice(o, 1);
      });
    }
    return (r, o) => (s(!0), f(p, null, H(v(n), (e) => (s(), f(p, {
      key: e.id
    }, [
      e.isVisible ? (s(), V(F, x({
        key: 0,
        ref_for: !0,
        ref: v(t).set
      }, { ref_for: !0 }, e.localOptions, {
        onHidden: () => D(e.id)
      }), null, 16, ["onHidden"])) : B("", !0)
    ], 64))), 128));
  }
});
export {
  q as default
};
