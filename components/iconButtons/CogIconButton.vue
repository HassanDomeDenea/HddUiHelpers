<script setup lang="ts">
defineSlots<{
  default: () => any
}>()
const popoverRef = ref()
const isShown = ref(false)
function toggle(event) {
  popoverRef.value.toggle(event)
}
function onShow() {
  isShown.value = true
}
function onHide() {
  isShown.value = false
}
</script>

<template>
  <div class="inline-flex items-center">
    <i tabindex="0" class="i-mdi-cog cursor-pointer dark:(text-teal-300 hover:text-teal-200) light:(text-teal-500 hover:text-teal-700) " @click="toggle" />
    <Popover ref="popoverRef" @show="onShow" @hide="onHide">
      <slot />
    </Popover>
  </div>
</template>

<style scoped>

</style>
