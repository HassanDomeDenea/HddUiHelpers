<script lang="ts">
import type { AppPermission } from '@/types/laravel_generated';
import type { MenuItem } from 'primevue/menuitem';

export type SideTabularPanelItem = MenuItem & { name: string; permission?: AppPermission | AppPermission[],visible?:boolean };
</script>

<script setup lang="ts">
import isBoolean from 'lodash/isBoolean';
import { isString } from 'lodash-es';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const {
  items,
  autoSelectFirst = true,
  showSelectedMenuLabel = true,
  queryName = 'menu',
} = defineProps<{
  items: SideTabularPanelItem[];
  title?: string;
  queryName?: string;
  menuContainerClass?: any;
  autoSelectFirst?: boolean;
  showSelectedMenuLabel?: boolean;
}>();
const authStore = useBasicAuthStore();
const filteredItems = computed(() => {
  return items.filter((tab) => {
    if (isBoolean(tab.visible)) {
      return tab.visible;
    }

    if (isString(tab.permission)) {
      return authStore.can(tab.permission as any);
    }

    if (tab.permission instanceof Array) {
      return tab.permission.every((item) => authStore.can(item as any));
    }

    return true;
  });
});

onActivated(() => {
  if (typeof route.query[queryName] === 'string') {
    currentMenu.value = route.query[queryName];
  } else if (currentMenu.value) {
    router.replace({ query: { ...route.query, [queryName]: currentMenu.value } });
  } else if (autoSelectFirst) {
    currentMenu.value = filteredItems.value[0].name;
    router.replace({ query: { ...route.query, [queryName]: currentMenu.value } });
  }
});
const currentMenu = ref<string>();

function onItemClicked(item: SideTabularPanelItem) {
  if (currentMenu.value !== item.name) {
    router.push({ query: { ...route.query, [queryName]: item.name } });
    currentMenu.value = item.name;
  }
}

const activeMenuItem = computed(() => {
  return filteredItems.value.find((item) => currentMenu.value === item.name);
});
</script>

<template>
  <Card class="HDD-SIDE-TABULAR-PANEL">
    <template #title>
      <div class="text-xl font-bold">{{ title }}:</div>
    </template>
    <template #content>
      <div class="flex">
        <div :class="menuContainerClass">
          <Menu :model="filteredItems">
            <template #item="{ item, props }">
              <a
                v-ripple
                class="flex items-center"
                v-bind="props.action"
                :class="{
                  'bg-secondary-1 rounded-lg font-bold': item.name === currentMenu,
                }"
                @click="onItemClicked(item as SideTabularPanelItem)"
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
        <div class="flex-grow px-4 pt-2">
          <div
            v-if="activeMenuItem?.label"
            v-show="showSelectedMenuLabel"
            class="light:text-purple-900 underline-offset-6 dark:underline-amber-100 light:underline-amber-900 ms-4 text-lg font-bold underline dark:text-purple-100"
          >
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

<style lang="scss">
.HDD-SIDE-TABULAR-PANEL {
  &.p-card {
    background: color-mix(in srgb, var(--p-card-background) 30%, transparent);
  }
  .p-menu {
    background: color-mix(in srgb, var(--p-menu-background) 70%, transparent);
    //border: 1px solid color-mix(in srgb, var(--p-menu-border-color) 70%, transparent);
  }
}
</style>
