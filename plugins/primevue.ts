import Aura from '@primeuix/themes/aura';

import { ConfirmationService, ToastService } from 'primevue';
import PrimeVue from 'primevue/config';
import type { App } from 'vue';
// import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';

export default {
    install(app: App) {
        app.use(PrimeVue, {
            ripple: true,
            // locale: primeVueLocales.ar,
            darkMode: 'selector',
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark:not(.light)',
                },
            },
        })
            .use(ToastService)
            .use(ConfirmationService);
    },
};
