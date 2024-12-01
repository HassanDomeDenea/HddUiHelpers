<script setup lang="ts">
import {ref} from 'vue'
import type {SelectChangeEvent} from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type {BaseInputProps} from './types'

const props = withDefaults(defineProps<{
    options: any[]
    optionLabelProperty?: string | null
    optionValueProperty?: string | null
    filter?: boolean
    multiple?: boolean
    checkmark?: boolean
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

const {t} = useI18n()

defineExpose({focus})
</script>

<template>
    <BaseInput v-bind="props" @click="focus">
        <template v-if="$slots.addon" #addon>
            <slot name="addon"/>
        </template>
        <template v-if="$slots.helper || helperText" #helper>
            <slot name="helper">
                <div v-html="helperText"/>
            </slot>
        </template>
        <Listbox
            ref="inputRef"
            v-model="value"
            :filter="filter"
            :placeholder="placeholder"
            :disabled="disabled"
            :multiple="multiple"
            :option-label="optionLabelProperty"
            :option-value="optionValueProperty"
            :options="options"
            :checkmark="checkmark"
            class="w-full"
            :readonly="readonly"
            @change="emits('change', $event)"

        />
    </BaseInput>
</template>

<style scoped>

</style>
