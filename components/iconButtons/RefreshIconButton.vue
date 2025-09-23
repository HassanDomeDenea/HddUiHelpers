<script setup lang="ts">
defineProps<{
  loading?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <i
    tabindex="0"
    :class="{
      'dark:(text-blue-300) light:(text-blue-500) i-svg-spinners-180-ring cursor-wait': loading,
      'i-mdi-refresh': !loading,
      'dark:(text-blue-300 hover:text-blue-200) light:(text-blue-500 hover:text-blue-700) cursor-pointer': !loading && !disabled,
      'dark:(text-gray-500) light:(text-gray-400 )': !loading && disabled,
    }"
    class="inline-block"
  />
</template>

<style scoped></style>
