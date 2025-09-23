<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { pick } from 'lodash-es';
import moment from 'moment';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

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
    outputDateFormat: 'YYYY-MM-DD HH:mm:ss',
    manualInput: true,
    formatAsString: true,
  },
);

const { t } = useI18n();
const value = defineModel<[Date | string | null, Date | null | string] | null>('modelValue');

const fromDateValue = computed({
  get: () => {
    return value.value?.map((e) => (e ? moment(e).toDate() : null))[0] ?? null;
  },
  set: (evt) => {
    const newRange = value.value ?? [null, null];
    newRange[0] = evt && props.formatAsString ? moment(evt).format(props.outputDateFormat) : evt;
    value.value = newRange;
  },
});

const toDateValue = computed({
  get: () => {
    return value.value?.map((e) => (e ? moment(e).toDate() : null))[1] ?? null;
  },
  set: (evt) => {
    const newRange = value.value ?? [null, null];
    newRange[1] = evt && props.formatAsString ? moment(evt).format(props.outputDateFormat) : evt;
    value.value = newRange;
  },
});

const inputRef = ref();

function focus() {
  inputRef.value.$el.focus();
}

function onDateLocalEnterKeyDown(event: KeyboardEvent) {
  if (inputRef.value.overlayVisible) {
    inputRef.value.overlayVisible = false;
    event.stopPropagation();
  }
}

const { exposed, baseInputForwardedProps, fieldUniqueId } = useHddBaseInputUtils(props);
const dateInputBinds = computed(() => {
  return {
    ...pick(props, ['placeholder', 'size', 'disabled', 'readonly', 'error', 'manualInput', 'clearable']),
    labelSingleLine: true,
    inline: true,
  };
});
defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" :on-local-enter-key-down="onLocalEnterKeyDown ?? onDateLocalEnterKeyDown" @click="focus">
    <div class="flex items-center gap-6">
      <DatePickerInput ref="inputRef" v-model="fromDateValue" :label="t('From')" v-bind="dateInputBinds" :unique-id="fieldUniqueId" />
      <DatePickerInput v-model="toDateValue" :label="t('To')" v-bind="dateInputBinds" />
    </div>
  </BaseInput>
</template>

<style lang="scss"></style>
