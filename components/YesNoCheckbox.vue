<script setup lang="ts">
import { isBoolean } from 'lodash-es';
import { useId } from 'vue';
import { useI18n } from 'vue-i18n';

const { labelPosition = 'end', uncheckedValue = 'null' } = defineProps<{
  withStatusLabel?: boolean;
  invalid?: boolean;
  name?: string;
  label?: string;
  labelClass?: string;
  statusLabelClass?: any;
  labelPosition?: 'start' | 'end';
  uncheckedValue?: 'null' | 'undefined';
  checkedLabel?: string;
  unCheckedLabel?: string;
}>();
const value = defineModel<boolean | null | undefined>({ default: null });

function onLocalValueChange() {
  switch (value.value) {
    case true:
      value.value = false;
      break;
    case false:
      value.value = uncheckedValue === 'null' ? null : undefined;
      break;
    case null:
    case undefined:
      value.value = true;
      break;
  }
}

const id = useId();
const { t } = useI18n();
</script>

<template>
  <div class="flex items-center gap-2">
    <label v-if="labelPosition === 'start'" :for="`hdd-checkbox-${id}`" class="select-none" :class="[labelClass ?? '']">
      {{ label }}
    </label>
    <Checkbox
      :model-value="isBoolean(value)"
      :indeterminate="value === false"
      binary
      :input-id="`hdd-checkbox-${id}`"
      :name="name"
      :invalid="invalid"
      :pt="{
        box: (pt) => ({ class: pt.context.indeterminate ? 'text-black dark:bg-red-300 light:bg-red-400' : '' }),
      }"
      @value-change="onLocalValueChange"
    >
      <template #icon="status">
        <template v-if="status.indeterminate">
          <i class="i-mdi-close" />
          <!--          <svg width="92px" height="92px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F" /> </g></svg> -->
        </template>
      </template>
    </Checkbox>
    <label v-if="labelPosition === 'end'" :for="`hdd-checkbox-${id}`" class="select-none" :class="[labelClass ?? '']">
      {{ label }}
    </label>
    <template v-if="withStatusLabel && isBoolean(value)">
      <label :for="`hdd-checkbox-${id}`" class="select-none" :class="[statusLabelClass ?? '']">
        <slot name="statusLabel" :status="value">
          <template v-if="value === true">
            {{ checkedLabel ?? t('Yes') }}
          </template>
          <template v-if="value === false">
            {{ unCheckedLabel ?? t('No') }}
          </template>
        </slot>
      </label>
    </template>
  </div>
</template>
