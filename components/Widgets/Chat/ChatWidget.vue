<script setup lang="ts">
import { ApiResponseData, MessageData, MessagesRead, UserChatData } from '@/types/laravel_generated'
import MessageController from '@/wayfinder/actions/App/Http/Controllers/MessageController.ts'
import { echo } from '@laravel/echo-vue'
import { vInfiniteScroll } from '@vueuse/components'
import TextAreaInput from 'HddUiHelpers/components/inputs/TextAreaInput.vue'
import ChatMessageSegment from 'HddUiHelpers/components/Widgets/Chat/ChatMessageSegment.vue'
import { useLoader } from 'HddUiHelpers/composables/loader.ts'
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts'
import { useBasicAuthStore } from 'HddUiHelpers/stores/basicAuth.ts'
import { useDimensionsStore } from 'HddUiHelpers/stores/dimensions.ts'
import { last, sumBy } from 'lodash-es'
import debounce from 'lodash/debounce'
import moment from 'moment/moment'
import { ButtonProps } from 'primevue'
import { ComponentExposed } from 'vue-component-type-helpers'
import notifMessageSound from '../../../assets/audios/notify-352705.mp3'
const { t } = useI18n()
const contactsLoader = useLoader()
const messagesLoader = useLoader()
const sendingMessageLoader = useLoader()
const apiClient = useApiClient()
const { severity = 'success', size = 'small' } = defineProps<{
  size?: ButtonProps['size']
  severity?: ButtonProps['severity']
}>()
const newMessageTextRef =
  useTemplateRef<ComponentExposed<typeof TextAreaInput>>('newMessageTextRef')
const newMessageText = ref('')
const messagesContainerRef = useTemplateRef<HTMLDivElement>('messagesContainerRef')
const loadMoreDivRef = useTemplateRef<HTMLDivElement>('loadMoreDivRef')
const isVisible = ref(false)
const dimensions = useDimensionsStore()
const activeContact = ref<UserChatData>()
const contacts = ref<UserChatData[]>([])
const authStore = useBasicAuthStore()

const onlineUsers = computed(() => {
  return authStore.connectedUsers.reduce(
    (acc, user) => {
      acc[user.name] = true
      return acc
    },
    {} as Record<string, boolean>
  )
})
function loadContacts() {
  contactsLoader.startLoading()
  apiClient
    .request<ApiResponseData<UserChatData[]>>(MessageController.contacts())
    .then((response) => {
      contacts.value = response.data.data
    })
    .catch(apiClient.toastRequestError)
    .finally(contactsLoader.endLoading)
}

const messages = ref<MessageData[]>([])
const totalMessagesCount = ref(0)

function getLastMessageToLoadFromParameters() {
  const sentAt = last(messages.value)?.sent_at
  if (!sentAt) {
    return undefined
  }
  return {
    sent_at: sentAt,
    excluded_ids: messages.value
      .filter((e) => e.sent_at === sentAt)
      .map((i) => i.id)
      .join(','),
  }
}

async function loadMessages(fromLastMessage: boolean = false) {
  if (!activeContact.value) {
    return
  }
  if (!fromLastMessage) {
    if (!messagesLoader.isLoadedOnce) {
      messages.value = []
      totalMessagesCount.value = 0
    } else {
      setTimeout(() => {
        gotToEnd()
        newMessageTextRef.value?.focus()
      }, 1)
    }
  }
  messagesLoader.startLoading()
  return apiClient
    .request<ApiResponseData<{ messages: MessageData[]; total_count: number }>>(
      MessageController.index(
        { friend: activeContact.value.id },
        {
          query: {
            from_last_message: fromLastMessage ? getLastMessageToLoadFromParameters() : null,
          },
        }
      )
    )
    .then((response) => {
      if (fromLastMessage) {
        messages.value.push(...response.data.data.messages)
      } else {
        messages.value = response.data.data.messages
        totalMessagesCount.value = response.data.data.total_count
        setTimeout(() => {
          gotToEnd()
          newMessageTextRef.value?.focus()
        }, 1)
      }
    })
    .catch(apiClient.toastRequestError)
    .finally(messagesLoader.endLoading)
}

function onContactClick(contact: UserChatData) {
  activeContact.value = isActiveContact(contact) ? undefined : contact
  if (activeContact.value) {
    loadMessages()
  }
}

function isActiveContact(contact: UserChatData) {
  return activeContact.value?.id === contact.id
}

function onShow() {
  loadContacts()
  if (activeContact.value) {
    loadMessages()
  }
}

function onNewMessageKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && newMessageText.value) {
    newMessageText.value = ''
    event.preventDefault()
    event.stopPropagation()
  }
  if (event.key === 'Enter') {
    if (!event.shiftKey && newMessageText.value) {
      sendMessage()
      event.preventDefault()
      event.stopPropagation()
    }
  }
}

function sendMessage() {
  if (!newMessageText.value || !activeContact.value?.id) {
    return
  }
  sendingMessageLoader.startLoading()
  apiClient
    .request<ApiResponseData<MessageData>>(
      MessageController.store({ friend: activeContact.value.id }),
      {
        text: newMessageText.value,
      }
    )
    .then((response) => {
      newMessageText.value = ''
      messages.value.unshift(response.data.data)
      totalMessagesCount.value++
      setTimeout(() => {
        gotToEnd(false)
        newMessageTextRef.value?.focus()
      }, 1)
    })
    .catch(apiClient.toastRequestError)
    .finally(sendingMessageLoader.endLoading)
}
const isLoadingMore = ref(false)
async function onMessagesLoadMore() {
  isLoadingMore.value = true
  await loadMessages(true)
  isLoadingMore.value = false
}
const canLoadMoreMessagesCallable = () => {
  return messages.value.length < totalMessagesCount.value
}

const loadMoreDivRefIsVisible = useElementVisibility(loadMoreDivRef, {
  threshold: 0.9,
})

function gotToEnd(toFirstUnseen = true) {
  const element = messagesContainerRef.value
  const firstUnseenMessage = toFirstUnseen ? element?.querySelector("[data-unread='true']") : null
  if (element) {
    if (firstUnseenMessage) {
      firstUnseenMessage.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    } else {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'instant',
      })
    }
  }
}

const playNotificationSound = () => {
  const audio = new Audio(notifMessageSound)

  audio.play().catch((error) => {
    console.warn('Sound blocked by browser policy:', error)
  })
}

const drawerMainRef = useTemplateRef('drawerMainRef')
const drawerMainSize = useElementSize(drawerMainRef, undefined, { box: 'border-box' })
const reversedMessages = computed(() => messages.value.toReversed())

onMounted(() => {
  loadContacts()
  if (authStore.user) {
    echo()
      .private('chat.' + authStore.user.id)
      .listen('MessageSent', function (event: { message: MessageData }) {
        if (isVisible.value === true && activeContact.value?.id === event.message.sender_id) {
          messages.value.unshift(event.message)
          totalMessagesCount.value++
          setTimeout(gotToEnd, 1)
        } else {
          playNotificationSound()
          const contactIndex = contacts.value.findIndex((e) => e.id === event.message.sender_id)
          if (contactIndex > -1) {
            contacts.value[contactIndex].unread_count =
              contacts.value[contactIndex].unread_count + 1
          }
        }
      })
      .listen('MessagesRead', function (event: MessagesRead) {
        if (activeContact.value?.id === event.receiverId) {
          messages.value = messages.value.map((message) => {
            if (
              !message.read_at &&
              message.receiver_id === event.receiverId &&
              message.sent_at <= event.lastSeenSentAt
            ) {
              message.read_at = event.readAt
            }
            return message
          })
        }
      })
  }
})
onUnmounted(() => {
  if (authStore.user) {
    echo().leave('chat.' + authStore.user?.id)
  }
})

const newestSeenMessage = ref<MessageData>()
const markMessagesAsSeen = debounce(() => {
  if (!newestSeenMessage.value || !activeContact.value) {
    return
  }
  apiClient
    .request(
      MessageController.markAsRead({
        friend: activeContact.value,
      }),
      {
        last_seen_sent_at: newestSeenMessage.value.sent_at,
      }
    )
    .then(() => {
      const now = moment().format('YYYY-MM-DD HH:mm:ss')
      const seenAt = newestSeenMessage.value?.sent_at
      newestSeenMessage.value = undefined
      let newSeenCount = 0
      messages.value = messages.value.map((message) => {
        if (
          seenAt &&
          !message.read_at &&
          message.sender_id === activeContact.value?.id &&
          message.sent_at <= seenAt
        ) {
          message.read_at = now
          newSeenCount++
        }
        return message
      })
      if (activeContact.value) {
        activeContact.value.unread_count = activeContact.value?.unread_count - newSeenCount
      }
    })
}, 1_000)
function onMessageSeen(message: MessageData) {
  if (!newestSeenMessage.value) {
    newestSeenMessage.value = message
    markMessagesAsSeen()
  } else if (message.sent_at > newestSeenMessage.value.sent_at) {
    newestSeenMessage.value = message
    markMessagesAsSeen()
  }
}

const totalUnread = computed(() => sumBy(contacts.value, 'unread_count'))
</script>

<template>
  <div>
    <div class="relative">
      <Button
        v-tooltip="t('Messenger')"
        icon="i-bi:chat-text scale-80"
        :severity
        rounded
        :size
        @click="isVisible = !isVisible"
      />
      <Badge
        v-if="totalUnread > 0"
        :value="totalUnread"
        size="small"
        severity="info"
        class="animate__animated animate__flash animate__slow animate__infinite absolute start-0 top-0 -ms-2 -mt-2"
      />
    </div>
    <Drawer
      v-model:visible="isVisible"
      :style="{ width: 'min(480px, 95vw)' }"
      :modal="false"
      :pt="{
        root: {
          style: {
            background: 'unset',
          },
        },
        mask: {
          style: {
            height: `calc(100dvh - ${dimensions.botFooterHeight}px)`,
          },
        },
      }"
      @show="onShow"
    >
      <template #container="{ closeCallback }">
        <div class="z-1 absolute -bottom-4 end-3">
          <i class="i-raphael:arrowdown text-zinc-400 dark:text-zinc-600"></i>
        </div>
        <Card
          class="!bg-minimal-gray border-1 relative m-1 h-full rounded-es-lg rounded-ss-lg border-zinc-400 dark:border-zinc-600"
          :pt="{
            body: {
              class: '!px-1 flex-1 overflow-hidden',
            },
            content: {
              class: 'h-full',
            },
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="text-success-2 ms-4 text-xl font-bold">{{ t('Messenger') }}</div>
              <Button
                icon="i-mdi:close"
                class=""
                plain
                text
                severity="secondary"
                @click="closeCallback"
              />
            </div>
          </template>
          <template #content>
            <div ref="drawerMainRef" class="relative grid h-full grid-cols-4 items-stretch">
              <div
                class="drawer-contrast-border-color col-span-1 flex h-full flex-col items-center overflow-y-auto border-e-0 border-zinc-500"
                :style="{ maxHeight: drawerMainSize.height + 'px' }"
              >
                <span class="underline-offset-5 underline">{{ t('Users') }}:</span>
                <ProgressSpinner
                  v-if="toValue(contactsLoader.isLoading) && !toValue(contactsLoader.isLoadedOnce)"
                  class="!mt-4 !size-8"
                />
                <div v-else class="w-full px-1 pt-1">
                  <template v-for="contact in contacts" :key="contact.id">
                    <div
                      v-tooltip="contact.name"
                      class="relative flex cursor-pointer select-none flex-col items-center rounded-lg px-5 py-1"
                      :class="{
                        'bg-blue-300/35 dark:bg-sky-700/35': isActiveContact(contact),
                        'hover:bg-gray-300/35 hover:dark:bg-zinc-600/35': !isActiveContact(contact),
                      }"
                      @click="onContactClick(contact)"
                    >
                      <div
                        v-if="isActiveContact(contact)"
                        class="z-1000 pointer-events-none absolute -left-1 bottom-0 top-0 flex items-center"
                      >
                        <i
                          class="i-fluent-diamond-16-filled text-sm text-blue-300/55 dark:text-sky-700/55"
                        ></i>
                      </div>
                      <div class="relative">
                        <Avatar
                          :image="contact.avatar_thumb_url || undefined"
                          :icon="!contact.avatar_thumb_url ? 'i-mdi-user' : undefined"
                          shape="circle"
                          size="large"
                          class="shadow shadow-black"
                        />
                        <i
                          v-if="onlineUsers[contact.name]"
                          class="i-stash-circle-dot-duotone absolute -bottom-1 -end-1 text-xl text-green-600"
                        ></i>
                        <!--TODO: Remove false-->
                        <i
                          v-if="contact?.unread_count && contact?.unread_count > 0"
                          v-tooltip.bottom="t('There are new messages')"
                          class="i-icon-park-outline-dot animate__animated animate__flash animate__slow animate__infinite absolute -bottom-1 -start-1 text-xl text-blue-600"
                        ></i>
                      </div>
                      <div
                        class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center"
                      >
                        {{ contact.name }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="col-span-3 h-full p-1">
                <div
                  class="border-1 h-full rounded-md border-dashed border-zinc-400 bg-zinc-300/50 text-center dark:border-zinc-500 dark:bg-zinc-900/50"
                  :class="{
                    'border-b-0':
                      activeContact &&
                      !toValue(messagesLoader.isLoading) &&
                      !toValue(messagesLoader.isLoadedOnce),
                  }"
                >
                  <div v-if="!activeContact" class="font-italic text-muted block p-1">
                    {{ t('Please select a chat') }}
                  </div>
                  <div v-else class="h-full">
                    <ProgressSpinner
                      v-if="
                        toValue(messagesLoader.isLoading) && !toValue(messagesLoader.isLoadedOnce)
                      "
                      class="!mt-4 !size-8"
                    />
                    <div
                      v-else
                      class="flex flex-col"
                      :style="{ maxHeight: `calc(${toValue(drawerMainSize.height)}px - 0.75rem)` }"
                    >
                      <div
                        ref="messagesContainerRef"
                        v-infinite-scroll="[
                          onMessagesLoadMore,
                          {
                            distance: 10,
                            throttle: 100,
                            interval: 100,
                            direction: 'top',
                            canLoadMore: canLoadMoreMessagesCallable,
                            behavior: 'smooth',
                          },
                        ]"
                        class="flex flex-1 flex-col-reverse overflow-y-auto"
                      >
                        <template v-for="message in messages" :key="message.id">
                          <ChatMessageSegment :message :active-contact @seen="onMessageSeen" />
                        </template>
                        <div
                          v-if="isLoadingMore"
                          ref="loadMoreDivRef"
                          class="text-muted font-italic text-sm"
                        >
                          {{ t('Is Loading') }}
                        </div>
                      </div>
                      <div class="mt-1 flex">
                        <div class="flex-1">
                          <IftaLabel>
                            <TextAreaInput
                              ref="newMessageTextRef"
                              v-model="newMessageText"
                              unique-id="newMessageTextAreaId"
                              :readonly="toValue(sendingMessageLoader.isLoading)"
                              :auto-resize="false"
                              no-resize
                              :initial-rows="2"
                              @keydown="onNewMessageKeyDown"
                            />
                            <label class="z-1" for="newMessageTextAreaId"
                              >{{ t('New Message') }}:</label
                            >
                          </IftaLabel>
                        </div>
                        <div class="flex flex-col justify-end">
                          <Button
                            severity="info"
                            :disabled="!newMessageText"
                            :loading="toValue(sendingMessageLoader.isLoading)"
                            :title="t('Send Message')"
                            outlined
                            icon="i-mdi:send rtl:rotate-180"
                            @click="sendMessage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Drawer>
  </div>
</template>

<style scoped lang="scss">
.drawer-contrast-border-color {
  @apply border-zinc-400 dark:border-zinc-600;
}
</style>
