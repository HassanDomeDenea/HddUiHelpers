<script setup lang="ts">
import type { UserOptionsData } from '@/types/laravel_generated';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { uniqueId } from 'lodash-es';
import Select from 'primevue/select';

const {
    label,
    option,
    options,
    optionLabel = 'label',
    optionValue = 'value',
    block = false,
    type = 'switch',
    size = 'small',
    showSuccess = true,
    successToastMessage
} = defineProps<{
    option: keyof UserOptionsData;
    label?: string;
    size?: 'small' | 'large' | '';
    block?: boolean;
    showSuccess?: boolean;
    options?: any;
    optionLabel?: string,
    optionValue?: string,
    successToastMessage?: string;
    type?: 'switch' | 'checkbox' | 'text' | 'select';
}>();

const authStore = useBasicAuthStore();
const apiClient = useApiClient();
const selectInputRef = useTemplateRef<InstanceType<typeof Select>>('selectInputRef')
const { t } = useI18n();
const labelRef = useTemplateRef<HTMLLabelElement>('labelRef');
const currentValue = computed({
    get() {
        return authStore.options[option];
    },
    set(value) {
        authStore.changeOption(option, value).then((res) => {
            if (!showSuccess) {
                return;
            }
            if(selectInputRef.value){
                console.log(selectInputRef.value)
                console.log(selectInputRef.value.isModelValueChanged)
                selectInputRef.value.isModelValueChanged=true;
            }
            if (type === 'checkbox' || type === 'switch') {
                apiClient.toastSuccess(label || labelRef.value?.innerHTML, value ? t('Enabled') : t('Disabled'), {
                    life: 2000,
                    contentStyleClass: '[&_.p-toast-detail]:!font-bold',
                    severity: value ? 'success' : 'warn'
                });
            } else {
                apiClient.toastSuccess(successToastMessage ?? t('Option Changed Successfully'), '', {
                    life: 1000
                });
            }
        });
    }
});
const optionId = computed(() => uniqueId('user-option'));

const localOptionLabel = computed(() => options.length > 0 && typeof options[0] === 'string' ? undefined : optionLabel);
const localOptionValue = computed(() => options.length > 0 && typeof options[0] === 'string' ? undefined : optionValue);
</script>

<template>
    <div class="items-center justify-between gap-2" :class="{ flex: block, 'inline-flex': !block }">
        <label :for="optionId"
               class="light:hover:bg-yellow-300/25 flex-grow cursor-pointer rounded-lg dark:hover:bg-zinc-100/10"
               ref="labelRef">
            <template v-if="label">{{ label }}</template>
            <template v-else>
                <slot></slot>
            </template>
        </label>
        {{currentValue}}
        <ToggleSwitch v-if="type === 'switch'" :input-id="optionId" v-model="currentValue" />
        <Select
            ref="selectInputRef"
            :option-label="localOptionLabel" :option-value="localOptionValue" :options="options"
                v-model="currentValue"
                :input-id="optionId" :size="size" v-else-if="type === 'select'" />
    </div>
</template>

<style scoped></style>
