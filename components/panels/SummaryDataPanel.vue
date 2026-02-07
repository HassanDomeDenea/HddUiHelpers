<script setup lang="ts">
import type { ButtonProps } from 'primevue'
import ContextMenu from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import type { ComponentExposed } from 'vue-component-type-helpers'

export interface SummaryDataPanelItem {
  label: string
  value: string | number | boolean | null
  labelClass?: any
  type?: 'divider' | 'price' | 'formatted_number' | 'number' | 'text'
  valueClass?: any
  wrapperClass?: any
  hidden?: boolean
  noPrint?: boolean
  appendButton?: ButtonProps & { href?: string; visible?: boolean }
  appendContextMenu?: MenuItem[]
}

const { labelWidth = 150, severity = 'contrast' } = defineProps<{
  title?: string
  labelWidth?: number | true
  severity?: ButtonProps['severity']
  items?: SummaryDataPanelItem[]
  minimumAfterLabelSpace?: number
}>()
const itemLabelRefs = useTemplateRef<HTMLSpanElement[]>('itemLabelRefs')
const itemContextMenusRefs = ref<Record<number, ComponentExposed<typeof ContextMenu>>>({})
/*const maxLabelWidth = ref();
watch(
    itemLabelRefs,
    (refs?: HTMLSpanElement[]) => {
        if (labelWidth ==true && refs) {
            maxLabelWidth.value = Math.max(...refs.map((ref) => ref.offsetWidth)) + minimumAfterLabelSpace;
        }
    },
    {
        immediate: true,
    },
);*/

function onItemContextMenu(event: MouseEvent, item: SummaryDataPanelItem, itemIndex: number) {
  if (item.appendContextMenu) {
    itemContextMenusRefs[itemIndex].show(event)
    event.preventDefault()
  }
}
</script>

<template>
  <div class="summeryDataPanel mx-4 space-y-1">
    <slot name="title">
      <div
        v-if="title"
        class="underline-offset-6 !mb-4 mt-2 text-center text-xl font-bold underline"
      >
        {{ title }}
      </div>
    </slot>
    <div
      v-for="(item, itemIndex) in items"
      :key="itemIndex"
      :class="[item.hidden ? 'hidden' : '', item.noPrint ? 'print:hidden' : '', item.wrapperClass]"
    >
      <template v-if="item.type === 'divider'">
        <Divider />
      </template>
      <template v-else>
        <span ref="itemLabelRefs" :class="item.labelClass" :style="{ width: labelWidth + 'px' }"
          >{{ item.label }}:
        </span>
        <span :class="['font-bold', item.valueClass]" v-html="item.value"></span>
        <Button
          v-if="item.appendButton && item.appendButton.visible !== false"
          v-tooltip.top="item.appendButton.tooltip"
          :icon="item.appendButton.icon ? `${item.appendButton.icon} !min-w-0.5rem` : null"
          size="small"
          text
          class="ms-4 size-6 print:!hidden"
          :severity="item.appendButton.severity"
          :loading="item.appendButton.loading"
          :disabled="item.appendButton.disabled"
          :label="item.appendButton.label"
          :href="item.appendButton.href"
          :as="item.appendButton.href ? 'a' : undefined"
          :title="item.appendButton.title"
          @click.prevent="item.appendButton.onClick"
          @contextmenu="onItemContextMenu($event, item, itemIndex)"
        />
        <ContextMenu
          v-if="item.appendContextMenu"
          :ref="(el) => (itemContextMenusRefs[itemIndex] = el as any)"
          :model="item.appendContextMenu"
        ></ContextMenu>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.summeryDataPanel {
  div {
    span:first-child {
      @apply inline-flex gap-2 pe-2;
      &:after {
        @apply border-b-1 mb-2 flex-grow border-dashed border-b-gray-600/40 dark:border-b-gray-400/40;
        content: '';
      }
    }
  }
}
</style>
