<script setup lang="ts">
import HddForm from 'HddUiHelpers/components/FormWrapper/HddForm.vue';
import type { HddFormField, HddFormProps } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
const props = defineProps<
  BaseInputProps & {
    fields?: HddFormField[];
    binds?: HddFormProps;
  }
>();

const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {}

const { exposed, baseInputForwardedProps, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed, inputRef });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <HddForm
      ref="inputRef"
      v-model="value"
      v-bind="{ ...generalInputProps, ...binds }"
      :fields="fields"
      :with-footer-buttons="false"
      class="w-full"
    />
  </BaseInput>
</template>

<style lang="scss"></style>
