<script setup lang="ts">
export interface HddFormProps {
  title?: string
  fields: any[]
}

defineProps<HddFormProps>()
</script>

<template>
  <div>
    <h2>{{ title ?? "No Title" }}</h2>
    <div class="space-y-4">
      <template v-for="field in fields" :key="field">
        <fieldset>
          <label :for="field">{{ field }}</label>
          <input :id="field" :name="field">
        </fieldset>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
