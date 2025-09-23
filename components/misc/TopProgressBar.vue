<script setup lang="ts">
import { useApiClient } from 'HddUiHelpers/stores/apiClient';

const apiClient = useApiClient();
</script>

<template>
  <ProgressBar
    v-if="apiClient.isLoading || apiClient.hasError"
    :class="{ 'light:!bg-red-600 dark:!bg-red-500': apiClient.hasError }"
    mode="indeterminate"
    class="loading-bar"
  />
</template>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 3px;
}
</style>
