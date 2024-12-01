<script lang="ts">
// eslint-disable-next-line import/order
import BlurEvent = JQuery.BlurEvent
</script>

<script setup lang="ts" generic="T extends any">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import { vElementVisibility } from '@vueuse/components'
import PSelect from 'primevue/select'
import type { SelectFilterEvent } from 'primevue/select'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps, classType } from './types'

const props = withDefaults(defineProps<{
  url: string
  disabled?: boolean
  searchOnFocus?: boolean
  optionLabelProperty?: string
  optionValueProperty?: string
  helperText?: string
  withoutObject?: boolean
  noManualInput?: boolean
  useIdModel?: boolean
  clearable?: boolean
  clearOnDblClick?: boolean
  inputClass?: classType
  ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void)
  autoCompleteClass?: classType
  optionLabelFormatter?: ((item: OptionInterface | ValueInterface, index: number) => string)
  valueLabelFormatter?: ((item: OptionInterface | ValueInterface, placeholder?: string) => string)
  optionAndValueLabelFormatter?: ((item: OptionInterface | ValueInterface) => string)
} & BaseInputProps>(), {
  optionLabelProperty: 'name',
  optionValueProperty: 'id',
  searchOnFocus: true,
  withoutObject: false,
  inputClass: 'w-full',
  autoCompleteClass: '',
  noManualInput: false,
  useIdModel: false,
  clearOnDblClick: false,
  clearable: false,
})
const emits = defineEmits<{
  (e: 'keydown', event: KeyboardEvent)
  (e: 'blur', event: BlurEvent)
  (e: 'hide')
  (e: 'itemSelected', event: T)
  (e: 'cleared')
}>()

const selectedItem = defineModel<OptionInterface | ValueInterface | null>('item', { default: ref().value })
const selectedItemId = defineModel<string | number | null>('modelValue')

const items: Ref<OptionInterface[]> = ref([])
const hasMore = ref(false)
const total = ref(0)
const searchQueryName = ref()
const isLoadingMore = ref(false)

interface OptionInterface {
  name: string
  id: number
}
type ValueInterface = string

async function search(event: { query?: string, offset?: number, limit?: number, onlyId?: boolean }) {
  searchQueryName.value = event.query || ''
  const params = { name: event.query || '', offset: event.offset || 0, limit: event.limit, onlyId: event.onlyId ? 1 : 0 }
  if (typeof props.ajaxParams === 'object') {
    for (const key in props.ajaxParams) {
      params[key] = props.ajaxParams[key]
    }
  }
  else if (typeof props.ajaxParams === 'function') {
    props.ajaxParams(params)
  }
  return apiAxiosInstance.get(props.url, { params })
    .then((response: AxiosResponse) => {
      if (event.offset)
        items.value.push(...response.data.data.items)
      else
        items.value = response.data.data.items

      hasMore.value = response.data.data.hasMore
      total.value = response.data.data.total
      isLoadingMore.value = false
    })
}

function lastElementVisibilityChanged(isVisible: boolean) {
  if (isVisible && total.value > items.value.length && isLoadingMore.value === false) {
    isLoadingMore.value = true
    search({ query: searchQueryName.value, offset: items.value.length - 1 })
  }
}

const inputRef = ref()

function focus() {
  inputRef.value?.show()
}

function onFilterKeyDown(event: KeyboardEvent) {
  emits('keydown', event)
}
function onFilterBlur(event: BlurEvent) {
  emits('blur', event)
}

watch(() => selectedItemId.value, () => {
  if (selectedItemId.value === null) {
    selectedItem.value = null
  }
  if (selectedItem.value?.[props.optionValueProperty] === selectedItemId.value) {
    return
  }
  let existsItem = items.value.find(v => v[props.optionValueProperty] === selectedItemId.value)
  if (existsItem) {
    selectedItem.value = existsItem
  }
  else {
    search({ query: `${selectedItemId.value}`, limit: 1, onlyId: true })
      .then(() => {
        existsItem = items.value.find(v => v[props.optionValueProperty] === selectedItemId.value)
        nextTick(() => {
          if (existsItem) {
            selectedItem.value = existsItem
          }
        })
      })
  }
}, {
  immediate: true,
})
function clear() {
  if (props.useIdModel) {
    selectedItemId.value = null
  }
  selectedItem.value = null
  nextTick(() => {
    setTimeout(focus, 50)
  })
  emits('cleared')
}
function getOptionText(option: OptionInterface, index: number) {
  if (props.optionLabelFormatter) {
    return props.optionLabelFormatter(option, index)
  }
  else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(option)
  }
  else {
    return option[props.optionLabelProperty] ?? '&nbsp;'
  }
}
function getValueText(value: string, placeholder?: string) {
  const placeholderText = placeholder ? `<span class="text-muted px-2">${placeholder}</span>` : undefined
  if (!selectedItem.value) {
    return placeholderText ?? `&nbsp;`
  }
  if (props.valueLabelFormatter) {
    return props.valueLabelFormatter(selectedItem.value, placeholder) ?? placeholderText ?? '&nbsp;'
  }
  else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(selectedItem.value) ?? placeholderText ?? '&nbsp;'
  }
  else {
    return selectedItem.value[props.optionLabelProperty] ?? placeholderText ?? value ?? '&nbsp;'
  }
}

function onSelectBeforeShow() {
  search({})
}
function onSelectChange(evt) {
  selectedItemId.value = evt.value
  selectedItem.value = items.value.find(e => e[props.optionValueProperty] === evt.value) || null
  emits('itemSelected', selectedItem.value)
}

function onSelectFilterInput(evt: SelectFilterEvent) {
  search({ query: evt.value })
}
defineExpose({ focus, clear })
</script>

<template>
  <BaseInput v-bind="props" @label-clicked="$refs.inputRef.show()">
    <template #labelText>
      <slot name="label-text" />
    </template>
    <template v-if="$slots.addon" #addon>
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <PSelect
      ref="inputRef"
      :model-value="selectedItemId"
      :placeholder="placeholder"
      :filter="true"
      auto-option-focus
      :auto-filter-focus="true"
      reset-filter-on-hide
      checkmark
      :options="items"
      :show-clear="clearable"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      class="w-full"
      scroll-height="18rem"
      :disabled="disabled"
      :readonly="readonly"
      :pt="{
        pcFilter: {
          root: {
            onkeydown: onFilterKeyDown,
            onblur: onFilterBlur,
          },
        },
      }"
      @before-show="onSelectBeforeShow"
      @hide="emits('hide')"
      @change="onSelectChange"
      @filter="onSelectFilterInput"
    >
      <template #value="{ value, placeholder }">
        <slot name="value" :value="{ value, placeholder }">
          <div v-html="getValueText(value, placeholder)" />
        </slot>
      </template>
      <template #option="{ option, index }">
        <span
          v-if="index + 1 === items.length"
          v-element-visibility="lastElementVisibilityChanged"
        >
          <slot name="option" :option="{ option, index }">
            <div v-html="getOptionText(option, index)" />
          </slot>
        </span>
        <span v-else>
          <slot name="option" :option="{ option, index }"><div v-html="getOptionText(option, index)" /></slot>
        </span>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <i v-if="isLoadingMore" class="i-mdi-loading mx-auto my-1 animate-spin" />
        </div>
      </template>
    </PSelect>
  </BaseInput>
</template>

<style scoped>

</style>
