<script setup lang="ts" generic="T extends string">
import { isAxiosError } from 'axios';
import CheckboxInput from 'HddUiHelpers/components/inputs/CheckboxInput.vue';
import TextInput from 'HddUiHelpers/components/inputs/TextInput.vue';
import type { BaseInputProps } from 'HddUiHelpers/components/inputs/types';
import { useApiClient } from 'HddUiHelpers/stores/apiClient';
import { find, mapValues, throttle } from 'lodash-es';
import { reactive } from 'vue';
import type { UseHddFormOptions } from '../../utils/useHddForm';
import { useHddForm } from '../../utils/useHddForm';
import type { FieldError, HddFormField, HddFormProps, HddFormValues } from './types';
import { isAxiosValidationError } from './types';

const {
    defaultValidationMode = 'onSubmit',
    summarizeErrorsAtTop = true,
    showFieldErrorBelowIt = false,
    showFieldErrorsPopover = false,
    showRequiredAsterisk = false,
    inlineFields = true,
    size,
    formName,
    urlMethod = 'post',
    submitText = '',
    unifyLabelsWidth = false,
    fields,
    fixedLabelWidth,
    url,
    onSuccess,
    iconAsAddon,
    floatingLabel,
    floatingLabelVariant,
    submitOnEnter = true,
    infieldTopAlignedLabel,
} = defineProps<HddFormProps<T>>();

const emits = defineEmits<{
    submit: [
        values: HddFormValues<T>,
        context: {
            setFieldErrors: (fieldName: T, errors: FieldError[] | string[]) => void;
            addFieldError: (fieldName: T, error: FieldError | string) => void;
            setMultiFieldsErrors: (errors: Record<T, FieldError[] | string[]>) => void;
        },
    ];
}>();

const apiClient = useApiClient();

const { t } = useI18n();
const hddFormOptions = reactive({
    fields,
    defaultValidationMode,
    onSubmit: (values, context) => {
        emits('submit', values, context);
        if (url) {
            submitToUrl().then((result) => {
                if (onSuccess) {
                    onSuccess(result);
                }
            });
        }
    },
} as UseHddFormOptions<T>);

const containerRef = templateRef('containerRef');
const form = useHddForm<T>(hddFormOptions as UseHddFormOptions<T>);

async function submitToUrl(): Promise<any> {
    if (!url) return;
    try {
        let res;
        if (typeof url === 'object') {
            res = await apiClient.request(url, form.currentValues.value, false);
        } else {
            switch (urlMethod) {
                case 'post':
                    res = await apiClient.post(url, form.currentValues.value);
                    break;
                case 'put':
                    res = await apiClient.put(url, form.currentValues.value);
                    break;
                case 'get':
                    res = await apiClient.get(url, { params: form.currentValues.value });
                    break;
                case 'delete':
                    res = await apiClient.delete(url, { params: form.currentValues.value });
                    break;
            }
        }
        return res.data;
    } catch (error: unknown) {
        form.clearErrors();
        if (isAxiosValidationError(error)) {
            form.setMultiFieldsErrors(mapValues(error.response.data.errors, (i) => i.map((e) => ({ message: e }))) as Record<T, FieldError[]>);
        } else if (isAxiosError(error)) {
            form.addGlobalError(t(error.response?.data.message ?? error.message ?? 'Error Occurred'));
        } else {
            form.addGlobalError(t('Error Occurred'));
        }
        await nextTick();
        if (!document.activeElement || document.activeElement.getAttribute('aria-invalid') !== 'true') {
            if (false === focusFirstWithError()) {
                focusFirst();
            }
        }
    }
}

// const currentValues = toRef(() => form.currentValues)

const { requiredFieldsNames, formState, fields: formFields } = form;

const currentValues = form.currentValues as any;
const fieldsStates = form.fieldsStates as any;

const labelWidthStyle = computed(() => {
    return fixedLabelWidth && fixedLabelWidth > 0 ? `width: ${fixedLabelWidth}px` : '';
});

const fieldRefs = ref<{ [k in string]: any }>({});

const generalInputsProps = computed<Partial<BaseInputProps>>(() => {
    return {
        labelStyle: labelWidthStyle.value,
        inline: inlineFields,
        formName: formName || 'test-form',
        labelSingleLine: inlineFields,
        iconAsAddon,
        size,
        floatingLabel,
        floatingLabelVariant,
        infieldTopAlignedLabel,
        onKeydown: (e: KeyboardEvent) => e.code === 'Enter' && submitOnEnter && form.submitForm(),
    };
});

function generalInputBindsByField(field: HddFormField<T>): Partial<BaseInputProps> & { ref: any } {
    return {
        label: field.label,
        ref: (el: any) => (fieldRefs.value[field.name] = el),
        required: requiredFieldsNames.value[field.name],
        showRequiredAsterisk: showRequiredAsterisk,
        helperText: field.notes,
        name: field.name,
        autocomplete: field.autocomplete,
        icon: field.icon,
        size: field.size ?? size,
        error: fieldsStates.value[field.name].error?.message,
        showErrorMessage: showFieldErrorBelowIt,
        ...(field.binds ?? {}),
    };
}

const calculateUnifiedLabelsSpacing = throttle(() => {
    //TODO: Refactor or Remoe
    let maxWidth = -1;
    if (typeof unifyLabelsWidth === 'number') {
        maxWidth = unifyLabelsWidth;
    } else if (unifyLabelsWidth) {
        const labels = containerRef.value?.querySelectorAll<HTMLLabelElement>('[data-label-form-name="test-form"]');
        labels.forEach((label) => {
            maxWidth = Math.max(maxWidth, label.offsetWidth);
        });
    }

    if (maxWidth > -1) {
        document.documentElement.style.setProperty('--label-width-for-form-test-form', `${maxWidth}px`);
    }
}, 50);

watch(
    () => form.fields.value.map((e) => !e.hidden).length,
    () => {
        calculateUnifiedLabelsSpacing();
    },
    {
        immediate: false,
        flush: 'post',
    },
);

onMounted(() => {
    focusFirst();
    calculateUnifiedLabelsSpacing();
});

function focusFirstWithError(): boolean | null {
    const item = find(fieldRefs.value, (item) => {
        return item.hasError;
    });
    if (item) {
        item.focus();
        return null;
    } else {
        return false;
    }
}

function focusFirst() {
    Object.values(fieldRefs.value)[0]?.focus();
}

defineExpose({ form });
</script>

<template>
    <div ref="containerRef" class="">
        <!--            <pre>{{ formState }}</pre>-->
        <div>
            <div v-if="summarizeErrorsAtTop && formState.invalid">
                <Message
                    :size="size"
                    severity="error"
                    class="mt-1 mb-2 text-right"
                    icon="i-heroicons-exclamation-triangle-20-solid !size-8 !text-4xl"
                >
                    <template v-for="error in formState.errors" :key="error">
                        <li>
                            {{ error.message }}
                        </li>
                    </template>
                </Message>
            </div>
            <template v-for="field in formFields" :key="field.name">
                <div class="mb-2">
                    <div class="flex items-center gap-1">
                        <div class="flex-grow">
                            <template v-if="field.type === 'checkbox'">
                                <CheckboxInput
                                    v-model="currentValues[field.name]"
                                    v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                                />
                            </template>
                            <template v-if="field.type === 'password'">
                                <PasswordInput
                                    v-model="currentValues[field.name]"
                                    v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                                />
                            </template>
                            <template v-else>
                                <TextInput
                                    v-model="currentValues[field.name]"
                                    v-bind="{ ...generalInputsProps, ...generalInputBindsByField(field) }"
                                />
                            </template>
                        </div>
                        <template v-if="showFieldErrorsPopover">
                            <div class="self-start ltr:pr-2 rtl:pl-2" :class="{ 'pt-7': !inlineFields, 'pt-1': inlineFields }">
                                <Button severity="warn" text size="small">
                                    <i class="i-heroicons-exclamation-triangle-20-solid text-2xl" />
                                </Button>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        <div class="mt-4">
            <Button
                :size="size"
                :disabled="formState.invalid && defaultValidationMode === 'onValueUpdate'"
                :label="submitText === false ? undefined : submitText || t('Submit')"
                :icon="submitIcon"
                :severity="submitSeverity"
                @click="form.submitForm()"
            />
        </div>
    </div>
</template>

<style scoped></style>
