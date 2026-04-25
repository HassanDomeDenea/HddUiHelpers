<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { get } from 'lodash-es';
import { computed, ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';
import { BadgeProps } from 'primevue';

const props = withDefaults(
  defineProps<
    {
      badgeSeverity?: BadgeProps['severity'],
      emptyBadgeSeverity?: BadgeProps['severity'],
      options: any[];
      badges?: Record<string|number, string|number>;
      optionDisabledProperty?: string;
      optionIconProperty?: string;
      optionLabelProperty?: string;
      optionValueProperty?: string;
      clearable?: boolean;
      optionClass?: any;
    } & BaseInputProps
  >(),
  {
    badgeSeverity: 'contrast',
    emptyBadgeSeverity: 'secondary',
    optionIconProperty: 'icon',
    optionDisabledProperty: 'disabled',
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    clearable: false,
  },
);
const value = defineModel<any>('modelValue');

const inputRef = ref();

const optionLabelClass = computed(() => {
  if (props.size === 'small') {
    return 'text-sm';
  } else if (props.size === 'large') {
    return 'text-lg';
  } else {
    return '';
  }
});

function focus() {
  inputRef.value.$el.focus();
}
const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps">
    <SelectButton
      v-bind="generalInputProps"
      v-model="value"
      :options="options"
      :allow-empty="clearable"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
    >
      <template #option="{ option }">
        <slot name="option" :option="option">
          <div class="flex justify-center gap-1" :class="[optionLabelClass, optionClass]">
            <i
              v-if="get(option, optionIconProperty)"
              :class="get(option, optionIconProperty)"
              class="me-1"
            />
            <span>{{ get(option, optionLabelProperty) }}</span>
            <Badge v-if="badges && badges[option[optionValueProperty]]" size="small" :severity="badges[option[optionValueProperty]] ? badgeSeverity : emptyBadgeSeverity" :value="badges[option[optionValueProperty]]" />
          </div>
        </slot>
      </template>
    </SelectButton>
  </BaseInput>
</template>

<style scoped></style>
