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

import ChatWidget from 'HddUiHelpers/components/Widgets/Chat/ChatWidget.vue'
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts'
import { useDimensionsStore } from 'HddUiHelpers/stores/dimensions.ts'

const authStore = useBasicAuthStore()

const footerRef = ref()
const dimensionsStore = useDimensionsStore()

const { height: footerHeight } = useElementSize(footerRef, undefined, {
  box: 'border-box',
})

watch(
  footerHeight,
  (val) => {
    dimensionsStore.botFooterHeight = val
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <nav
    ref="footerRef"
    class="light:bg-sky-200 rounded-t-2 border-t-1 flex justify-center gap-4 border-t-sky-300 py-2 text-xl dark:border-t-zinc-800 dark:bg-zinc-900"
  >
    <slot>
      <div class="grid w-full grid-cols-3">
        <div>&nbsp;</div>
        <div class="flex justify-center">HDD 2025</div>
        <div class="flex justify-end pe-2">
          <ChatWidget v-if="authStore.isLoggedIn" />
        </div>
      </div>
    </slot>
  </nav>
</template>
