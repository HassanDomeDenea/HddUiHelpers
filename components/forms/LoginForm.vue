<script setup lang="ts">
import type { HddFormProps } from 'HddUiHelpers/components/FormWrapper/types';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import type { BasicUserData } from 'HddUiHelpers/types/BasicModels';
import UserController from '@/wayfinder/actions/App/Http/Controllers/UserController';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';

const { t } = useI18n();
const authStore = useBasicAuthStore();
const apiClient = useApiClient();
const router = useRouter();
const route = useRoute();
const formBinds = ref<HddFormProps>({
    url: UserController.login(),
    unifyLabelsWidth: 120,
    submitSeverity: 'primary',
    submitText: t('Login'),
    submitIcon: 'i-mdi-user',
    size: 'small',
    fields: [
        { name: 'username', icon: 'i-mdi-user', label: t('Username'), binds: { inputClass: 'dir-ltr text-left' } },
        { name: 'password', icon: 'i-mdi-password', type:'password', label: t('Password'), binds: { inputClass: 'dir-ltr text-left' } },
    ],
    onSuccess: (data: { user: BasicUserData; token: string }) => {
        console.log(route.query?.redirect_url)
        router.push((route.query?.redirect_url ?? '/') as any);
        authStore.login(data.user, data.token);
    },
});

</script>

<template>
    <Panel class="font-tajawal w-400px light:bg-primary-1 light:border-blue-200 max-w-full">
        <Message severity="success" size="large" class="mb-4" variant="simple">
            <template #container>
                <div class="w-full text-center text-lg font-bold">{{ t('Welcome, Please Log In') }}:</div>
            </template>
        </Message>
        <HddForm v-bind="formBinds" />
    </Panel>
</template>

<style scoped>
</style>
