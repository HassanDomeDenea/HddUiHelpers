<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'
import type { ComponentExposed } from 'vue-component-type-helpers';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';

const props = withDefaults(defineProps<{
  notSelectedValue?: 'null' | 'undefined'
} & BaseInputProps>(), {
  notSelectedValue: 'null',
  controlBeforeLabel: true,
  hideLabelDoubleDots: true,
})
const value = defineModel<any>('modelValue')

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}


const isStated = computed(() => {
  return value.value === true || value.value === false
})
const isIndeterminate = computed(() => {
  return value.value === false
})

function onCheckboxStateChange() {
  if (props.disabled)
    return
  switch (value.value) {
    case true:
      value.value = false
      break
    case false:
      value.value = props.notSelectedValue === 'null' ? null : undefined
      break
    case '':
    case undefined:
    case null:
    default:
      value.value = true
      break
  }
}

const {exposed,baseInputForwardedProps,fieldUniqueId,generalInputProps} = useHddBaseInputUtils(props);

defineExpose({ focus,...exposed })

</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" :label-class="`${labelClass} select-none`" @label-clicked.stop.prevent="onCheckboxStateChange">
    <!--    <pre>Is stated {{ isStated }}</pre> -->
    <!--    <pre>Is Indeterminate {{ isIndeterminate }}</pre> -->
    <Checkbox
        v-bind="generalInputProps"
        :input-id="fieldUniqueId"
      :model-value="isStated" :indeterminate="isIndeterminate" binary :class="{ 'p-checkbox-checked': isStated, 'p-checkbox-indeterminate': isIndeterminate }"
      readonly
      @click="onCheckboxStateChange"
    >
      <template #icon="slotProps">
        <i v-if="slotProps.checked" class="pi pi-check text-[var(--p-checkbox-icon-checked-color)]" />
        <i v-if="slotProps.indeterminate" class="pi pi-times dark:text-red-700 light:text-red-100" />
      </template>
    </Checkbox>
    <template #labelText>
      <slot name="labelText" />
    </template>
    <template v-if="$slots.afterLabel" #afterLabel>
      <slot name="afterLabel" />
    </template>
    <template v-if="$slots.afterControl" #afterControl>
      <slot name="afterControl" />
    </template>
    <template v-if="$slots.addon" #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
  </BaseInput>
</template>

<style lang="scss">
.p-checkbox-indeterminate{
  .p-checkbox-box {
    @apply dark:(border-red-400 bg-red-400) light:(border-red-500 bg-red-500);
  }
}
</style>
