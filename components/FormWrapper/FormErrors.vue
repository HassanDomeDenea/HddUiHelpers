<script setup lang="ts">
withDefaults(defineProps<{
  errors?: Record<string, string[]>
}>(), {
  errors: () => ({}),
})
</script>

<template>
  <Message v-if="Object.values(errors).length > 0" severity="error" class="w-full">
    <template v-for="(errorsList) in errors">
      <li v-for="item in errorsList" :key="item">
        {{ item }}
      </li>
    </template>
  </Message>
</template>

<style scoped>

</style>
