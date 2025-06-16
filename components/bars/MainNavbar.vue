<script setup lang="ts">
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';

const authStore = useBasicAuthStore();

export interface NavbarMenuItemInterface {
    label: string;
    icon: string;
    to?: string;
    disabled?: boolean;
    badge?: number;
    class?: any;
    items?: NavbarMenuItemInterface[];
    shortcut?: string;
    command?: () => any;
    auth?: boolean;
}

const {
    navbarClass = 'light:!bg-sky-200 light:!border-b-sky-300 ',
    activeItemClass = 'light:bg-sky-100 dark:bg-gray-800 rounded-lg font-bold',
    withDarkModeButton = true,
} = defineProps<{
    withDarkModeButton?: boolean;
    items: NavbarMenuItemInterface[];
    navbarClass?: any;
    activeItemClass?: any;
}>();

import { useDark, useToggle } from '@vueuse/core';

const { t } = useI18n();
const isDark = useDark({
    valueLight: 'light',
    valueDark: 'dark',
});

const toggleDark = useToggle(isDark);

function toggleDarkAndSave() {
    toggleDark();
    authStore.changeOption('darkMode', isDark.value ? 'dark' : 'light');
}
</script>

<template>
    <Menubar :model="items" :class="navbarClass" class="z-2">
        <template #start>
            <slot name="start"></slot>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <component :is="item.to ? 'router-link' : 'a'" :to="item.to" v-bind="props.action" :class="item.class" :active-class="activeItemClass">
                <i :class="item.icon" />
                <span>{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ms-auto': !root, 'ms-2': root }" :value="item.badge" />
                <span v-if="item.shortcut" class="surface-border border-round surface-100 me-auto border-1 p-1 text-xs">{{ item.shortcut }}</span>
                <i
                    v-if="hasSubmenu"
                    class="pi pi-angle-down"
                    :class="[
                        {
                            'i-uil:angle-down ms-auto': root,
                            'ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ms-auto': !root,
                        },
                    ]"
                />
            </component>
        </template>
        <template #end>
            <Button
                v-if="withDarkModeButton"
                :icon="isDark ? 'i-material-symbols:dark-mode' : 'i-material-symbols:dark-mode-outline'"
                severity="secondary"
                text
                :title="t('Dark Mode')"
                @click="toggleDarkAndSave()"
            />
            <UserAvatar class="ms-1" v-if="authStore.user" :user="authStore.user" />

            <slot name="end"></slot>
        </template>
    </Menubar>
</template>

<style scoped></style>
