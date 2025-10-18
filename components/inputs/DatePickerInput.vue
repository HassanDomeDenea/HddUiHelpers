<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import type { Moment } from 'moment';
import moment from 'moment';
import DatePicker from 'primevue/datepicker';
import type { ComponentExposed } from 'vue-component-type-helpers';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
const props = withDefaults(
  defineProps<
    {
      manualInput?: boolean;
      isYearOnly?: boolean;
      withSuggestionsButtons?: boolean;
      clearable?: boolean;
      showTime?: boolean;
      dateFormat?: string;
      formatAsString?: boolean;
    } & BaseInputProps
  >(),
  {
    manualInput: false,
    isYearOnly: false,
    withSuggestionsButtons: false,
    formatAsString: true,
  },
);
const value = defineModel<any>('modelValue');
const { t } = useI18n();
const inputRef = useTemplateRef<ComponentExposed<typeof DatePicker>>('inputRef');

function focus() {
  inputRef.value.input?.click();
}

const localValue = computed({
  get: () => value.value,
  set: (val) => {
    if (val && props.formatAsString) {
      value.value = moment(val).format('YYYY-MM-DD HH:mm:ss');
    } else {
      value.value = val;
    }
  },
});

function onDateLocalEnterKeyDown(event: KeyboardEvent) {
  if (inputRef.value.overlayVisible) {
    inputRef.value.overlayVisible = false;
    event.stopPropagation();
  }
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

const localDateFormat = computed(() => (props.isYearOnly ? 'yy' : (props.dateFormat ?? 'yy-mm-dd')));
const localView = computed(() => (props.isYearOnly ? 'year' : undefined));

const selectDate = function (date: string | Date | Moment) {
  localValue.value = date;
  if (inputRef.value.overlayVisible) {
    inputRef.value.overlayVisible = false;
  }
};

defineExpose({ focus, inputRef, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" :on-local-enter-key-down="onLocalEnterKeyDown ?? onDateLocalEnterKeyDown" @click="focus">
    <div class="relative !w-full">
      <DatePicker
        v-bind="generalInputProps"
        ref="inputRef"
        v-model="localValue"
        :input-id="fieldUniqueId"
        :placeholder="placeholder"
        :date-format="localDateFormat"
        hide-on-date-time-select
        :show-time="showTime"
        hour-format="12"
        class="!w-full"
        show-icon
        :view="localView"
        :manual-input="manualInput"
        :show-button-bar="clearable"
        @clear-click="() => clearable && (localValue = null)"
      >
        <template #footer>
          <div v-if="withSuggestionsButtons" class="border-t-1 border-t-dashed border-t-gray/25 mt-1 pt-1">
            <Button size="small" text severity="secondary" :label="t('Start of Month')" @click="selectDate(moment().startOf('month'))" />
            <Button size="small" text severity="secondary" :label="t('End of Month')" @click="selectDate(moment().endOf('month'))" />

            <Button size="small" text severity="secondary" :label="t('Start of Week')" @click="selectDate(moment().startOf('week'))" />
            <Button size="small" text severity="secondary" :label="t('End of Week')" @click="selectDate(moment().endOf('week'))" />
          </div>
        </template>
      </DatePicker>
      <div v-if="clearable && localValue" class="clear-icon-container" :class="[size]">
        <i class="i-mdi:times clear-icon" @click.stop="localValue = null"></i>
      </div>
    </div>
  </BaseInput>
</template>

<style lang="scss" scoped>
.clear-icon-container {
  @apply z-1 absolute bottom-0 top-0 me-2 flex items-center ltr:right-[var(--p-datepicker-dropdown-width)] rtl:left-[var(--p-datepicker-dropdown-width)];
  //top: calc(calc(var(--p-inputtext-font-size) + var(--p-inputtext-padding-y)) / 2);

  .clear-icon {
    @apply text-secondary-hoverable cursor-pointer;
  }

  &.small {
    @apply ltr:right-[var(--p-datepicker-dropdown-sm-width)] rtl:left-[var(--p-datepicker-dropdown-sm-width)];
  }
  &.large {
    @apply ltr:right-[var(--p-datepicker-dropdown-lg-width)] rtl:left-[var(--p-datepicker-dropdown-lg-width)];
  }
}
</style>
