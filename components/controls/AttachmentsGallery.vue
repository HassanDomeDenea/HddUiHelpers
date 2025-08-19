<script setup lang="ts">
import type { UseSortableOptions } from '@vueuse/integrations/useSortable'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import downloadJs from 'downloadjs'
import { get } from 'lodash-es';
import debounce from 'lodash/debounce';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import MediaController from '@/wayfinder/actions/HassanDomeDenea/HddLaravelHelpers/Controllers/MediaController.ts';


type AttachmentModelType = any;

interface TransformationEvent {
    rotation?: number;
}

const props = withDefaults(defineProps<{
  attachments: AttachmentModelType[]
  nameProperty?: string
  sizeProperty?: string
  srcProperty?: string
    idProperty?: string
    descriptionInputPlaceholder?:string,
    withDescription?:boolean,
    withDateInput?:boolean,
    canEditDate?:boolean,
    canEditDescription?:boolean,
    thumbnailSize?: number
  thumbProperty?: string
    hasThumbnails?: boolean
  mimeTypeProperty?: string
  originalOrderProperty?: string
  orderProperty?: string
    autoSubmitChanges?: boolean
  orderChangedProperty?: string
  downloadProperty?: string
  dateProperty?: string
  descriptionProperty?: string
  captionProperty?: string
  sortable?: boolean
  rotateDisabled?: boolean
  zoomable?: boolean
  scalable?: boolean
    toolbarButtons?: boolean,
    savableTransformation?: boolean,
}>(), {
  originalOrderProperty: 'order_original',
  orderProperty: 'order',
    idProperty: 'id',
  orderChangedProperty: 'order_changed',
    descriptionProperty: 'description',
  captionProperty: 'caption',
  dateProperty: 'date',
  downloadProperty: 'download_url',
  nameProperty: 'file_name',
  mimeTypeProperty: 'mime_type',
  sortable: false,
    thumbnailSize: 60,
    hasThumbnails:true,
  sizeProperty: 'size',
  srcProperty: 'original_url',
  thumbProperty: 'thumb_url',
    canEditDate:true,
    canEditDescription:true,
    toolbarButtons:true,
    scalable:true,
    zoomable:true,
})


const emits = defineEmits<{
    sorted: [event: { oldIndex: number, newIndex: number, indexesChanges: { [number: number]: number } }]
    toggled:[state: boolean]
    dateChanged:[file:AttachmentModelType, newDate:string]
    descriptionChanged:[file:AttachmentModelType, newDescription:string]
    transformationApplied: [file: AttachmentModelType, event: TransformationEvent]
    shown:[],
    hidden:[],
    changed:[],
}>()

const {t}=useI18n()
const mainWrapper = useTemplateRef<HTMLDivElement>('mainWrapper')
const loading = defineModel<boolean>('loading',{ default: false })
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

const activeFile = computed<AttachmentModelType|null>(()=>props.attachments[activeIndex.value]);

watch(() => isVisible.value, (state) => {

  if (state) {
    window.addEventListener('click', onGalleryMaskClick)
    window.addEventListener('keydown', onGalleryKeyboardPress)
      emits('shown')
  }
  else {
    window.removeEventListener('click', onGalleryMaskClick)
    window.removeEventListener('keydown', onGalleryKeyboardPress)
      emits('hidden')
  }
  emits('toggled',state)
})

watch(activeIndex,()=>{
    function resetTransformation();
    scale.value= 1;
})

function onGalleryMaskClick(event: PointerEvent) {
    const target = event.target as Element | null;
    if (target?.classList.contains('galleriaMaskDismissClass')) {
        isVisible.value = false;
    }
}

function onGalleryKeyboardPress(event: KeyboardEvent) {

    if (event.code === 'Escape') {
    isVisible.value = false
        return;
  }
    const direction = getComputedStyle(mainWrapper.value).direction;
    const isRtl = direction === 'rtl'

    if (event.code === 'ArrowRight') {
    if(isRtl){
        moveToPrevious()
    } else {
        moveToNext()
    }
  }
  else if (event.code === 'ArrowLeft') {
        if(isRtl) {
            moveToNext()
        }
        else {
            moveToPrevious()
        }
  }
}

function moveToNext(){
    previewImage(Math.min(activeIndex.value + 1, props.attachments.length - 1))
}

function moveToPrevious(){
    previewImage(Math.max(activeIndex.value - 1, 0))
}

function downloadItem(item) {
  downloadJs(item[props.downloadProperty] ?? item[props.srcProperty])
}

function previewImage(index) {
  activeIndex.value = index;
  isVisible.value = true;
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
const scale = ref(1)

function resetTransformation(){
    imageTransformationsApplied.value=false
    rotate.value= 0;
}


const imageTransformationStyle = computed(()=> {
    return {transition:'transform 0.15s', transform: 'rotate(' + rotate.value + 'deg) scale(' + scale.value + ')' };
})
const imageIsRotate = computed(()=>{
    return rotate.value % 360 !== 0;
})
const isZoomOutDisabled = computed(()=>{
    return scale.value <= 0.5;
})
const isZoomInDisabled = computed(()=>{
    return scale.value >= 1.5;
})
const imageTransformationsApplied = ref(false)
function rotateRight(){
    rotate.value += 90;
    imageTransformationsApplied.value=true;
}
function rotateLeft(){
    rotate.value -= 90;
    imageTransformationsApplied.value=true;
}
function zoomOut(){
scale.value-=0.1;
    imageTransformationsApplied.value=true;

}
function zoomIn(){
scale.value+=0.1;
    imageTransformationsApplied.value=true;

}
function close(){
    isVisible.value = false;
}

// Update file properties

const apiClient = useApiClient();
function onFileDateUpdated(file: AttachmentModelType,newDate:string){
    if(props.canEditDate){
        if(props.autoSubmitChanges && file[props.idProperty]){
            loading.value=true
            apiClient.request({
                ...MediaController.updateDate(file[props.idProperty],),
                data: {
                    date: newDate
                }
            })
                .then(() => {
                    emits('dateChanged',file,newDate)
                    emits('changed')
                })
                .catch(apiClient.toastRequestError)
                .finally(()=>{
                    loading.value = false;
                })
        }else{
            emits('dateChanged',file,newDate)
        }
    }
}
// Update date
const onFileDescriptionUpdated = debounce(function (file: AttachmentModelType,newDescription:string){
    if(props.canEditDescription){
        if(props.autoSubmitChanges && file[props.idProperty]){
            loading.value=true
            apiClient.request({
                ...MediaController.updateDescription(file[props.idProperty],),
                data: {
                    description: newDescription
                }
            })
                .then(() => {
                    emits('descriptionChanged',file,newDescription)
                    emits('changed')
                })
                .catch(apiClient.toastRequestError)
                .finally(()=>{
                    loading.value = false;
                })
        }else{
            emits('descriptionChanged',file,newDescription)
        }
    }
},500)

function saveManipulations(file: AttachmentModelType){
    if(props.savableTransformation){

        let newRotation = rotate.value % 360;
        if(newRotation < 0){
            newRotation = 360 - newRotation;
        }
        const payload: TransformationEvent = {
            rotation: rotate.value % 360
        };
            if(props.autoSubmitChanges && file[props.idProperty]){
                loading.value=true
                apiClient.request({
                    ...MediaController.manipulate(file[props.idProperty],),
                    data: payload
                })
                    .then(() => {
                        resetTransformation()
                        emits('transformationApplied',file,payload)
                        emits('changed')
                    })
                    .catch(apiClient.toastRequestError)
                    .finally(()=>{
                        loading.value = false;
                    })
            }else{
                emits('transformationApplied',file,payload)
            }
    }
}


defineExpose({resetTransformation})
</script>

<template>
  <div ref="mainWrapper">
    <div ref="sortableWrapper" class="flex gap-4 items-stretch p-4 flex-wrap">
        <template  v-for="(image, index) of attachments" :key="index">
         <div :style="{width: (thumbnailSize || 60)+'px'}" class="space-y-2">
             <div
                 class="border-inset flex items-center justify-center relative group border-2 p-1 rounded-lg light:border-teal-800 dark:border-teal-200 border-solid"
                 :style="{width: (thumbnailSize || 60)+'px', height: (thumbnailSize || 60)+'px'}"
             >
                 <div
                     class="absolute inset-0 hidden group-hover:flex hover:visible items-center justify-center light:bg-gray-100/45 dark:bg-gray-900/45 cursor-pointer "
                     @click="previewImage(index)"
                 >
                     <i class="i-mdi:eye light:text-teal-700 dark:text-teal-200" :style="{fontSize: Math.max((thumbnailSize || 60) / 5, 12)+'px'}" />
                 </div>
                 <div v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 z-100">
                     <Skeleton class="!w-full !h-full"></Skeleton>
                 </div>
                 <img
                     :src="image[hasThumbnails ? thumbProperty : srcProperty]" :alt="image.alt" style="cursor: pointer"
                     class="max-w-100% max-h-100% mx-auto my-auto "
                 >
             </div>
             <div v-if="withDescription">
                 <TextAreaInput
:model-value="get(image,descriptionProperty)" :placeholder="descriptionInputPlaceholder ?? t('Description')" :initial-rows="1"
                                @update:model-value="onFileDescriptionUpdated(image,$event)"/>
             </div>
             <div v-if="withDateInput">
                 <DatePickerInput
                     size="small" :clearable="false" :model-value="get(image,dateProperty)" :disabled="!canEditDate"
                 @update:model-value="onFileDateUpdated(image,$event)"/>
             </div>
         </div>
        </template>
        <div
v-if="loading"
            class="border-inset flex items-center justify-center relative group border-2 p-1 rounded-lg light:border-teal-800/50 dark:border-teal-200/50 border-dashed"
            :style="{width: (thumbnailSize || 60)+'px', height: (thumbnailSize || 60)+'px'}">
            <div class="w-full h-full space-y-1">
                <Skeleton style="height: 65%"></Skeleton>
                <Skeleton style="height: 15%"></Skeleton>
                <Skeleton style="height: 15%"></Skeleton>
            </div>
        </div>

    </div>
    <Galleria
      v-model:visible="isVisible"
      v-model:active-index="activeIndex"
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
        closeButton: toolbarButtons ? '!hidden' : '!absolute z-10',
        // previousItemButton: '!fixed rtl:(right-0 left-unset)',
        // prevButton: '!fixed rtl:(right-0 left-unset)',
        // nextItemButton: '!fixed rtl:(left-0 right-unset)',
        // nextButton: '!fixed rtl:(left-0 right-unset)',
      }"
    >
        <template #header>
            <div v-if="toolbarButtons" class="rounded-4xl px-3 absolute top-1 z-1 right-1  py-1 border-1 border-gray-700 dark:border-gray-300 bg-gray-100/50 dark:bg-gray-900/50 inline-block space-y-1 backdrop-blur-sm">
                <div class="flex gap-2 items-center">
                    <Button rounded severity="contrast" variant="text" icon="i-fa7-solid:times  " @click="close"></Button>
                    <Button v-if="scalable" rounded severity="contrast" variant="text" icon="i-fa7-solid:rotate-right" @click="rotateRight"></Button>
                    <Button v-if="scalable" rounded severity="contrast" variant="text" icon="i-fa7-solid:rotate-left"  @click="rotateLeft"></Button>
                    <Button v-if="zoomable" rounded severity="contrast" variant="text" :disabled="isZoomOutDisabled" icon="i-fa:search-minus" @click="zoomOut"></Button>
                    <Button v-if="zoomable" rounded severity="contrast" variant="text" :disabled="isZoomInDisabled" icon="i-fa:search-plus" @click="zoomIn"></Button>
                </div>
                <div v-if="savableTransformation && imageTransformationsApplied && (imageIsRotate)" class="flex justify-center">
                    <Button
icon="i-material-symbols:save-rounded" variant="outlined" rounded :label="t('Save Changes')" size="small"
                    @click="saveManipulations(activeFile)"></Button>
                </div>
            </div>
        </template>
<!--      <template #previousitemicon>
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
      </template>-->
      <template #item="slotProps">
        <div class="relative dark:bg-slate-900/95 light:bg-gray-50/95" :style="imageTransformationStyle">
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
            :src="slotProps.item[hasThumbnails ? thumbProperty : srcProperty]" :alt="slotProps.item.name"
            class="max-w-50px max-h-50px cursor-pointer border-1 rounded-md border-inset p-1 text-xs dark:border-gray-200 light:border-gray-700"
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
    //border-width: 2px !important;
  }
}
</style>
