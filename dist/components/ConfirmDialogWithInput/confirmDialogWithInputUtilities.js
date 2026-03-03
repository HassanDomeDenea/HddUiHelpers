import { useEventBus as n } from "@vueuse/core";
const i = /* @__PURE__ */ Symbol(
  "ConfirmDialogWithInputKey"
), s = function() {
  const o = n(i);
  return {
    show(t) {
      o.emit({ event: "show", options: t });
    }
  };
};
export {
  i as ConfirmDialogWithInputKey,
  s as useConfirmDialogWithInput
};
