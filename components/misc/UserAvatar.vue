<script setup lang="ts">
import { Menu } from 'primevue';
import type { BasicUserData } from 'HddUiHelpers/types/BasicModels';
import type { MenuItem } from 'primevue/menuitem';
import { useHddUiHelpers } from 'HddUiHelpers/plugins/HddUiHelpers';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import UserController from '@/wayfinder/actions/App/Http/Controllers/UserController';
import { useToast } from 'primevue/usetoast';

const { user } = defineProps<{
    user: BasicUserData;
}>();
const { t } = useI18n();
const menuRef = useTemplateRef<InstanceType<typeof Menu>>('menu');
const hddUiHelpers = useHddUiHelpers();
const basicAuthStore = useBasicAuthStore();
const apiClient = useApiClient()
const router = useRouter();

function onClick(evt: PointerEvent) {
    menuRef.value?.toggle(evt);
}

const items = ref<MenuItem[]>([
    {
        label: t('Refresh'),
        icon: 'i-mdi-refresh',
        class: 'text-sm',
        command() {
            window.location.reload();
        }
    },
    {
        label: t('Logout'),
        icon: 'i-mdi-logout',
        class: 'text-sm',
        command() {
            apiClient.request(UserController.logout()).then(() => {
                basicAuthStore.logout();
                router.push('/login');
            }).catch(error=>{
                console.error(error)
                apiClient.toastError()
            });
        }
    }
]);
</script>

<template>
    <div class="inline-flex items-center gap-2">
        <Message size="small"  severity="contrast" variant="simple">{{t('Welcome,')}} <b>{{ user.name }}</b></Message>
        <Avatar icon="i-mdi-user" shape="circle" class="cursor-pointer" @click="onClick" />
        <Menu ref="menu" :model="items" :popup="true" />
    </div>
</template>

<style scoped></style>
