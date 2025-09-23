<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { isEmpty } from 'lodash-es';
import reduce from 'lodash/reduce';
import type { TreeNode } from 'primevue/treenode';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

type TreeNodeWithId = TreeNode & {
  id?: any;
};
const props = withDefaults(
  defineProps<
    {
      options: TreeNodeWithId[];
      optionLabelProperty?: string | null;
      optionDisabledProperty?: string | null | ((event: { option: TreeNodeWithId; value: any }) => boolean);
      optionValueProperty?: string | null;
      optionChildrenProperty?: string | null;
      formatter?: (OptionOrValue: any, type: 'option' | 'value') => string;
      clearable?: boolean;
      disabledValues?: MaybeRefOrGetter<any[]>;
      checkmark?: boolean;
      expanded?: boolean;
      hasFilter?: boolean;
      display?: 'comma' | 'chip';
      selectionMode?: 'single' | 'multiple' | 'checkbox';
    } & BaseInputProps
  >(),
  {
    optionChildrenProperty: 'children',
    optionLabelProperty: 'name',
    optionDisabledProperty: 'disabled',
    optionValueProperty: 'id',
    clearable: false,
    checkmark: true,
    hasFilter: true,
    expanded: false,
    display: 'comma',
    selectionMode: 'single',
  },
);
const emits = defineEmits<{
  change: [event: string[]];
}>();
const value = defineModel<any>('modelValue');
const localValue = computed({
  get() {
    if (value.value) {
      if (Array.isArray(value.value)) {
        return reduce(
          value.value,
          (carry, _id) => {
            carry[_id] = true;
            return carry;
          },
          {},
        );
      } else {
        return value.value
          ? {
              [value.value]: true,
            }
          : null;
      }
    } else {
      return null;
    }
  },
  set(_value) {
    if (_value) {
      const ids = Object.keys(_value)
        .map(resolveNodeFromNodeKey)
        .map((e) => e[props.optionValueProperty]);
      if (isEmpty(ids) && !props.clearable) {
        setVisibleElementValue(value.value);
        return;
      }
      if (props.selectionMode === 'single') {
        value.value = ids[0];
      } else {
        value.value = ids;
      }
    } else {
      value.value = null;
    }
  },
});

function convertOptionToTreeNodeIfNeeded(_option: any): TreeNodeWithId {
  if (_option.key && _option.label) {
    return _option;
  } else {
    let isDisabled =
      typeof props.optionDisabledProperty === 'function'
        ? props.optionDisabledProperty({ option: _option, value: value.value })
        : (_option[props.optionDisabledProperty] ?? false);
    const _disabledValues = toValue(props.disabledValues);
    if (!isDisabled && _disabledValues?.length) {
      if (_disabledValues.includes(_option[props.optionValueProperty])) {
        isDisabled = true;
      }
    }
    return {
      [props.optionValueProperty]: _option[props.optionValueProperty],
      key: _option[props.optionValueProperty].toString(),
      label: _option[props.optionLabelProperty],
      selectable: !isDisabled,
      styleClass: isDisabled ? 'text-muted' : null,
      children: _option[props.optionChildrenProperty]?.map(convertOptionToTreeNodeIfNeeded) ?? [],
    };
  }
}

function resolveNodeFromNodeKey(nodeKey: string): TreeNodeWithId {
  let targetNode = null;

  function resolveTargetOptionPrimaryKeyFromNode(_node: TreeNodeWithId): boolean {
    if (_node.key === nodeKey) {
      targetNode = _node;
      return true;
    } else if (_node.children) {
      for (const _child of _node.children) {
        if (resolveTargetOptionPrimaryKeyFromNode(_child)) {
          break;
        }
      }
    }
    return false;
  }

  resolveTargetOptionPrimaryKeyFromNode({
    [props.optionValueProperty]: null,
    key: null,
    children: localOptions.value,
  });

  return targetNode;
}

const localOptions = computed<TreeNodeWithId[]>(() => {
  return props.options.map(convertOptionToTreeNodeIfNeeded);
});
const inputRef = ref();

function focus() {
  if (!props.disabled) {
    // console.log(inputRef.value.overlay)
    // if (inputRef.value.overlay ) {
    //     inputRef.value.hide();
    // } else {
    //     inputRef.value.show()
    // }
    setTimeout(() => {
      const target = inputRef.value.$refs.focusInput;
      inputRef.value.onClick({ target });
    }, 500);
  }
}

function onInputBlur() {}

function setVisibleElementValue(value: any) {
  if (value) {
    if (props.selectionMode === 'single') {
      inputRef.value.d_value = {
        [Array.isArray(value) ? value[0] : value]: true,
      };
    } else {
      inputRef.value.d_value = reduce(
        Array.isArray(value) ? value : [value],
        (carry, _id) => {
          carry[_id] = true;
          return carry;
        },
        {},
      );
    }
  } else {
    inputRef.value.d_value = {};
  }
}
const expandedKeys = ref({});

function expandNode(node: TreeNode, childrenIncluded: boolean = true) {
  if (node.children && node.children.length) {
    expandedKeys.value[node.key] = true;

    if (childrenIncluded) {
      for (const child of node.children) {
        expandNode(child);
      }
    }
  }
}
function expandAll() {
  for (const node of localOptions.value) {
    expandNode(node);
  }
  expandedKeys.value = { ...expandedKeys.value };
}

onMounted(() => {
  if (props.expanded) {
    expandAll();
  }
});

const { exposed, baseInputForwardedProps, fieldUniqueId, generalInputProps } = useHddBaseInputUtils(props);

defineExpose({ focus, ...exposed, setVisibleElementValue });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" @click="focus">
    <TreeSelect
      v-bind="generalInputProps"
      ref="inputRef"
      v-model="localValue"
      v-model:expanded-keys="expandedKeys"
      :input-id="fieldUniqueId"
      :placeholder="placeholder"
      :filter="hasFilter"
      :options="localOptions"
      :show-clear="clearable"
      class="!w-full"
      :selection-mode="selectionMode"
      scroll-height="18rem"
      :display="display"
      @blur="onInputBlur"
      @change="emits('change', $event)"
    >
      <template v-if="$slots.value" #value="slotProps">
        <slot name="value" v-bind="slotProps">
          <div v-if="formatter" v-html="formatter(slotProps.value, 'value')" />
          <div v-else-if="value">
            {{ value }}
            <!--                        {{ options.find(e => e[optionValueProperty] === value)?.[optionLabelProperty] ?? value }}-->
          </div>
        </slot>
      </template>
      <template v-if="$slots.option" #option="{ node, selected, expanded }">
        <slot name="option" :node="node" :selected="selected" :expanded="expanded">
          <div v-if="formatter" v-html="formatter(option, 'option')" />
        </slot>
      </template>
      <template #footer="slotProps">
        <slot name="footer" v-bind="slotProps"></slot>
      </template>
      <template #header="slotProps">
        <slot name="header" v-bind="slotProps"></slot>
      </template>
      <template #itemtogglericon="slotProps">
        <i
          class="text-[2em]"
          :class="[
            slotProps.class,
            {
              'i-ic:round-keyboard-arrow-up': slotProps.expanded,
              'rtl:i-ic:round-keyboard-arrow-left ltr:i-ic:round-keyboard-arrow-right': !slotProps.expanded,
            },
          ]"
        ></i>
      </template>
    </TreeSelect>
  </BaseInput>
</template>

<style scoped></style>
