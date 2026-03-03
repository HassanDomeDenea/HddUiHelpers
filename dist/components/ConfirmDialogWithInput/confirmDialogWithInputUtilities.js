const o = /* @__PURE__ */ Symbol(
  "ConfirmDialogWithInputKey"
), i = function() {
  const t = useEventBus(o);
  return {
    show(n) {
      t.emit({ event: "show", options: n });
    }
  };
};
export {
  o as ConfirmDialogWithInputKey,
  i as useConfirmDialogWithInput
};
