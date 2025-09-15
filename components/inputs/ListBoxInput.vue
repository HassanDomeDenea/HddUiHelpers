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
    filter?: boolean
    multiple?: boolean
    checkmark?: boolean
    scrollHeight?: string
} & BaseInputProps>(), {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    checkmark: true,
})
const emits = defineEmits<{
    change: [event: SelectChangeEvent]
}>()
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
    if (!props.disabled) {
        // inputRef.value.show()
    }
}

function onInputBlur() {

}


const {exposed,baseInputForwardedProps,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({focus,...exposed})
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
        <Listbox
            v-bind="generalInputProps"
            ref="inputRef"
            v-model="value"
            :filter="filter"
            :placeholder="placeholder"
            :multiple="multiple"
            :option-label="optionLabelProperty"
            :option-value="optionValueProperty"
            :options="options"
            :checkmark="checkmark"
            :scroll-height="scrollHeight"
            class="w-full"
            @change="emits('change', $event)"

        />
    </BaseInput>
</template>

<style scoped>

</style>
