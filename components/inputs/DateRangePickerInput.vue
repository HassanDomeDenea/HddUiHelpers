<script setup lang="ts">
import { ref } from 'vue';
import moment from 'moment';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{} & BaseInputProps>(), {});
const { t } = useI18n();
const value = defineModel<[Date | string | null, Date | null | string] | null>('modelValue');
const formattedValue = computed({
    get: () => {
        return value.value?.map(e => e ? moment(e).toDate() : null);
    },
    set: (evt) => {
        value.value = evt?.map(e => e ? moment(e).format('YYYY-MM-DD') : null);
    }
});
const inputRef = ref();

function focus() {
    inputRef.value.$el.focus();
}

function onInputKeydown(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
        const target = evt.target as HTMLInputElement;
        const inputVal = target.value;
        if (inputVal.split('-').length === 3) {
            const m = moment(inputVal);
            if (m.isValid()) {
                if (!value.value) {
                    value.value = [m.format('YYYY-MM-DD'), null];
                } else {
                    value.value[0] = m.format('YYYY-MM-DD');
                }
            }
        }
    }
}

const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
    <BaseInput v-bind="baseInputForwardedProps" @click="focus">
        <DatePicker
            v-bind="generalInputProps"
            ref="inputRef"
            v-model="formattedValue"
            :input-id="fieldUniqueId"
            selection-mode="range"
            :number-of-months="2"
            variant="filled"
            date-format="yy-mm-dd"
            show-button-bar
            class="w-full"
            show-icon
            :select-other-months="true"
            :placeholder="placeholder ?? t('Choose Date')"
            :manual-input="true"
            input-class="text-center"
            :pt="{
        pcInput: {
          root: {
            class: 'dir-ltr min-w-170px',
            onKeydown: onInputKeydown,
          },
        },
      }"
        >
            <template #ww />
        </DatePicker>
    </BaseInput>
</template>

<style lang="scss">
.p-datepicker-next-button {
    @apply rtl:rotate-180;
}

.p-datepicker-prev-button {
    @apply rtl:rotate-180;
}
</style>
