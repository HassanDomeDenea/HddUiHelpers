<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { setI18nLanguage } from '~/plugins/i18n';
import { useNavigationStore } from '~/stores/navigation';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const navigationStore = useNavigationStore();
const generalStore = useGeneralStore();
const { navPaths } = storeToRefs(navigationStore);
const { width: windowWidth } = useWindowSize();
const items = computed(() => {
    const mainitems = [
        {
            label: t('Home'),
            icon: 'pi pi-home',
            route: navPaths.value.get('/'),
        },
        {
            label: t('Main Receptions'),
            icon: 'i-mdi-ticket',
            route: navPaths.value.get('/tickets'),
        },
        {
            label: t('Receipts'),
            icon: 'i-mdi-currency-usd',
            route: navPaths.value.get('/receipts'),
        },
        {
            label: t('Medical Unit'),
            icon: 'i-mdi-medical-bag',
            route: navPaths.value.get('/medical_unit'),
        },
        {
            label: t('Vital Examination'),
            icon: 'i-material-symbols-blood-pressure-outline-rounded ',
            route: navPaths.value.get('/vital_exam'),
        },
        {
            label: t('Doctor Reception'),
            icon: 'i-pajamas-review-list',
            route: navPaths.value.get('/doctor_reception'),
        },
        {
            label: t('Doctor'),
            icon: 'i-fa6-solid-user-doctor',
            route: navPaths.value.get('/doctor'),
        },
        {
            label: t('Laboratory'),
            icon: 'i-guidance-medical-laboratory',
            route: navPaths.value.get('/laboratory'),
            disabled: true,
        },
        {
            label: t('Pharmacy'),
            icon: 'i-mdi-pill-multiple',
            route: navPaths.value.get('/pharmacy'),
            disabled: true,
        },
        {
            label: t('Characterization'),
            icon: 'i-ph:disc-bold',
            route: navPaths.value.get('/catheter'),
        },
        {
            label: t('Patients'),
            icon: 'i-fluent-guardian-28-regular',
            route: navPaths.value.get('/patients'),
        },
        {
            label: t('Contact'),
            icon: 'pi pi-envelope',
            disabled: true,
            route: navPaths.value.get('/contact'),
            // badge: 3,
        },
        {
            label: t('Settings'),
            icon: 'i-jam-cogs',
            route: navPaths.value.get('/settings'),
            // badge: 3,
        },
    ];

    const finalItems = [];
    let itemsWidth = 625;
    const others = {
        label: t('Others'),
        icon: 'i-icon-park-outline:other',
        items: [],
        class: 'NavbarOthersMenuItem',
    };
    mainitems.forEach((item) => {
        const itemWidth = item.width ?? 155;

        itemsWidth += itemWidth;
        if (windowWidth.value < itemsWidth) {
            others.items.push(item);
        } else {
            finalItems.push(item);
        }
    });
    if (others.items.length > 0) {
        finalItems.push(others);
    }

    return finalItems;
});
const userStore = useUserStore();
const { logout, changeOption } = userStore;

function doLogout() {
    logout().then(() => {
        router.push('/login');
    });
}

const { isLoggedIn, user } = storeToRefs(userStore);

function changeLanguage(currentLanguage: string) {
    let newLanguage;
    switch (currentLanguage) {
        case 'ar':
            newLanguage = 'en';
            break;
        case 'en':
            newLanguage = 'ar';
            break;
    }
    if (newLanguage) {
        setI18nLanguage(newLanguage);
        changeOption('language', newLanguage);
    }
}

const pingPopoverRef = ref();
const pingPopoverHideTimeout = ref();

function pingServer(evt: PointerEvent) {
    pingPopoverRef.value.show(evt);
    generalStore.pingServer().then(() => {
        clearTimeout(pingPopoverHideTimeout.value);
        pingPopoverHideTimeout.value = setTimeout(() => {
            pingPopoverRef.value.hide();
        }, 2000);
    });
}

onMounted(() => {
    if (route.fullPath !== route.path) {
        navigationStore.modifyRoute(route.path, route.fullPath);
    }
});
</script>

<template>
    <Menubar :model="items">
        <template #start>
            <i class="i-mdi-home block text-4xl" />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <a
                v-if="isLoggedIn"
                v-ripple
                class="align-items-center flex"
                v-bind="props.action"
                :href="typeof item.route === 'string' ? item.route : item.route ? router.resolve(item.route).path : '#'"
                :class="{
                    'bg-secondary-1 rounded-lg font-bold': navigationStore.isActiveRoute(item.route),
                }"
                @click.prevent="item.route ? navigationStore.navigateTo(item.route) : null"
            >

                <span :class="item.icon" />
                <span class="ltr:ml-2 rtl:mr-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ltr:ml-auto rtl:mr-auto': !root, 'ltr:ml-2 rtl:mr-2': root }" :value="item.badge" />
                <span v-if="item.shortcut" class="surface-border border-round surface-100 border-1 p-1 text-xs ltr:ml-auto rtl:mr-auto">{{
                    item.shortcut
                }}</span>

                <i
                    v-if="hasSubmenu"
                    class="pi pi-angle-down"
                    :class="[
                        {
                            'i-uil-angle-down-b ltr:ml-2 rtl:mr-2': root,
                            'ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ltr:ml-auto rtl:mr-auto': !root,
                        },
                    ]"
                />
            </a>
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <template v-if="user">
                    <InputText :placeholder="t('Search')" type="text" class="w-8rem sm:w-auto" />
                    <div>
                        {{ t('Welcome, ') }} <strong>{{ user.username }}</strong>
                    </div>
                    <Avatar icon="i-mdi-user" shape="circle" />
                    <Button
                        v-tooltip="t('Change Language')"
                        outlined
                        severity="info"
                        size="small"
                        font-bold
                        icon="i-mdi-earth"
                        :label="t('lang_shortcut')"
                        @click="changeLanguage(t('lang_code'))"
                    />
                </template>
                <Button
                    v-tooltip="t('Change Dark Mode')"
                    severity="secondary"
                    size="small"
                    outlined
                    class="rounded-lg px-2"
                    :icon="isDark ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'"
                    @click="toggleDark()"
                />
                <Button
                    v-if="isLoggedIn"
                    v-tooltip="t('Logout')"
                    outlined
                    severity="secondary"
                    class="p-button-sm rounded-lg px-2"
                    icon="i-mdi-logout"
                    :label="t('Logout')"
                    @click="doLogout()"
                />
                <Popover ref="pingPopoverRef"> {{ generalStore.lastPingDuration ?? '--' }}ms</Popover>
                <div
                    v-if="generalStore.isConnectedToWebsocketServer"
                    v-tooltip="t('Connected')"
                    tabindex="0"
                    class="i-mdi-checkbox-blank-circle text-success inline-block text-2xl shadow-lg outline-solid"
                    @click="pingServer"
                />
                <div
                    v-else
                    v-tooltip="t(generalStore.websocketConnectionState)"
                    class="i-material-symbols:warning-rounded text-warning inline-block text-2xl shadow-lg outline-solid"
                />
            </div>
        </template>
    </Menubar>
</template>

<style lang="scss">
.NavbarOthersMenuItem.p-menubar-item {
    position: relative;

    .p-menubar-submenu {
        z-index: 2;
    }
}
</style>
