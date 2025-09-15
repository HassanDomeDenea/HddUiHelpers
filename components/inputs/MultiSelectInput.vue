<script setup lang="ts">
import {ref} from 'vue'
import type {SelectChangeEvent} from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{
    options: any[]
    optionLabelProperty?: string | null
    optionValueProperty?: string | null
    resetFilterOnHide?: boolean
    display?: 'comma' | 'chip'
    maxSelectedLabels?: number
    selectionLimit?: number
    showToggleAll?: boolean
} & BaseInputProps>(), {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    maxSelectedLabels: 5,
    display: 'comma',
    showToggleAll: true,
})
const emits = defineEmits<{
    change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
    if (!props.disabled) {
        inputRef.value.show()
    }
}

function onInputBlur() {

}
const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

const {t} = useI18n()
defineExpose({focus, ...exposed})
</script>

<template>
    <BaseInput v-bind="baseInputForwardedProps" @click="focus">
        <template v-if="$slots.addon" #addon>
            <slot name="addon"/>
        </template>
        <template v-if="$slots.helper || helperText" #helper>
            <slot name="helper">
                <div v-html="helperText"/>
            </slot>
        </template>
        <MultiSelect
            v-bind="generalInputProps"
            ref="inputRef"
            v-model="value"
            :input-id="fieldUniqueId"
            :placeholder="placeholder"
            :auto-filter-focus="true"
            variant="filled"
            :display="display"
            :max-selected-labels="maxSelectedLabels"
            :selection-limit="selectionLimit"
            :show-toggle-all="showToggleAll"
            auto-option-focus reset-filter-on-hide filled fluid highlightonselect filter
            :options="options"
            :selected-items-label="`{0} ${t('multiSelectItemsSelectedLabel')}`"
            :option-label="optionLabelProperty"
            :option-value="optionValueProperty"
            class="!w-full"
            scroll-height="18rem"
            @blur="onInputBlur"
            @change="emits('change', $event)"
        />
    </BaseInput>
</template>

<style scoped>

</style>
