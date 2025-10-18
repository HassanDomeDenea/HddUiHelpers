<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import type { TipTapEditorConfig } from 'HddUiHelpers/components/TipTapEditor/TipTapEditorTypes.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
const props = defineProps<
  BaseInputProps & {
    config?: TipTapEditorConfig;
  }
>();

const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

const tipTapConfig = computed(() => {
  return {
    readonly: generalInputProps.value.readonly,
    disabled: generalInputProps.value.disabled,
    placeholder: props.placeholder,
    ...props.config,
  } as TipTapEditorConfig;
});

defineExpose({ focus, ...exposed, inputRef });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" class="HDD_Quill_Editor" @click="focus">
    <TipTapEditor :id="fieldUniqueId" ref="inputRef" v-model="value" class="w-full" :config="tipTapConfig" />
  </BaseInput>
</template>

<style lang="scss"></style>
