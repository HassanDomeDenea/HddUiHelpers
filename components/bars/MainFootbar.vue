<script setup lang="ts">
/*import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  setI18nLanguage(newLocale)
  locale.value = newLocale
}

const { logout } = useUserStore()
const { isLoggedIn } = storeToRefs(useUserStore())*/
const footerRef = ref();
import { useDimensionsStore } from 'HddUiHelpers/stores/dimensions.ts';

const dimensionsStore = useDimensionsStore();

const { height: footerHeight } = useElementSize(footerRef, {}, {
    box: 'border-box'
});

watch(footerHeight, (val) => {
    dimensionsStore.botFooterHeight = val;
}, {
    immediate: true
});
</script>

<template>
    <nav
        ref="footerRef"
        class="light:bg-sky-200 rounded-t-2 border-t-1 flex justify-center gap-4 border-t-sky-300 py-2 text-xl dark:border-t-zinc-800 dark:bg-zinc-900"
    >
        <slot> HDD 2025</slot>
    </nav>
</template>
