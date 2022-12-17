import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ChatList } from '../../components/ChatList';
import { Form } from '../../components/Form';
import { MessageList } from '../../components/MessageList/MessageList';
import style from './ChatPage.module.scss';
import { WithClasses } from '../../HOC/WithClasses';
import { useSelector } from 'react-redux';
import { selectMessages } from '../../store/messages/selectors';

export const ChatPage: FC = () => {
  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);
  const messages = useSelector(selectMessages);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }
  return (
    <>
      <ChatList />
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={style.border}
      />
      <Form />
    </>
  );
};
