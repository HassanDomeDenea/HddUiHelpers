<script setup lang="ts">
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { useDark, usePreferredDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const authStore = useBasicAuthStore();
const { t } = useI18n();
const isDark = useDark({
  initialValue: authStore.options.dark_mode,
  valueLight: 'light',
  valueDark: 'dark',
});
const preferredDark = usePreferredDark({ window });

watch(
  () => authStore.options.dark_mode,
  (_value) => {
    console.log('Option Changed Dark Mode', _value);

    if (_value !== 'auto') {
      const _isDark = _value === 'dark';
      if (_isDark !== isDark.value) {
        isDark.value = _isDark;
      }
    } else {
      localStorage.removeItem('vueuse-color-scheme');
      if (isDark.value !== preferredDark.value) {
        isDark.value = preferredDark.value;
      }
    }
  },
);

const toggleDark = useToggle(isDark);

function toggleDarkAndSave() {
  toggleDark();
  authStore.changeOption('dark_mode', isDark.value ? 'dark' : 'light');
}
</script>

<template>
  <Button
    :icon="isDark ? 'i-material-symbols:dark-mode' : 'i-material-symbols:dark-mode-outline'"
    severity="secondary"
    text
    :title="t('Dark Mode')"
    @click="toggleDarkAndSave()"
  />
</template>

<style scoped></style>
