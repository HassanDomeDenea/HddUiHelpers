<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collapseDirection?: 'start' | 'end';
    disabled?: boolean;
    expandText?: string;
    collapsedClass?: any;
    expandedClass?: any;
    collapseText?: string;
  }>(),
  {
    collapseDirection: 'start',
  },
);
defineSlots<{
  default: () => any;
}>();
const isCollapsed = defineModel<boolean>('isCollapsed', { required: true });
const { t } = useI18n();
const popoverRef = ref();
const isShown = ref(false);
function toggle() {
  isCollapsed.value = !isCollapsed.value;
}
function onShow() {
  isShown.value = true;
}
function onHide() {
  isShown.value = false;
}
</script>

<template>
  <div class="inline-flex items-center">
    <i
      v-tooltip="isCollapsed ? (expandText ?? t('Expand')) : (collapseText ?? t('Collapse'))"
      tabindex="0"
      :class="{
        [collapsedClass ?? 'dark:(text-teal-500 hover:text-teal-400) light:(text-teal-500 hover:text-teal-700)']: isCollapsed,
        [expandedClass ?? 'dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700)']: !isCollapsed,
        'rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle': isCollapsed && collapseDirection === 'start',
        'rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle': !isCollapsed && collapseDirection === 'start',
        'rtl:i-mdi:arrow-right-circle ltr:i-mdi:arrow-left-circle': isCollapsed && collapseDirection === 'end',
        'rtl:i-mdi:arrow-left-circle ltr:i-mdi:arrow-right-circle 12': !isCollapsed && collapseDirection === 'end',
        'cursor-pointer': !disabled,
      }"
      @click="toggle"
    />
  </div>
</template>

<style scoped></style>
