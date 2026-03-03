import { defineComponent as _, openBlock as u, createElementBlock as m, Fragment as f, renderList as k, unref as p, createBlock as y, mergeProps as g, createCommentVNode as x } from "vue";
import { dynamicServerFormDialogKey as b } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import H from "HddUiHelpers/components/datatables/ServerFormDialog.vue";
import { uniqueId as s, last as a } from "lodash-es";
const O = /* @__PURE__ */ _({
  __name: "DynamicServerFormDialog",
  setup(T) {
    const t = useTemplateRefsList(), n = ref([]), c = useEventBus(b);
    function d({
      event: r,
      options: o,
      row: e,
      specificId: D,
      dialogRefGetter: l
    }) {
      r === "create" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), nextTick(() => {
        const i = a(t.value);
        i.create(e, D), l.value = () => i;
      })), r === "edit" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), nextTick(() => {
        const i = a(t.value);
        i.edit(e), l.value = () => i;
      })), r === "delete" && (n.value.push({
        localOptions: o,
        isVisible: !0,
        id: s("HddDynamicDialog-")
      }), nextTick(() => {
        const i = a(t.value);
        i.delete(e), l.value = () => i;
      }));
    }
    onMounted(() => {
      c.on(d);
    }), onBeforeUnmount(() => {
      c.off(d);
    });
    function v(r) {
      const o = n.value.findIndex((e) => e.id === r);
      n.value[o].isVisible = !1, nextTick(() => {
        n.value.splice(o, 1);
      });
    }
    return (r, o) => (u(!0), m(f, null, k(p(n), (e) => (u(), m(f, {
      key: e.id
    }, [
      e.isVisible ? (u(), y(H, g({
        key: 0,
        ref_for: !0,
        ref: p(t).set
      }, { ref_for: !0 }, e.localOptions, {
        onHidden: () => v(e.id)
      }), null, 16, ["onHidden"])) : x("", !0)
    ], 64))), 128));
  }
});
export {
  O as default
};
