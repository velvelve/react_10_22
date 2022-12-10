import { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ChatList } from '../../components/ChatList';
import { Form } from '../../components/Form';
import { MessageList } from '../../components/MessageList/MessageList';
import style from './ChatPage.module.scss';

import { StoreState } from '../../store/index'

import { WithClasses } from '../../HOC/WithClasses';
import { useSelector } from 'react-redux';

export const ChatPage: FC = () => {
  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);

  const messages = useSelector((state: StoreState) => state.messages)

  /*
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
  */

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }
  return (
    <>
      <ChatList />
      {/*<MessageList messages={chatId ? messages[chatId] : []} />*/}
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={style.border}
      />
      <Form />
    </>
  );
};
