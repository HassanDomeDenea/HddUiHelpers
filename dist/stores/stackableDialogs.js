import { uniqueId as g, merge as b } from "lodash-es";
import { defineStore as k } from "pinia";
import { useDialog as p } from "primevue";
import { ref as d, computed as D, watch as y, nextTick as S } from "vue";
const h = k("stackableDialogs", () => {
  const e = d([]);
  function n(l) {
    return e.value.push(l ?? g("stackableDialogs")), e.value.length - 1;
  }
  function a(l) {
    e.value.splice(l, 1);
  }
  function s(l) {
    e.value = e.value.filter((o) => o !== l);
  }
  function t(l) {
    return e.value.find((o) => o === l) ?? null;
  }
  function u(l) {
    return e.value[l] ?? null;
  }
  return {
    stackableDialogs: e,
    getByName: t,
    getByIndex: u,
    removeByName: s,
    remove: a,
    add: n
  };
}), R = function(e = {}) {
  const n = h(), a = d(null), s = p();
  function t() {
    a.value === null && (a.value = n.add(e.name ?? void 0));
  }
  function u() {
    a.value !== null && (n.remove(a.value), a.value = null);
  }
  const l = D(() => n.stackableDialogs.length - 1 === a.value);
  function o(i) {
    i ? t() : u();
  }
  e.dialogVisibilityRef && y(e.dialogVisibilityRef, (i) => {
    o(i);
  });
  async function m(i, v, c) {
    o(!0);
    const r = d();
    return s.open(
      i,
      b(
        {
          props: {
            dismissableMask: !0,
            closeOnEscape: l,
            draggable: !1,
            modal: !0,
            onAfterHide: () => {
              c?.onHidden?.();
            }
          },
          onClose(f) {
            o(!1), c?.onClose?.(f);
          },
          emits: {
            ref: (f) => r.value = f
          }
        },
        v
      )
    ), await S(() => {
      r.value && c?.onShow?.(r.value);
    }), r.value;
  }
  return {
    open: m,
    updateDialogVisibility: o,
    store: n,
    addDialogToStack: t,
    removeDialogFromStack: u,
    isClosable: l,
    dialogStackIndex: a
  };
};
export {
  R as useStackableDialog,
  h as useStackableDialogsStore
};
