<script setup lang="ts">
import ConfirmDialogWithInput from 'HddUiHelpers/components/ConfirmDialogWithInput/ConfirmDialogWithInput.vue';
import DynamicComponentMounter from 'HddUiHelpers/components/DynamicComponentMounter/DynamicComponentMounter.vue';
import DynamicServerFormDialog from 'HddUiHelpers/components/datatables/DynamicServerFormDialog.vue';
import TopProgressBar from 'HddUiHelpers/components/misc/TopProgressBar.vue';
import DismissableConfirmDialog from 'HddUiHelpers/components/modified/DismissableConfirmDialog.vue';
import { setPageDirection } from 'HddUiHelpers/plugins/i18n';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import primeVueLocales from 'HddUiHelpers/utils/primeVueLocales';
import { usePrimeVue } from 'primevue';
import { defaultOptions as PrimeVueDefaultOptions } from 'primevue/config';
import { useToast } from 'primevue/usetoast';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const toast = useToast();
const authStore = useBasicAuthStore();
const apiClient = useApiClient();
apiClient.setI18n(t);
apiClient.setToast(toast);
const primevue = usePrimeVue();
watch(
  () => authStore.options.language,
  (language) => {
    if (language) {
      locale.value = language;
      setPageDirection();
    }
  },
  {
    immediate: true,
  },
);
watch(
  locale,
  (language) => {
    primevue.config.locale = primeVueLocales[language] ?? PrimeVueDefaultOptions.locale;
  },
  {
    immediate: true,
  },
);
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
    <ConfirmDialogWithInput />
    <ConfirmPopup group="popup" />
    <DynamicComponentMounter />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<style>
</style>
