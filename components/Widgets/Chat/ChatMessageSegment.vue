<script setup lang="ts">
import { MessageData, UserChatData } from '@/types/laravel_generated'
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts'
import moment from 'moment/moment'
const authStore = useBasicAuthStore()
const { message, activeContact } = defineProps<{
  message: MessageData
  activeContact: UserChatData
}>()
const emits = defineEmits<{
  seen: [message: MessageData]
}>()
const { t } = useI18n()
const mainMessageRef = useTemplateRef<HTMLDivElement>('mainMessageRef')
const currentUserId = computed(() => authStore.user?.id)
const isSender = computed(() => message.sender_id === currentUserId.value)
const now = useNow({
  interval: 5_000,
})
const avatarUrl = computed(() => {
  return isSender.value ? authStore.user?.avatar_thumb_url : activeContact?.avatar_thumb_url
})
const today = computed(() => moment(now.value).format('YYYY-MM-DD'))
const yesterday = computed(() => moment(now.value).subtract(1, 'day').format('YYYY-MM-DD'))
const messageTimestampString = computed(() => {
  const messageMoment = moment(message.sent_at)
  if (Math.abs(messageMoment.diff(now.value, 'hours')) < 13) {
    return {
      date: messageMoment.locale(t('lang_code')).fromNow(),
      time: '',
    }
  }
  const messageDate = messageMoment.format('YYYY-MM-DD')
  let dateStmt = ''
  if (today.value === messageDate) {
    dateStmt = t('Today')
  } else if (yesterday.value === messageDate) {
    dateStmt = t('Yesterday')
  } else {
    dateStmt = messageDate
  }
  return {
    date: dateStmt,
    time: messageMoment.format('HH:mm A'),
  }
})
if (!isSender.value && !message.read_at) {
  const targetIsVisible = useElementVisibility(mainMessageRef, {
    once: true,
    threshold: 0.9,
    // rootMargin: '0px 0px 100px 0px',
  })
  watchOnce(targetIsVisible, (value) => {
    if (value === true) {
      emits('seen', message)
    }
  })
}
</script>

<template>
  <div
    class="m-1 flex gap-x-2 rounded-lg p-1"
    :class="{
      'me-8 bg-blue-700/75 text-white dark:bg-blue-900/75': isSender,
      'border-1 ms-8 flex-row-reverse border-gray-400/55 bg-gray-100/45 dark:border-gray-500/55 dark:bg-gray-800/45':
        !isSender,
    }"
  >
    <div>
      <Avatar
        :image="avatarUrl || undefined"
        :icon="avatarUrl ? undefined : 'i-mdi-user'"
        class="shadow-zinc shadow"
        shape="circle"
      />
    </div>
    <div class="flex-grow-1 text-start">
      <div
        class="text-secondary-3 text-sm"
        :class="{
          'text-gray-200 dark:text-gray-300': isSender,
          'text-end font-bold text-blue-700 dark:text-blue-300': !isSender,
        }"
      >
        {{ isSender ? authStore.user?.name : activeContact.name }}
      </div>
      <div
        ref="mainMessageRef"
        :data-unread="!isSender && !message.read_at"
        class="whitespace-pre-wrap text-start"
        dir="auto"
        v-text="message.text"
      />
      <div
        class="mt-2 flex items-center justify-end gap-1 text-xs"
        :class="{
          'flex-row-reverse text-blue-500 dark:text-blue-200': !isSender,
          'text-gray-200 dark:text-gray-300': isSender,
        }"
      >
        <div class="dir-ltr flex items-center gap-1">
          <span class="inline-block" v-text="messageTimestampString.date" />
          <span class="inline-block text-[0.675rem]" v-text="messageTimestampString.time" />
        </div>
        <i
          v-if="isSender && message.read_at"
          :title="message.read_at"
          class="i-mdi-check-all mb-1px inline-block text-green-300 dark:text-green-500"
        ></i>
        <i class="i-mdi-clock-outline mb-1px inline-block pe-1" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
