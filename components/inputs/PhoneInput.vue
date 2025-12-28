<script setup lang="ts">
import {
  cursorAtEndOfInput,
  cursorAtStartOfInput,
  useHddBaseInputUtils,
} from 'HddUiHelpers/components/inputs/inputsUtils.ts'
import { InputMask } from 'primevue'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps } from './types'

const props = withDefaults(
  defineProps<
    {
      mask?: string
      withCountryCode?: boolean
      defaultCountryCode?: string
    } & BaseInputProps
  >(),
  {
    defaultCountryCode: '964',
    autocomplete: 'off',
    withCountryCode: true,
  }
)
const emits = defineEmits<{
  keydown: [e: KeyboardEvent]
  focusPrevious: []
  focusNext: []
}>()
const value = defineModel<any>('modelValue')
const countryCode = defineModel<string>('countryCode')
const { t } = useI18n()

const inputRef = ref()

function focus() {
  inputRef.value.$el.focus()
}

const countryCodesList = computed(() => {
  return [
    {
      value: '964',
      label: '+964',
      code: 'IQ',
      flag: 'i-twemoji:flag-iraq',
      placeholder: '7x xxxx xxxx',
      mask: '99 9999 9999',
    },
    {
      value: '98',
      label: '+98',
      code: 'IR',
      flag: 'i-twemoji-flag-iran',
      placeholder: '', // ?
      mask: '', // ?
    },
  ]
})

const selectedCountryCode = computed(() =>
  countryCodesList.value.find((e) => e.value === countryCode.value)
)

onMounted(() => {
  if (props.defaultCountryCode && !countryCode.value) {
    countryCode.value = props.defaultCountryCode
  }
})

function onCountryCodeChange() {
  setTimeout(focus, 5)
}

const onArrowUp = () => cursorAtStartOfInput(inputRef.value.$el) && emits('focusPrevious')
const onArrowDown = () => cursorAtEndOfInput(inputRef.value.$el) && emits('focusNext')

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } =
  useHddBaseInputUtils(props)

defineExpose({ focus, ...exposed })
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <InputGroup class="dir-ltr">
      <Select
        v-if="withCountryCode"
        v-model="countryCode"
        :class="{
          '!rounded-0': buttonAddon,
        }"
        class="!max-w-[70px]"
        option-value="value"
        :size="size"
        option-label="label"
        :disabled="disabled || readonly"
        :options="countryCodesList"
        :show-clear="false"
        :pt="{
          dropdown: {
            style: { width: '0px' },
          },
        }"
        @change="onCountryCodeChange"
      >
        <template #dropdownicon>
          <span></span>
        </template>
        <template #value>
          <div v-if="selectedCountryCode" class="flex h-full items-center gap-1 text-sm">
            <i :class="[selectedCountryCode.flag, '!w-[30px]']"></i>
            <span class="text-xs font-bold">{{ selectedCountryCode.label }}</span>
          </div>
        </template>
        <template #option="slotProps">
          <div class="flex items-center gap-1 text-sm">
            <i :class="slotProps.option.flag"></i>
            <span>{{ slotProps.option.label }}</span>
          </div>
        </template>
      </Select>
      <component
        :is="(mask ?? selectedCountryCode?.mask) ? InputMask : InputText"
        v-bind="generalInputProps"
        :id="fieldUniqueId"
        ref="inputRef"
        v-model="value"
        :auto-clear="false"
        :autocomplete="autocomplete"
        :pt="{
          root: {
            autocomplete: autocomplete,
          },
        }"
        class="dir-ltr"
        :class="t('dir') === 'rtl' ? 'text-right' : 'text-left'"
        :placeholder="placeholder ?? selectedCountryCode?.placeholder"
        :mask="mask ?? selectedCountryCode?.mask"
        @keydown.up="onArrowUp"
        @keydown.down="onArrowDown"
        @keydown="emits('keydown', $event as any)"
      />
    </InputGroup>
  </BaseInput>
</template>

<style scoped></style>
