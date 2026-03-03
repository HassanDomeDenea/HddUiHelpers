export type MessageData = {
  text: string | null;
  type: string | null;
  sender_id: number;
  receiver_id: number;
  sent_at: string;
  read_at: string | null;
  id: number;
};

export type UserChatData = {
  id: number;
  name: string;
  avatar_url: string | null;
  avatar_thumb_url: string | null;
  unread_count: number;
  last_message: string | null;
};

export type MessageSent = {
  message: MessageData;
  socket: string | null;
};
export type MessagesRead = {
  senderId: number;
  receiverId: number;
  lastSeenSentAt: string;
  readAt: string;
  socket: string | null;
};
