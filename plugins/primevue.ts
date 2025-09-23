import Aura from '@primeuix/themes/aura';

import { ConfirmationService, DialogService, FocusTrap, ToastService } from 'primevue';
import PrimeVue from 'primevue/config';
import type { App } from 'vue';
// import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';
import '../css/primevueFixes.css';

export default {
  install(app: App) {
    app
      .use(PrimeVue, {
        ripple: true,
        // locale: primeVueLocales.ar,
        theme: {
          preset: Aura,
          options: {
            // darkModeSelector: '.dark:not(.light)',
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
