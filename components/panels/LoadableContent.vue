<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  item: any;
}>();
const { t } = useI18n();
</script>

<template>
  <div>
    <template v-if="isLoading">
      <div class="text-center">
        <ProgressSpinner class="!size-12"></ProgressSpinner>
      </div>
    </template>
    <template v-else-if="!item">
      <InlineMessage severity="danger">{{ t('Error') }}</InlineMessage>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<style scoped></style>
