<script setup lang="ts">
import type { ServerDataTableColumn } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts'
import { get } from 'lodash-es'
import isBoolean from 'lodash/isBoolean'

const { column } = defineProps<{
  column: ServerDataTableColumn
  renderedData: any
  row: any
  size?: 'small' | 'large' | string
}>()
const { t } = useI18n()

const resolveRenderTypeProps = computed(() => {
  return typeof column.renderTypeProps === 'function'
    ? column.renderTypeProps
    : toValue(column.renderTypeProps)
})
</script>

<template>
  <template v-if="column.renderType === 'chip'">
    <Chip :class="{ 'text-sm': size === 'small' }">
      {{ renderedData }}
    </Chip>
  </template>
  <template v-else-if="column.renderType === 'chips'">
    <div class="flex flex-wrap items-center gap-1">
      <Chip v-for="item in renderedData" :key="item" :class="{ 'text-sm': size === 'small' }">
        {{ item }}
      </Chip>
    </div>
  </template>
  <template v-else-if="column.renderType === 'tag'">
    <Tag
      v-bind="
        typeof resolveRenderTypeProps === 'function'
          ? resolveRenderTypeProps({
              value: get(row, column.fullFieldName),
              text: renderedData,
              row: row,
              options: column.selectOptions,
            })
          : resolveRenderTypeProps
      "
      :value="renderedData"
    />
  </template>
  <template v-else-if="column.renderType === 'yesNoIconBadge'">
    <div>
      <Badge
        v-if="isBoolean(renderedData)"
        :size="size"
        :severity="renderedData ? 'success' : 'danger'"
        :title="t(renderedData ? 'Yes' : 'No')"
      >
        <i
          class="scale-120"
          :class="{ 'i-mdi-check': renderedData, 'i-mdi-times': !renderedData }"
        ></i>
      </Badge>
    </div>
  </template>
  <template v-else-if="column.type === 'color'">
    <div>
      <span
        v-if="renderedData"
        class="hdd-color-box !cursor-initial inline-block"
        :class="[{ '!size-6': size === 'small' }]"
        :style="{ backgroundColor: renderedData }"
      ></span>
    </div>
  </template>
  <div
    v-else
    class="inline-block"
    :class="[
      { 'whitespace-pre-wrap': column.type === 'textarea' },
      column.bodyClassFunction?.(renderedData, row, column),
    ]"
    v-html="renderedData"
  />
</template>

<style scoped></style>
