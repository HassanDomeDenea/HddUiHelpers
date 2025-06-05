import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages'


const documentMainLocale: 'ar' | 'en' = document?.body.parentElement?.getAttribute('lang') || import.meta.env.VITE_APP_LOCALE || 'ar'
export const i18n = createI18n({
    legacy: false,
    locale: documentMainLocale,  // Default locale
    fallbackLocale: 'en', // Fallback locale
    messages
});

export default {
    install(app: App) {
        app.use(i18n);
    }
};
