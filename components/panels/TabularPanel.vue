<script lang="ts">
export interface HddPanelTabItem {
    name: string;
    label?: string;
    icon?: string;
    disabled?: boolean;
    component?: any;
    binds?: any;
}
</script>
<script setup lang="ts">
import PrimeVueTabs from 'primevue/tabs';

import { startCase } from 'lodash-es';

const {
    queryName = 'tab',
    initialTab,
    lazy = true,
    keepAlive = true,
    tabs
} = defineProps<{
    queryName?: string;
    initialTab?: string;
    lazy?: any;
    keepAlive?: boolean;
    tabs: HddPanelTabItem[];
}>();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const currentTab = ref((route.query[queryName] as string) ?? initialTab ?? tabs[0]?.name);
const routeTabName = computed(() => route.query[queryName] as string);

const tabNames = computed(() => tabs.map((tab) => tab.name));

function setTabIfValid(tabName: string) {
    if (tabName === currentTab.value) return;
    if (tabNames.value.includes(tabName)) {
        currentTab.value = tabName;
    }
}

function updateTabFromRoute() {
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
    if (routeTabName.value) {
        router.push({ query: { ...route.query, [queryName]: _tabName } });
    } else {
        router.replace({ query: { ...route.query, [queryName]: _tabName } });
    }
});

const loadedTabs = ref([]);

watch(
    currentTab,
    (tabName) => {
        if (loadedTabs.value.includes(tabName)) return;
        loadedTabs.value.push(tabName);
    },
    {
        immediate: true
    }
);
</script>

<template>
    <PrimeVueTabs v-model:value="currentTab">
        <TabList>
            <Tab v-for="tab in tabs" :key="tab.name" :disabled="tab.disabled" :value="tab.name">
                <div class="flex items-center gap-1">
                    <i v-if="tab.icon" :class="tab.icon"></i>
                    <span>{{ tab.label ?? t(startCase(tab.name)) }}</span>
                </div>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.name" :value="tab.name">
                <KeepAlive v-if="keepAlive">
                    <component
                        :is="tab.component" v-if="tab.component && tab.name === currentTab"
                        v-bind="tab.binds"></component>
                    <slot v-else-if="tab.name === currentTab" :name="tab.name"></slot>
                </KeepAlive>
                <template v-else-if="!lazy || tab.name === currentTab">
                    <component
                        :is="tab.component" v-bind="tab.binds"
                        v-if="tab.component"></component>
                    <slot v-else :name="tab.name"></slot>
                </template>
            </TabPanel>
        </TabPanels>
    </PrimeVueTabs>
</template>

<style scoped></style>
