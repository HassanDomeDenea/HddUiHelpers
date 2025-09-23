<script setup lang="ts">
import MultiSelectInput from '../inputs/MultiSelectInput.vue';

withDefaults(
  defineProps<{
    options: any[];
    label?: string;
    optionLabelProperty?: string;
    optionValueProperty?: string;
  }>(),
  {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
  },
);

const slotProps = defineModel('slotProps', { required: true });

const { t } = useI18n();
function onValueChanged(val: any) {
  if (val.length) {
    slotProps.value.filterModel.value = val;
    slotProps.value.filterModel.matchMode = 'whereIn';
  } else {
    slotProps.value.filterModel.value = null;
    slotProps.value.filterModel.matchMode = 'whereIn';
  }
  slotProps.value.filterCallback();
}
</script>

<template>
  <MultiSelectInput
    :model-value="slotProps.filterModel.value"
    clearable
    :option-label-property="optionLabelProperty"
    label-class="mb-2"
    :option-value-property="optionValueProperty"
    :placeholder="t('Choose to filter')"
    :label="label"
    :options="options"
    @update:model-value="onValueChanged"
  />
</template>

<style scoped></style>
