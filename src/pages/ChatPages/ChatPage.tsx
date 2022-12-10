import { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ChatList } from '../../components/ChatList';
import { Form } from '../../components/Form';
import { MessageList } from '../../components/MessageList/MessageList';
import { Chat, Message, Messages, AUTHOR } from '../../types';
import style from './ChatPage.module.scss';

import { WithClasses } from '../../HOC/WithClasses';

interface ChatPageProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  messages: Messages;
  onAddMessage: (chatId: string, msg: Message) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatPage: FC<ChatPageProps> = ({
  chats,
  onAddChat,
  messages,
  onAddMessage,
  onDeleteChat,
}) => {
  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);

  useEffect(() => {
    if (
      chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHOR.USER
    ) {
      setTimeout(() => {
        onAddMessage(chatId, {
          text: 'Hello, Human!',
          author: AUTHOR.BOT,
        });
      }, 1500);
    }
  }, [chatId, messages, onAddMessage]);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }
  return (
    <>
      <ChatList chats={chats} onAddChat={onAddChat} onDeleteChat={onDeleteChat} />
      {/*<MessageList messages={chatId ? messages[chatId] : []} />*/}
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={style.border}
      />
      <Form addMessage={onAddMessage} />
    </>
  );
};
