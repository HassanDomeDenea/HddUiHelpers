<script setup lang="ts">
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable';
import ToolbarFilterValue from 'HddUiHelpers/components/datatables/filters/ToolbarFilterValue.vue';
import ToolbarFilterWrapper from 'HddUiHelpers/components/datatables/filters/ToolbarFilterWrapper.vue';
import { isToolbarFilterEmpty } from 'HddUiHelpers/components/datatables/ServerDataTableUtilities.ts';
import { hidePrimevuePopovers } from 'HddUiHelpers/plugins/primevue.ts';
import { pullAt } from 'lodash-es';
import uniqueId from 'lodash/uniqueId';
import Popover from 'primevue/popover';
import type { ComponentExposed } from 'vue-component-type-helpers';
import type { ServerDataTableToolbarFilter, ServerDataTableToolbarFilterValue } from '../ServerDataTableTypes.ts';
import { isToolbarFilterValue, type ServerDataTableColumn, type ServerDataTableToolbarFilterWrapper } from '../ServerDataTableTypes.ts';

const emits = defineEmits<{
  filterCallback: [filter: ServerDataTableToolbarFilterValue];
  filtersChanged: [];
  remove: [filterWrapper: ServerDataTableToolbarFilterWrapper];
  operatorChanged: [operator: ServerDataTableToolbarFilterWrapper['operator']];
}>();
const { operator, isPrinting = false } = defineProps<{
  operator: ServerDataTableToolbarFilterWrapper['operator'];
  columns: ServerDataTableColumn[];
  hideOperator?: boolean;
  isPrinting?: boolean;
  isGrouped?: boolean;
  makeOperatorAfterFields?: boolean;
}>();
const filters = defineModel<ServerDataTableToolbarFilterWrapper>('filters');
const filtersRefs = useTemplateRef<ComponentExposed<typeof ToolbarFilterWrapper | typeof ToolbarFilterValue>[]>('filtersRefs');
const { t } = useI18n();
const toolbarFiltersSortedEventName = 'toolbarFiltersSortedEvent';

function onRemove(filterIndex: number) {
  let emitChanges = true;
  if (isToolbarFilterEmpty(filters.value.fields[filterIndex])) {
    emitChanges = false;
  }
  const newFields = [...filters.value.fields];
  newFields.splice(filterIndex, 1);
  filters.value.fields = newFields;

  if (filters.value.fields.length === 0) {
    emits('remove', filters.value);
  }

  if (emitChanges) {
    emits('filtersChanged');
  }
}

const filtersListWrapperRef = useTemplateRef<HTMLElement>('filtersListWrapperRef');
if (!isPrinting) {
  useSortable(filtersListWrapperRef, filters.value.fields, {
    group: 'toolbar-filters',
    swapThreshold: 0.3,
    invertSwap: true,
    onEnd: function (e) {
      // var itemEl = evt.item;  // dragged HTMLElement
      // evt.to;    // target list
      // evt.from;  // previous list
      // evt.oldIndex;  // element's old index within old parent
      // evt.newIndex;  // element's new index within new parent
      // evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
      // evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
      // evt.clone // the clone element
      // evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
      if (e.from === e.to) {
        // Same List:
        if (e.oldIndex === e.newIndex) {
          return;
        }
        const newFields = [...filters.value.fields];
        moveArrayElement(newFields, e.oldIndex, e.newIndex, e);
        nextTick(() => {
          filters.value.fields = newFields;
        });
      } else {
        // Other List:
        const newFields = [...filters.value.fields];

        const [removed] = pullAt(newFields, e.oldIndex);

        const customEvent = new CustomEvent<ToolbarFiltersSortedEvent>(toolbarFiltersSortedEventName, {
          detail: {
            toIndex: e.newIndex,
            item: removed,
            callback: () => {
              if (filters.value.fields.length === 0) {
                emits('remove', filters.value);
              }
            },
          },
        });
        e.to.dispatchEvent(customEvent);

        nextTick(() => {
          filters.value.fields = newFields;
        });
      }
    },
    onUpdate() {
      //Empty
      //console.log('OnUpdate', e);
    },
  });
}

function onFilterCallback(filter: ServerDataTableToolbarFilterValue) {
  emits('filterCallback', filter);
  emits('filtersChanged');
}

function onOperatorChanges(newOperator: 'and' | 'or') {
  filters.value.operator = newOperator;
  if (!isToolbarFilterEmpty(filters.value)) {
    emits('filtersChanged');
  }
}

function onWrapperContextMenu() {
  if (isPrinting) return;
}

function isolateIntoGroup(filterIndex: number) {
  let emitChanges = true;
  const filter = filters.value.fields[filterIndex];

  if (isToolbarFilterEmpty(filter)) {
    emitChanges = false;
  }
  const newFields = [...filters.value.fields];
  newFields[filterIndex] = {
    operator: 'and',
    fields: [filter],
    id: uniqueId('toolbar-filter-'),
  } as ServerDataTableToolbarFilterWrapper;
  filters.value.fields = newFields;

  if (emitChanges) {
    emits('filtersChanged');
  }
}

interface ToolbarFiltersSortedEvent {
  toIndex: number;
  item: ServerDataTableToolbarFilter;
  callback?: () => void;
}

onMounted(() => {
  filtersListWrapperRef.value.addEventListener(toolbarFiltersSortedEventName, function (event: CustomEvent<ToolbarFiltersSortedEvent>) {
    const { toIndex, item, callback } = event.detail;
    const newFields = [...filters.value.fields];
    newFields.splice(toIndex, 0, item);
    nextTick(() => {
      filtersListWrapperRef.value.children[toIndex].remove();
      filters.value.fields = newFields;
      if (!isToolbarFilterEmpty(item)) {
        emits('filtersChanged');
      }
      if (callback) {
        nextTick(callback);
      }
    });
  });
});

const localOperator = ref();
const operatorChangerRef = useTemplateRef<ComponentExposed<typeof Popover>>('operatorChangerRef');

function onOperatorSpanClick(evt: PointerEvent) {
  if (isPrinting) return;
  localOperator.value = operator;
  hidePrimevuePopovers();
  operatorChangerRef.value.toggle(evt);
}

function onWrapperOperatorChanges(newOperator: ServerDataTableToolbarFilterWrapper['operator']) {
  if (newOperator && newOperator !== operator) {
    emits('operatorChanged', newOperator);
  }
  operatorChangerRef.value.hide();
}

function focus() {
  filtersRefs.value[0]?.focus?.();
}

function focusFilter(filterIndex: number) {
  filtersRefs.value[filterIndex]?.focus?.();
}
function focusLast() {
  filtersRefs.value[filters.value.fields.length - 1]?.focus?.();
}
defineExpose({
  focusLast,
  focusFilter,
  focus,
});
</script>
<template>
  <div>
    <Popover v-if="!isPrinting" ref="operatorChangerRef">
      <div>
        <SelectButton
          v-model="localOperator"
          option-label="label"
          option-value="value"
          size="small"
          fluid
          :options="[
            { value: 'and', label: t('and') },
            { value: 'or', label: t('or') },
          ]"
          @change="onWrapperOperatorChanges($event.value)"
        />
      </div>
    </Popover>
    <div :class="{ 'border-1 my-2 me-1 ms-6 rounded-lg border-dashed border-zinc-600 dark:border-zinc-500/75': isGrouped }">
      <span
        v-if="!hideOperator && filters.fields.length && !makeOperatorAfterFields"
        :title="t('Change Filtering Method')"
        class="operator-span mx-2"
        @click.stop="onOperatorSpanClick"
        >{{ t(operator) }} :</span
      >
      <div ref="filtersListWrapperRef" :data-custom-id="filters.id" @contextmenu.prevent="onWrapperContextMenu">
        <template v-for="(filter, filterIndex) in filters.fields" :key="filter.id">
          <template v-if="isToolbarFilterValue(filters.fields[filterIndex])">
            <ToolbarFilterValue
              v-show="!isPrinting || !isToolbarFilterEmpty(filters.fields[filterIndex])"
              ref="filtersRefs"
              v-model:filter="filters.fields[filterIndex]"
              :is-printing="isPrinting"
              :operator="filterIndex !== 0 ? filters.operator : null"
              :columns="columns"
              :can-create-group="filters.fields.length > 1"
              @filter-callback="onFilterCallback"
              @remove="onRemove(filterIndex)"
              @operator-changed="onOperatorChanges"
              @isolate-into-group="isolateIntoGroup(filterIndex)"
            />
          </template>
          <template v-else>
            <ToolbarFilterWrapper
              v-show="!isPrinting || !isToolbarFilterEmpty(filters.fields[filterIndex])"
              ref="filtersRefs"
              v-model:filters="filters.fields[filterIndex]"
              is-grouped
              :operator="filters.operator"
              :make-operator-after-fields="filterIndex === 0 && filters.fields.length > 1"
              :columns="columns"
              @remove="onRemove(filterIndex)"
              @operator-changed="onOperatorChanges"
              @filters-changed="emits('filtersChanged')"
              @filter-callback="onFilterCallback"
            />
          </template>
        </template>
      </div>
    </div>
    <span
      v-if="!hideOperator && filters.fields.length && makeOperatorAfterFields"
      class="operator-span mx-2"
      :title="t('Change Filtering Method')"
      @click.stop="onOperatorSpanClick"
    >
      {{ t(operator) }} :
    </span>
  </div>
</template>

<style scoped>
.operator-span {
  @apply mx-1 cursor-pointer rounded px-1 font-bold italic text-zinc-500 hover:bg-gray-200/75 dark:text-zinc-300 hover:dark:bg-gray-700/75;
}
</style>
