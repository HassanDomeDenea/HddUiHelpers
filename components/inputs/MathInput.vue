<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { formatNumberGrouped } from 'HddUiHelpers/utils/useFormatters.ts';
import type { InputNumberInputEvent } from 'primevue/inputnumber';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps, ElementClassType } from './types';
import { evaluate } from 'mathjs';
const props = withDefaults(
  defineProps<
    {
      inputClass?: ElementClassType;
      step?: number;
      withFormattedAddon?: boolean;
      textAddon?: string;
      formatterAddonAppendText?: string;
    } & BaseInputProps
  >(),
  {
    step: 1,
  },
);
const emits = defineEmits<{
  (e: 'keydown', event: KeyboardEvent);
  (e: 'input', event: InputNumberInputEvent);
  (e: 'updated', event: number | null);
}>();
const value = defineModel<number>('modelValue');
const { t } = useI18n();
const inputRef = ref();

function focus() {
  inputRef.value.$el.focus();
}

function select() {
  inputRef.value.$el.select();
}

const targetDir = 'ltr';
const localValue = ref<string | null>();
watch(
  value,
  (_newValue) => {
    localValue.value = _newValue?.toString() ?? '';
  },
  {
    immediate: true,
  },
);

function doCalculation(_updateValues: boolean = true) {
  let finalVal = null;
  const currentValue = localValue.value?.trim();
  if (currentValue === null || currentValue === '') {
    value.value = null;
    return;
  }
  try {
    const _value = ('' + currentValue).replaceAll(' ', '');
    finalVal = evaluate(_value);
  } catch (e) {
    // console.error(e);
  }
  const numericResult = isNaN(+finalVal) ? null : +finalVal;
  if (_updateValues === true) {
    updateValues(numericResult);
  }
  return numericResult;
}

function onInputKeydownEnter(event: KeyboardEvent) {
  doCalculation();
  emits('keydown', event);
}

function onInputKeydownUp() {
  if (hasMathOperatorNotFirst(localValue.value)) {
    doCalculation();
  } else {
    let result = doCalculation(false);
    result = (isNaN(result) ? 0 : result) + props.step;
    updateValues(result);
  }
}

function onInputKeydownDown() {
  if (hasMathOperatorNotFirst(localValue.value)) {
    doCalculation();
  } else {
    let result = doCalculation(false);
    result = (isNaN(result) ? 0 : result) - props.step;
    updateValues(result);
  }
}

function updateValues(numericResult: number | null = null) {
  localValue.value = numericResult?.toString() ?? '';
  value.value = numericResult;
  emits('updated', value.value);
}

function hasMathOperatorNotFirst(str: string) {
  // This regex checks for + - / * that are NOT the first character
  return /[^]{1}.*[+\-/*]/.test(str.slice(1));
}
const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed, select, hasMathOperatorNotFirst });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <template #labelText>
      <slot name="label-text" />
    </template>
    <template v-if="$slots.addon || textAddon" #addon>
      <slot name="addon">
        <span :class="{ 'text-sm': size === 'small', 'text-lg': size === 'large' }" v-html="textAddon" />
      </slot>
    </template>
    <template v-if="$slots.helper" #helper>
      <slot name="helper" />
    </template>
    <InputGroup>
      <IconField>
        <InputText
          v-bind="generalInputProps"
          :id="fieldUniqueId"
          ref="inputRef"
          v-model="localValue"
          :style="{ ['padding' + (targetDir === 'ltr' ? 'Right' : 'Left')]: '20px' }"
          :class="inputClass"
          @keydown.enter.prevent="onInputKeydownEnter"
          @keydown.up.prevent="onInputKeydownUp"
          @keydown.down.prevent="onInputKeydownDown"
          @keydown.space="doCalculation()"
          @change="doCalculation()"
        />
        <InputIcon :title="t('Support Math Operations')" class="i-mdi-calculator !light:text-zinc-400 !dark:text-zinc-500" />
      </IconField>
      <InputGroupAddon v-if="withFormattedAddon" style="min-width: unset">
        <div class="flex gap-1">
          <span v-if="value > 999">{{ value !== null ? formatNumberGrouped(value, false) : null }}</span>
          <span v-if="formatterAddonAppendText" v-html="formatterAddonAppendText"></span>
        </div>
      </InputGroupAddon>
    </InputGroup>
  </BaseInput>
</template>

<style scoped></style>
