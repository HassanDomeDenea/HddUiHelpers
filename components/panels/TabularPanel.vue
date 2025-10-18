<script lang="ts">
import type { AppPermission } from '@/types/laravel_generated';

export interface HddPanelTabItem {
  name: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  visible?: boolean;
  permission?: AppPermission | AppPermission[];
  component?: any;
  binds?: any;
}
</script>
<script setup lang="ts">
import PrimeVueTabs from 'primevue/tabs';

import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts';
import { isString, startCase } from 'lodash-es';
import isBoolean from 'lodash/isBoolean';

const {
  basedOnRouteQuery = true,
  queryName = 'tab',
  initialTab,
  lazy = true,
  keepAlive = true,
  tabs,
} = defineProps<{
  basedOnRouteQuery?: boolean;
  queryName?: string;
  initialTab?: string;
  lazy?: any;
  keepAlive?: boolean;
  tabs: HddPanelTabItem[];
}>();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const currentTab = ref((basedOnRouteQuery ? (route.query[queryName] as string) : undefined) ?? initialTab ?? tabs[0]?.name);
const routeTabName = computed(() => (basedOnRouteQuery ? (route.query[queryName] as string) : undefined));
const authStore = useBasicAuthStore();
const computedTabs = computed(() => {
  return tabs.filter((tab) => {
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

const tabNames = computed(() => computedTabs.value.map((tab) => tab.name));

function setTabIfValid(tabName: string) {
  if (tabName === currentTab.value) return;
  if (tabNames.value.includes(tabName)) {
    currentTab.value = tabName;
  }
}

function updateTabFromRoute() {
  if (!basedOnRouteQuery) {
    return;
  }
  if (typeof route.query[queryName] === 'string') {
    setTabIfValid(route.query[queryName]);
  } else if (currentTab.value) {
    router.replace({ query: { ...route.query, [queryName]: currentTab.value } });
  } else if (currentTab.value !== routeTabName.value) {
    router.replace({ query: { ...route.query, [queryName]: currentTab.value } });
  }
}

onActivated(() => {
  updateTabFromRoute();
});

watch(currentTab, (_tabName) => {
  if (!basedOnRouteQuery) {
    return;
  }
  if (routeTabName.value) {
    router.push({ query: { ...route.query, [queryName]: _tabName } });
  } else {
    router.replace({ query: { ...route.query, [queryName]: _tabName } });
  }
});
watch(routeTabName, () => {
  if (!basedOnRouteQuery) {
    return;
  }

  updateTabFromRoute();
});

const loadedTabs = ref([]);

watch(
  currentTab,
  (tabName) => {
    if (loadedTabs.value.includes(tabName)) return;
    loadedTabs.value.push(tabName);
  },
  {
    immediate: true,
  },
);

defineExpose({ currentTab });
</script>

<template>
  <PrimeVueTabs v-model:value="currentTab" class="HDD-TABULAR-PANEL">
    <TabList>
      <Tab v-for="tab in computedTabs" :key="tab.name" :disabled="tab.disabled" :value="tab.name">
        <div class="flex items-center gap-1">
          <i v-if="tab.icon" :class="tab.icon"></i>
          <span>{{ tab.label ?? t(startCase(tab.name)) }}</span>
        </div>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in computedTabs" :key="tab.name" :value="tab.name">
        <KeepAlive v-if="keepAlive">
          <component :is="tab.component" v-if="tab.component && tab.name === currentTab" v-bind="tab.binds"></component>
          <slot v-else-if="tab.name === currentTab" :name="tab.name"></slot>
        </KeepAlive>
        <template v-else-if="!lazy || tab.name === currentTab">
          <component :is="tab.component" v-bind="tab.binds" v-if="tab.component"></component>
          <slot v-else :name="tab.name"></slot>
        </template>
      </TabPanel>
    </TabPanels>
  </PrimeVueTabs>
</template>

<style lang="scss">
.HDD-TABULAR-PANEL {
  .p-tablist-tab-list {
    background: color-mix(in srgb, var(--p-tabs-tablist-background) 70%, transparent);
  }
  .p-tabpanels {
    background: color-mix(in srgb, var(--p-tabs-tabpanel-background) 50%, transparent);
  }
}
</style>
