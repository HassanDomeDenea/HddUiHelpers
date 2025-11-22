<script setup lang="ts" generic="T extends any">
import type { ApiResponseData, InfiniteScrollResponseData } from '@/types/laravel_generated';
import { vElementVisibility } from '@vueuse/components';
import type { UrlObject } from 'HddUiHelpers/components/FormWrapper/types.ts';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import get from 'lodash/get';
import type Select from 'primevue/select';
import type { SelectChangeEvent, SelectFilterEvent } from 'primevue/select';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps, ElementClassType } from './types';
const props = withDefaults(
  defineProps<
    {
      url: string | UrlObject;
      disabled?: boolean;
      searchOnFocus?: boolean;
      optionLabelProperty?: string;
      optionValueProperty?: string;
      helperText?: string;
      withoutObject?: boolean;
      noManualInput?: boolean;
      filterPlaceholder?: string;
      filterFields?: string[];
      useIdModel?: boolean;
      clearable?: boolean;
      clearOnDblClick?: boolean;
      inputClass?: ElementClassType;
      ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void);
      autoCompleteClass?: ElementClassType;
      optionLabelFormatter?: (item: OptionInterface | ValueInterface, index: number) => string;
      valueLabelFormatter?: (item: OptionInterface | ValueInterface, placeholder?: string) => string;
      onKeydown?: (event: KeyboardEvent) => void;
      optionAndValueLabelFormatter?: (item: OptionInterface | ValueInterface) => string;
      resetFilterOnHide?: boolean;
      display?: 'comma' | 'chip';
      maxSelectedLabels?: number;
      selectionLimit?: number;
      showToggleAll?: boolean;
    } & BaseInputProps
  >(),
  {
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
    maxSelectedLabels: 5,
    display: 'comma',
    showToggleAll: true,
  },
);
const emits = defineEmits<{
  keydown: [event: KeyboardEvent];
  blur: [event: FocusEvent];
  hide: [];
  cleared: [];
  itemSelected: [event: T];
}>();

const { t } = useI18n();

const selectedItems = defineModel<(OptionInterface | ValueInterface)[] | null>('item', { default: null });

const selectedItemIds = defineModel<(string | number)[] | null>('modelValue', { default: null });
const apiClient = useApiClient();
const items: Ref<OptionInterface[]> = ref([]);
const total = ref(0);
const searchQueryName = ref();
const isLoadingMore = ref(false);
const isLoadingOnFirstShow = ref(false);
const isInitiallyLoading = ref(false);

interface OptionInterface {
  name: string;
  id: number;
}

type ValueInterface = string;

async function search(event: { query?: string; offset?: number; limit?: number; onlyId?: boolean; multipleIds?: boolean }) {
  searchQueryName.value = event.query || '';
  const params = {
    name: event.query || '',
    offset: event.offset || 0,
    limit: event.limit,
    only_id: event.onlyId ? 1 : 0,
    multiple_ids: event.multipleIds ? 1 : 0,
  };
  if (typeof props.ajaxParams === 'object') {
    for (const key in props.ajaxParams) {
      params[key] = props.ajaxParams[key];
    }
  } else if (typeof props.ajaxParams === 'function') {
    props.ajaxParams(params);
  }
  return apiClient
    .request<ApiResponseData<InfiniteScrollResponseData>>({
      method: 'get',
      ...(typeof props.url === 'string' ? { url: props.url } : props.url),
      params: params,
    })
    .then((response) => {
      if (event.offset) items.value.push(...response.data.data.items);
      else items.value = response.data.data.items;
      total.value = response.data.data.total;
      isLoadingMore.value = false;
      isLoadingOnFirstShow.value = false;
    });
}

function lastElementVisibilityChanged(isVisible: boolean) {
  if (isVisible && total.value > items.value.length && isLoadingMore.value === false) {
    isLoadingMore.value = true;
    search({ query: searchQueryName.value, offset: items.value.length - 1 });
  }
}

const inputRef = useTemplateRef<ComponentExposed<typeof Select>>('inputRef');

function focus(_show: boolean = false) {
  if (!props.disabled) {
    if (_show) {
      inputRef.value.show();
    } else {
      inputRef.value.$refs.focusInput.focus();
    }
  }
}

function onFilterKeyDown(event: KeyboardEvent) {
  if ((!inputRef.value as any)?.overlayVisible as boolean) {
    emits('keydown', event);
  }
}

function onSelectKeyDown(event: KeyboardEvent) {
  if (props.onKeydown && event.code === 'Enter') {
    inputRef.value?.hide();
  }
  emits('keydown', event);
}

function onFilterBlur(event: FocusEvent) {
  emits('blur', event);
}

const localFilterFields = computed(() => {
  return items.value.length > 0 ? Object.keys(items.value[0]) : (props.filterFields ?? []);
});

watch(
  () => selectedItemIds.value,
  (_selectedItemIds: (string | number)[] | null) => {
    if (_selectedItemIds === null) {
      selectedItems.value = null;
      return;
    }

    if (
      selectedItems.value?.length === _selectedItemIds.length &&
      selectedItems.value?.every((_item, _itemIndex) => _item[props.optionValueProperty] === _selectedItemIds[_itemIndex])
    ) {
      return;
    }

    const _selectedItems = new Array(_selectedItemIds.length);
    const _idsToSearch: { id: string | number; index: number }[] = [];

    _selectedItemIds.forEach((_selectedItemId, _selectedItemIdIndex) => {
      const existsItem = items.value.find((v) => v[props.optionValueProperty] === _selectedItemId);
      if (existsItem) {
        _selectedItems[_selectedItemIdIndex] = existsItem;
      } else {
        _idsToSearch.push({
          id: _selectedItemId,
          index: _selectedItemIdIndex,
        });
      }
    });

    if (_idsToSearch.length > 0) {
      isInitiallyLoading.value = true;

      search({
        query: _idsToSearch.map((i) => i.id),
        limit: _idsToSearch.length,
        onlyId: true,
        multipleIds: true,
      }).then(() => {
        nextTick(() => {
          _idsToSearch.forEach((_idToSearch) => {
            const existsItem = items.value.find((v) => v[props.optionValueProperty] === _idToSearch.id);
            if (existsItem) {
              _selectedItems[_idToSearch.index] = existsItem;
            }
          });
          selectedItems.value = _selectedItems;
        });
        isInitiallyLoading.value = false;
      });
    } else {
      selectedItems.value = _selectedItems;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

function clear() {
  if (props.useIdModel) {
    selectedItemIds.value = null;
  }
  selectedItems.value = null;
  nextTick(() => {
    setTimeout(focus, 50);
  });
  emits('cleared');
}

function getOptionText(option: OptionInterface, index: number) {
  if (!option) return '&nbsp;';
  if (props.optionLabelFormatter) {
    return props.optionLabelFormatter(option, index);
  } else if (props.optionAndValueLabelFormatter) {
    return props.optionAndValueLabelFormatter(option);
  } else {
    return option[props.optionLabelProperty] ?? '&nbsp;';
  }
}

function getValueText(_selectedItemIds: (strin | number)[] | null, placeholder?: string) {
  const placeholderText = placeholder ? `<span class="text-muted px-2">${placeholder}</span>` : undefined;
  if (!_selectedItemIds || _selectedItemIds.length < 1) {
    return placeholderText ?? `&nbsp;`;
  }

  if (_selectedItemIds.length > props.maxSelectedLabels) {
    return `${_selectedItemIds.length} ${t('multiSelectItemsSelectedLabel')}`;
  }

  return _selectedItemIds.map((_id) => {
    const _item = selectedItems.value?.find((e) => {
      return e[props.optionValueProperty] === _id;
    });
    if (!_item) {
      return '---';
    }
    if (props.valueLabelFormatter) {
      return props.valueLabelFormatter(_item, placeholder) ?? '---' ?? '&nbsp;';
    } else if (props.optionAndValueLabelFormatter) {
      return props.optionAndValueLabelFormatter(_item) ?? '---' ?? '&nbsp;';
    } else {
      return _item?.[props.optionLabelProperty] ?? '---' ?? '&nbsp;';
    }
  });
}

function onSelectBeforeShow() {
  isLoadingOnFirstShow.value = true;
  search({});
}

function onSelectChange(evt: SelectChangeEvent) {
  selectedItemIds.value = evt.value;
  emits('itemSelected', selectedItems.value as T);
}

function onSelectFilterInput(evt: SelectFilterEvent) {
  search({ query: evt.value });
}

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, clear, selectedItems, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @label-clicked="inputRef?.show()">
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
    <MultiSelect
      v-bind="generalInputProps"
      ref="inputRef"
      :input-id="fieldUniqueId"
      :name="name"
      :model-value="selectedItemIds"
      :data-name="name"
      :placeholder="placeholder"
      :auto-filter-focus="true"
      :variant="variant"
      :filter-fields="localFilterFields"
      :filter-placeholder="filterPlaceholder"
      :display="display"
      :max-selected-labels="maxSelectedLabels"
      :selection-limit="selectionLimit"
      :show-toggle-all="showToggleAll"
      auto-option-focus
      reset-filter-on-hide
      filled
      fluid
      highlightonselect
      filter
      :options="items"
      :selected-items-label="`{0} ${t('multiSelectItemsSelectedLabel')}`"
      :option-label="optionLabelProperty"
      :option-value="optionValueProperty"
      :show-clear="clearable"
      class="!w-full"
      scroll-height="18rem"
      :loading="isInitiallyLoading"
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
        <slot name="value" :value="value" :placeholder="selectPlaceholder">
          <div v-html="getValueText(value, selectPlaceholder)" />
        </slot>
      </template>
      <template #option="{ option, index }">
        <span
          v-if="index + 1 === items.length"
          v-element-visibility="lastElementVisibilityChanged"
          :aria-labelledby="getOptionText(option, index)"
          :data-value="get(option, optionValueProperty)"
        >
          <slot name="option" :option="{ option, index }">
            <div v-html="getOptionText(option, index)" />
          </slot>
        </span>
        <span v-else :aria-labelledby="getOptionText(option, index)" :data-value="get(option, optionValueProperty)">
          <slot name="option" :option="{ option, index }"><div v-html="getOptionText(option, index)" /></slot>
        </span>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <i v-if="isLoadingMore" class="i-mdi-loading mx-auto my-1 animate-spin" />
        </div>
      </template>
    </MultiSelect>
  </BaseInput>
</template>

<style scoped></style>
