import r from "@primeuix/themes/aura";
import { ToastService as t, ConfirmationService as o, DialogService as i, FocusTrap as c } from "primevue";
import u from "primevue/config";
const m = {
  install(e) {
    e.use(u, {
      ripple: !0,
      theme: {
        preset: r,
        options: {
          darkModeSelector: ".dark"
        }
      }
    }).use(t).use(o).use(i), e.directive("focustrap", c);
  }
};
function l() {
  const e = new MouseEvent("click", {
    bubbles: !0,
    cancelable: !0
  });
  document.dispatchEvent(e);
}
export {
  m as default,
  l as hidePrimevuePopovers
};
