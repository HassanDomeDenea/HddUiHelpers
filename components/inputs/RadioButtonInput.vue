<script setup lang="ts">
import type { BaseInputProps } from './types';
import uniqueId from 'lodash/uniqueId';
import BaseInput from './BaseInput.vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { get, set, snakeCase, startCase } from 'lodash-es';
import { RadioButton } from 'primevue';
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts';

const props = withDefaults(defineProps<{
    options: (string | Record<string, any>)[]
    optionLabelProperty?: string | null
    optionDisabledProperty?: string | null
    optionValueProperty?: string | null
    formatter?: ((OptionOrValue: any, type: 'option' | 'value') => string)
    clearable?: boolean,
    autoTranslateLabels?: boolean,
} & BaseInputProps>(), {
    optionLabelProperty: 'name',
    optionDisabledProperty: 'disabled',
    optionValueProperty: 'id',
    clearable: false
});
const emits = defineEmits<{
    change: [event: Event];
}>();
const value = defineModel<any>('modelValue', { default: null });
const { t } = useI18n();

const inputRefs = useTemplateRef<ComponentExposed<typeof RadioButton>[]>('inputRefs');

const inputRef = computed<any>(() => {
    return inputRefs.value?.[0];
});

function focus() {
    inputRef.value.$el?.querySelector('input')?.focus();
}

function onLabelClicked() {
    if (!props.disabled) {
        focus();
    }
}


const mappedOptions = computed(() => {
    return props.options.map(option => {
        if (typeof option === 'string') {
            return {
                [props.optionValueProperty]: option,
                [props.optionLabelProperty]: props.autoTranslateLabels ? t(startCase(option)) : option,
            };
        }

        if(props.autoTranslateLabels && !option._skip_auto_translation){
            option = { ...option }
            set(option, props.optionLabelProperty,t(startCase(get(option, props.optionLabelProperty))))
        }

        return option;
    });
});

const fieldUniqueId = computed(() => {
    return uniqueId(props.name ?? 'unnamed');
});
const hasError = computed(() => !!props.error);
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef');


defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled });
</script>

<template>
    <BaseInput
        ref="baseInputRef"
        v-bind="{ ...props, floatingLabel: false, infieldTopAlignedLabel: false }"
        :input-id="fieldUniqueId"
        :floating-label="false"
        :infield-top-aligned-label="false"
        @label-clicked="onLabelClicked"
    >
        <RadioButtonGroup v-model="value" :name="name" class="flex flex-wrap gap-5">
            <template v-for="option in mappedOptions" :key="option">
                <div class="flex items-center gap-2">
                    <RadioButton
                        ref="inputRefs"
                        :value="get(option,optionValueProperty)"
                        :size="size"
                        :invalid="hasError"
                        :input-id="fieldUniqueId+'_'+snakeCase(get(option,optionValueProperty))"
                        v-bind="{ disabled, readonly }"
                        :disabled="disabled || get(option,optionDisabledProperty)"
                        @change="emits('change', $event)"
                    />
                    <label
                        class="select-none"
                        :class="{'cursor-pointer': value !== get(option,optionValueProperty) && !(disabled || get(option,optionDisabledProperty))
                    ,'text-sm': size === 'small', 'text-lg': size === 'large' }"
                        :for="fieldUniqueId+'_'+snakeCase(get(option,optionValueProperty))"
                    >
                        {{ autoTranslateLabels ? t(startCase(get(option, optionLabelProperty))) : get(option, optionLabelProperty)
                        }}
                    </label>
                </div>

            </template>
            <div v-if="clearable && value !== null && value !== undefined" style="line-height: 1">
                <Button icon="i-mdi-times" severity="danger" size="small" text @click="value=null" />
            </div>
        </RadioButtonGroup>

    </BaseInput>
</template>

<style scoped></style>
