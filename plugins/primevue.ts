import Aura from "@primeuix/themes/aura";
import { ConfirmationService, DialogService, FocusTrap, ToastService } from "primevue";
// import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';

import "../css/primevueFixes.css";
import PrimeVue from "primevue/config";
import type { App } from "vue";
export default {
  install(app: App) {
    app
      .use(PrimeVue, {
        ripple: true,
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: ".dark",
          },
        },
      })
      .use(ToastService)
      .use(ConfirmationService)
      .use(DialogService);

    app.directive("focustrap", FocusTrap);
  },
};

export function hidePrimevuePopovers() {
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(clickEvent);
}
