<script setup lang="ts">
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

const { t } = useI18n()
import MainFootbar from 'HddUiHelpers/components/bars/MainFootbar.vue';
import MainNavbar from 'HddUiHelpers/components/bars/MainNavbar.vue';
</script>

<template>

    <main class="flex-1 overflow-auto">
        <Toast group="errors" :position="t('dir') === 'ltr' ? 'bottom-right' : 'bottom-left'" />
        <Toast group="notifications" :position="t('dir') === 'ltr' ? 'top-right' : 'top-left'" />
        <Toast :position="t('dir') === 'ltr' ? 'top-right' : 'top-left'" />
        <ConfirmDialog />
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </main>

</template>
