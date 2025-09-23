<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import omit from 'lodash/omit';
import { FloatLabel, IftaLabel } from 'primevue';
import { useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import type { BaseInputProps } from './types';

const { hideLabelDoubleDots = true, error, showErrorMessage, label, disabled } = defineProps<BaseInputProps>();
const emits = defineEmits<{
  labelClicked: [event: MouseEvent];
}>();
const slots = defineSlots<{
  addon: () => any;
  afterLabel: () => any;
  labelText: () => any;
  default: () => any;
  helper: () => any;
  afterControl: () => any;
}>();

const helperSlotRef = ref();
const { t } = useI18n();
const hasShowableError = computed(() => showErrorMessage && error);

const labelRef = useTemplateRef('labelRef');
const { width: labelWidth } = useElementSize(labelRef as any, undefined, {
  box: 'border-box',
});
const defaultSlotRef = useTemplateRef('defaultSlotRef');
defineExpose({ labelWidth, disabled, defaultSlotRef });
</script>

<template>
  <div
    class="form-control-wrapper hdd-form-control"
    :class="[wrapperClass, { 'flex items-center gap-2': inline, '!items-start': inline && ($slots.helper || hasShowableError) }]"
  >
    <template v-for="i in [0, 1, 2]" :key="i">
      <label
        v-if="i === 1 && !floatingLabel && !infieldTopAlignedLabel"
        ref="labelRef"
        :for="inputId"
        class="flex items-center gap-1"
        :data-label-form-name="formName"
        :style="[
          labelStyle,
          {
            minWidth: toValue(labelMinWidth) ? toValue(labelMinWidth) + 'px' : '',
          },
        ]"
        :class="[
          labelClass,
          {
            'text-sm': size === 'small',
            'text-lg': size === 'large',
            'form-control-label-selector': !ignoreLabelSelector,
            'mt-[8px]': inline && ($slots.helper || hasShowableError),
          },
        ]"
        @click="emits('labelClicked', $event)"
      >
        <span :class="[icon, iconClass]" />
        <slot name="labelText">
          <!--          <span
                      v-if="label"
                      v-html="(autoI18nLabel === true ? t(label) : label) + (!hideLabelDoubleDots ? ' :' : '')"
                    /> -->
          <template v-if="label">
            <span :class="{ 'whitespace-pre': labelSingleLine }">{{ autoI18nLabel === true ? t(label) : label }}</span>
            <Message v-if="required && showRequiredAsterisk" variant="simple" size="small" :severity="error ? 'error' : 'contrast'" aria-hidden="true"
              ><strong>*</strong></Message
            >
            <span v-if="!hideLabelDoubleDots">:</span>
          </template>
        </slot>
      </label>
      <slot v-if="i === 1" name="afterLabel" />
      <div
        v-if="(!controlBeforeLabel && i === 2) || (controlBeforeLabel && i === 0)"
        :class="[{ 'w-full': !controlBeforeLabel }, controlWrapperClass]"
      >
        <InputGroup @keydown.enter="(evt) => (onLocalEnterKeyDown ? onLocalEnterKeyDown(evt) : null)">
          <!--          <div class="w-full" :class="{ 'has-addon': $slots.addon }">
                      <InputIcon v-if="false" :class="icon" />
                      <slot name="default" />
                      <slot name="afterControl" />
                    </div> -->
          <template v-if="!floatingLabel && !infieldTopAlignedLabel">
            <slot ref="defaultSlotRef" name="default" />
          </template>
          <template v-else>
            <InputGroupAddon v-if="iconAsAddon">
              <i :class="[icon, iconClass]" />
            </InputGroupAddon>
            <component :is="floatingLabel ? FloatLabel : IftaLabel" :variant="floatingLabel ? (floatingLabelVariant ?? 'over') : undefined">
              <IconField v-if="icon && !iconAsAddon">
                <InputIcon v-if="icon" class="z-2" :class="[icon, iconClass]" />
                <slot ref="defaultSlotRef" name="default" />
              </IconField>
              <template v-else>
                <slot name="default" />
              </template>
              <label :for="inputId" class="z-2 flex items-center gap-1" :style="labelStyle">
                <template v-if="label">
                  <span :class="{ 'whitespace-pre': labelSingleLine }">{{ autoI18nLabel === true ? t(label) : label }}</span>
                  <Message v-if="required" variant="simple" size="small" :severity="error ? 'error' : 'contrast'" aria-hidden="true">
                    <strong>*</strong>
                  </Message>
                  <span v-if="!hideLabelDoubleDots">:</span>
                </template>
              </label>
            </component>
          </template>
          <InputGroupAddon
            v-if="buttonAddon && (toValue(buttonAddon).showable?.({ value: modelValue, control: controlComponent }) ?? true)"
            class="!min-w-unset"
          >
            <Button
              v-tooltip.top="toValue(buttonAddon).tooltip"
              :size="size"
              v-bind="omit(toValue(buttonAddon), ['command', 'tooltip'])"
              @click="toValue(buttonAddon).command?.({ event: $event, value: modelValue, control: controlComponent })"
            />
          </InputGroupAddon>
          <InputGroupAddon v-if="slots.addon">
            <slot name="addon" />
          </InputGroupAddon>
        </InputGroup>
        <Message
          v-if="hasShowableError && typeof error === 'string'"
          :id="inputId ? `${inputId}-error` : ''"
          icon="i-heroicons-exclamation-triangle-20-solid"
          size="small"
          variant="simple"
          severity="error"
          class="mt-1 px-2"
        >
          <span>{{ error }}</span>
        </Message>
        <Message
          v-if="slots.helper?.length"
          :id="inputId ? `${inputId}-desc` : ''"
          ref="helperSlotRef"
          size="small"
          variant="simple"
          severity="secondary"
          class="mt-1 px-2"
        >
          <slot name="helper" />
        </Message>
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
