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
            showTime?: boolean;
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
            <div class="!w-full relative">
                <DatePicker
                    ref="inputRef"
                    v-model="localValue"
                    :placeholder="placeholder"
                    :date-format="localDateFormat"
                    hide-on-date-time-select
                    :show-time="showTime"
                    hour-format="12"
                    class="!w-full"
                    show-icon
                    fluid
                    :size="size"
                    :view="localView"
                    :disabled="disabled"
                    :readonly="readonly"
                    :invalid="hasError"
                    :manual-input="manualInput"
                    :show-button-bar="clearable"
                    @clear-click="()=>clearable &&( localValue=null)"
                />
                <div v-if="clearable && localValue" class="clear-icon-container" :class="[size]">
                    <i class="i-mdi:times clear-icon" @click.stop="localValue = null"></i>
                </div>
            </div>
    </BaseInput>
</template>

<style lang="scss" scoped>
.clear-icon-container{
    @apply z-1 absolute rtl:left-[var(--p-datepicker-dropdown-width)] ltr:right-[var(--p-datepicker-dropdown-width)] me-2 top-0 bottom-0 flex items-center;
    //top: calc(calc(var(--p-inputtext-font-size) + var(--p-inputtext-padding-y)) / 2);

    .clear-icon{
        @apply cursor-pointer text-secondary-hoverable;
    }

    &.small{
        @apply rtl:left-[var(--p-datepicker-dropdown-sm-width)] ltr:right-[var(--p-datepicker-dropdown-sm-width)];
    }
    &.large{
        @apply rtl:left-[var(--p-datepicker-dropdown-lg-width)] ltr:right-[var(--p-datepicker-dropdown-lg-width)];
    }
}
</style>
