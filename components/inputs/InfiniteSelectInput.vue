<script setup lang="ts" generic="T extends any">
import type { ApiResponseData, InfiniteScrollResponseData } from '@/types/laravel_generated'
import { vElementVisibility } from '@vueuse/components'
import type { UrlObject } from 'HddUiHelpers/components/FormWrapper/types.ts'
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts'
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts'
import { get } from 'lodash-es'
import type { SelectChangeEvent, SelectFilterEvent } from 'primevue/select'
import PSelect from 'primevue/select'
import type { Ref } from 'vue'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { BaseInputProps, ElementClassType } from './types'

const props = withDefaults(
  defineProps<
    {
      url: string | UrlObject
      disabled?: boolean
      searchOnFocus?: boolean
      optionLabelProperty?: string
      optionValueProperty?: string
      optionDisabledProperty?: string
      helperText?: string
      withoutObject?: boolean
      noManualInput?: boolean
      filterPlaceholder?: string
      filterFields?: string[]
      useIdModel?: boolean
      clearable?: boolean
      clearOnDblClick?: boolean
      inputClass?: ElementClassType
      ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void)
      autoCompleteClass?: ElementClassType
      optionLabelFormatter?: (item: OptionInterface | ValueInterface, index: number) => string
      valueLabelFormatter?: (item: OptionInterface | ValueInterface, placeholder?: string) => string
      onKeydown?: (event: KeyboardEvent) => void
      optionAndValueLabelFormatter?: (item: OptionInterface | ValueInterface) => string
      valueSameAsLabel?: boolean
    } & BaseInputProps
  >(),
  {
    optionLabelProperty: 'name',
    optionValueProperty: 'id',
    optionDisabledProperty: 'disabled',
    searchOnFocus: true,
    withoutObject: false,
    inputClass: 'w-full',
    autoCompleteClass: '',
    noManualInput: false,
    useIdModel: false,
    clearOnDblClick: false,
    clearable: false,
  }
)
const emits = defineEmits<{
  keydown: [event: KeyboardEvent]
  blur: [event: FocusEvent]
  hide: []
  cleared: []
  itemSelected: [event: T]
}>()

const selectedItem = defineModel<OptionInterface | ValueInterface | null>('item', { default: null })

const selectedItemId = defineModel<string | number | null>('modelValue', { default: null })
const apiClient = useApiClient()
const items: Ref<OptionInterface[]> = ref([])
const total = ref(0)
const searchQueryName = ref()
const isLoadingMore = ref(false)
const isLoadingOnFirstShow = ref(false)
const isInitiallyLoading = ref(false)

interface OptionInterface {
  name?: string
  id?: number
}

type ValueInterface = string

const computedOptionValueProperty = computed(() =>
  props.valueSameAsLabel ? props.optionLabelProperty : props.optionValueProperty
)

async function search(event: {
  query?: string
  offset?: number
  limit?: number
  onlyId?: boolean
}) {
  searchQueryName.value = event.query || ''
  const params = {
    name: event.query || '',
    offset: event.offset || 0,
    limit: event.limit,
    only_id: event.onlyId ? 1 : 0,
    id_field: computedOptionValueProperty.value,
  }
  if (typeof props.ajaxParams === 'object') {
    for (const key in props.ajaxParams) {
      params[key] = props.ajaxParams[key]
    }
  } else if (typeof props.ajaxParams === 'function') {
    props.ajaxParams(params)
  }
  return apiClient
    .request<ApiResponseData<InfiniteScrollResponseData>>({
      // method: 'get',
      ...(typeof props.url === 'string' ? { url: props.url } : props.url),
      params: params,
    })
    .then((response) => {
      if (event.offset) items.value.push(...response.data.data.items)
      else items.value = response.data.data.items
      total.value = response.data.data.total
      isLoadingMore.value = false
      isLoadingOnFirstShow.value = false
    })
}

function lastElementVisibilityChanged(isVisible: boolean) {
  if (isVisible && total.value > items.value.length && isLoadingMore.value === false) {
    isLoadingMore.value = true
    search({ query: searchQueryName.value, offset: items.value.length - 1 })
  }
}

const inputRef = useTemplateRef('inputRef')

function focus(_show: boolean = false) {
  if (!props.disabled) {
    if (_show) {
      inputRef.value?.show()
    } else {
      inputRef.value?.$refs.focusInput.focus()
    }
  }
}

function onFilterKeyDown(event: KeyboardEvent) {
  if ((!inputRef.value as any)?.overlayVisible as boolean) {
    emits('keydown', event)
  }
}

function onSelectKeyDown(event: KeyboardEvent) {
  if (props.onKeydown && event.code === 'Enter') {
    inputRef.value?.hide()
  }
  emits('keydown', event)
}

function onFilterBlur(event: FocusEvent) {
  emits('blur', event)
}

const localFilterFields = computed(() => {
  return items.value.length > 0 ? Object.keys(items.value[0]) : (props.filterFields ?? [])
})

watch(
  () => selectedItemId.value,
  () => {
    if (selectedItemId.value === null) {
      selectedItem.value = null
    }
    if (selectedItem.value?.[computedOptionValueProperty.value] === selectedItemId.value) {
      return
    }
    let existsItem = items.value.find(
      (v) => v[computedOptionValueProperty.value] === selectedItemId.value
    )
    if (existsItem) {
      selectedItem.value = existsItem
    } else {
      if (props.valueSameAsLabel) {
        nextTick(() => {
          selectedItem.value = {
            [computedOptionValueProperty.value]: selectedItemId.value,
            [props.optionLabelProperty]: selectedItemId.value,
          }
        })
      } else {
        isInitiallyLoading.value = true
        search({ query: `${selectedItemId.value}`, limit: 1, onlyId: true }).then(() => {
          existsItem = items.value.find(
            (v) => v[computedOptionValueProperty.value] === selectedItemId.value
          )
          nextTick(() => {
            if (existsItem) {
              selectedItem.value = existsItem
            }
          })
          isInitiallyLoading.value = false
        })
      }
    }
  },
  {
    immediate: true,
  }
)

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
  } else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(option)
  } else {
    return option[props.optionLabelProperty] ?? '&nbsp;'
  }
}

function getValueText(value: string, placeholder?: string) {
  const placeholderText = placeholder
    ? `<span class="text-muted px-2">${placeholder}</span>`
    : undefined
  if (!selectedItem.value) {
    return placeholderText ?? `&nbsp;`
  }
  if (props.valueLabelFormatter) {
    return props.valueLabelFormatter(selectedItem.value, placeholder) ?? placeholderText ?? '&nbsp;'
  } else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(selectedItem.value) ?? placeholderText ?? '&nbsp;'
  } else {
    return selectedItem.value[props.optionLabelProperty] ?? placeholderText ?? value ?? '&nbsp;'
  }
}

function onSelectBeforeShow() {
  isLoadingOnFirstShow.value = true
  search({})
}

function onSelectChange(evt: SelectChangeEvent) {
  selectedItemId.value = evt.value
  selectedItem.value =
    items.value.find((e) => e[computedOptionValueProperty.value] === evt.value) || null
  emits('itemSelected', selectedItem.value as T)
}

function onSelectFilterInput(evt: SelectFilterEvent) {
  search({ query: evt.value })
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } =
  useHddBaseInputUtils(props)

defineExpose({ focus, ...exposed, clear, disabled: props.disabled, selectedItem })
</script>

<template>
  <BaseInput
    v-bind="baseInputForwardedProps"
    :control-component="{ selectedItem }"
    @label-clicked="inputRef?.show()"
  >
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
      v-bind="generalInputProps"
      ref="inputRef"
      :input-id="fieldUniqueId"
      :model-value="selectedItemId"
      :placeholder="placeholder"
      :filter="true"
      :filter-fields="localFilterFields"
      :filter-placeholder="filterPlaceholder"
      :loading="isInitiallyLoading"
      auto-option-focus
      :auto-filter-focus="true"
      reset-filter-on-hide
      checkmark
      :options="items"
      :show-clear="clearable"
      :option-label="optionLabelProperty"
      :option-value="computedOptionValueProperty"
      :option-disabled="optionDisabledProperty"
      scroll-height="18rem"
      :pt="{
        pcFilter: {
          root: {
            class: 'p-inputtext-sm',
            onkeydown: onFilterKeyDown,
            onblur: onFilterBlur,
          },
        },
      }"
      @keydown="onSelectKeyDown"
      @before-show="onSelectBeforeShow"
      @hide="emits('hide')"
      @change="onSelectChange"
      @filter="onSelectFilterInput"
    >
      <template #empty>
        <div v-if="isLoadingOnFirstShow" class="flex justify-center">
          <i class="i-mdi-loading mx-auto my-1 animate-spin" />
        </div>
      </template>
      <template #value="{ value, placeholder: selectPlaceholder }">
        <slot name="value" :value="{ value, placeholder: selectPlaceholder }">
          <div v-html="getValueText(value, selectPlaceholder)" />
        </slot>
      </template>
      <template #option="{ option, index }">
        <span
          v-if="index + 1 === items.length"
          v-element-visibility="lastElementVisibilityChanged"
          :aria-labelledby="getOptionText(option, index)"
          :data-value="get(option, computedOptionValueProperty)"
        >
          <slot name="option" :option="{ option, index }">
            <div v-html="getOptionText(option, index)" />
          </slot>
        </span>
        <span
          v-else
          :aria-labelledby="getOptionText(option, index)"
          :data-value="get(option, computedOptionValueProperty)"
        >
          <slot name="option" :option="{ option, index }"
            ><div v-html="getOptionText(option, index)"
          /></slot>
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

<style scoped></style>
