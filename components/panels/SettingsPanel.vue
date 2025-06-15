<script lang="ts">
import type { MenuItem } from 'primevue/menuitem';

export type SettingsMenuItem = MenuItem & { name: string };
</script>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

onActivated(() => {
    if (typeof route.query.menu === 'string') {
        currentMenu.value = route.query.menu;
    } else if (currentMenu.value) {
        router.replace({ query: { ...route.query, menu: currentMenu.value } });
    }
});
const { items } = defineProps<{
    items: SettingsMenuItem[];
}>();
const currentMenu = ref<string>();

function onItemClicked(item: SettingsMenuItem) {
    if (currentMenu.value !== item.name) {
        router.push({ query: { ...route.query, menu: item.name } });
        currentMenu.value = item.name;
    }
}

const activeMenuItem = computed(() => {
    return items.find((item) => currentMenu.value === item.name);
});
</script>

<template>
    <Card class="m-3">
        <template #title>
            <div class="text-xl font-bold">{{ t('Settings') }}:</div>
        </template>
        <template #content>
            <div class="flex">
                <div>
                    <Menu :model="items">
                        <template #item="{ item, props }">
                            <a
                                v-ripple
                                class="flex items-center"
                                v-bind="props.action"
                                :class="{
                                    'bg-secondary-1 rounded-lg font-bold': item.name === currentMenu,
                                }"
                                @click="onItemClicked(item as SettingsMenuItem)"
                            >
                                <i :class="item.icon" />
                                <span class="ms-2">{{ item.label }}</span>
                                <span v-if="item.shortcut" class="border-surface bg-emphasis text-muted-color ms-auto rounded border p-1 text-xs">
                                    {{ item.shortcut }}
                                </span>
                            </a>
                        </template>
                    </Menu>
                </div>
                <div class="px-4 pt-2">
                    <div v-if="activeMenuItem?.label" class="light:text-purple-900 ms-4 text-lg font-bold underline dark:text-purple-100">
                        {{ activeMenuItem.label }}:
                    </div>
                    <div v-else class="text-lg font-bold">
                        {{ t('Please Select from Side Menu') }}
                    </div>
                    <template v-if="activeMenuItem">
                        <component :is="activeMenuItem.component" />
                    </template>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped></style>
