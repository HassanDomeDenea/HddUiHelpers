<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import get from 'lodash/get';
import type { SelectChangeEvent } from 'primevue/select';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

interface OptionInterface {
  name: string;
  id: number;
}

const props = withDefaults(
  defineProps<
    {
      options: any[];
      optionLabelProperty?: string | null;
      optionValueProperty?: string | null;
      resetFilterOnHide?: boolean;
      display?: 'comma' | 'chip';
      maxSelectedLabels?: number;
      selectionLimit?: number;
      showToggleAll?: boolean;
      optionLabelFormatter?: (item: OptionInterface | ValueInterface, index: number) => string;
      valueLabelFormatter?: (item: OptionInterface | ValueInterface, placeholder?: string) => string;
      optionAndValueLabelFormatter?: (item: OptionInterface | ValueInterface) => string;
    } & BaseInputProps
  >(),
  {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    maxSelectedLabels: 5,
    display: 'comma',
    showToggleAll: true,
  },
);
const emits = defineEmits<{
  change: [event: SelectChangeEvent];
}>();
const value = defineModel<any>('modelValue');

const inputRef = ref();

function focus() {
  if (!props.disabled) {
    inputRef.value.show();
  }
}

function onInputBlur() {}
const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

const { t } = useI18n();

function getOptionText(option: OptionInterface, index: number) {
  if (!option) return '&nbsp;';
  if (props.optionLabelFormatter) {
    return props.optionLabelFormatter(option, index);
  } else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(option);
  } else {
    return get(option, props.optionLabelProperty) ?? '&nbsp;';
  }
}

function getValueText(_value: any, _placeholder?: string) {
  const placeholderText = _placeholder ? `<span class="text-muted px-2">${_placeholder}</span>` : undefined;
  if (!_value || _value.length === 0) {
    return placeholderText ?? `&nbsp;`;
  }
  if (_value.length > props.maxSelectedLabels) {
    return `${_value.length} ${t('multiSelectItemsSelectedLabel')}`;
  }

  return _value.map((_id) => {
    const _item = props.options.find((e) => e[props.optionValueProperty] === _id);
    if (!_item) {
      return '---';
    }
    if (props.valueLabelFormatter) {
      return props.valueLabelFormatter(_item, placeholder) ?? '---';
    } else if (props.optionAndValueLabelFormatter) {
      return props.optionAndValueLabelFormatter(_item) ?? '---';
    } else {
      return get(_item, props.optionLabelProperty) ?? '---';
    }
  });
}

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <template v-if="$slots.addon" #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <MultiSelect
      v-bind="generalInputProps"
      ref="inputRef"
      v-model="value"
      :input-id="fieldUniqueId"
      :placeholder="placeholder"
      :auto-filter-focus="true"
      variant="filled"
      :display="display"
      :max-selected-labels="maxSelectedLabels"
      :selection-limit="selectionLimit"
      :show-toggle-all="showToggleAll"
      auto-option-focus
      reset-filter-on-hide
      filled
      :name="name"
      :data-name="name"
      fluid
      highlightonselect
      filter
      :options="options"
      :selected-items-label="`{0} ${t('multiSelectItemsSelectedLabel')}`"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      class="!w-full"
      scroll-height="18rem"
      @blur="onInputBlur"
      @change="emits('change', $event)"
    >
      <template #value="{ value: _value, placeholder: selectPlaceholder }">
        <slot name="value" :value="_value" :placeholder="selectPlaceholder">
          <div v-html="getValueText(_value, selectPlaceholder)" />
        </slot>
      </template>
      <template #option="{ option, index }">
        <span :aria-labelledby="getOptionText(option, index)" :data-value="get(option, optionValueProperty)">
          <slot name="option" :option="{ option, index }">
            <div v-html="getOptionText(option, index)" />
          </slot>
        </span>
      </template>
    </MultiSelect>
  </BaseInput>
</template>

<style scoped></style>
