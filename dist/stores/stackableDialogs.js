import { uniqueId as g, merge as m } from "lodash-es";
import { defineStore as b } from "pinia";
import { useDialog as k } from "primevue";
const D = b("stackableDialogs", () => {
  const e = ref([]);
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
}), h = function(e = {}) {
  const n = D(), a = ref(null), s = k();
  function t() {
    a.value === null && (a.value = n.add(e.name ?? void 0));
  }
  function u() {
    a.value !== null && (n.remove(a.value), a.value = null);
  }
  const l = computed(() => n.stackableDialogs.length - 1 === a.value);
  function o(i) {
    i ? t() : u();
  }
  e.dialogVisibilityRef && watch(e.dialogVisibilityRef, (i) => {
    o(i);
  });
  async function d(i, v, c) {
    o(!0);
    const r = ref();
    return s.open(
      i,
      m(
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
    ), await nextTick(() => {
      r.value && c?.onShow?.(r.value);
    }), r.value;
  }
  return {
    open: d,
    updateDialogVisibility: o,
    store: n,
    addDialogToStack: t,
    removeDialogFromStack: u,
    isClosable: l,
    dialogStackIndex: a
  };
};
export {
  h as useStackableDialog,
  D as useStackableDialogsStore
};
