import { FC, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ChatList } from "../components/ChatList";
import { Form } from "../components/Form";
import { MessageList } from "../components/MessageList/MessageList";
import { Chat, Message, Messages, AUTHOR } from "../types";

interface ChatPageProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  messages: Messages;
  onAddMessage: (chatId: string, msg: Message) => void;
}


export const ChatPage: FC<ChatPageProps> = ({ chats, onAddChat, messages, onAddMessage }) => {
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHOR.USER
    ) {
      setTimeout(() => {
        onAddMessage(chatId, {
          text: 'Hello, Human!', author: AUTHOR.BOT
        });
      }, 1500);
    }
  }, [chatId, messages, onAddMessage]);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />
  }
  return <>
    <ChatList chats={chats} onAddChat={onAddChat} />
    <MessageList messages={chatId ? messages[chatId] : []} />
    <Form addMessage={onAddMessage} />
  </>
};