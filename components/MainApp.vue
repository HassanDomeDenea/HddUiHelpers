<script setup lang="ts">
import { defaultOptions as PrimeVueDefaultOptions } from 'primevue/config';
/*useHead({
    title: computed(() => route.meta.title || 'HDD Clinic'),
    meta: [
        {
            name: 'description',
            content: 'Opinionated Vite Starter Template',
        },
        {
            name: 'theme-color',
            content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
        },
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
        },
    ],
})*/

import { useApiClient } from 'HddUiHelpers/stores/apiClient';

const { t,locale } = useI18n();
const toast = useToast();
const authStore = useBasicAuthStore();
const apiClient = useApiClient();
apiClient.setI18n(t);
apiClient.setToast(toast);
const primevue = usePrimeVue();
watch(()=>authStore.options.language, (language) => {
    locale.value=language;
    setPageDirection()
},{
    immediate:true,
})
watch(
    locale,
    (language) => {
        primevue.config.locale = primeVueLocales[language] ?? PrimeVueDefaultOptions.locale;
    },
    {
        immediate: true,
    },
);

import { setPageDirection } from 'HddUiHelpers/plugins/i18n';
import { useToast } from 'primevue/usetoast';
import TopProgressBar from 'HddUiHelpers/components/misc/TopProgressBar.vue';
import DismissableConfirmDialog from 'HddUiHelpers/components/modified/DismissableConfirmDialog.vue';
import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales.ts';
import { usePrimeVue } from 'primevue';
import DynamicServerFormDialog from 'HddUiHelpers/components/datatables/DynamicServerFormDialog.vue';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts';
</script>

<template>
    <main class="flex-1 overflow-auto">
        <TopProgressBar />
        <Toast group="errors" :position="t('dir') === 'ltr' ? 'bottom-right' : 'bottom-left'" />
        <Toast group="success" :position="t('dir') === 'ltr' ? 'bottom-right' : 'bottom-left'" />
        <Toast group="notifications" :position="t('dir') === 'ltr' ? 'top-right' : 'top-left'" />
        <Toast :position="t('dir') === 'ltr' ? 'top-right' : 'top-left'" />
        <ConfirmDialog />
        <DismissableConfirmDialog group="dismissable" />
        <DynamicServerFormDialog />
        <DynamicDialog />
        <ConfirmDialogWithInput/>
        <ConfirmPopup group="popup"></ConfirmPopup>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </main>
</template>

<style>
body {
    @apply h-100vh font-tajawal flex flex-col;
}
</style>
