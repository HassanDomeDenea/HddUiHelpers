<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import moment from 'moment';
import DatePicker from 'primevue/datepicker'
import type { ComponentExposed } from 'vue-component-type-helpers';
const props = withDefaults(
    defineProps<
        {
            manualInput?: boolean;
            isYearOnly?: boolean;
            clearable?: boolean;
            dateFormat?: string;
            formatAsString?: boolean;
        } & BaseInputProps
    >(),
    {
        manualInput: false,
        isYearOnly: false,
        formatAsString:true,
    },
);
const value = defineModel<any>('modelValue');

const inputRef = useTemplateRef<ComponentExposed<typeof DatePicker>>('inputRef');

function focus() {
    inputRef.value.input?.click()
}

const localValue = computed({
    get: () => value.value,
    set: (val) => {
        if(val && props.formatAsString){
            value.value = moment(val).format('YYYY-MM-DD HH:mm:ss');
        }else{
            value.value = val;
        }
    },
});

function onDateLocalEnterKeyDown(event: KeyboardEvent){
    if(inputRef.value.overlayVisible){
        inputRef.value.overlayVisible=false
        event.stopPropagation()
    }
}
const hasError = computed(() => !!props.error);
const localDateFormat = computed(() => (props.isYearOnly ? 'yy' : (props.dateFormat ?? 'yy-mm-dd')));
const localView = computed(() => (props.isYearOnly ? 'year' : undefined));
 const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef')
defineExpose({ focus, inputRef, hasError ,baseInputRef,disabled: props.disabled });
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" :on-local-enter-key-down="onLocalEnterKeyDown ?? onDateLocalEnterKeyDown" @click="focus" >
            <DatePicker
                ref="inputRef"
                v-model="localValue"
                :placeholder="placeholder"
                :date-format="localDateFormat"
                class="w-full"
                show-icon
                :size="size"
                :view="localView"
                :disabled="disabled"
                :readonly="readonly"
                :invalid="hasError"
                :manual-input="manualInput"
                :show-button-bar="clearable"
                @clear-click="()=>clearable &&( localValue=null)"
            />
    </BaseInput>
</template>

<style scoped></style>
