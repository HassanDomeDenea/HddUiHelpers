<script setup lang="ts">
import type { BaseInputProps } from './types'
import {useI18n} from 'vue-i18n'
defineProps<BaseInputProps>()
const emits = defineEmits<{
  labelClicked: [event: PointerEvent]
}>()
const slots = defineSlots<{
  addon: () => any
  afterLabel: () => any
  labelText: () => any
  default: () => any
  helper: () => any
  afterControl: () => any
}>()
const helperSlotRef = ref()
const { t } = useI18n()
</script>

<template>
  <div class="form-control-wrapper" :class="{ 'flex gap-2 items-center ': inline, '!items-start': inline && slots.helper }">
    <template v-for="i in [0, 1, 2]" :key="i">
      <label
        v-if="i === 1"
        class="flex items-center gap-1"
        :class="[labelClass, { 'form-control-label-selector': !ignoreLabelSelector, 'mt-[8px]': inline && slots.helper, 'whitespace-pre': labelSingleLine }]"
        @click="emits('labelClicked', $event)"
      >
        <span :class="[icon, iconClass]" />
        <slot name="labelText">
          <span v-if="label">
            {{ autoI18nLabel === true ? t(label) : label }}
            <span v-if="!hideLabelDoubleDots">:</span>
          </span>
        </slot>
      </label>
      <slot v-if="i === 1" name="afterLabel" />
      <div v-if="(!controlBeforeLabel && i === 2) || (controlBeforeLabel && i === 0)" :class="[{ 'w-full': !controlBeforeLabel }, controlWrapperClass]">
        <InputGroup>
          <div class="w-full" :class="{ 'has-addon': slots.addon }">
            <InputIcon v-if="false" :class="icon" />
            <slot name="default" />
            <slot name="afterControl" />
          </div>
          <slot v-if="i === 2" name="addon" />
        </InputGroup>
        <div v-if="slots.helper" ref="helperSlotRef" class="mt-1 px-2 text-sm dark:text-gray-300 light:text-gray-700">
          <slot name="helper" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.form-control-wrapper {
  .has-addon {
    input,
    select {
      @apply 'rounded-side-end-0';
    }
  }

  .p-inputgroup {
    :last-child:not(:only-of-type) {
      @apply 'rounded-side-start-0 rounded-side-end-md';
    }
  }
}
</style>
