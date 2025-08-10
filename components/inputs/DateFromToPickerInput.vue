<script setup lang="ts">
import { ref } from 'vue';
import moment from 'moment';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import DatePicker from 'primevue/datepicker';
import type { ComponentExposed } from 'vue-component-type-helpers';
import uniqueId from 'lodash/uniqueId';

const props = withDefaults(
    defineProps<
        {
            manualInput?: boolean;
            clearable?: boolean;
            outputDateFormat?: string;
            placeholderTwo?: string;
            formatAsString?: boolean;
        } & BaseInputProps
    >(),
    {
        outputDateFormat:"YYYY-MM-DD HH:mm:ss",
        manualInput: true,
        formatAsString: true
    }
);

const { t } = useI18n();
const value = defineModel<[Date | string | null, Date | null | string] | null>('modelValue');
const formattedValue = computed({
    get: () => {
        return value.value?.[0];
    },
    set: (evt) => {

    }
});

const fromDateValue = computed({
    get: () => {
        return value.value?.map(e => e ? moment(e).toDate() : null)[0] ?? null;
    },
    set: (evt) => {
        const newRange = value.value ?? [null, null];
        newRange[0] = (evt && props.formatAsString) ? moment(evt).format(props.outputDateFormat) : evt;
        value.value = newRange;
    }
});

const toDateValue = computed({
    get: () => {
        return value.value?.map(e => e ? moment(e).toDate() : null)[1] ?? null;
    },
    set: (evt) => {
        const newRange = value.value ?? [null, null];
        newRange[1] = (evt && props.formatAsString) ? moment(evt).format(props.outputDateFormat) : evt;
        value.value = newRange;
    }
});

const inputRef = ref();
const inputRefTwo = ref();

function focus() {
    inputRef.value.$el.focus();
}

function onDateLocalEnterKeyDown(event: KeyboardEvent){
    if(inputRef.value.overlayVisible){
        inputRef.value.overlayVisible=false
        event.stopPropagation()
    }
}

const fromToLabelClass = computed(() => {
    if (props.size === 'small') {
        return 'text-sm';
    } else if (props.size === 'large') {
        return 'text-lg';
    }
    return '';
});

const fromDateInputId = computed(() => uniqueId('DateFromToPicketInputId'))
const toDateInputId = computed(() => uniqueId('DateFromToPicketInputId'))

const hasError = computed(() => !!props.error);
const baseInputRef = useTemplateRef<ComponentExposed<typeof BaseInput>>('baseInputRef');
defineExpose({ focus, hasError, baseInputRef, disabled: props.disabled });
</script>

<template>
    <BaseInput ref="baseInputRef" v-bind="props" :on-local-enter-key-down="onLocalEnterKeyDown ?? onDateLocalEnterKeyDown" @click="focus">
        <div class="flex gap-2 items-center">
            <label :for="fromDateInputId" :class="[fromToLabelClass]">{{ t('From') }}</label>
            <DatePicker
                ref="inputRef"
                v-model="fromDateValue"
                :placeholder="placeholder"
                :date-format="'yy-mm-dd'"
                :input-id="fromDateInputId"
                class="w-full"
                show-icon
                :size="size"
                :disabled="disabled"
                :readonly="readonly"
                :invalid="hasError"
                :manual-input="manualInput"
                :show-button-bar="clearable"
                @clear-click="()=>clearable &&( fromDateValue=null)"
            />
            <label :for="toDateInputId" :class="[fromToLabelClass]" class="ms-4">{{ t('To') }}</label>
            <DatePicker
                ref="inputRefTwo"
                v-model="toDateValue"
                :placeholder="placeholderTwo"
                :date-format="'yy-mm-dd'"
                class="w-full"
                :input-id="toDateInputId"
                show-icon
                :size="size"
                :disabled="disabled"
                :readonly="readonly"
                :invalid="hasError"
                :manual-input="manualInput"
                :show-button-bar="clearable"
                @clear-click="()=>clearable &&( toDateValue=null)"
            />
        </div>
    </BaseInput>
</template>

<style lang="scss">
</style>
