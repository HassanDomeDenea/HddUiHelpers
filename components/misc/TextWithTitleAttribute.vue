<script setup lang="ts">
defineProps<{
  component?: any;
  text: string;
  asTooltip?: boolean;
}>();
</script>

<template>
  <component :is="component ?? 'span'" v-tooltip="asTooltip ? text : undefined" :title="text">{{ text }}</component>
</template>

<style scoped></style>
