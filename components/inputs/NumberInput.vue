<script setup lang="ts">
import { ref } from 'vue';
import type { InputNumberInputEvent } from 'primevue/inputnumber';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps, ElementClassType } from './types';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(
    defineProps<
        {
            inputClass?: ElementClassType;
            step?: number;
            precision?: number;
            min?: number;
            max?: number;
            useGrouping?: boolean;
            showButtons?: boolean;
            allowEmpty?: boolean;
            immediateUpdate?: boolean;
            textAddon?: string | ((value: any) => string);
            suffix?: string;
        } & BaseInputProps
    >(),
    {
        step: 1,
        useGrouping: false,
        precision: 20
    }
);
const emits = defineEmits<{
    (e: 'keydown', event: KeyboardEvent);
    (e: 'input', event: InputNumberInputEvent);
    (e: 'updated', event: number | null);
}>();
const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {
    inputRef.value.$refs.input.$el.focus();
}

function select() {
    inputRef.value.$refs.input.$el.select();
}

function onInput(event: InputNumberInputEvent) {
    emits('input', event);
    if (props.immediateUpdate) {
        value.value = event.value;
    }
}
const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus, select, ...exposed });
</script>

<template>
    <BaseInput  v-bind="baseInputForwardedProps" @click="focus">
        <template #labelText>
            <slot name="label-text" />
        </template>
        <template v-if="$slots.addon || textAddon" #addon>
            <slot name="addon">
                <span
                    :class="{ 'text-xs': size === 'small', 'text-lg': size === 'large' }"
                    v-html="typeof textAddon === 'function' ? textAddon(value) : textAddon" />
            </slot>
        </template>
        <template v-if="$slots.helper" #helper>
            <slot name="helper" />
        </template>
        <InputNumber
            ref="inputRef"
            v-model="value"
            :input-id="fieldUniqueId"
            :use-grouping="useGrouping"
            class="w-full"
            :max-fraction-digits="precision"
            type="number"
            :class="inputClass"
            v-bind="{
                ...generalInputProps,
                showButtons,
                min,
                suffix,
                max,
                step,
                allowEmpty,
            }"
            @keydown="emits('keydown', $event)"
            @input="onInput"
            @update:model-value="emits('updated', $event)"
        />
    </BaseInput>
</template>

<style scoped></style>
