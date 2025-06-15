import messages from '@intlify/unplugin-vue-i18n/messages';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';

const documentMainLocale: 'ar' | 'en' = document?.body.parentElement?.getAttribute('lang') || import.meta.env.VITE_APP_LOCALE || 'ar';
export const i18n = createI18n({
    legacy: false,
    locale: documentMainLocale, // Default locale
    fallbackLocale: 'en', // Fallback locale
    messages
});

export const availableLocales = Object.keys(messages || {});

export default {
    install(app: App) {
        app.use(i18n);
    }
};

export function setPageDirection() {
    const direction = i18n.global.t('dir') || 'ltr';
    const align = i18n.global.t('textStart') || 'left';
    document.body.style.direction = direction;
    document.body.style.textAlign = align;
    document.body.dir=direction;
}

setPageDirection();

