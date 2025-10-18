<script setup lang="ts">
import { usePrimeVue } from 'primevue';
import {
  type ConfirmDialogWithInputConfirmationOptions,
  type ConfirmDialogWithInputEventBus,
  ConfirmDialogWithInputKey,
} from './confirmDialogWithInputUtilities.ts';

defineProps<{
  draggable?: boolean;
  breakpoints?: any;
}>();

const bus = useEventBus(ConfirmDialogWithInputKey);
const visible = ref(false);
const inputValue = ref([]);
const primeVue = usePrimeVue();
const inputRef = useTemplateRef('inputRef');
const confirmation = ref<ConfirmDialogWithInputConfirmationOptions>(null);

function busListener({ event, options }: ConfirmDialogWithInputEventBus) {
  if (event === 'show') {
    window.document.addEventListener('keydown', onEscapeKeydown, { capture: true });

    confirmation.value = options;
    inputValue.value = Array.isArray(options.initialValue) ? options.initialValue : [options.initialValue];
    visible.value = true;
    setTimeout(() => {
      inputRef.value?.[0]?.focus?.();
    }, 300);
  } else if (event === 'hide') {
    visible.value = false;
  }
}

onMounted(() => {
  bus.on(busListener);
});

onBeforeUnmount(() => {
  bus.off(busListener);
});

const appendTo = computed(() => (confirmation.value ? confirmation.value.appendTo : 'body'));
// const target = computed(() => (confirmation.value ? confirmation.value.target : null));
const modal = computed(() => (confirmation.value ? (confirmation.value.modal == null ? true : confirmation.value.modal) : true));
const header = computed(() => (confirmation.value ? confirmation.value.header : null));
const message = computed(() => (confirmation.value ? confirmation.value.message : null));
const blockScroll = computed(() => (confirmation.value ? confirmation.value.blockScroll : true));
const position = computed(() => (confirmation.value ? confirmation.value.position : null));
const acceptLabel = computed(() =>
  confirmation.value
    ? confirmation.value.acceptLabel || confirmation.value.acceptProps?.label || primeVue.config.locale.accept
    : primeVue.config.locale.accept,
);
const rejectLabel = computed(() =>
  confirmation.value
    ? confirmation.value.rejectLabel || confirmation.value.rejectProps?.label || primeVue.config.locale.reject
    : primeVue.config.locale.reject,
);
const acceptIcon = computed(() =>
  confirmation.value ? confirmation.value.acceptIcon : confirmation.value?.acceptProps ? confirmation.value.acceptProps.icon : null,
);
const rejectIcon = computed(() =>
  confirmation.value ? confirmation.value.rejectIcon : confirmation.value?.rejectProps ? confirmation.value.rejectProps.icon : null,
);
const autoFocusAccept = computed(() => confirmation.value?.defaultFocus === undefined || confirmation.value?.defaultFocus === 'accept');
const autoFocusReject = computed(() => confirmation.value?.defaultFocus === 'reject');
const closeOnEscape = computed(() => confirmation.value?.closeOnEscape ?? true);

function accept() {
  if (confirmation.value.accept) {
    confirmation.value.accept(isMultiInputsConfirmation.value ? inputValue.value : inputValue.value[0]);
  }

  visible.value = false;
}

function reject() {
  if (confirmation.value.reject) {
    confirmation.value.reject();
  }

  visible.value = false;
}

function onHide() {
  window.document.removeEventListener('keydown', onEscapeKeydown, { capture: true });
  if (confirmation.value.onHide) {
    confirmation.value.onHide();
  }
}

function onEscapeKeydown(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (closeOnEscape.value) {
      visible.value = false;
    }
  }
}

const isMultiInputsConfirmation = computed(() => confirmation.value?.inputsCount > 1);

const inputsProps = computed(() => {
  return Array.isArray(confirmation.value.inputProps) ? confirmation.value.inputProps : [confirmation.value.inputProps];
});
const inputsType = computed(() => {
  return Array.isArray(confirmation.value.inputType) ? confirmation.value.inputType : [confirmation.value.inputType];
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :modal="modal"
    :header="header"
    :block-scroll="blockScroll"
    :append-to="appendTo"
    :position="position"
    :breakpoints="breakpoints"
    :close-on-escape="closeOnEscape"
    :draggable="draggable"
    dismissable-mask
    @hide="onHide"
  >
    <template v-if="$slots.container" #container="slotProps">
      <slot name="container" :message="confirmation" :close-callback="slotProps.closeCallback" :accept-callback="accept" :reject-callback="reject" />
    </template>
    <template v-if="!$slots.container">
      <template v-if="!$slots.message">
        <slot name="icon">
          <component :is="$slots.icon" v-if="$slots.icon" />
          <span v-else-if="confirmation.icon" :class="[confirmation.icon]" />
        </slot>
        <span>{{ message }}</span>
      </template>
      <component :is="$slots.message" v-else :message="confirmation"></component>
    </template>

    <div class="mt-3 space-y-3">
      <template v-for="(inputItem, inputItemIndex) in confirmation.inputsCount ?? 1" :key="inputItemIndex">
        <template v-if="!inputsType[inputItemIndex] || inputsType[inputItemIndex] === 'text'">
          <TextInput ref="inputRef" v-model="inputValue[inputItemIndex]" v-bind="inputsProps[inputItemIndex]" @keydown.enter.prevent="accept" />
        </template>
        <template v-else-if="inputsType[inputItemIndex] === 'number'">
          <NumberInput ref="inputRef" v-model="inputValue[inputItemIndex]" v-bind="inputsProps[inputItemIndex]" @keydown.enter.prevent="accept" />
        </template>
        <template v-else-if="inputsType[inputItemIndex] === 'math'">
          <MathInput ref="inputRef" v-model="inputValue[inputItemIndex]" v-bind="inputsProps[inputItemIndex]" @keydown.enter.prevent="accept" />
        </template>
        <template v-else-if="inputsType[inputItemIndex] === 'textarea'">
          <TextAreaInput
            ref="inputRef"
            v-model="inputValue[inputItemIndex]"
            v-bind="inputsProps[inputItemIndex]"
            @keydown.ctrl.enter.prevent="accept"
          />
        </template>
        <template v-else-if="inputsType[inputItemIndex] === 'date'">
          <DatePickerInput ref="inputRef" v-model="inputValue[inputItemIndex]" v-bind="inputsProps[inputItemIndex]" />
        </template>
        <template v-else-if="inputsType[inputItemIndex] === 'text_only'">
          <div
            v-html="
              typeof inputsProps[inputItemIndex]?.formatter === 'function'
                ? inputsProps[inputItemIndex]?.formatter(inputValue)
                : (inputsProps[inputItemIndex]?.value ?? null)
            "
          ></div>
        </template>
      </template>
    </div>
    <template v-if="!$slots.container" #footer>
      <Button
        :class="[confirmation.rejectClass]"
        :autofocus="autoFocusReject"
        :text="confirmation.rejectProps?.text || false"
        severity="secondary"
        v-bind="confirmation.rejectProps"
        :label="rejectLabel"
        @click="reject()"
      >
        <template v-if="rejectIcon || $slots.rejecticon" #icon="iconProps">
          <slot name="rejecticon">
            <span :class="[rejectIcon, iconProps.class]" />
          </slot>
        </template>
      </Button>
      <Button
        :label="acceptLabel"
        :class="[confirmation.acceptClass]"
        :autofocus="autoFocusAccept"
        v-bind="confirmation.acceptProps"
        @click="accept()"
      >
        <template v-if="acceptIcon || $slots.accepticon" #icon="iconProps">
          <slot name="accepticon">
            <span :class="[acceptIcon, iconProps.class]" data-pc-section="acceptbuttonicon" />
          </slot>
        </template>
      </Button>
    </template>
  </Dialog>
</template>

<style scoped></style>
