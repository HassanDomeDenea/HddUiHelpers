<script setup lang="ts" generic="TRow extends any">
import { pick } from 'lodash-es'
import { ButtonProps } from 'primevue'

const {
  rounded = true,
  only,
  values,
  title,
  severity = 'primary',
} = defineProps<{
  values: TRow[]
  only?: string[]
  headers?: string[]
  hideHead?: boolean
  rounded?: boolean
  showEmptyMessage?: boolean
  title?: string
  showSequenceColumn?: boolean
  severity?: ButtonProps['severity']
  size?: ButtonProps['size']
  onRowClick?: (row: TRow) => void
}>()
const { t } = useI18n()
const theadCellRefs = useTemplateRefsList()
const theadRef = useTemplateRef<HTMLDivElement>('theadRef')
const mappedValues = computed(() => {
  if (only) {
    return values.map((i) => pick(i, only))
  } else {
    return values
  }
})

const emits = defineEmits<{
  rowClick: [row: unknown]
}>()
</script>

<template>
  <div>
    <slot name="title">
      <Message :severity="severity" variant="simple" class="[&_.p-message-text]:w-full">
        <div
          class="pb-4 pt-3 text-center text-2xl font-bold"
          :class="{ 'pb-2 text-lg': size === 'small', 'pb-4 text-3xl': size === 'large' }"
        >
          {{ title }}
        </div>
      </Message>
    </slot>
    <table class="hdd-simple-table" :class="[severity, size, { 'rounded-table': rounded }]">
      <thead v-if="hideHead !== true" ref="theadRef">
        <tr>
          <th v-if="showSequenceColumn">#</th>
          <slot name="header">
            <th
              v-for="(col, i) in headers ?? Object.keys(mappedValues[0] ?? {})"
              :key="i"
              :ref="theadCellRefs.set"
            >
              {{ col }}
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <template v-if="showEmptyMessage && mappedValues.length === 0">
          <tr>
            <slot name="emptyMessage">
              <td
                class="font-italic text-muted text-center"
                :colspan="(theadRef?.firstChild as HTMLTableRowElement)?.children?.length || 1"
              >
                {{ t('No Records') }}
              </td>
            </slot>
          </tr>
        </template>
        <template v-else>
          <template v-for="(row, rowIndex) in mappedValues" :key="rowIndex">
            <tr :class="{ 'cursor-pointer': !!onRowClick }" @click="emits('rowClick', row)">
              <td v-if="showSequenceColumn">{{ rowIndex + 1 }}</td>
              <slot name="row" :row="row as any">
                <td v-for="(cellValue, cellIndex) in row" :key="cellIndex">
                  {{ cellValue }}
                </td>
              </slot>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
table.hdd-simple-table {
  @apply w-full border-separate border-spacing-0 overflow-auto rounded-lg shadow-sm;

  thead > tr > th {
    @apply border-1 px-3 py-2;
  }

  tbody > tr > td {
    @apply border-1 px-3 py-1.5;
  }

  &.rounded-table {
    thead > tr {
      th:first-child {
        @apply rounded-ss-xl;
      }

      th:last-child {
        @apply rounded-se-xl;
      }
    }
  }

  &.small {
    @apply text-sm;
    thead > tr > th {
      @apply px-2 py-0.5;
    }

    tbody > tr > td {
      @apply px-2 py-0.5;
    }
  }

  &.large {
    @apply text-lg;
    thead > tr > th {
      @apply px-4 py-3;
    }

    tbody > tr > td {
      @apply px-4 py-2.5;
    }
  }

  $table_severities: primary, success, info, warn, error, secondary, contrast;

  @each $severity in $table_severities {
    &.#{$severity} {
      thead th {
        background-color: var(--p-message-#{$severity}-background);
        border-color: var(--p-message-#{$severity}-color);
      }

      tbody td {
        border-color: var(--p-message-#{$severity}-color);
      }

      tbody > tr:hover {
        background-color: color-mix(
          in srgb,
          var(--p-message-#{$severity}-background) 60%,
          rgba(154, 154, 154, 0.25)
        );
      }
    }
  }
}

.dark {
  table.hdd-simple-table {
    $table_severities: primary, success, info, warn, error, secondary, contrast;

    @each $severity in $table_severities {
      &.#{$severity} {
        thead th {
          border-color: var(--p-message-#{$severity}-border-color);
        }

        tbody td {
          border-color: var(--p-message-#{$severity}-border-color);
        }

        tbody > tr:hover {
          background-color: color-mix(
            in srgb,
            var(--p-message-#{$severity}-background) 30%,
            transparent
          );
        }
      }
    }
  }
}
</style>
