<script setup lang="ts">
import SelectInput from '../inputs/SelectInput.vue'

withDefaults(defineProps<{
  options: any[]
  label?: string
  optionLabelProperty?: string
  optionValueProperty?: string
}>(), {
  optionLabelProperty: 'name',
  optionValueProperty: 'id',
})

const slotProps = defineModel('slotProps', { required: true })

const { t } = useI18n()
function onValueChanged(val: any) {
  slotProps.value.filterModel.value = val
  slotProps.value.filterModel.matchMode = 'equals'
  slotProps.value.filterCallback()
}
</script>

<template>
  <SelectInput
    :model-value="slotProps.filterModel.value"
    clearable :option-label-property="optionLabelProperty"
    label-class="mb-2" :option-value-property="optionValueProperty"
    :placeholder="t('Choose to filter')" :label="label" :options="options"
    @update:model-value="onValueChanged"
  />
</template>

<style scoped>

</style>
