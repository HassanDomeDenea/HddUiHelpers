<script setup lang="ts">
import type { BaseInputProps } from './types';
import uniqueId from 'lodash/uniqueId';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{} & BaseInputProps>(), {});
const emits = defineEmits<{
    change: [event: Event];
}>();
const value = defineModel<any>('modelValue', { default: ref().value });

const inputRef = ref();

function focus() {
    inputRef.value.$el.focus();
}

function onLabelClicked() {
    if (!props.disabled) {
        inputRef.value.$el.children[0].click();
    }
}

function onCheckboxChange(evt: Event) {
    emits('change', evt);
}

onMounted(() => {
    inputRef.value.$el.children[0].addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            onLabelClicked();
        }
    });
});


const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus,...exposed });
</script>

<template>
    <BaseInput
        v-bind="baseInputForwardedProps"
        :floating-label="false"
        :infield-top-aligned-label="false"
    >
        <Checkbox
            ref="inputRef"
            v-bind="generalInputProps"
            v-model="value"
            :input-id="fieldUniqueId"
            binary
            @change="onCheckboxChange"
        />
    </BaseInput>
</template>

<style scoped></style>
