import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import { ConfirmationService, ToastService } from 'primevue';
import Aura from '@primevue/themes/aura';
import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';

export default {
    install(app: App) {
        app.use(PrimeVue, {
            ripple: true,
            // locale: primeVueLocales.ar,
            darkMode: 'selector',
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark:not(.light)'
                }
            }
        })
            .use(ToastService)
            .use(ConfirmationService);
    }
};
