<script setup lang="ts" generic="T extends any">
import { vElementVisibility } from '@vueuse/components';
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import type { AutoCompleteOptionSelectEvent } from 'primevue/autocomplete';
import type { Ref } from 'vue';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { AutocompleteInputProps } from './types';

const props = withDefaults(defineProps<AutocompleteInputProps>(), {
  optionLabelProperty: 'name',
  optionIdProperty: 'id',
  searchOnFocus: true,
  withoutObject: false,
  options: () => [],
  inputClass: 'w-full',
  autoCompleteClass: '',
  noManualInput: false,
  useIdModel: false,
  hideListWhenEmpty: false,
  clearOnDblClick: false,
  clearable: false,
});
const emits = defineEmits<{
  (e: 'containerDblClick', event: MouseEvent);
  (e: 'keydown', event: KeyboardEvent);
  (e: 'blur', event: FocusEvent);
  (e: 'itemSelected', event: T);
  (e: 'cleared');
}>();

const selectedItem = defineModel<OptionInterface | ValueInterface | null>('modelValue', { default: ref().value });
const selectedItemId = defineModel<string | number | null>('id');

const items: Ref<OptionInterface[]> = ref([]);
const hasMore = ref(false);
const total = ref(0);
const searchQueryName = ref();
const isLoadingMore = ref(false);
const inputRef = ref();
const apiClient = useApiClient();

interface OptionInterface {
  name: string;
  id: number;
}

type ValueInterface = string;
const manualInput = ref<any>(null);

const dynamicValue = computed({
  get() {
    return props.withoutObject ? selectedItem.value : selectedItem.value?.[props.optionLabelProperty];
  },
  set(newValue: ValueInterface | OptionInterface) {
    if (props.withoutObject) {
      selectedItem.value = typeof newValue === 'string' ? newValue : newValue[props.optionLabelProperty];
    } else {
      selectedItem.value = newValue;
    }
  },
});

async function search(event: { query: string; offset?: number; limit?: number; onlyId?: boolean }) {
  searchQueryName.value = event.query;
  const params = { name: event.query, offset: event.offset || 0, limit: event.limit, only_id: event.onlyId ? 1 : 0 };
  if (typeof props.ajaxParams === 'object') {
    for (const key in props.ajaxParams) {
      params[key] = props.ajaxParams[key];
    }
  } else if (typeof props.ajaxParams === 'function') {
    props.ajaxParams(params);
  }
  let request: Promise<any>;
  if (props.url) {
    if (typeof props.url === 'string') {
      request = apiClient.get(props.url, { params });
    } else {
      request = apiClient.request({ ...props.url, params });
    }
  } else {
    request = new Promise((resolve) => {
      const result = props.options.filter((item) => {
        return (
          item[props.optionLabelProperty].includes(params.name) &&
          !(props.hideCurrentOption && item[props.optionLabelProperty].trim() === params.name)
        );
      });
      resolve({
        data: {
          data: {
            items: result,
            total: result.length,
            hasMore: false,
          },
        },
      });
    });
  }
  return request.then((response) => {
    if (event.offset) items.value.push(...response.data.data.items);
    else items.value = response.data.data.items;

    /*if (props.hideListWhenEmpty && items.value.length < 1) {
            nextTick(() => {
                inputRef.value.overlayVisible = false;
            });
        }*/
    hasMore.value = response.data.data.hasMore;
    total.value = response.data.data.total;
    isLoadingMore.value = false;
  });
}

function lastElementVisibilityChanged(isVisible: boolean) {
  if (isVisible && total.value > items.value.length && isLoadingMore.value === false) {
    isLoadingMore.value = true;
    search({ query: searchQueryName.value, offset: items.value.length - 1 });
  }
}

function onItemSelected(evt: AutoCompleteOptionSelectEvent) {
  emits('itemSelected', evt.value);
  if (props.useIdModel) {
    selectedItemId.value = evt.value[props.optionIdProperty];
  }
  if (props.noManualInput) {
    dynamicValue.value = evt.value;
    // manualInput.value = props.withoutObject ? evt.value: evt.value?.[props.optionLabelProperty]
  }
}

function onManualInput() {
  // patient.value.id = null
}

function focus() {
  inputRef.value?.$refs.focusInput.$el.focus();
}

function deselectAndMoveCaretToEnd() {
  const inputElement = inputRef.value?.$refs.focusInput.$el;
  inputElement.selectionStart = inputElement.selectionEnd;
  const valueLength = inputElement.value.length;
  inputElement.setSelectionRange(valueLength, valueLength);
  inputElement.focus();
}

function onInputContainerDblclick(evt: MouseEvent) {
  emits('containerDblClick', evt);
  if (props.clearOnDblClick) {
    clear();
  }
}

watch(
  () => dynamicValue.value,
  (value) => {
    if (props.noManualInput) {
      manualInput.value = value;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function onAutocompleteInput(value: any) {
  if (props.noManualInput) {
    manualInput.value = value;
  } else {
    dynamicValue.value = value;
  }
}

function onBlur(event: FocusEvent) {
  emits('blur', event);
  if (props.noManualInput && selectedItem.value) {
    manualInput.value = props.withoutObject ? selectedItem.value : selectedItem.value?.[props.optionLabelProperty];
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (!inputRef.value.overlayVisible) {
    emits('keydown', event);
  }
  if (event.code === 'Enter' && props.noManualInput && manualInput.value === '') {
    selectedItem.value = null;
    if (props.useIdModel) {
      selectedItemId.value = null;
    }
  }
}

function showList(isFocus = true) {
  inputRef.value.show(isFocus);
}

function hideList(isFocus = true) {
  inputRef.value.hide(isFocus);
}

watch(
  () => selectedItemId.value,
  () => {
    if (props.useIdModel) {
      if (selectedItem.value?.[props.optionIdProperty] === selectedItemId.value) {
        return;
      }
      let existsItem = items.value.find((v) => v[props.optionIdProperty] === selectedItemId.value);
      if (existsItem) {
        dynamicValue.value = existsItem;
      } else {
        search({ query: `${selectedItemId.value}`, limit: 1, onlyId: true }).then(() => {
          existsItem = items.value.find((v) => v[props.optionIdProperty] === selectedItemId.value);
          nextTick(() => {
            if (existsItem) {
              dynamicValue.value = existsItem;
            }
          });
        });
      }
    }
  },
  {
    immediate: true,
  },
);

function clear() {
  if (props.useIdModel) {
    selectedItemId.value = null;
  }
  selectedItem.value = null;
  nextTick(() => {
    setTimeout(focus, 50);
  });
  emits('cleared');
}

function getOptionText(option: any) {
  return props.formatter ? props.formatter(option) : option[props.optionLabelProperty];
}
const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);
defineExpose({
  focus,
  deselectAndMoveCaretToEnd,
  showList,
  hideList,
  ...exposed,
});
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps">
    <template #labelText>
      <slot name="label-text" />
    </template>
    <template v-if="$slots.addon || clearable" #addon>
      <Button v-if="clearable && dynamicValue" :disabled="disabled" size="small" severity="danger" icon="i-mdi-times" @click="clear" />
      <slot name="addon" />
    </template>
    <template v-if="$slots.helper || helperText" #helper>
      <slot name="helper">
        <div v-html="helperText" />
      </slot>
    </template>
    <div class="w-full" @dblclick="onInputContainerDblclick">
      <AutoComplete
        v-bind="generalInputProps"
        ref="inputRef"
        :input-id="fieldUniqueId"
        :show-empty-message="!hideListWhenEmpty"
        :model-value="noManualInput ? manualInput : dynamicValue"
        class="!w-full"
        :class="autoCompleteClass"
        :placeholder="placeholder"
        :input-class="inputClass"
        :panel-class="panelClass"
        :suggestions="items"
        :option-label="optionLabelProperty"
        auto-option-focus
        :complete-on-focus="props.searchOnFocus"
        scroll-height="18rem"
        :force-selection="noManualInput"
        :pt="{
          pcInput: { root: { name } },
        }"
        @update:model-value="onAutocompleteInput"
        @blur="onBlur"
        @item-select="onItemSelected"
        @input="onManualInput"
        @complete="search"
        @keydown="onKeyDown"
      >
        <template #option="{ option, index }">
          <span v-if="index + 1 === items.length" v-element-visibility="lastElementVisibilityChanged">
            <slot name="option" :option="{ option, index }"><div v-html="getOptionText(option)" /></slot>
          </span>
          <span v-else>
            <slot name="option" :option="{ option, index }"><div v-html="getOptionText(option)" /></slot>
          </span>
        </template>
        <template #footer>
          <div class="flex justify-center">
            <i v-if="isLoadingMore" class="i-mdi-loading mx-auto my-1 animate-spin" />
          </div>
        </template>
      </AutoComplete>
    </div>
  </BaseInput>
</template>

<style scoped></style>
