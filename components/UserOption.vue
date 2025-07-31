<script setup lang="ts" generic="TIsGlobal extends boolean = false">
import type { GlobalOptionData, UserOptionsData } from '@/types/laravel_generated';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth';
import { uniqueId } from 'lodash-es';
import map from 'lodash/map';
import type { FileUploadUploadEvent, TreeSelect } from 'primevue';
import { FileUpload } from 'primevue';
import Select from 'primevue/select';
import { useConfirm } from 'primevue/useconfirm';
import type { ComponentExposed } from 'vue-component-type-helpers';
import TreeSelectInput from 'HddUiHelpers/components/inputs/TreeSelectInput.vue';

interface UserOptionProps {
    isGlobal?: TIsGlobal;
    option: TIsGlobal extends true ? keyof GlobalOptionData : keyof UserOptionsData;
    label?: string;
    size?: 'small' | 'large' | '';
    fluid?: boolean;
    binds?: any;
    controlFluid?: boolean;
    clearable?: boolean;
    showSuccess?: boolean;
    options?: any[] | Record<string | number | symbol, string>;
    optionLabel?: string;
    optionValue?: string;
    showAfterLabelDots?: boolean;
    successToastMessage?: string;
    type?: 'switch' | 'checkbox' | 'text' | 'select' | 'image' | 'tree_select';
}

const {
    label,
    isGlobal = false,
    option,
    options,
    showAfterLabelDots = true,
    optionLabel = 'label',
    optionValue = 'value',
    fluid = false,
    type = 'switch',
    size = 'small',
    showSuccess = true,
    controlFluid = false,
    successToastMessage
} = defineProps<UserOptionProps>();

const authStore = useBasicAuthStore();
const apiClient = useApiClient();
const selectInputRef = useTemplateRef<InstanceType<typeof Select>>('selectInputRef');
const treeSelectInputRef = useTemplateRef<InstanceType<typeof TreeSelectInput>>('treeSelectInputRef');
const { t } = useI18n();
const labelRef = useTemplateRef<HTMLLabelElement>('labelRef');
const fileUploadRef = useTemplateRef<ComponentExposed<typeof FileUpload>>('fileUploadRef');
const localIsGlobal = computed(() => isGlobal !== false);
const currentValue = computed<any>({
    get() {
        return localIsGlobal.value === true
            ? authStore.globalOptions[option as keyof GlobalOptionData]
            : authStore.options[option as keyof UserOptionsData];
    },
    set(value) {
        let request: Promise<void>;
        if (toValue(localIsGlobal) === true) {
            request = authStore.changeGlobalOption(option as keyof GlobalOptionData, value);
        } else {
            request = authStore.changeOption(option as keyof UserOptionsData, value as any);
        }

        request
            .then(() => {
                if (!showSuccess) {
                    return;
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
            })
            .catch(() => {
                if (selectInputRef.value) {
                    selectInputRef.value.d_value = toValue(currentValue);
                }
                if (treeSelectInputRef.value) {
                    treeSelectInputRef.value.setVisibleElementValue(toValue(currentValue))
                }
            });
    }
});
const optionId = computed(() => uniqueId('user-option'));

const computedOptions = computed<any[]>(() => {
    if (typeof options === 'object' && !Array.isArray(options)) {
        return map(options, (label, value) => {
            return {
                value,
                label
            };
        });
    } else {
        return options ?? [];
    }
});
const localOptionLabel = computed(() => (computedOptions.value.length > 0 && typeof computedOptions.value[0] === 'string' ? undefined : optionLabel));
const localOptionValue = computed(() => (computedOptions.value.length > 0 && typeof computedOptions.value[0] === 'string' ? undefined : optionValue));

function uploadFile(event: FileUploadUploadEvent) {
    if (event.files[0]) {
        currentValue.value = event.files[0];
    }
}

const confirm = useConfirm();

function removeFile(event: PointerEvent) {
    confirm.require({
        target: event.currentTarget as HTMLButtonElement,
        group: 'popup',
        message: t('Are you sure to delete this image?'),
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: t('Cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('Delete'),
            severity: 'danger'
        },
        accept: () => {
            currentValue.value = null;
        }
    });
}

function onLabelClick() {
    if (type === 'image') {
        fileUploadRef.value?.choose();
    } else if (type === 'select') {
        selectInputRef.value.show(true);
    }
}
</script>

<template>
    <div class="items-center  gap-2" :class="{ flex: fluid, 'inline-flex': !fluid }">
        <label
            ref="labelRef"
            :for="optionId"
            :class="[{'flex-grow':!controlFluid}]"
            class="light:hover:bg-yellow-300/25 cursor-pointer rounded-lg dark:hover:bg-zinc-100/10"
            @click="onLabelClick"
        >
            <template v-if="label">
                <span>{{ label }}</span>
                <span v-if="showAfterLabelDots">: </span>
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </label>
        <ToggleSwitch v-if="type === 'switch'" v-model="currentValue" :input-id="optionId" />
        <Select
            v-else-if="type === 'select'"
            ref="selectInputRef"
            v-model="currentValue"
            :class="{'flex-grow':controlFluid}"
            :option-label="localOptionLabel"
            :option-value="localOptionValue"
            :options="computedOptions"
            :input-id="optionId"
            :size="size"
        />
        <TreeSelectInput
            v-else-if="type==='tree_select'"
            ref="treeSelectInputRef"
            v-model="currentValue"
            :class="{'flex-grow':controlFluid}"
            :clearable="clearable"
            :option-label="localOptionLabel"
            :option-value="localOptionValue"
            :options="computedOptions"
            :input-id="optionId"
            :size="size"
            v-bind="binds ?? {}"
        />

        <TextInput
            v-else-if="type === 'text'" v-model.lazy="currentValue" :input-id="optionId" lazy
            :class="{'flex-grow':controlFluid}" />
        <template v-else-if="type === 'image'">
            <div class="flex items-center gap-2" :class="{'flex-grow':controlFluid}">
                <Image
                    v-if="currentValue" :src="currentValue" :alt="t('Missing Image')"
                    style="max-height: 200px; max-width: 200px" preview />
                <div v-else class="self-center">
                    {{ t('No Image Selected') }}
                </div>
                <FileUpload
                    ref="fileUploadRef"
                    mode="basic"
                    accept="image/*"
                    bs
                    auto
                    custom-upload
                    :choose-label="currentValue ? t('Change Image') : t('Upload Image')"
                    :choose-button-props="{ size: 'small', severity: 'info' }"
                    choose-icon="i-mdi-upload"
                    @uploader="uploadFile"
                />
                <Button
                    v-if="currentValue"
                    v-tooltip.top="t('Delete')"
                    type="button"
                    icon="pi pi-trash"
                    class="p-button-text p-button-danger"
                    @click="removeFile"
                />
            </div>
        </template>
    </div>
</template>

<style scoped></style>
