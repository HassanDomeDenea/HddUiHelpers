<script setup lang="ts">
import type { UseSortableOptions } from '@vueuse/integrations/useSortable'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'

const props = withDefaults(defineProps<{
  attachments: any[]
  nameProperty?: string
  sizeProperty?: string
  srcProperty?: string
  thumbProperty?: string
  mimeTypeProperty?: string
  originalOrderProperty?: string
  orderProperty?: string
  orderChangedProperty?: string
  downloadProperty?: string
  dateProperty?: string
  captionProperty?: string
  sortable?: boolean
}>(), {
  originalOrderProperty: 'order_original',
  orderProperty: 'order',
  orderChangedProperty: 'order_changed',
  captionProperty: 'caption',
  dateProperty: 'date',
  downloadProperty: 'download_url',
  nameProperty: 'file_name',
  mimeTypeProperty: 'mime_type',
  sortable: false,
  sizeProperty: 'size',
  srcProperty: 'original_url',
  thumbProperty: 'thumb_url',
})

const emits = defineEmits<{
  (e: 'sorted', event: { oldIndex: number, newIndex: number, indexesChanges: { [number: number]: number } })
}>()

const { t } = useI18n()

const galleriaRef = ref()

const isVisible = ref(false)
const activeIndex = ref(0)
const showCaption = ref(false)
const windowSize = useWindowSize()
const responsiveOptions = ref([
  {
    breakpoint: '1500px',
    numVisible: 20,
  },
  {
    breakpoint: '1024px',
    numVisible: 10,
  },
  {
    breakpoint: '768px',
    numVisible: 7,
  },
  {
    breakpoint: '560px',
    numVisible: 5,
  },
])

watch(() => isVisible.value, (state) => {
  if (state) {
    window.addEventListener('click', onGalleryMaskClick)
    window.addEventListener('keydown', onGalleryEscKeyboardPress)
  }
  else {
    window.removeEventListener('click', onGalleryMaskClick)
    window.removeEventListener('keydown', onGalleryEscKeyboardPress)
  }
})

function onGalleryMaskClick(event: PointerEvent) {
  if (event.target?.classList.contains('galleriaMaskDismissClass')) {
    isVisible.value = false
  }
}

function onGalleryEscKeyboardPress(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    isVisible.value = false
  }
  else if (event.code === 'ArrowRight') {
    activeIndex.value = Math.min(activeIndex.value + 1, props.attachments.length - 1)
  }
  else if (event.code === 'ArrowLeft') {
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
}

function downloadItem(item) {
  downloadJs(item[props.downloadProperty] ?? item[props.srcProperty])
}

function previewImage(index) {
  activeIndex.value = index
  isVisible.value = true
}

const sortableWrapper = ref<HTMLElement | null>(null)
if (props.sortable) {
  useSortable(sortableWrapper, images, {
    onUpdate(e: { oldIndex: number, newIndex: number }) {
      const smallerIndex = Math.min(e.oldIndex, e.newIndex)
      const largerIndex = Math.max(e.oldIndex, e.newIndex)
      const indexesChanges = {} // Key is old index, value is new index
      moveArrayElement(images.value, e.oldIndex, e.newIndex)
      const toIndex = e.newIndex
      const fromIndex = e.oldIndex

      nextTick(() => {
        images.value.forEach((e, index) => {
          if (index >= smallerIndex || index <= largerIndex) {
            if (images.value[index][props.originalOrderProperty] === undefined) {
              images.value[index][props.originalOrderProperty] = images.value[index][props.orderProperty]
            }
            images.value[index][props.orderProperty] = index
            images.value[index][props.orderChangedProperty] = index !== images.value[index][props.originalOrderProperty]
          }
        })
        for (let i = 0; i < images.value.length; i++) {
          if (i === toIndex) {
            indexesChanges[fromIndex] = toIndex
          }
          else if (i >= smallerIndex && i <= largerIndex) {
            if (fromIndex < toIndex) { // Image moved forward
              indexesChanges[i + 1] = i
            }
            else { // Image moved backward
              indexesChanges[i - 1] = i
            }
          }
        }

        emits('sorted', {
          newIndex: e.newIndex,
          oldIndex: e.oldIndex,
          indexesChanges,
        })
        /* do something */
      })
      // console.log(e)
    },
  } as UseSortableOptions)
}

const windowHeightComputed = computed(() => {
  return windowSize.height.value
})
const windowWidthComputed = computed(() => {
  return windowSize.width.value
})

const hasGalleryThumbnailsNavigationButtons = computed(() => {
  return (windowSize.width.value - 150 - (props.attachments?.length * 55)) < 0
})
const rotate = ref(0)
const zoom = ref(1)
</script>

<template>
  <div>
    <div ref="sortableWrapper" class="flex gap-4 items-stretch p-4">
      <div
        v-for="(image, index) of attachments" :key="index"
        class="size-60px border-inset flex items-center justify-center relative group border-2 p-1 rounded-lg light:border-teal-800 dark:border-teal-200 border-solid"
      >
        <div
          class="absolute inset-0 hidden group-hover:flex hover:visible items-center justify-center light:bg-gray-100/40 dark:bg-gray-900/40 cursor-pointer "
          @click="previewImage(index)"
        >
          <i class="i-mdi:eye light:text-teal-800 dark:text-teal-200" />
        </div>
        <img
          :src="image[thumbProperty]" :alt="image.alt" style="cursor: pointer"
          class="max-w-100% max-h-100% mx-auto my-auto "
        >
      </div>
    </div>
    <Galleria
      v-model:visible="isVisible"
      v-model:activeIndex="activeIndex"
      :value="attachments"
      :responsive-options="responsiveOptions"
      :num-visible="Math.min(attachments.length, 9)"
      container-style="width: 90%"
      :circular="true"
      :full-screen="true"
      :show-item-navigators="true"
      mask-class="galleriaMaskDismissClass"
      :pt="{
        // itemsContainer: 'min-h-[calc(100vh_-_120px)]',
        items: 'min-h-[calc(100vh_-_120px)]',
        item: 'my-auto',
        closeButton: '!absolute z-1',
        previousItemButton: '!fixed rtl:(right-0 left-unset)',
        prevButton: '!fixed rtl:(right-0 left-unset)',
        nextItemButton: '!fixed rtl:(left-0 right-unset)',
        nextButton: '!fixed rtl:(left-0 right-unset)',
      }"
    >
      <template #previousitemicon>
        <i class="rtl:i-mdi-chevron-right ltr:i-mdi-chevron-left text-4xl" />
      </template>
      <template #nextitemicon>
        <i class="rtl:i-mdi-chevron-left ltr:i-mdi-chevron-right text-4xl" />
      </template>
      <template #previousthumbnailicon>
        <i v-if="hasGalleryThumbnailsNavigationButtons" class="rtl:i-mdi-chevron-right ltr:i-mdi-chevron-left text-3xl" />
      </template>
      <template #nextthumbnailicon>
        <i v-if="hasGalleryThumbnailsNavigationButtons" class="rtl:i-mdi-chevron-left ltr:i-mdi-chevron-right text-3xl" />
      </template>
      <template #item="slotProps">
        <div class="relative dark:bg-slate-900/95 light:bg-gray-50/95">
          <slot name="viewerImageIcons" :item="slotProps.item" :active-index="activeIndex" />
          <template v-if="slotProps.item.mime_type === 'application/pdf'">
            <embed
              :src="`${slotProps.item[srcProperty]}#toolbar=1&navpanes=0&scrollbar=1`"
              type="application/pdf"
              frameBorder="0"
              scrolling="auto"
              :height="`${windowHeightComputed - 300}px`"
              :width="`${windowWidthComputed - 150}px`"
            >
          </template>
          <template v-else-if="slotProps.item.mime_type.startsWith('video/')">
            <video width="100%" height="100%" controls>
              <source :src="slotProps.item[srcProperty]" :type="slotProps.item.mime_type">
              Your browser does not support the video tag.
            </video>
          </template>
          <template v-else>
            <img
              :src="slotProps.item[srcProperty]"
              :alt="slotProps.item.name" style="max-width: 100%;max-height: calc(100vh - 130px); display: block"
              @click="showCaption = !showCaption"
            >
          </template>
        </div>
      </template>
      <template #thumbnail="slotProps">
        <div class="relative">
          <img
            :src="slotProps.item[thumbProperty]" :alt="slotProps.item.name"
            class="max-size-50px cursor-pointer border-1 rounded-md border-inset p-1 text-xs dark:border-gray-200 light:border-gray-700"
            style="display: block"
          >
        </div>
      </template>
      <template
        v-if="attachments[activeIndex] && !attachments[activeIndex].mime_type.startsWith('video/') && showCaption"
        #caption="slotProps"
      >
        <div class="grid cols-2 gap-4">
          <div
            v-if="!slotProps.item[captionProperty]" class="overflow-x-clip text-ellipsis text-xs ms-2"
            :title="slotProps.item[nameProperty]"
          >
            {{ slotProps.item[nameProperty] }}
          </div>
          <div class="text-end">
            <span class="text-xs" :title="moment(slotProps.item[dateProperty]).fromNow()">
              {{ moment(slotProps.item[dateProperty]).format("YYYY-MM-DD hh:mm A") }}
            </span>
            <i
              class="i-mdi-download cursor-pointer ms-2 hover:dark:text-blue-300 hover:light:text-blue-400"
              @click="downloadItem(slotProps.item)"
            />
          </div>
        </div>
        <div v-if="slotProps.item[captionProperty]" class="mb-2 font-bold" :title="slotProps.item[nameProperty]">
          {{ slotProps.item[captionProperty] }}
        </div>
      </template>
    </Galleria>
  </div>
</template>

<style lang="scss">
.p-galleria-thumbnail-item.p-galleria-thumbnail-item-current.p-galleria-thumbnail-item-active {
  img {
    border-width: 2px !important;
  }
}
</style>
