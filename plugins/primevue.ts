import Aura from '@primeuix/themes/aura';

import type { App } from 'vue';
// import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';

import '../css/primevueFixes.css';
import { ConfirmationService, DialogService, FocusTrap, ToastService, Tooltip } from 'primevue';
import PrimeVue from 'primevue/config';
export default {
  install(app: App) {
    app
      .use(PrimeVue, {
        ripple: true,
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: '.dark',
          },
        },
      })
      .use(ToastService)
      .use(ConfirmationService)
      .use(DialogService);

    app.directive('focustrap', FocusTrap);
  },
};

export function hidePrimevuePopovers() {
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(clickEvent);
}
