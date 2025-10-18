<script setup lang="ts">
import uniqueId from 'lodash/uniqueId';
import type { ButtonProps } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';

defineProps<{
  severity?: ButtonProps['severity'];
  label?: string;
  size?: 'small' | 'large' | string;
  icon?: string;
  tooltip?: string;
  items: MenuItem[];
}>();

const menuId = computed(() => uniqueId('button-menu-overlay-'));
const menuRef = useTemplateRef('menuRef');
</script>

<template>
  <div class="inline-block">
    <Menu
      :id="menuId"
      ref="menuRef"
      :model="items"
      :popup="true"
      :pt="{
        root: {
          class: 'max-h-[90vh] overflow-y-auto',
        },
      }"
    />
    <Button
      v-tooltip="tooltip"
      :size="size"
      :icon="icon"
      :label="label"
      aria-haspopup="true"
      :severity="severity"
      :aria-controls="menuId"
      @click="(event) => menuRef.toggle(event)"
    ></Button>
  </div>
</template>

<style scoped></style>
