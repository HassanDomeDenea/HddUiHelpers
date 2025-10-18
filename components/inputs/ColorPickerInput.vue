<script setup lang="ts">
import { useHddBaseInputUtils } from 'HddUiHelpers/components/inputs/inputsUtils.ts';
import { take, uniq } from 'lodash-es';
import Popover from 'primevue/popover';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import type { BaseInputProps } from './types';

const props = withDefaults(
  defineProps<
    {
      colors?: string[];
      autoDismiss?: boolean;
      asPopover?: boolean;
      withTrigger?: boolean;
      clearable?: boolean;
      customSelector?: boolean;
      withRecentColors?: boolean;
      recentColorsGroupName?: string;
    } & BaseInputProps
  >(),
  {
    withTrigger: true,
    asPopover: true,
    customSelector: true,
    withRecentColors: true,
  },
);

const emits = defineEmits<{
  change: [value: string | null];
}>();

const value = defineModel<any>('modelValue', { default: ref().value });
const { t } = useI18n();
const inputRef = ref();
const customColorInputRef = useTemplateRef('customColorInputRef');
const colorPalateContainerRef = useTemplateRef<HTMLDivElement | ComponentExposed<typeof Popover>>('colorPalateContainerRef');
function focus() {
  inputRef.value.$el.focus();
}

const colorPalate = computed(() => {
  return (
    props.colors ?? [
      '#000000',
      '#ffffff',
      '#cccccc',
      '#8d8d8d',
      '#525252',
      '#2d2d2d',
      '#ffb0b0',
      '#ff7171',
      '#ff3636',
      '#ff0000',
      '#980000',
      '#480000',
      '#acacff',
      '#5151ff',
      '#0000ff',
      '#0000a2',
      '#00004b',
      '#c7ffc7',
      '#65ff65',
      '#00ff00',
      '#009300',
      '#004b00',
      '#f6b3ff',
      '#ee5dff',
      '#e600ff',
      '#6b0077',
      '#ffe2b3',
      '#ffbb58',
      '#ff9900',
      '#774800',
      '#eaff9a',
      '#c8ff00',
      '#708d00',
      '#00ffff',
      '#007575',
    ]
  );
});

const recentColors = useStorage(() => 'recent_colors_' + props.recentColorsGroupName, null, localStorage, {
  serializer: {
    read: (v: any) => (v ? JSON.parse(v) : null) || null,
    write: (v: any) => JSON.stringify(v),
  },
});

function selectColor(color) {
  value.value = color;
  emits('change', value.value);
  if (props.autoDismiss && props.asPopover) {
    colorPalateContainerRef.value?.hide();
  }
}

function clearColor() {
  value.value = null;
  emits('change', value.value);
  if (props.autoDismiss && props.asPopover) {
    colorPalateContainerRef.value?.hide();
  }
}

function customColorSelected(event: Event) {
  value.value = (event.target as HTMLInputElement).value;
  emits('change', value.value);
  if (props.withRecentColors) {
    const newRecentColors = uniq([value.value, ...(recentColors.value || [])]);
    recentColors.value = take(newRecentColors, 5);
  }
  if (props.autoDismiss && props.asPopover) {
    colorPalateContainerRef.value?.hide();
  }
}

onMounted(() => {});

const { exposed, baseInputForwardedProps } = useHddBaseInputUtils(props);

function toggle(event: PointerEvent | MouseEvent) {
  colorPalateContainerRef.value?.toggle?.(event);
}

defineExpose({ focus, toggle, ...exposed });
</script>

<template>
  <BaseInput v-bind="baseInputForwardedProps" :floating-label="false" :infield-top-aligned-label="false">
    <div>
      <component
        :is="asPopover ? Popover : 'div'"
        ref="colorPalateContainerRef"
        :class="[{ 'border-1 max-w-[480px] rounded border-dotted p-1': !asPopover, 'max-w-[360px]': asPopover }]"
      >
        <div class="m-1 flex flex-wrap gap-1">
          <button
            v-for="color in colorPalate"
            :key="color"
            class="color-box"
            :disabled="disabled"
            :style="{ backgroundColor: color }"
            :class="{ active: color === value, disabled: disabled }"
            @click="selectColor(color)"
          ></button>
        </div>
        <div v-if="withRecentColors" class="m-1 mt-3 flex flex-wrap gap-1">
          <button
            v-for="color in recentColors"
            :key="color"
            class="color-box"
            :disabled="disabled"
            :style="{ backgroundColor: color }"
            :class="{ active: color === value, disabled: disabled }"
            @click="selectColor(color)"
          ></button>
        </div>
        <div class="flex justify-center">
          <div v-if="customSelector" class="mt-2 flex items-center justify-center gap-1">
            <Button
              icon="i-ic:outline-color-lens"
              size="small"
              :label="t('Select a Color')"
              severity="info"
              @click="() => customColorInputRef.click()"
            ></Button>
            <input
              ref="customColorInputRef"
              v-model="value"
              style="height: 0; width: 0"
              type="color"
              :disabled="disabled"
              @change="customColorSelected"
            />
          </div>
          <div>
            <Button
              v-if="clearable && value"
              size="small"
              :title="t('Clear Selection')"
              severity="danger"
              outlined
              icon="i-iconamoon:sign-times"
              class="mt-2"
              @click="clearColor"
            />
          </div>
        </div>
      </component>
      <slot v-if="asPopover && withTrigger" name="trigger" :toggle="colorPalateContainerRef?.toggle" :value="value">
        <Button :size="size" :label="value ? undefined : t('Select Color')" severity="info" @click="(event) => colorPalateContainerRef.toggle(event)">
          <template v-if="value" #icon>
            <span class="color-box inline-block" :class="{ '!size-4': size === 'small' }" :style="{ backgroundColor: value }"></span>
          </template>
        </Button>
      </slot>
    </div>
  </BaseInput>
</template>

<style scoped lang="scss">
.color-box {
  @apply inline-block size-6 rounded-md;
  &:not(.disabled):not(.active) {
    @apply cursor-pointer;
  }
  &:not(.active) {
    @apply shadow-xs shadow-op-90 shadow-inset light:shadow-black dark:shadow-white;
  }
  &.active {
    @apply light:border-zinc-100/75 light:ring-zinc-950/95 border-2 ring-2 dark:border-zinc-950/75 dark:ring-zinc-100/95;
  }
}
</style>
