<script setup lang="ts">
import type { AppPermission } from '@/types/laravel_generated'
import DarkModeButton from 'HddUiHelpers/components/misc/DarkModeButton.vue'
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth'
import { useDimensionsStore } from 'HddUiHelpers/stores/dimensions.ts'
import { Menubar } from 'primevue'

const authStore = useBasicAuthStore()

export interface NavbarMenuItemInterface {
  label: string
  icon: string
  to?: string
  disabled?: boolean
  badge?: number
  class?: any
  items?: NavbarMenuItemInterface[]
  shortcut?: string
  command?: () => any
  auth?: boolean
  permission?: AppPermission | AppPermission[]
}

const {
  navbarClass = 'light:!bg-sky-200 light:!border-b-sky-300 ',
  activeItemClass = 'light:bg-sky-100 dark:bg-gray-800 rounded-lg font-bold',
  withDarkModeButton = true,
  items,
} = defineProps<{
  withDarkModeButton?: boolean
  items: NavbarMenuItemInterface[]
  navbarClass?: any
  activeItemClass?: any
}>()
const { t } = useI18n()
const menuBarRef = useTemplateRef('menuBarRef')

const filteredItems = computed(() => {
  const mainItems = []
  const otherItems = []

  const _filtered = items
    .filter((item) => {
      if (item.auth === true && !authStore.user) {
        return false
      }

      if (item.auth === false && authStore.user) {
        return false
      }

      if (item.permission && !authStore.can(item.permission)) {
        return false
      }
      return true
    })
    .map((item): NavbarMenuItemInterface & { estimated_width: number } => {
      return {
        ...item,
        estimated_width: item.label.length * 13,
      }
    })

  const othersItemEstimatedWidth = 13 * 13
  let currentEstimatedWidth = othersItemEstimatedWidth
  _filtered.forEach((item) => {
    if (currentEstimatedWidth + item.estimated_width > itemsAvailableWidth.value) {
      otherItems.push(item)
    } else {
      mainItems.push(item)
    }
    currentEstimatedWidth += item.estimated_width
  })

  if (otherItems.length > 0) {
    mainItems.push({
      label: t('Others'),
      items: otherItems,
    })
  }

  return mainItems
})
const dimensionsStore = useDimensionsStore()
const menuBarStartAreaElement = computed(() =>
  menuBarRef.value?.$el?.querySelector('.p-menubar-start')
)
const menuBarEndAreaElement = computed(() => menuBarRef.value?.$el?.querySelector('.p-menubar-end'))
const { width: menuBarWidth, height: menuBarHeight } = useElementSize(
  menuBarRef,
  {},
  {
    box: 'border-box',
  }
)
const { width: menuBarStartAreaWidth } = useElementSize(menuBarStartAreaElement)
const { width: menuBarEndAreaWidth } = useElementSize(menuBarEndAreaElement)
const itemsAvailableWidth = computed(() => {
  return menuBarWidth.value - menuBarStartAreaWidth.value - menuBarEndAreaWidth.value - 12
})

watch(
  menuBarHeight,
  (val) => {
    dimensionsStore.topNavbarHeight = val
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Menubar ref="menuBarRef" :model="filteredItems" :class="navbarClass" class="z-2">
    <template #start>
      <slot name="start"></slot>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <component
        :is="item.to ? 'router-link' : 'a'"
        :to="item.to"
        v-bind="props.action"
        :class="item.class"
        :active-class="activeItemClass"
      >
        <i :class="item.icon" />
        <span>{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ms-auto': !root, 'ms-2': root }" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="surface-border border-round surface-100 border-1 me-auto p-1 text-xs"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          class="pi pi-angle-down"
          :class="[
            {
              'i-uil:angle-down ms-auto': root,
              'ltr:i-uil-angle-right-b rtl:i-uil-angle-left-b i-mdi-angle-left ms-auto': !root,
            },
          ]"
        />
      </component>
    </template>
    <template #end>
      <div class="flex items-center">
        <DarkModeButton v-if="withDarkModeButton" />
        <UserAvatar v-if="authStore.user" class="ms-1" :user="authStore.user" />

        <slot name="end"></slot>
      </div>
    </template>
  </Menubar>
</template>

<style scoped></style>
