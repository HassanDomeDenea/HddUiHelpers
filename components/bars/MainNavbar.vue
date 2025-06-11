<script setup lang="ts">
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
}

const { navbarClass = '!bg-sky-200 dark:!bg-gray-900', activeItemClass = 'bg-sky-100 dark:bg-gray-800 rounded-lg font-bold' } = defineProps<{
    items: NavbarMenuItemInterface[];
    navbarClass?: any;
    activeItemClass?: any;
}>();
</script>

<template>
    <Menubar :model="items" :class="navbarClass">
        <template #start>
            <slot name="start"></slot>
        </template>
        <template #item="{ item, label, props, hasSubmenu, root }">
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
            <slot name="end"></slot>
        </template>
    </Menubar>
</template>

<style scoped></style>
